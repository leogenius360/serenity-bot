import { WelcomePanel } from "@/components/welcome";

export default async function LandingPage() {
  return (
    <section className="max-w-screen-2xl mx-auto p-4 lg:p-6">
      <WelcomePanel />
    </section>
  );
}
