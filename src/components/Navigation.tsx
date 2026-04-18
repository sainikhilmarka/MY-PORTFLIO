"use client";

export default function Navigation() {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 px-4 py-3 sm:px-8 sm:py-6">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <div className="min-w-0 flex-1">
          <p className="text-[9px] uppercase tracking-[0.35em] text-white/45">
            Portfolio
          </p>
          <p className="mt-0.5 truncate text-xs font-semibold tracking-[0.18em] text-white sm:text-base">
            SAINIKHIL MARKA
          </p>
        </div>
        <a
          href="https://wa.me/918688541373?text=Hi%20Sainikhil,%20I%20saw%20your%20portfolio."
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-yellow-600 bg-[#d7b16a] px-3 py-2 text-xs font-semibold text-[#34161c] hover:bg-white sm:px-6 sm:text-sm"
        >
          GET IN TOUCH
        </a>
      </div>
    </header>
  );
}
