import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import { Signal } from "@preact/signals";
import ChatContainer from "../islands/ChatContainer.tsx";
import Contacts from "../islands/Contacts.tsx";

import { Data } from "../types.ts";

export const handler:Handlers = {
    GET: async (_req: Request, ctx:FreshContext<unknown, Data>) => {
      const request = await fetch('https://back-a-p4.onrender.com/contacts/')
      const response = await request.json()

      return ctx.render({
        data: response.data
      })
      
    }
  }

const Page = (props:PageProps<Data>) => {
  const chatId = new Signal<string>("")
  const contacts = props.data.data
  return(
    <div class= "Inicio">
      <Contacts contacts={contacts} chatId={chatId}/>
      <ChatContainer chatId={chatId}/>
    </div>
  )
}

export default Page