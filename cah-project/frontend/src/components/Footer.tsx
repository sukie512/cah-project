import Link from 'next/link';
import Image from 'next/image';
import { getFooter } from '@/lib/payload';

export default async function Footer() {
  const footer = await getFooter();

  return (
    <footer className="bg-white border-t border-black mt-16">
      {/* Main footer grid */}
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        {/* Logo */}
        <div className="col-span-2 md:col-span-1">
          <Link href="/">
            <Image
              src={footer.logo.url}
              alt={footer.logo.alt}
              width={200}
              height={40}
              className="h-10 w-auto"
            />
          </Link>
        </div>

        {/* Shop */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-widest mb-4">Shop</h3>
          <ul className="flex flex-col gap-2">
            {footer.shopLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm hover:underline">{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Info */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-widest mb-4">Info</h3>
          <ul className="flex flex-col gap-2">
            {footer.infoLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm hover:underline">{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Find Us */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-widest mb-4">Find Us</h3>
          <ul className="flex flex-col gap-2">
            {footer.findUsLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} target="_blank" rel="noopener noreferrer" className="text-sm hover:underline">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Email signup */}
      <div className="border-t border-black">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <h3 className="text-sm font-bold mb-3">Sign up and we&apos;ll let you know first when we do anything:</h3>
          <EmailForm />
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-black">
        <div className="max-w-6xl mx-auto px-6 py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex gap-4">
            {footer.socialLinks.map((s) => (
              <a key={s.platform} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.platform}>
                <Image src={s.iconUrl} alt={s.platform} width={24} height={24} className="h-6 w-6" />
              </a>
            ))}
          </div>
          <div className="flex flex-wrap gap-4 text-xs">
            <Link href="/terms-of-use" className="hover:underline">Terms of Use</Link>
            <Link href="/privacy-policy" className="hover:underline">Privacy Policy</Link>
            <Link href="/submission-terms" className="hover:underline">Submission Terms</Link>
          </div>
          <p className="text-xs text-gray-500">{footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
}

// Email form — client component inline
function EmailForm() {
  'use client';
  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="flex gap-0 max-w-sm"
    >
      <input
        type="email"
        placeholder="Email Address"
        className="flex-1 border border-black px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black"
        aria-label="Email address"
      />
      <button
        type="submit"
        className="bg-black text-white text-xs font-bold uppercase px-4 py-2 hover:bg-gray-900 transition-colors"
      >
        Sign Up
      </button>
    </form>
  );
}
