import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Términos y Condiciones",
  description: "Términos y condiciones de uso de este sitio web.",
};

export default function TerminosPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-24">
      <h1 className="mb-8 text-4xl font-bold tracking-tight">
        Términos y Condiciones
      </h1>
      <div className="prose prose-neutral max-w-none dark:prose-invert">
        <p>
          Al acceder y utilizar este sitio web, aceptas quedar vinculado por los
          presentes Términos y Condiciones. Si no estás de acuerdo con alguno de
          ellos, te pedimos que no utilices este sitio.
        </p>
        <h2>Uso del sitio</h2>
        <p>
          Este sitio web es de carácter informativo y tiene como fin presentar
          los servicios profesionales de Leidy Abello. Queda prohibido el uso
          del sitio para fines ilegales, fraudulentos o que puedan causar daño a
          terceros.
        </p>
        <h2>Propiedad intelectual</h2>
        <p>
          Todo el contenido de este sitio — textos, imágenes, diseño y código —
          es propiedad de Leidy Abello o de sus respectivos titulares y está
          protegido por las leyes de propiedad intelectual. Queda prohibida su
          reproducción total o parcial sin autorización expresa.
        </p>
        <h2>Limitación de responsabilidad</h2>
        <p>
          No nos hacemos responsables de los daños o perjuicios derivados del
          uso o la imposibilidad de uso de este sitio, ni de la exactitud o
          actualidad de la información contenida en él.
        </p>
        <h2>Modificaciones</h2>
        <p>
          Nos reservamos el derecho de modificar estos Términos y Condiciones en
          cualquier momento. Los cambios entrarán en vigor en el momento de su
          publicación en esta página.
        </p>
        <h2>Legislación aplicable</h2>
        <p>
          Estos términos se rigen por la legislación colombiana. Cualquier
          disputa será resuelta ante los tribunales competentes de Colombia.
        </p>
      </div>
    </main>
  );
}
