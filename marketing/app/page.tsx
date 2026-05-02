import { Header } from "./components/Header";
import { CandidateWall } from "./components/CandidateWall";
import { DashboardPreview } from "./components/DashboardPreview";
import { HowItWorks } from "./components/HowItWorks";
import { ComparisonTable } from "./components/ComparisonTable";
import { ProofSection } from "./components/ProofSection";
import { ComplianceBar } from "./components/ComplianceBar";
import { AfterBooking } from "./components/AfterBooking";
import { FAQ } from "./components/FAQ";
import { CTASection } from "./components/CTASection";
import { Footer } from "./components/Footer";
import { ScrollRail } from "./components/ScrollRail";
import { StickyDemoCTA } from "./components/StickyDemoCTA";

export default function Home() {
  return (
    <main className="relative">
      <Header />
      <ScrollRail />

      <CandidateWall />
      <DashboardPreview />
      <HowItWorks />
      <ComparisonTable />
      <ProofSection />
      <ComplianceBar />
      <AfterBooking />
      <FAQ />
      <CTASection />
      <Footer />

      <StickyDemoCTA />
    </main>
  );
}
