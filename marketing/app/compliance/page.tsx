import type { Metadata } from "next";
import { LegalPage } from "../components/LegalPage";

export const metadata: Metadata = {
  title: "EEOC and AI Hiring Compliance — Hiring Hand",
  description:
    "How Hiring Hand complies with EEOC, BIPA, IL AIVIA, NYC AEDT, FL SB 482, and the EU AI Act.",
};

export default function CompliancePage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Compliance"
      updated="2026-05-01"
    >
      <p>
        Hiring Hand is built compliant from day one. Below is a plain-English
        summary of how Jordan, our AI video interviewer, satisfies the legal
        obligations on AI-assisted hiring in the United States and EU.
      </p>

      <h2>EEOC — Equal Employment Opportunity Commission</h2>
      <p>
        Jordan is instructed never to inquire about age, race, color, religion,
        sex (including pregnancy, sexual orientation, gender identity),
        national origin, disability status, marital status, or genetic
        information. If a candidate volunteers protected-class information, the
        disclosure is acknowledged, redirected, and excluded from the score.
        Every interview is logged with a full transcript that is available for
        audit.
      </p>

      <h2>BIPA — Illinois Biometric Information Privacy Act</h2>
      <p>
        We do not generate biometric identifiers (face/voice prints suitable for
        out-of-session identification). See our{" "}
        <a href="/biometric-policy">Biometric Information Policy</a> for full
        detail.
      </p>

      <h2>AIVIA — Illinois Artificial Intelligence Video Interview Act</h2>
      <ul>
        <li>
          <strong>Notice:</strong> Jordan opens every session disclosing it is
          an AI conducting a video interview.
        </li>
        <li>
          <strong>Explanation:</strong> Candidates are told that the AI analyzes
          responses to assist a human recruiter and that no automated hiring
          decision is made.
        </li>
        <li>
          <strong>Consent:</strong> The interview does not proceed until the
          candidate affirmatively consents.
        </li>
        <li>
          <strong>Limited sharing:</strong> Interview videos are shared only
          with the hiring client and our subprocessors, never sold or used for
          AI training.
        </li>
        <li>
          <strong>Deletion:</strong> Candidates may request deletion within 30
          days of the interview.
        </li>
      </ul>

      <h2>NYC AEDT — Automated Employment Decision Tool rule (Local Law 144)</h2>
      <p>
        Jordan is configured as an assistive tool, not a sole decision-making
        AEDT: structured outputs are reviewed by a human recruiter who makes
        the final approve/pass/reject call. Where clients operate in NYC, we
        provide the supporting documentation needed to satisfy the bias-audit
        and notice requirements of Local Law 144, including:
      </p>
      <ul>
        <li>The required candidate notice template.</li>
        <li>A summary of bias audits performed on the underlying scoring rubric.</li>
        <li>Disclosure of the data types Jordan considers.</li>
      </ul>

      <h2>FL SB 482 — Florida AI Bill of Rights</h2>
      <p>
        Jordan&apos;s opening disclosure satisfies the explicit-disclosure
        requirement. Candidate-side recording follows Florida&apos;s two-party
        recording consent requirement.
      </p>

      <h2>EU AI Act</h2>
      <p>
        AI-assisted hiring tools fall under the EU AI Act&apos;s &ldquo;high
        risk&rdquo; category. Hiring Hand is not currently offered in the EU
        market. When we expand, we will publish the Annex IV technical
        documentation, conformity assessment, and human-oversight architecture
        in advance of launch.
      </p>

      <h2>SOC 2</h2>
      <p>
        Type II audit is in progress. Latest report and pen-test summary are
        available under NDA on request to{" "}
        <a href="mailto:hello@hiringhand.io">hello@hiringhand.io</a>.
      </p>
    </LegalPage>
  );
}
