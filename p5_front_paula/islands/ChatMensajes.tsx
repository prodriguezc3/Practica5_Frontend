import { useEffect, useState } from "preact/hooks";
import { Signal } from "@preact/signals";
import { Mensaje, DataM } from "../types.ts";


type Props = {
  chatId: Signal<string>;
};

export default function ChatMensajes({ chatId }: Props) {
  const [mensajes, setMensajes] = useState<Mensaje[]>([]); 
  const [input, setInput] = useState(""); //lo que se va a enviar

  
  const cargarMensajes = async () => {
    if (!chatId.value) return;
    const res = await fetch("https://back-a-p4.onrender.com/messages/chat/" + chatId.value);
    const json: DataM = await res.json();
    setMensajes(json.data); 
  };

  
  useEffect(() => {
    cargarMensajes();
  }, [chatId.value]);

  
  const enviar = async (e: Event) => {
    e.preventDefault(); //esto lo he puesto para que no recargue la pag

    
    await fetch("https://back-a-p4.onrender.com/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chatId: chatId.value,
        content: input,
        isContactMessage: false,
      }),
    });

    setInput(""); 
    cargarMensajes(); 
  };

  return (
    <div class="zona-chat">
      {//mostrar mensajtos
      }
      {mensajes.map((msg) => (
        <div
          key={msg._id}
          class={"mensaje " + (msg.isContactMessage ? "izquierda" : "derecha")}
        >
          {msg.content}
        </div>
      ))}

      {//form para enviar el msg 
      }
      <form onSubmit={enviar} class="form-chat">
        <input
          type="text"
          value={input}
          onInput={(e) => setInput(e.currentTarget.value)}
          placeholder="Escribe algo"
        />
        <button type="submit" disabled={!chatId.value}>
          Enviar
        </button>
      </form>
    </div>
  );
}
