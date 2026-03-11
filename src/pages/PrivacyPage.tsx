import React from 'react';

const PrivacyPage: React.FC = () => {
  const year = new Date().getFullYear();
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '8rem 1.5rem 5rem' }}>
      <h1
        style={{
          fontSize: 'clamp(2rem, 4vw, 2.75rem)',
          fontWeight: 900,
          marginBottom: '0.5rem',
          letterSpacing: '-0.02em',
        }}
      >
        Privacy Policy
      </h1>
      <p
        style={{
          color: 'rgba(255,255,255,0.3)',
          fontSize: '0.875rem',
          marginBottom: '3rem',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          paddingBottom: '1.5rem',
        }}
      >
        Last updated: March 11, {year}
      </p>

      {[
        {
          title: '1. Introduction',
          body: `Welcome to Audivio ("we", "our", or "us"). This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website. Please read this policy carefully. If you disagree with its terms, please discontinue use of the site.`,
        },
        {
          title: '2. Information We Collect',
          body: `We do not require you to create an account or provide personal information to use our service. However, we may automatically collect certain technical data when you visit our site, including:\n\n• IP address (anonymized)\n• Browser type and version\n• Pages visited and time spent\n• Referring website\n• Device type and operating system\n\nThis data is collected via standard server logs and analytics tools solely to improve our service.`,
        },
        {
          title: '3. Cookies',
          body: `We use minimal cookies to ensure the proper functioning of our website. These may include session cookies that expire when you close your browser. We do not use cookies for advertising tracking or profiling. You may disable cookies in your browser settings, though some features of the site may not function correctly as a result.`,
        },
        {
          title: '4. How We Use Your Information',
          body: `Any technical information we collect is used solely to:\n\n• Monitor and improve website performance\n• Diagnose technical problems\n• Understand how users interact with our service\n• Ensure the security and integrity of our platform\n\nWe do not sell, trade, or rent any user information to third parties.`,
        },
        {
          title: '5. Third-Party Services',
          body: `Our website may use third-party services such as analytics providers (e.g., Google Analytics in anonymized mode). These services may collect anonymized usage data. We do not share personally identifiable information with any third party without your consent.`,
        },
        {
          title: '6. Data Retention',
          body: `We do not store any URLs submitted by users, downloaded video files, or personal data beyond the session. Downloaded content is processed on our servers temporarily and deleted immediately after the download is complete.`,
        },
        {
          title: "7. Children's Privacy",
          body: `Our service is not directed to children under the age of 13. We do not knowingly collect personal information from children. If you believe a child has provided us with personal information, please contact us immediately.`,
        },
        {
          title: '8. Changes to This Policy',
          body: `We reserve the right to update this Privacy Policy at any time. We will notify users of significant changes by updating the "Last updated" date at the top of this page. Continued use of the service after changes constitutes acceptance of the revised policy.`,
        },
        {
          title: '9. Contact Us',
          body: `If you have any questions about this Privacy Policy, please contact us at:\n\nEmail: privacy@audivio.com`,
        },
      ].map(({ title, body }) => (
        <div key={title} style={{ marginBottom: '2.5rem' }}>
          <h2
            style={{
              fontSize: '1.15rem',
              fontWeight: 700,
              color: '#0CECDD',
              marginBottom: '0.75rem',
            }}
          >
            {title}
          </h2>
          <p
            style={{
              color: 'rgba(255,255,255,0.55)',
              lineHeight: 1.8,
              fontSize: '0.95rem',
              whiteSpace: 'pre-line',
            }}
          >
            {body}
          </p>
        </div>
      ))}
    </div>
  );
};

export default PrivacyPage;
