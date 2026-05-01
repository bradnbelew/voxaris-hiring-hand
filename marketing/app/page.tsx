import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { ProblemSection } from "./components/ProblemSection";
import { DashboardPreview } from "./components/DashboardPreview";
import { HowItWorks } from "./components/HowItWorks";
import { ProofSection } from "./components/ProofSection";
import { ComplianceBar } from "./components/ComplianceBar";
import { FAQ } from "./components/FAQ";
import { CTASection } from "./components/CTASection";
import { Footer } from "./components/Footer";
import { ScrollRail } from "./components/ScrollRail";

export default function Home() {
  return (
    <main className="relative">
      <Header />
      <ScrollRail />

      <Hero />
      <ProblemSection />
      <DashboardPreview />
      <HowItWorks />
      <ProofSection />
      <ComplianceBar />
      <FAQ />
      <CTASection />
      <Footer />
    </main>
  );
}
