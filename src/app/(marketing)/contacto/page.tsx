import { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/forms/contact-form";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Contacto | Leidy Abello",
  description: "Agenda una conversación y comparte tus necesidades.",
};

export default function ContactPage() {
  return (
    <Section spacing="sm">
        <Container className="space-y-16">
            <header className="max-w-3xl space-y-6">
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-brand-500">
                Contacto
                </p>
                <h1 className="text-4xl font-medium md:text-6xl">Conversemos</h1>
                <p className="text-xl text-neutral-600 leading-relaxed">
                Comparte tu intención y te contactaré con una propuesta amorosa y
                respetuosa para iniciar tu proceso.
                </p>
            </header>

            <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
                <ContactForm />

                <div className="space-y-8">
                    <Card className="p-8 md:p-10 space-y-8 border-brand-100 bg-brand-50/30" hover={false}>
                        <div>
                            <h2 className="text-2xl font-medium">Cuestionario extendido</h2>
                            <p className="mt-4 text-neutral-600">
                            Estas preguntas nos ayudan a entender mejor tu momento actual y
                            diseñar un acompañamiento personalizado desde el primer encuentro.
                            </p>
                        </div>
                        <div className="space-y-6 text-sm text-neutral-500 italic">
                            <p>“¿Cómo describirías tu relación actual con tu imagen?”</p>
                            <p>“¿Qué emociones quieres cultivar al mirarte al espejo?”</p>
                            <p>“¿Cuál es tu mayor expectativa al iniciar este proceso?”</p>
                        </div>
                        <Button asChild variant="outline" className="w-full">
                            <Link href="/cuestionario.pdf" download>
                            DESCARGAR PDF PARA REFLEXIÓN
                            </Link>
                        </Button>
                    </Card>

                    <div className="p-8 space-y-4">
                        <h3 className="text-sm font-bold uppercase tracking-widest text-neutral-400">Otros medios</h3>
                        <p className="text-neutral-600 text-sm">
                            Si prefieres, también puedes escribirme directamente por WhatsApp o Instagram para una respuesta más ágil.
                        </p>
                    </div>
                </div>
            </div>
        </Container>
    </Section>
  );
}
