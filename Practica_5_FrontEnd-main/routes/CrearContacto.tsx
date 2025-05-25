import { FreshContext, Handlers} from "$fresh/server.ts";

export const handler:Handlers = {
    POST: async (req: Request, _ctx:FreshContext) => {
      const form = await req.formData()
      const name = form.get("name")
      const email = form.get("email")
      const phone = form.get("phone")

      const response = await fetch("https://back-a-p4.onrender.com/contacts/", {
        method: "Post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          phone
        })
      })

      if (!response.ok) {
      console.error("Error al guardar el contacto:", await response.text());
      return new Response("Error al guardar el contacto", { status: 500 });
    }

      const headers = new Headers();
      headers.set("location", "/");
      return new Response(null, {
        status: 303, 
        headers,
      });
      
    }
  }
const Page = () => {
  return(
    <div class="formulario">
        <form method="POST">
                <input type="text" name="name" placeholder= "name"/>
                <input type="tel" name="phone" placeholder= "phone"/>
                <input type="email" name="email" placeholder= "email"/>
                <button type="submit">Crear</button>
            </form>
    </div>
  )
}

export default Page