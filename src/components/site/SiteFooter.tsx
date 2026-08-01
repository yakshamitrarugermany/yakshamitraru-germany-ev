import Image from "next/image";
import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="bg-forest-deep text-cream border-t border-cream/10">
      <div className="container-page py-16 md:py-20 grid grid-cols-1 md:grid-cols-12 gap-10">
        <div className="md:col-span-5">
          <div className="flex items-center gap-3">
            <span className="relative grid place-items-center h-11 w-11 rounded-full bg-forest overflow-hidden">
              <Image
                src="/images/logos/Yakshamitraru_e.V_Logo_Circle.png"
                alt="Yakshamitraru Germany"
                fill
                className="object-cover"
              />
            </span>
            <div className="leading-tight">
              <div className="font-serif text-lg">Yakshamitraru</div>
              <div className="eyebrow text-cream/60 text-[10px]">
                Germany e.V.
              </div>
            </div>
          </div>
          <p className="mt-6 max-w-sm text-sm text-cream/60 leading-relaxed">
            A registered German cultural association presenting Yakshagana
            dance-theatre on European stages.
          </p>
        </div>

        <div className="md:col-span-3">
          <div className="eyebrow text-saffron/80">Explore</div>
          <ul className="mt-5 space-y-3 text-sm text-cream/80">
            <li>
              <Link
                href="/#mission"
                className="hover:text-saffron transition-colors"
              >
                Tradition
              </Link>
            </li>
            <li>
              <Link
                href="/events"
                className="hover:text-saffron transition-colors"
              >
                Events
              </Link>
            </li>
            <li>
              <Link
                href="/artists"
                className="hover:text-saffron transition-colors"
              >
                Artists
              </Link>
            </li>
            <li>
              <Link
                href="/gallery"
                className="hover:text-saffron transition-colors"
              >
                Gallery
              </Link>
            </li>
            <li>
              <Link
                href="/contact#booking"
                className="hover:text-saffron transition-colors"
              >
                Book a performance
              </Link>
            </li>
          </ul>
        </div>

        <div className="md:col-span-4">
          <div className="eyebrow text-saffron/80">Contact</div>
          <ul className="mt-5 space-y-3 text-sm text-cream/80">
            <li>
              <a
                href="mailto:info@yakshamitraru.de"
                className="hover:text-saffron"
              >
                info@yakshamitraru.de
              </a>
            </li>
            <li>Yakshamitraru Germany e.V. · Germany</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-cream/10">
        <div className="container-page py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-cream/50">
          <span>
            © {new Date().getFullYear()} Yakshamitraru Germany e.V. All rights
            reserved.
          </span>
          <span className="eyebrow">Yakshagana · Since 1600s</span>
        </div>
      </div>
    </footer>
  );
}
