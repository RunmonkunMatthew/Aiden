export type User = {
  id: string,
  email: string | null,
  chats: object,
}


export type Sender = 'user' | 'bot'

export type Chat = {
  id?: string,
  createdAt: number,
  title: string,
  messages: object
}

export type Message = {
  id?: string,
  sender: Sender,
  text: string,
  createdAt: number,
  severity?: "normal" | "warning" | "emergency"
}