import './Footer.css';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer" role="contentinfo">
      <div className="container footer__inner">
        <div className="footer__brand">
          <span className="footer__brand-mark" aria-hidden="true">
            E
          </span>
          <div>
            <div className="footer__brand-title">Episcopal High School</div>
            <div className="footer__brand-sub">Teaching &amp; Learning</div>
          </div>
        </div>
        <p className="footer__meta">
          &copy; {year} Episcopal High School &middot; Alexandria, Virginia
        </p>
      </div>
    </footer>
  );
}
