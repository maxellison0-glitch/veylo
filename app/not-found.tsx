import Link from "next/link";

export default function NotFound() {
  return <main className="simple-empty-page"><span className="eyebrow">404</span><h1>This page does not exist.</h1><p>The page may have moved, but the range is right where you left it.</p><Link className="button button-primary" href="/shop">Return to the shop</Link></main>;
}
