import type { Metadata } from "next";
import { LegalPage } from "../components/LegalPage";

export const metadata: Metadata = {
  title: "Biometric Information Policy — Hiring Hand",
  description:
    "How Hiring Hand handles biometric identifiers under BIPA, IL AIVIA, and similar laws.",
};

export default function BiometricPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Biometric Information Policy"
      updated="2026-05-01"
    >
      <p>
        This policy describes how Voxaris LLC, operating Hiring Hand, handles
        biometric identifiers and biometric information collected during AI
        video interviews. It is written to comply with the Illinois Biometric
        Information Privacy Act (BIPA), the Illinois Artificial Intelligence
        Video Interview Act (AIVIA), Florida SB 482, and similar regimes.
      </p>

      <h2>What we collect</h2>
      <p>
        During an interview session with Jordan, the AI hiring agent, the
        following are processed in real time:
      </p>
      <ul>
        <li>
          <strong>Audio:</strong> the candidate&apos;s spoken responses
          (transcribed, scored, then retained as part of the interview record).
        </li>
        <li>
          <strong>Video:</strong> visual signal during the interview (used by
          the Raven-1 perception layer to produce qualitative observations such
          as engagement, eye contact, and professional setting).
        </li>
        <li>
          <strong>Derived signals:</strong> structured outputs of perception
          analysis (e.g. &ldquo;maintained eye contact 92% of session&rdquo;).
        </li>
      </ul>
      <p>
        We do <strong>not</strong> generate, store, or transmit biometric
        identifiers as defined by BIPA — we do not produce facial geometry
        scans, voiceprints, fingerprints, or retina/iris scans suitable for
        identifying a unique individual outside the interview session.
      </p>

      <h2>Disclosure and consent</h2>
      <p>
        Every interview begins with an explicit, non-skippable disclosure
        delivered by Jordan in plain language. The disclosure states:
      </p>
      <ul>
        <li>That the interviewer is an AI.</li>
        <li>
          That the session is being recorded and transcribed for review by a
          human recruiter.
        </li>
        <li>That no automated hiring decision will be made.</li>
        <li>
          That the candidate has the right to a human-conducted interview
          instead.
        </li>
      </ul>
      <p>
        The candidate must affirmatively consent before the interview proceeds.
        If the candidate declines, the session ends and the client is notified
        to follow up by phone.
      </p>

      <h2>Retention</h2>
      <p>
        Interview audio, video, transcripts, and derived signals are retained
        for <strong>90 days by default</strong> after the interview, unless a
        different retention period is specified by the client&apos;s contract.
        After the retention period, all interview artifacts are deleted from
        our active stores. Candidate-requested deletion is honored within 30
        days regardless of retention setting.
      </p>

      <h2>Sharing</h2>
      <p>
        Interview content and derived signals are shared only with:
      </p>
      <ul>
        <li>The client whose role the candidate applied to.</li>
        <li>
          Our infrastructure subprocessors (video, transcription, storage, hosting) under
          contractual confidentiality. A current list is available on request.
        </li>
        <li>
          Law enforcement, only in response to valid legal process.
        </li>
      </ul>
      <p>
        We do not sell, lease, trade, or otherwise profit from biometric or
        interview data, and we do not use it to train general-purpose AI
        models.
      </p>

      <h2>Security</h2>
      <p>
        Interview content is encrypted in transit (TLS 1.2+) and at rest
        (AES-256 in Supabase). Access is gated by role-based authentication and
        audit logs. SOC 2 Type II audit is in progress.
      </p>

      <h2>Your rights</h2>
      <p>
        Candidates may request access to or deletion of their interview content
        at any time by emailing{" "}
        <a href="mailto:hello@hiringhand.io">hello@hiringhand.io</a>. We respond
        within 30 days.
      </p>

      <h2>Contact</h2>
      <p>
        Voxaris LLC, Orlando, FL ·{" "}
        <a href="mailto:hello@hiringhand.io">hello@hiringhand.io</a>
      </p>
    </LegalPage>
  );
}
