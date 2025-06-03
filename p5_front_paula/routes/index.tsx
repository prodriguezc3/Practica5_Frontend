import { Handlers, PageProps } from "$fresh/server.ts";
import { useSignal } from "@preact/signals";
import { Contacto, DataC } from "../types.ts";
import ListaContactos from "../islands/ListaContactos.tsx";
import ChatMensajes from "../islands/ChatMensajes.tsx";

type Datos = {
  contactos: Contacto[];
};

export const handler: Handlers<Datos> = {
  async GET(_req, ctx) {
    const res = await fetch("https://back-a-p4.onrender.com/contacts/");
    const data: DataC = await res.json();

    return ctx.render({
      contactos: data.data,
    });
  },
};

export default function Home(props: PageProps<Datos>) {
  const chatId = useSignal("");

  return (
    <div class="contenedor-principal">
      <ListaContactos contactos={props.data.contactos} chatId={chatId} />
      <ChatMensajes chatId={chatId} />
    </div>
  );
}
