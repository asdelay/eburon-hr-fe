import Link from "next/link";

const TermsOfUse = () => {
  return (
    <div className="flex flex-col p-6 min-h-screen items-center text-white">
      <header className="flex items-center relative">
        <Link
          href="/"
          className="fixed left-2 text-white/60  text-sm p-4 rounded-2xl backdrop-blur-xs duration-150 hover:text-white/80"
        >
          ← Back
        </Link>
        <h1 className="text-xl font-semibold">Terms Of Use</h1>
      </header>

      <div className="mt-4 w-full max-w-4xl border border-white/30 rounded-2xl p-8 space-y-6 text-white/50">
        <p className="text-white/80">
          These Terms of Use (“Terms”) govern your access to and use of the web
          application <strong className="">Eburon-jobs</strong> (the “App”). By
          accessing or using the App, you agree to comply with these Terms. If
          you do not agree with these Terms, you should not use the App.
        </p>

        {/* Section 1 */}
        <div>
          <h2 className="text-xl font-semibold mb-2 text-white/80">
            1. Description of the Service
          </h2>
          <p>
            Eburon-jobs is a platform that allows candidates to submit profile
            information and participate in automated interviews. Employers can
            review candidate profiles and interview results to assist with
            recruitment decisions.
          </p>
        </div>

        {/* Section 2 */}
        <div>
          <h2 className="text-xl font-semibold mb-2 text-white/80">
            2. User Accounts
          </h2>
          <p className="mb-2">
            To use certain features of the App, you may be required to create an
            account. When creating an account, you agree to:
          </p>

          <ul className="list-disc list-inside space-y-1">
            <li>Provide accurate and complete information</li>
            <li>Keep your account credentials secure</li>
            <li>Notify us immediately if you suspect unauthorized access</li>
          </ul>

          <p className="mt-2">
            You are responsible for all activities that occur under your
            account.
          </p>
        </div>

        {/* Section 3 */}
        <div>
          <h2 className="text-xl font-semibold mb-2 text-white/80">
            3. Candidate Responsibilities
          </h2>
          <ul className="list-disc list-inside space-y-1">
            <li>
              Provide truthful and accurate personal and professional
              information
            </li>
            <li>Submit interview responses that reflect your own experience</li>
            <li>Avoid submitting misleading or fraudulent information</li>
          </ul>

          <p className="mt-2">
            Candidates acknowledge that their profile information and interview
            responses may be visible to employers using the App.
          </p>
        </div>

        {/* Section 4 */}
        <div>
          <h2 className="text-xl font-semibold mb-2 text-white/80">
            4. Employer Responsibilities
          </h2>
          <ul className="list-disc list-inside space-y-1">
            <li>
              Use candidate information only for legitimate recruitment purposes
            </li>
            <li>Respect the privacy and confidentiality of candidate data</li>
            <li>Comply with applicable employment and data protection laws</li>
          </ul>

          <p className="mt-2">
            Employers may not use candidate data for unrelated marketing,
            distribution, or resale.
          </p>
        </div>

        {/* Section 5 */}
        <div>
          <h2 className="text-xl font-semibold mb-2 text-white/80">
            5. Acceptable Use
          </h2>

          <p className="mb-2">Users agree not to:</p>

          <ul className="list-disc list-inside space-y-1">
            <li>Use the App for illegal or unauthorized purposes</li>
            <li>
              Attempt to gain unauthorized access to the system or other
              accounts
            </li>
            <li>
              Upload harmful code or interfere with the platform’s operation
            </li>
            <li>Misrepresent their identity or qualifications</li>
          </ul>
        </div>

        {/* Section 6 */}
        <div>
          <h2 className="text-xl font-semibold mb-2 text-white/80">
            6. Platform Availability
          </h2>
          <p>
            We strive to ensure the App is available and functioning correctly.
            However, we do not guarantee uninterrupted access and may
            temporarily suspend the service for maintenance, updates, or
            security reasons.
          </p>
        </div>

        {/* Section 7 */}
        <div>
          <h2 className="text-xl font-semibold mb-2 text-white/80">
            7. Limitation of Liability
          </h2>
          <p>
            Eburon-jobs provides a platform to facilitate candidate evaluation,
            but we do not guarantee employment outcomes. We are not responsible
            for hiring decisions made by employers or for the accuracy of
            information provided by users.
          </p>

          <p className="mt-2">
            To the maximum extent permitted by law, we are not liable for any
            indirect or consequential damages resulting from the use of the App.
          </p>
        </div>

        {/* Section 8 */}
        <div>
          <h2 className="text-xl font-semibold mb-2 text-white/80">
            8. Account Suspension or Termination
          </h2>
          <p>
            We reserve the right to suspend or terminate accounts that violate
            these Terms or misuse the App. Users may also request deletion of
            their accounts at any time.
          </p>
        </div>

        {/* Section 9 */}
        <div>
          <h2 className="text-xl font-semibold mb-2 text-white/80">
            9. Changes to the Terms
          </h2>
          <p>
            We may update these Terms from time to time. If significant changes
            are made, users will be notified through the App or via email. The
            continued use of the App after such changes constitutes acceptance
            of the updated Terms.
          </p>
        </div>

        {/* Section 10 */}
        <div>
          <h2 className="text-xl font-semibold mb-2 text-white/80">
            10. Governing Law
          </h2>
          <p>
            These Terms are governed by and interpreted in accordance with the
            laws of Belgium. Any disputes arising from the use of the App shall
            be subject to the jurisdiction of the competent courts in Belgium.
          </p>
        </div>

        {/* Section 11 */}
        <div>
          <h2 className="text-xl font-semibold mb-2 text-white/80">
            11. Contact Information
          </h2>
          <p>If you have questions regarding these Terms, please contact:</p>

          <ul className="list-disc list-inside space-y-1 mt-2">
            <li>Email: mail@eburon.ai</li>
            <li>
              Address: Ariolas BV | Boterstraat 36, Ieper, Belgium | Jo Lernout
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TermsOfUse;
