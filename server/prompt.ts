const SYSTEM_PROMPT = {}

const EMERGENCY_KEYWORDS = [
  'uncounscious',
  'not breathing',
  'severe bleeding',
  'chest pain',
  'seizure'
]

function isEmergency(text:string): boolean {
  return EMERGENCY_KEYWORDS.some(k => text.toLowerCase().includes(k))
}

