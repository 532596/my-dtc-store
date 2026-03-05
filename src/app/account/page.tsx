import Link from "next/link";

export default function AccountPage() {
  return (
    <main className="min-h-screen bg-warm-white">
      <section className="mx-auto max-w-content px-6 py-section">
        <h1 className="text-3xl font-semibold text-foreground">Account</h1>
        <p className="mt-4 text-body text-warm-muted">Sign in or create an account.</p>
        <Link href="/" className="mt-8 inline-block text-accent hover:underline">Back to home</Link>
      </section>
    </main>
  );
}
