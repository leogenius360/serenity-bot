import { WelcomePanel } from "@/components/welcome";
import { ChatBotAgent } from "@/lib/agent";
import { findBestMatch } from "@/lib/bot";

export default async function LandingPage() {
  return (
    <section className="max-w-screen-2xl mx-auto p-4 lg:p-6">
      <WelcomePanel />
    </section>
  );
}
