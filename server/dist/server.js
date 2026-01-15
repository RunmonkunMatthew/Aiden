"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const cors_1 = __importDefault(require("cors"));
require('dotenv').config();
const { isEmergency, detectScenario } = require('./utils');
const { CORE_SYSTEM_PROMPT, SCENARIOS } = require('./prompt');
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
// Body parser
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
// cors middleware
app.use((0, cors_1.default)({
    origin: ['http://localhost:5173'],
    credentials: true,
}));
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to aiden', result: 'Done', console: process.env.GEMINI_API_KEY });
});
app.post('/api/chat', async (req, res) => {
    const { message } = req.body;
    const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent';
    if (isEmergency(message)) {
        return res.json({
            reply: "This may be a medical emergency. Please contact emergency services immediately",
            emergency: true
        });
    }
    const scenario = detectScenario(message);
    const systemPrompt = `${CORE_SYSTEM_PROMPT}\n${SCENARIOS[scenario]}`;
    try {
        const response = await axios_1.default.post(`${API_URL}?key=${process.env.GEMINI_API_KEY}`, {
            contents: [
                {
                    role: 'user',
                    parts: [{ text: `${systemPrompt}\n\nuser:${message}` }]
                }
            ]
        });
        const aiReply = response.data.candidates?.[0]?.content?.parts?.[0]?.text || "I'm sorry, I couldn't process that.";
        res.json({
            aiReply,
            scenario,
            emergency: false
        });
    }
    catch (error) {
        console.error("AI Error:", error.response?.data || error.message);
        res.status(500).json({ error: 'AI service failed' });
    }
});
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
// server.on('error', (err) => {
//   console.error("Server error:", err);
// });
//# sourceMappingURL=server.js.map