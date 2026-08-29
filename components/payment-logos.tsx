export function PaymentLogos() {
  return (
    <div className="payment-logos" aria-label="Accepted payment methods">
      <svg viewBox="0 0 48 24" role="img" aria-label="Visa"><title>Visa</title><rect width="48" height="24" rx="3" fill="white"/><text x="24" y="16" textAnchor="middle" fontSize="12" fontWeight="700" fontStyle="italic" fill="#1a1f71">VISA</text></svg>
      <svg viewBox="0 0 38 24" role="img" aria-label="Mastercard"><title>Mastercard</title><rect width="38" height="24" rx="3" fill="white"/><circle cx="16" cy="12" r="7" fill="#eb001b"/><circle cx="22" cy="12" r="7" fill="#f79e1b" fillOpacity=".9"/></svg>
      <svg viewBox="0 0 62 24" role="img" aria-label="Apple Pay"><title>Apple Pay</title><rect width="62" height="24" rx="3" fill="white"/><path d="M13.8 8.1c.7-.8.6-1.7.6-2-.8 0-1.7.5-2.2 1.1-.5.5-.8 1.3-.7 2 .8.1 1.6-.4 2.3-1.1Zm.6 1.2c-1.2-.1-2.2.7-2.8.7-.6 0-1.5-.6-2.5-.6-1.3 0-2.5.8-3.2 1.9-1.4 2.3-.3 5.8 1 7.7.6.9 1.4 2 2.4 1.9.9 0 1.3-.6 2.5-.6s1.5.6 2.5.6c1.1 0 1.8-.9 2.4-1.9.7-1.1 1-2.2 1-2.3-.1 0-2-.8-2-3 0-1.9 1.6-2.8 1.7-2.9-.9-1.3-2.3-1.4-3-1.5Z" transform="scale(.65) translate(4 4)"/><text x="27" y="16" fontSize="11" fontWeight="600">Pay</text></svg>
      <svg viewBox="0 0 68 24" role="img" aria-label="Google Pay"><title>Google Pay</title><rect width="68" height="24" rx="3" fill="white"/><text x="7" y="16" fontSize="12" fontWeight="700" fill="#4285f4">G</text><text x="19" y="16" fontSize="11" fontWeight="600">Pay</text></svg>
      <svg viewBox="0 0 56 24" role="img" aria-label="Klarna"><title>Klarna</title><rect width="56" height="24" rx="3" fill="#ffb3c7"/><text x="28" y="16" textAnchor="middle" fontSize="10" fontWeight="700">Klarna.</text></svg>
      <svg viewBox="0 0 68 24" role="img" aria-label="Clearpay"><title>Clearpay</title><rect width="68" height="24" rx="3" fill="#b2fce4"/><path d="m8 12 4-4 4 4-4 4Zm8 0 4-4 4 4-4 4Z" fill="#111"/><text x="28" y="15.5" fontSize="8" fontWeight="700">clearpay</text></svg>
    </div>
  );
}
