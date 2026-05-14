import { Footer } from "@/components/common/footer";
import { Header } from "@/components/common/header";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
