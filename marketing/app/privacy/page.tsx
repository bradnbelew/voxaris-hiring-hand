import type { Metadata } from "next";
import { LegalPage } from "../components/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy — Hiring Hand",
  description:
    "How Hiring Hand collects, uses, and protects candidate and client data.",
};

export default function PrivacyPage() {
  return (
    <LegalPage eyebrow="Legal" title="Privacy Policy" updated="2026-05-01">
      <p>
        Hiring Hand is an AI-powered hiring agent operated by Voxaris LLC
        (&ldquo;Voxaris,&rdquo; &ldquo;we,&rdquo; &ldquo;us&rdquo;). This policy
        explains what we collect when a candidate completes an interview with
        Jordan, what we do with that data, and the choices candidates and
        clients have. This page is a plain-English summary; the binding agreement
        is your signed contract.
      </p>

      <h2>Who this policy covers</h2>
      <ul>
        <li>
          <strong>Candidates:</strong> people who complete an interview with
          Jordan after applying to a role posted by one of our clients.
        </li>
        <li>
          <strong>Clients:</strong> staffing agencies and employers who use the
          Hiring Hand dashboard to review interviews.
        </li>
        <li>
          <strong>Visitors:</strong> anyone who visits hiringhand.io.
        </li>
      </ul>

      <h2>What we collect from candidates</h2>
      <p>
        During an interview session: video and audio of the candidate&apos;s
        responses (used in real time for transcription and structured scoring),
        the structured fields produced by Jordan (e.g. years of experience, work
        authorization status, certifications), and timestamped transcripts. We
        do not collect Social Security numbers, banking information, or
        government ID numbers — Jordan is instructed never to ask.
      </p>

      <h2>What we do with that data</h2>
      <ul>
        <li>
          We produce a <strong>scored candidate card</strong> and deliver it to
          the client who posted the role.
        </li>
        <li>
          We store the transcript, video clip, and structured fields in our
          encrypted Supabase instance (US-East) for a default of{" "}
          <strong>90 days</strong>, configurable per client contract.
        </li>
        <li>
          We do <strong>not</strong> sell candidate data to third parties.
        </li>
        <li>
          We do <strong>not</strong> use candidate interview content to train
          general-purpose AI models.
        </li>
      </ul>

      <h2>What no automated decision means</h2>
      <p>
        Hiring Hand does not make hiring decisions. Jordan produces a structured
        screening output; a human recruiter at the client side reviews the
        output and makes every approve/pass/reject call. Candidates may request
        a human-only interview at any time and we will route them out of the
        AI flow.
      </p>

      <h2>Candidate rights</h2>
      <ul>
        <li>
          <strong>Access:</strong> request a copy of your interview transcript
          and any structured data we hold.
        </li>
        <li>
          <strong>Deletion:</strong> request that your data be deleted, per
          CCPA / GDPR. We honor this within 30 days.
        </li>
        <li>
          <strong>Opt-out:</strong> request a human-conducted interview
          instead. We will route the request to the client.
        </li>
        <li>
          To exercise any of these,{" "}
          <a href="mailto:hello@hiringhand.io">email hello@hiringhand.io</a>.
        </li>
      </ul>

      <h2>Cookies and analytics</h2>
      <p>
        hiringhand.io uses minimal first-party analytics to understand traffic
        sources and which sections of the site convert. We do not load
        third-party advertising trackers. Detail will be added once we settle
        on a provider.
      </p>

      <h2>Subprocessors</h2>
      <ul>
        <li>
          <strong>Tavus:</strong> conversational video infrastructure. Tavus
          processes video and audio in real time during the interview session.
        </li>
        <li>
          <strong>Cartesia:</strong> text-to-speech for Jordan&apos;s voice.
        </li>
        <li>
          <strong>Deepgram:</strong> speech-to-text transcription.
        </li>
        <li>
          <strong>Supabase:</strong> Postgres database for transcripts and
          candidate cards.
        </li>
        <li>
          <strong>Vercel:</strong> hosting for hiringhand.io and the candidate
          interview surface.
        </li>
      </ul>

      <h2>Contact</h2>
      <p>
        Privacy questions:{" "}
        <a href="mailto:hello@hiringhand.io">hello@hiringhand.io</a>. Voxaris
        LLC, Orlando, FL.
      </p>
    </LegalPage>
  );
}
