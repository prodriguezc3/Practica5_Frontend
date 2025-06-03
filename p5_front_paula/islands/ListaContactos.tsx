import { FunctionalComponent } from "preact";
import { Contacto } from "../types.ts";
import { Signal } from "@preact/signals";

interface Props {
  contactos: Contacto[];
  chatId: Signal<string>;
}

const ListaContactos: FunctionalComponent<Props> = ({ contactos, chatId }) => {
  const seleccionarChat = (id: string) => {
    chatId.value = id;
  };

  return (
    <div class="lista-contactos">
      <a href="/NuevoContacto">
        <button class="boton-crear">+ Nuevo contacto</button>
      </a>
      <ul>
        {contactos.map((c) => (
          <li
            key={c._id}
            class="contacto"
            onClick={() => seleccionarChat(c.chatId)}
          >
            <strong>{c.name}</strong>
            <div>{c.phone}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListaContactos;
