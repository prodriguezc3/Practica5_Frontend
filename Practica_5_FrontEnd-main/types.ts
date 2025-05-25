export type Contact = {
  _id: string,
  name: string,
  email: string,
  phone: string,
  chatId: string
}

export type Data = {
  data: Contact[]
}

export type Message = {
  _id: string,
      chatId: string,
      isContactMessage: boolean,
      content: string,
      timestamp: string,
}

export type Data2 = {
  data:Message[]
}