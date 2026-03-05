import Link from "next/link";

export default function CartPage() {
  return (
    <main className="min-h-screen bg-warm-white">
      <section className="mx-auto max-w-content px-6 py-section">
        <h1 className="text-3xl font-semibold text-foreground">Cart</h1>
        <p className="mt-4 text-body text-warm-muted">Your cart is empty.</p>
        <Link href="/series" className="mt-8 inline-block text-accent hover:underline">Continue shopping</Link>
      </section>
    </main>
  );
}
