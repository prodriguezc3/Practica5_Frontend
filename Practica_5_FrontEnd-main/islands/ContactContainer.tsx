import { FunctionalComponent } from "preact/src/index.d.ts";
import { Contact} from "../types.ts";
import { Signal } from "@preact/signals";

type Props = {
    contact : Contact
    chatId : Signal<string>

}
const ContactContainer: FunctionalComponent<Props> = (prop) => {

    const handlerClick = () =>{
        prop.chatId.value = prop.contact.chatId
    }

    return(
        <div class="ContactInfo" onClick={() => handlerClick()}>
            <div>
                {prop.contact.name}
            </div>
            <div>
                {prop.contact.phone}
            </div>
        </div>
    )
}

export default ContactContainer