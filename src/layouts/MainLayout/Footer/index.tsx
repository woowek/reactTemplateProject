/**
 * Footer 컴포넌트
 */

import './Footer.css'

const footerLinks = [
  { id: 'about', text: 'About', href: '#about' },
  { id: 'privacy', text: 'Privacy', href: '#privacy' },
  { id: 'terms', text: 'Terms', href: '#terms' },
]

export const Footer = () => {
  return (
    <footer className="main-footer">
      <div className="footer-content">
        <p className="footer-text">
          © 2026 {import.meta.env.VITE_APP_TITLE}. All rights reserved.
        </p>
        <div className="footer-links">
          {footerLinks.map((link) => (
            <a key={link.id} href={link.href} className="footer-link">
              {link.text}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
