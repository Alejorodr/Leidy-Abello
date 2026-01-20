import { Metadata } from "next";

import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Contacto",
  description: "Agenda una conversación y comparte tus necesidades.",
};

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-5xl space-y-10 px-6 py-16 md:px-10">
      <header className="space-y-4">
        <p className="text-xs uppercase tracking-[0.3em] text-brand-300">
          Contacto
        </p>
        <h1 className="text-4xl font-semibold">Conversemos</h1>
        <p className="text-neutral-700">
          Comparte tu intención y te contactaré con una propuesta amorosa y
          respetuosa.
        </p>
      </header>

      <div className="grid gap-8 md:grid-cols-[1fr_1.1fr]">
        <form
          action="/api/contact"
          method="post"
          className="card space-y-6"
        >
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="name">
              Nombre completo
            </label>
            <input
              className="w-full rounded-2xl border border-brand-300/40 bg-white px-4 py-3 text-sm"
              id="name"
              name="name"
              placeholder="Tu nombre"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="email">
              Correo
            </label>
            <input
              className="w-full rounded-2xl border border-brand-300/40 bg-white px-4 py-3 text-sm"
              id="email"
              name="email"
              type="email"
              placeholder="tu@email.com"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="message">
              Mensaje
            </label>
            <textarea
              className="min-h-[140px] w-full rounded-2xl border border-brand-300/40 bg-white px-4 py-3 text-sm"
              id="message"
              name="message"
              placeholder="Cuéntame sobre tu intención"
              required
            />
          </div>
          <input type="hidden" name="hcaptchaToken" value="" />
          <Button type="submit">Enviar mensaje</Button>
          <p className="text-xs text-neutral-500">
            Protegemos tu información y solo la usamos para responder tu
            solicitud.
          </p>
        </form>

        <div className="card space-y-6">
          <div>
            <h2 className="text-2xl font-semibold">Cuestionario extendido</h2>
            <p className="mt-2 text-sm text-neutral-600">
              Estas preguntas nos ayudan a entender mejor tu momento actual y
              diseñar un acompañamiento personalizado.
            </p>
          </div>
          <div className="space-y-4 text-sm text-neutral-600">
            <p>1. ¿Cómo describirías tu relación actual con tu imagen?</p>
            <p>2. ¿Qué ritual de autocuidado te gustaría fortalecer?</p>
            <p>3. ¿Qué emociones quieres cultivar al mirarte al espejo?</p>
            <p>4. ¿Cuál es tu mayor expectativa al iniciar este proceso?</p>
          </div>
          <Button variant="outline">Descargar cuestionario</Button>
        </div>
      </div>
    </section>
  );
}
