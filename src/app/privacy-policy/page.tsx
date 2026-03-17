import Link from "next/link";
import React from "react";

const PrivacyPolicyPage = () => {
  return (
    <div className="flex flex-col p-6 min-h-screen items-center text-white">
      <header className="flex items-center relative">
        <Link
          href="/"
          className="fixed left-2 text-white/60  text-sm p-4 rounded-2xl backdrop-blur-xs duration-150 hover:text-white/80"
        >
          ← Back
        </Link>
        <h1 className="text-xl font-semibold">Privacy Policy</h1>
      </header>

      <div className="mt-4 w-full max-w-4xl border border-white/30 rounded-2xl p-8 space-y-6 text-white/50">
        <p className="text-white/80">
          <strong>Effective date:</strong> March 11, 2026
        </p>

        <p>
          Your privacy is important to us. This Privacy Policy explains how we
          collect, use, and protect your personal data when you use our web
          application (“Eburon-jobs”). By using the App, you consent to the
          practices described below.
        </p>

        {/* Section 1 */}
        <div>
          <h2 className="text-xl font-semibold mb-2 text-white/80">
            1. Data We Collect
          </h2>
          <p className="mb-2">
            When you use the App, we collect the following personal data:
          </p>

          <ul className="list-disc list-inside space-y-1">
            <li>
              <strong className="text-white/80">
                User Information (Candidates):
              </strong>{" "}
              Full name, email, phone number (optional), role / job title, work
              experience, user role within the App
            </li>
            <li>
              <strong className="text-white/80">Interview Data:</strong>{" "}
              Interview questions and answers, labels and confidence scores,
              associated role and experience information
            </li>
            <li>
              <strong className="text-white/80">
                Automatically Collected Data:
              </strong>{" "}
              Timestamps of account creation and updates
            </li>
            <li>
              <strong className="text-white/80">Employer Access:</strong>{" "}
              Employers using the App can view candidate profiles and their
              interview data
            </li>
          </ul>
        </div>

        {/* Section 2 */}
        <div>
          <h2 className="text-xl font-semibold mb-2 text-white/80">
            2. How We Use Your Data
          </h2>
          <ul className="list-disc list-inside space-y-1">
            <li>To create and manage your account</li>
            <li>To store and display interview data for employers</li>
            <li>
              To provide the App’s services, including candidate evaluation
            </li>
            <li>To comply with legal obligations</li>
          </ul>
          <p className=" mt-2">
            We do not sell or share your personal data with third parties for
            marketing purposes.
          </p>
        </div>

        {/* Section 3 */}
        <div>
          <h2 className="text-xl font-semibold mb-2 text-white/80">
            3. Legal Basis for Processing
          </h2>
          <ul className="list-disc list-inside space-y-1">
            <li>
              <strong>Contractual necessity:</strong> To provide the App’s
              services
            </li>
            <li>
              <strong>Legitimate interest:</strong> To operate and improve the
              App
            </li>
            <li>
              <strong>Consent:</strong> If you voluntarily provide additional
              information
            </li>
          </ul>
        </div>

        {/* Section 4 */}
        <div>
          <h2 className="text-xl font-semibold mb-2 text-white/80">
            4. Data Sharing
          </h2>
          <p className="">
            Candidate and interview data is visible to employers using the App.
            Data is not shared with external parties except as required by law.
          </p>
        </div>

        {/* Section 5 */}
        <div>
          <h2 className="text-xl font-semibold mb-2 text-white/80">
            5. Data Retention
          </h2>
          <p className="">
            We retain your personal data as long as your account is active or as
            needed to provide the App’s services. You can request deletion of
            your account and associated data at any time. We may retain certain
            information to comply with legal obligations or resolve disputes.
          </p>
        </div>

        {/* Section 6 */}
        <div>
          <h2 className="text-xl font-semibold mb-2 text-white/80">
            6. Your Rights
          </h2>
          <ul className="list-disc list-inside space-y-1">
            <li>Access your personal data</li>
            <li>Correct inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Withdraw consent</li>
            <li>Restrict or object to certain processing</li>
            <li>Receive your data in a portable format</li>
          </ul>
          <p className=" mt-2">
            To exercise these rights, please contact us at the email address
            below.
          </p>
        </div>

        {/* Section 7 */}
        <div>
          <h2 className="text-xl font-semibold mb-2 text-white/80">
            7. Security
          </h2>
          <ul className="list-disc list-inside space-y-1">
            <li>All data is stored securely in our database</li>
            <li>Authentication cookies are used strictly for login purposes</li>
            <li>The App uses HTTPS for secure data transmission</li>
          </ul>
        </div>

        {/* Section 8 */}
        <div>
          <h2 className="text-xl font-semibold mb-2 text-white/80">
            8. Cookies
          </h2>
          <p className="">
            The App uses cookies strictly for authentication and session
            management. These cookies are essential for the App to function and
            do not require your consent. No other tracking or analytics cookies
            are used.
          </p>
        </div>

        {/* Section 9 */}
        <div>
          <h2 className="text-xl font-semibold mb-2 text-white/80">
            9. Contact Information
          </h2>
          <p className="">
            If you have questions about this Privacy Policy or your personal
            data, please contact:
          </p>
          <ul className="list-disc list-inside space-y-1 mt-2">
            <li>Email: mail@eburon.ai</li>
            <li>
              Address: Ariolas BV | Boterstraat 36, Ieper, Belgium | Jo Lernout
            </li>
          </ul>
        </div>

        <p className=" text-sm mt-4 text-white/80">
          Last updated: March 11, 2026
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
