import { FunctionalComponent } from 'preact/src/index.d.ts';
import { Signal } from "@preact/signals";
import { useEffect, useState } from "preact/hooks";
import { Data2, Message } from "../types.ts";
type Props = {
    chatId: Signal<string>
}


const getMessage = async (prop:Props):Promise<Message[]> => {
    if(prop.chatId.value === "") return []
    const request = await fetch(`https://back-a-p4.onrender.com/messages/chat/${prop.chatId.value}`)
    const response:Data2 = await request.json()
    return response.data
}

"// Enviar un mensaje"
async function sendMessage(chatId: string, content: string): Promise<void> { //Funcion que llama a la api para obtener los mensajes del chat
  if (!chatId || !content) throw new Error("chatId o contenido vacío");

  const res = await fetch("https://back-a-p4.onrender.com/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      chatId,
      content,
      isContactMessage: false,
    }),
  });

  if (!res.ok) {
    const errorData = await res.json();
    console.error("Respuesta del servidor:", errorData);
    throw new Error("Error al enviar mensaje");
  }
}


const ChatContainer: FunctionalComponent<Props> = (prop) => {

    const [chat, setChat] = useState<Message[]>([])
    const [mensaje, setMensaje] = useState<string>("")
    const [enviado, setEnviado] = useState<boolean>(true)

    useEffect(() => { //Efecto que llama a la api para conseguir los mensajes del chat y se ejecuta cuando cambia la señal del id del chat
        
        const fetchData = async () => {
            const mensajes = await getMessage(prop)
            setChat(mensajes)
        }
        fetchData()
    },[prop.chatId.value])

    const handleSubmit = async (e:Event) => { //handle que envia el mensaje que escribes a la api y despues llama a la funcion que obtiene los mensajes
        e.preventDefault()
        await sendMessage(prop.chatId.value, mensaje)
        setMensaje("")
        const mensajes = await getMessage(prop)
        setChat(mensajes)
        setEnviado(!enviado)
    }
    return(
        <div class= "ChatContainer">
            {chat.map((c) => <div key={c._id} class={`message ${c.isContactMessage ? "left" : "right"}`}>{c.content}</div>)}
            <div>
                <form onSubmit={handleSubmit}>
                    <input type="text"  placeholder= "escribe aqui el mensaje" value={mensaje} onInput={(e) => setMensaje(e.currentTarget.value)}/>
                    <button disabled = {!prop.chatId.value} type= "submit" >Enviar</button>
                </form>
            </div>
        </div>
    )
}

export default ChatContainer