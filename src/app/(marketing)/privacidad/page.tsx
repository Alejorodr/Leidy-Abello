import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidad",
  description: "Conoce cómo tratamos tus datos personales.",
};

export default function PrivacidadPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-24">
      <h1 className="mb-8 text-4xl font-bold tracking-tight">
        Política de Privacidad
      </h1>
      <div className="prose prose-neutral max-w-none dark:prose-invert">
        <p>
          En este sitio web respetamos tu privacidad y nos comprometemos a
          proteger tus datos personales conforme a la legislación vigente en
          Colombia (Ley 1581 de 2012) y las normativas internacionales
          aplicables.
        </p>
        <h2>Datos que recopilamos</h2>
        <p>
          Únicamente recopilamos los datos que tú nos proporcionas
          voluntariamente a través del formulario de contacto: nombre, correo
          electrónico y el mensaje que nos envías. No recopilamos datos de
          navegación ni utilizamos cookies de rastreo de terceros.
        </p>
        <h2>Uso de los datos</h2>
        <p>
          Los datos recopilados se utilizan exclusivamente para responder a tu
          consulta o solicitud de servicios. No los compartimos, vendemos ni
          cedemos a terceros bajo ninguna circunstancia.
        </p>
        <h2>Almacenamiento y seguridad</h2>
        <p>
          La información es procesada a través de servicios de envío de correo
          electrónico seguros. No almacenamos tus datos en bases de datos
          propias más allá del tiempo necesario para gestionar tu solicitud.
        </p>
        <h2>Tus derechos</h2>
        <p>
          Puedes ejercer tus derechos de acceso, rectificación, cancelación y
          oposición (ARCO) escribiéndonos directamente a través del formulario
          de contacto.
        </p>
        <h2>Contacto</h2>
        <p>
          Si tienes dudas sobre esta política, no dudes en contactarnos a través
          de la página de contacto de este sitio.
        </p>
      </div>
    </main>
  );
}
