export type User = {
  email: string | null,
  createdAt: number
}


export type Sender = 'user' | 'bot'

export type Chat = {
  createdAt: number,
  emergency: boolean,
}

export type Message = {
  sender: Sender,
  text: string,
  createdAt: number,
   severity?: "normal" | "warning" | "emergency"
}