import Link from "next/link";

export function Logo({ inverse = false }: { inverse?: boolean }) {
  return (
    <Link className={`brand-mark ${inverse ? "brand-mark-inverse" : ""}`} href="/" aria-label="Veylo home">
      <span className="brand-symbol" aria-hidden="true">V</span>
      <span className="brand-word">VEYLO</span>
    </Link>
  );
}
