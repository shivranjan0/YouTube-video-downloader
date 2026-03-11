import React from 'react';

const DisclaimerPage: React.FC = () => {
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
        Disclaimer
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
          title: 'General Disclaimer',
          body: `The information provided by Audivio on this website is for general informational purposes only. All information is provided in good faith; however, we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the site.`,
        },
        {
          title: 'No Affiliation with YouTube or Google',
          body: `Audivio is an independent tool and is not affiliated with, endorsed by, sponsored by, or in any way connected to YouTube LLC, Google LLC, or any of their subsidiaries or affiliates. "YouTube" is a trademark of Google LLC. All trademarks belong to their respective owners.`,
        },
        {
          title: 'Personal Use Only',
          body: `Audivio is intended for personal, non-commercial use only. Users are solely responsible for ensuring that their use of this service complies with applicable laws and the Terms of Service of YouTube or any other platform. Downloading copyrighted content without authorization may be illegal in your jurisdiction.`,
        },
        {
          title: 'No Liability for Downloaded Content',
          body: `We are not responsible for the content of any videos or audio files downloaded through our service. Users download at their own risk. Audivio makes no guarantees about the quality, accuracy, or legality of any downloaded content.`,
        },
        {
          title: 'External Links Disclaimer',
          body: `Our website may contain links to external sites that are not provided or maintained by us. We do not guarantee the accuracy, relevance, timeliness, or completeness of any information on these external websites.`,
        },
        {
          title: 'Errors and Omissions Disclaimer',
          body: `While we have made every effort to ensure the accuracy of the information on this website, we are not responsible for any errors or omissions, or for the results obtained from the use of this information. The information is subject to change without notice.`,
        },
        {
          title: 'Fair Use',
          body: `Audivio believes in fair use and the right of individuals to access and use publicly available content for personal, educational, or research purposes. We encourage all users to be mindful of copyright laws in their respective countries and to use this tool responsibly.`,
        },
        {
          title: 'Contact',
          body: `If you have any questions about this Disclaimer, please contact us:\n\nEmail: info@audivio.com`,
        },
      ].map(({ title, body }) => (
        <div key={title} style={{ marginBottom: '2.5rem' }}>
          <h2
            style={{
              fontSize: '1.15rem',
              fontWeight: 700,
              color: '#FFF338',
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

export default DisclaimerPage;
