import { Handlers, PageProps } from "$fresh/server.ts";

export const handler: Handlers = {
  async POST(req) {
    const form = await req.formData();
    const name = form.get("name");
    const phone = form.get("phone");
    const email = form.get("email");

    await fetch("https://back-a-p4.onrender.com/contacts/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        phone,
        email,
      }),
    });

    return new Response(null, {
      status: 303,
      headers: {
        location: "/",
      },
    });
  },
};

export default function NuevoContacto(_props: PageProps) {
  return (
    <div>
      <h2>Nuevo contacto</h2>
      <form method="POST">
        <input type="text" name="name" placeholder="Nombre" />
        <input type="text" name="phone" placeholder="Teléfono" />
        <input type="text" name="email" placeholder="Email" />
        <button type="submit">Guardar</button>
      </form>
    </div>
  );
}
