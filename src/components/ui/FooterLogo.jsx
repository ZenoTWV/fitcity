import React from 'react';

const FooterLogo = ({ theme = 'dark' }) => {
  // Use white logos and apply grey filter for subtle, universal appearance
  // Grey works on both light and dark backgrounds
  const iconSrc = '/white_icon.svg';
  const wordmarkSrc = '/white_wordmark.svg';

  return (
    <>
      <style>{`
        .footer-credit {
          display: inline-block;
          text-decoration: none;
          position: relative;
        }

        .footer-credit__container {
          position: relative;
          width: 200px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        /* SL Icon - starts visible, fades on hover */
        .footer-credit__icon {
          position: absolute;
          height: 100%;
          width: auto;
        }

        .footer-credit__sl {
          height: 100%;
          width: auto;
          object-fit: contain;
          opacity: 0.4;
          transition: opacity 600ms cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        /* Wordmark - starts hidden, revealed on hover */
        .footer-credit__wordmark {
          position: absolute;
          height: 50%;
          width: auto;
          object-fit: contain;
          transform: scaleX(0);
          opacity: 0;
          transition: transform 600ms cubic-bezier(0.2, 0.8, 0.2, 1),
                      opacity 600ms cubic-bezier(0.2, 0.8, 0.2, 1);
          image-rendering: crisp-edges;
        }

        /* Hover state - show wordmark with subtle grey, hide SL */
        .footer-credit:hover .footer-credit__sl,
        .footer-credit:focus-visible .footer-credit__sl {
          opacity: 0;
        }

        .footer-credit:hover .footer-credit__wordmark,
        .footer-credit:focus-visible .footer-credit__wordmark {
          transform: scaleX(1);
          opacity: 0.5;
        }

        /* Reduced motion accessibility */
        @media (prefers-reduced-motion: reduce) {
          .footer-credit__wordmark,
          .footer-credit__sl {
            transition: none;
          }
          /* Show SL by default for reduced motion */
          .footer-credit__sl {
            opacity: 0.4;
          }
          .footer-credit__wordmark {
            transform: scaleX(0);
            opacity: 0;
          }
        }
      `}</style>
      <a
        href="https://summitlab.dev"
        className="footer-credit"
        aria-label="Made by Summit Labs"
        title="De website van FitCity is gerealiseerd door Summit Labs"
        data-theme={theme}
        target="_blank"
        rel="noreferrer"
      >
        <div className="footer-credit__container">
          {/* SL Icon (visible by default, fades on hover) */}
          <div className="footer-credit__icon">
            <img
              src={iconSrc}
              alt="SL"
              className="footer-credit__sl"
            />
          </div>

          {/* Wordmark (hidden, revealed on hover) */}
          <img
            src={wordmarkSrc}
            alt="Summit Labs"
            className="footer-credit__wordmark"
          />
        </div>
      </a>
    </>
  );
};

export default FooterLogo;
