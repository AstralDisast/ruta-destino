import { API_URL } from "$env/static/private";
import type { Empresa } from "$lib/server/models";
import { error, fail, redirect } from "@sveltejs/kit";

export async function load({ params }) {
    const id = params.id;
    const response = await fetch(`${API_URL}/empresa/${id}`);
    if (!response.ok) {
        throw error(404, "Not Found");
    };
    const empresa: Empresa = await response.json();
    return { empresa };
}

type FormKey = "error" | "nombre";
const form: { [key in FormKey]: FormDataEntryValue | null } = {
    error: null, nombre: null
}

export const actions = {
    update: async ({ request }) => {
        const data = await request.formData();
        const f_id = data.get("id");
        const f_nombre = data.get("nombre");
        form.nombre = f_nombre;

        if (typeof f_nombre !== "string" || f_nombre === "") {
            form.error = "Ingrese un nombre";
            return fail(400, form);
        }
        const nombre = f_nombre;

        const req = await fetch(`${API_URL}/empresa/${f_id}`, {
            method: "POST",
            body: JSON.stringify({ nombre }),
            headers: { "Content-Type": "application/json" }
        });

        if (!req.ok) {
            const res = await req.json();
            form.error = res["error"];
            return fail(400, form);
        }

        throw redirect(302, "/empresa");
    }
}
