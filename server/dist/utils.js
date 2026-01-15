"use strict";
const { SCENARIOS } = require('./prompt');
function detectScenario(text) {
    const t = text.toLowerCase();
    if (/blood|bleeding|cut/.test(t))
        return "bleeding";
    if (/burn|fire|scald/.test(t))
        return "burns";
    if (/breath|choking|asthma/.test(t))
        return "breathing";
    if (/fall|injury|hurt/.test(t))
        return "injury";
    if (/unconscious|seizure/.test(t))
        return "unconscious";
    if (/poison|swallow/.test(t))
        return "poisoning";
    return "general";
}
const EMERGENCY_KEYWORDS = [
    'uncounscious',
    'not breathing',
    'severe bleeding',
    'chest pain',
    'seizure'
];
function isEmergency(text) {
    return EMERGENCY_KEYWORDS.some(k => text.toLowerCase().includes(k));
}
module.exports = {
    detectScenario,
    isEmergency
};
//# sourceMappingURL=utils.js.map