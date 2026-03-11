import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const sections = [
  {
    title: '1. Eligibility and Accounts',
    body: `a. Use of the Service is not permitted where prohibited by law. Without limiting the foregoing, you represent and warrant that you are not located in a country that is subject to international or applicable embargo, or a country that has been designated by international or applicable law as a "terrorist supporting" country, and that you are not listed on any applicable list of prohibited or restricted parties.

b. You must be at least eighteen (18) years of age to use the Service. If you are under eighteen (18) years old, you are not permitted to use the Service and must immediately cease using it, regardless of parental authorization.

c. You may be required, from time to time and in our discretion, to create an account with us (an "Account") to use parts of the Service to its fullest extent. In such cases:
  • You represent and warrant that all information you provide to us is complete and accurate.
  • You shall update such information when it changes or when we request.
  • You acknowledge that we may also access, with your permission, personally identifiable information through a third-party or other means based on the permissions you provide.
  • You shall not use another person or entity's Account without authorization.
  • You shall be solely responsible for maintaining the confidentiality of your Account and for all activities that occur under it.
  • You shall notify us immediately of any breach of security or unauthorized use of your Account.

d. The consideration for your acceptance of these Terms is that we are providing you the Grant of Use pursuant to Section 2. You acknowledge and agree that this consideration is adequate and that you have received the same upon use of the Service.`,
  },
  {
    title: '2. Grant of Use',
    body: `We grant you a non-exclusive, non-transferable, and limited right to access, non-publicly display, and use the Service, including all content available therein (the "Content") on your computer or mobile device, consistent with these Terms and subject to the restrictions of the Service. You may only access and use the Service for your personal and noncommercial use.

This grant is terminable by us at will for any reason and at our sole discretion, with or without prior notice. Upon termination, we may, but shall not be obligated to: (i) delete or deactivate your Account, (ii) block your email and/or IP addresses or otherwise terminate your use of the Service, and/or (iii) remove and/or delete any of your User Submissions.

You agree not to use or attempt to use the Service after said termination. Upon termination, the grant of your right to use the Service shall terminate, but all other portions of these Terms shall survive.`,
  },
  {
    title: '3. Intellectual Property',
    body: `a. The Content — excluding User Submissions and Third Party Content, but including text, graphical images, photographs, music, video, software, scripts, source code, and trademarks, service marks and logos (collectively "Proprietary Materials") — is owned by and/or licensed to Audivio. All Proprietary Materials are subject to copyright, trademark, and/or other rights under applicable laws, including domestic, foreign, and international conventions. We reserve all rights over our Proprietary Materials.

Except as otherwise explicitly permitted, you agree not to copy, modify, publish, transmit, distribute, participate in the transfer or sale of, create derivative works of, or in any other way exploit, in whole or in part, any Proprietary Materials or Third Party Content.`,
  },
  {
    title: '4. User Submissions',
    body: `a. You are entirely responsible for any and all materials you download, upload, submit, transmit, create, modify, or otherwise make available via the Service, including any sound files, video files, or photographs (collectively, "User Submissions"). User Submissions cannot always be withdrawn.

b. You shall be solely responsible for any and all consequences of your User Submissions. For any User Submission, you affirm, represent and warrant that:
  i. You own or have the necessary licenses, permissions, rights, or consents to use it; and
  ii. You have written consent from each identifiable individual in the User Submission.

c. You agree not to submit material that:
  i. Is copyrighted or otherwise subject to third-party proprietary rights, unless you have explicit permission;
  ii. Is obscene, vulgar, illegal, defamatory, fraudulent, libelous, harmful, harassing, abusive, threatening, hateful, or otherwise inappropriate;
  iii. Depicts illegal activities or promotes physical harm against any person or group;
  iv. Impersonates any person or entity;
  v. Encourages criminal offense or creates liability; or
  vi. Is spam or unsolicited advertising.

We claim no ownership over User Submissions. You irrevocably grant us a world-wide, non-exclusive, royalty-free, perpetual, sublicenseable license to reproduce, perform, display, distribute, adapt, modify, publish, and otherwise exploit User Submissions for any purpose contemplated by the Service. You also waive any claims of moral rights with respect to User Submissions.`,
  },
  {
    title: '5. Content on the Service',
    body: `a. When using the Service, you will be exposed to content from a variety of sources, including Third Party Content. We do not control or are responsible for Third Party Content. You understand you may be exposed to content that is inaccurate, offensive, or objectionable and you waive any legal or equitable rights or remedies against us with respect thereto.

b. We claim no ownership or control over Third Party Content.

c. We assume no responsibility for monitoring the Service for inappropriate content or conduct. If we choose, in our sole discretion, to monitor such content, we assume no responsibility for it and have no obligation to modify or remove it.

d. All Content is provided to you "AS-IS" for your personal use only. You shall not use, copy, reproduce, distribute, transmit, broadcast, display, sell, license, or otherwise exploit any Content without prior written consent of its owner.

e. We may at our sole discretion refuse to publish, remove, or block access to any Content for any reason, with or without notice.`,
  },
  {
    title: '6. User Conduct',
    body: `You represent and warrant that all information provided by you is accurate and current and that you have all necessary rights to agree to these Terms and perform the acts required of you.

b. You expressly authorize us to monitor, record, and log any of your activities on the Service.

c. As a condition of your use of the Service, you agree:
  i. Not to use the Service for any unlawful purpose;
  ii. To abide by all applicable local, state, national, and international laws;
  iii. Not to use the Service in a way that exposes us to criminal or civil liability;
  iv. That you are solely responsible for all acts and omissions from your use of the Service;
  v. Not to use any automated means, including robots or crawlers, to download, monitor, or use data or Content from the Service;
  vi. Not to impose an unreasonable or disproportionately large load on our technology infrastructure;
  vii. Not to stalk, harass, or threaten anyone on or through the Service;
  viii. Not to forge headers or otherwise manipulate identifiers to disguise the origin of any information you transmit;
  ix. Not to disable, circumvent, or interfere with security-related features of the Service;
  x. Not to post software viruses or any computer code designed to interrupt, destroy, limit, or monitor any system;
  xi. Not to license, sublicense, sell, resell, transfer, assign, or commercially exploit the Service or any Content to any third party;
  xii. Not to "frame" or "mirror" the Service; and
  xiii. Not to reverse engineer any portion of the Service.

Any violation of these Terms shall subject you to liquidated damages of ten thousand dollars ($10,000) per violation. In the event a violation results in legal action or physical/emotional harm to any party, you shall be subject to $150,000 per violation.`,
  },
  {
    title: '7. Services on the Service',
    body: `a. Audivio is a general-purpose media tool that allows you to access publicly available media on supported platforms and, among other things, download and/or convert that media. The Service may only be used in accordance with applicable law. We do not encourage, condone, induce, or allow any use of the Service that may be in violation of any law. We explicitly prohibit the use of the Service to download any content in violation of copyright laws.

b. To the extent that we may store any User Submissions, we do not intend to store any User Submissions for longer than a transitory period to give users the chance to download their content.`,
  },
  {
    title: '8. Fees',
    body: `a. We reserve the right to charge for any or all of our services and to change our fees from time to time in our sole discretion. If at any time we terminate your rights to use the Service because of a breach of these Terms, you shall not be entitled to a refund of any portion of your fees. In all other respects, such fees shall be governed by additional rules, terms, conditions, or agreements posted on the Service.`,
  },
  {
    title: '9. Privacy Policy',
    body: `a. Audivio maintains a separate Privacy Policy and your assent to these Terms also signifies that you have read and understand the Privacy Policy. We reserve the right to amend the Privacy Policy at any time by posting amendments to the Service. Your continued use of the Service following such amendments constitutes your acknowledgement of the updated Privacy Policy.

b. You acknowledge that we may collect and use technical data and related information, including technical information about your device, system and application software, and peripherals, to facilitate the provision of updates to the Service.

c. You understand, acknowledge, and agree that we may access, preserve, and disclose your information if required to do so by law or in a good faith belief that such access, preservation, or disclosure is reasonably necessary.`,
  },
  {
    title: '10. Copyright Claims',
    body: `a. Audivio respects the intellectual property rights of others. You may not infringe the copyright, trademark, or other proprietary rights of any party. We may in our sole discretion remove any Content we have reason to believe violates intellectual property rights of others and may terminate your use of the Service if you submit such Content.

b. Repeat Infringer Policy: Any user for whose material we receive three good-faith and effective complaints within any contiguous six-month period will have their grant of use terminated.

c. If you believe that any of your copyrighted material is being infringed on the Service, please contact us at: dmca@audivio.com

d. An effective notification of claimed infringement must include:
  i. Identification of the copyrighted work believed to be infringed;
  ii. Identification of the material believed to be infringing and its location (e.g., a URL);
  iii. Your contact information (address, telephone number, email);
  iv. A statement of good faith belief that the use is not authorized by you, your agent, or the law;
  v. A statement under penalty of perjury that you are the owner or authorized to act on behalf of the owner; and
  vi. Your physical or electronic signature.

e. Counter-notifications may be submitted to the same contact address and must include your signature, identification of the removed material, a statement under penalty of perjury of good faith belief the material was removed in error, your contact information, and your consent to applicable jurisdiction.`,
  },
  {
    title: '11. Modification of These Terms',
    body: `a. We reserve the right to amend these Terms at any time by posting the amended Terms to the Service. No other notification will be made to you about any amendments. YOUR CONTINUED USE OF THE SERVICE FOLLOWING SUCH AMENDMENTS WILL CONSTITUTE YOUR ACCEPTANCE OF SUCH AMENDMENTS, REGARDLESS OF WHETHER YOU HAVE ACTUALLY READ THEM.`,
  },
  {
    title: '12. Indemnification and Release',
    body: `a. You agree to indemnify Audivio and hold us harmless from any and all damages and third-party claims and expenses, including attorney's fees, arising from your use of the Service and/or from your breach of these Terms.

b. In the event that you have a dispute with one or more other users or any third parties, you hereby release Audivio, its officers, employees, agents, and successors from claims, demands, and damages (actual and consequential) of every kind or nature arising out of or in any way related to such disputes and/or the Service.`,
  },
  {
    title: '13. Disclaimer of Warranties and Limitations of Liabilities',
    body: `READ THIS SECTION CAREFULLY AS IT LIMITS OUR LIABILITY TO THE MAXIMUM EXTENT PERMITTED UNDER APPLICABLE LAW.

The Service is provided "AS-IS" without any warranty or condition, express, implied, or statutory. We specifically disclaim any implied warranties of merchantability, fitness for a particular purpose, non-infringement, information accuracy, integration, interoperability, or quiet enjoyment.

UNDER NO CIRCUMSTANCES SHALL AUDIVIO BE LIABLE FOR DIRECT, INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR EXEMPLARY DAMAGES RESULTING FROM ANY ASPECT OF YOUR USE OF THE SERVICE, WHETHER SUCH DAMAGES ARISE FROM (i) YOUR USE, MISUSE, OR INABILITY TO USE THE SERVICE, (ii) YOUR RELIANCE ON ANY CONTENT ON THE SERVICE, (iii) THE INTERRUPTION, SUSPENSION, MODIFICATION, OR COMPLETE DISCONTINUANCE OF THE SERVICE, OR (iv) THE TERMINATION OF SERVICE BY US.

ANY CONTENT OBTAINED THROUGH THE USE OF THE SERVICE IS OBTAINED AT YOUR OWN DISCRETION AND RISK. YOU ARE SOLELY RESPONSIBLE FOR ANY DAMAGE TO YOUR COMPUTER SYSTEM OR DEVICE OR LOSS OF DATA.

IN NO CASE SHALL THE MAXIMUM LIABILITY OF AUDIVIO ARISING FROM OR RELATING TO YOUR USE OF THE SERVICE EXCEED $100.`,
  },
  {
    title: '14. Disputes',
    body: `a. To the maximum extent permitted by law, these Terms, and any claim, cause of action, or dispute between you and Audivio, are governed by applicable law without regard to conflict of law provisions. You agree to submit and consent to the jurisdiction of the appropriate courts for any such dispute.

b. YOU AGREE THAT YOU MAY BRING CLAIMS ONLY IN YOUR INDIVIDUAL CAPACITY AND NOT AS A PLAINTIFF OR CLASS MEMBER IN ANY PURPORTED CLASS OR REPRESENTATIVE ACTION.

c. You hereby agree that as part of the consideration for these Terms, you are waiving any right to a trial by jury for any dispute arising from or relating to these Terms or the Service.`,
  },
  {
    title: '15. General Terms',
    body: `(a) These Terms, as amended from time to time, constitute the entire agreement between you and Audivio and supersede all prior agreements and may not be modified without our written consent.

(b) Our failure to enforce any provision of these Terms will not be construed as a waiver of any provision or right.

(c) If any part of these Terms is determined to be invalid or unenforceable pursuant to applicable law, the invalid provision will be deemed superseded by a valid, enforceable provision that most closely matches the intent of the original provision, and the remainder of the agreement shall continue in effect.

(d) These Terms are not assignable, transferable, or sub-licensable by you except with our prior written consent, but may be assigned or transferred by us without restriction.

(e) You agree that we may provide you with notices by email, regular mail, or postings to the Service.

(f) The section titles in these Terms are for convenience only and have no legal or contractual effect.

(g) As used in these Terms, the term "including" is illustrative and not limitative.

(h) If this agreement is translated and executed in any language other than English and there is any conflict between the translation and the English version, the English version shall control.`,
  },
];

const TermsPage: React.FC = () => {
  const year = new Date().getFullYear();
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div style={{ maxWidth: '860px', margin: '0 auto', padding: '8rem 1.5rem 6rem' }}>
      {/* Header */}
      <div
        style={{
          marginBottom: '3rem',
          borderBottom: '1px solid rgba(255,255,255,0.07)',
          paddingBottom: '2rem',
        }}
      >
        <span
          style={{
            display: 'inline-block',
            padding: '0.3rem 0.85rem',
            borderRadius: '9999px',
            background: 'rgba(255,103,231,0.08)',
            border: '1px solid rgba(255,103,231,0.2)',
            fontSize: '0.7rem',
            fontWeight: 700,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: '#FF67E7',
            marginBottom: '1rem',
          }}
        >
          Legal
        </span>

        <h1
          style={{
            fontSize: 'clamp(2rem, 4vw, 2.75rem)',
            fontWeight: 900,
            letterSpacing: '-0.02em',
            marginBottom: '0.4rem',
          }}
        >
          Terms of Use
        </h1>
        <p
          style={{ color: 'rgba(255,255,255,0.28)', fontSize: '0.875rem', marginBottom: '1.25rem' }}
        >
          Last updated: March 11, {year}
        </p>

        {/* Intro block */}
        <div
          style={{
            background: 'rgba(255,103,231,0.05)',
            border: '1px solid rgba(255,103,231,0.12)',
            borderRadius: '14px',
            padding: '1.5rem 1.75rem',
          }}
        >
          <p
            style={{
              color: 'rgba(255,255,255,0.55)',
              fontSize: '0.93rem',
              lineHeight: 1.8,
              margin: 0,
            }}
          >
            Please review these Terms and Conditions carefully before using Audivio, including our
            website (<strong style={{ color: '#fff' }}>audivio.com</strong>) and the Audivio
            application. This document ("Terms") states the conditions upon which{' '}
            <strong style={{ color: '#fff' }}>Audivio</strong> ("we" or "us") provides service to
            you on its website, applications, and related services (collectively, the "Service"). As
            used in this document, the terms "you" or "your" refer to you, any entity you represent,
            your or its representatives, successors, assigns, affiliates, and any of your or their
            devices.
          </p>
          <p
            style={{
              color: 'rgba(255,255,255,0.55)',
              fontSize: '0.93rem',
              lineHeight: 1.8,
              margin: '1rem 0 0',
            }}
          >
            By visiting, accessing, using, downloading, copying, installing, and/or joining
            (collectively "using") the Service, you express your understanding and acceptance of
            these Terms.{' '}
            <strong style={{ color: '#FF67E7' }}>
              If you do not agree, cease using the Service immediately.
            </strong>
          </p>
          <p
            style={{
              color: 'rgba(255,255,255,0.4)',
              fontSize: '0.875rem',
              lineHeight: 1.8,
              margin: '1rem 0 0',
              fontStyle: 'italic',
            }}
          >
            These Terms include liability limitations and legal disclaimers that limit our
            liabilities. Your use of the Service is at your own risk.
          </p>
        </div>
      </div>

      {/* Accordion sections */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
        {sections.map((sec, i) => {
          const isOpen = open === i;
          return (
            <div
              key={i}
              style={{
                background: isOpen ? '#111120' : 'rgba(255,255,255,0.02)',
                border: `1px solid ${isOpen ? 'rgba(255,103,231,0.2)' : 'rgba(255,255,255,0.07)'}`,
                borderRadius: '14px',
                overflow: 'hidden',
                transition: 'border-color 0.25s, background 0.25s',
              }}
            >
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                style={{
                  width: '100%',
                  background: 'none',
                  border: 'none',
                  padding: '1.1rem 1.4rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '1rem',
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
              >
                <span
                  style={{
                    fontWeight: 700,
                    fontSize: '0.975rem',
                    color: isOpen ? '#FF67E7' : 'rgba(255,255,255,0.75)',
                  }}
                >
                  {sec.title}
                </span>
                <ChevronDown
                  size={17}
                  style={{
                    flexShrink: 0,
                    color: isOpen ? '#FF67E7' : 'rgba(255,255,255,0.25)',
                    transform: isOpen ? 'rotate(180deg)' : 'none',
                    transition: 'transform 0.25s, color 0.25s',
                  }}
                />
              </button>

              {isOpen && (
                <div style={{ padding: '0 1.4rem 1.4rem' }}>
                  <p
                    style={{
                      color: 'rgba(255,255,255,0.48)',
                      fontSize: '0.9rem',
                      lineHeight: 1.85,
                      whiteSpace: 'pre-line',
                      margin: 0,
                    }}
                  >
                    {sec.body}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer note */}
      <div
        style={{
          marginTop: '3rem',
          padding: '1.25rem 1.5rem',
          borderRadius: '12px',
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <p
          style={{
            color: 'rgba(255,255,255,0.25)',
            fontSize: '0.82rem',
            lineHeight: 1.7,
            margin: 0,
          }}
        >
          For any questions regarding these Terms of Use, please contact us at{' '}
          <a href="mailto:legal@audivio.com" style={{ color: '#FF67E7', textDecoration: 'none' }}>
            legal@audivio.com
          </a>
          . These Terms shall be governed by and construed in accordance with applicable law.
        </p>
      </div>
    </div>
  );
};

export default TermsPage;
