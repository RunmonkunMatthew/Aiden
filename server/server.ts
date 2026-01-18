import express from 'express';
import type {Request, Response} from 'express'
import axios from 'axios';
import cors from 'cors';
require('dotenv').config();

const {isEmergency, detectScenario} = require('./utils')
const {CORE_SYSTEM_PROMPT, SCENARIOS } = require('./prompt')

const app = express()
const port = process.env.PORT || 5000

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// cors middleware
app.use(
  cors({
    origin: ['http://localhost:5173','https://aiden-7z8a.onrender.com'],
    credentials: true,
  })
);

app.get('/', (req: Request, res: Response) => {
  res.json({message: 'Welcome to aiden', result: 'Done', console:process.env.GEMINI_API_KEY})
})

app.post('/api/chat', async (req: Request, res: Response) => {
  const { message } = req.body;
  const API_URL ='https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent';


  if (isEmergency(message)) {
    return res.json({
      reply: "This may be a medical emergency. Please contact emergency services immediately",
      emergency: true
    });
  }

  const scenario = detectScenario(message);
  const systemPrompt = `${CORE_SYSTEM_PROMPT}\n${SCENARIOS[scenario]}`;
  

  try {
    const response = await axios.post(`${API_URL}?key=${process.env.GEMINI_API_KEY}`, {
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

  } catch (error: any) {
    console.error("AI Error:", error.response?.data || error.message);
    res.status(500).json({ error: 'AI service failed' });
  }

});


app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
})

// server.on('error', (err) => {
//   console.error("Server error:", err);
// });
