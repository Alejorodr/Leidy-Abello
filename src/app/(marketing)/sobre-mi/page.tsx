import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sobre mí",
  description:
    "Conoce la historia de Leidy Abello y su enfoque de estética consciente.",
};

export default function AboutPage() {
  return (
    <section className="mx-auto max-w-5xl space-y-8 px-6 py-16 md:px-10">
      <div className="space-y-4">
        <p className="text-xs uppercase tracking-[0.3em] text-brand-300">
          Sobre mí
        </p>
        <h1 className="text-4xl font-semibold">Acompañamiento con alma</h1>
        <p className="text-lg text-neutral-700">
          Soy Leidy Abello, terapeuta estética y guía de bienestar. Trabajo desde
          la sensibilidad, la escucha y la estética consciente para ayudarte a
          reconectar con tu identidad y autoestima.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="card space-y-4">
          <h2 className="text-2xl font-semibold">Mi filosofía</h2>
          <p className="text-sm text-neutral-600">
            Creo en una belleza sin presión, un cuidado que nace del respeto al
            cuerpo y que invita a habitarte con amor. Cada sesión es un ritual de
            presencia.
          </p>
          <p className="text-sm text-neutral-600">
            Integro estética, escucha emocional y herramientas de autocuidado
            para que te sientas en casa contigo misma.
          </p>
        </div>
        <div className="card space-y-4">
          <h2 className="text-2xl font-semibold">Valores que guían mi trabajo</h2>
          <ul className="list-disc space-y-2 pl-5 text-sm text-neutral-600">
            <li>Respeto profundo por tu historia y tus ritmos.</li>
            <li>Minimalismo elegante: menos ruido, más esencia.</li>
            <li>Bienestar integral: cuerpo, mente y emoción.</li>
            <li>Confidencialidad y acompañamiento seguro.</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
