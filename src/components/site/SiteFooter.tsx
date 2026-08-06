import Image from "next/image";
import Link from "next/link";
import {
  FiFacebook as Facebook,
  FiInstagram as Instagram,
  FiYoutube as Youtube,
} from "react-icons/fi";

export function SiteFooter() {
  return (
    <footer className="bg-forest-deep text-cream border-t border-cream/10">
      <div className="container-page py-16 md:py-20 grid grid-cols-1 md:grid-cols-12 gap-10">
        <div className="md:col-span-5">
          <Link href="/" className="flex items-center gap-3">
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
          </Link>
          <p className="mt-6 max-w-sm text-sm text-cream/60 leading-relaxed">
            A passionate group of Yakshagana enthusiasts dedicated to
            preserving, presenting, and promoting India&apos;s rich traditional
            art form Yakshagana across Germany and Europe
          </p>
        </div>

        <div className="md:col-span-3">
          <div className="eyebrow text-saffron/80">Explore</div>
          <ul className="mt-5 space-y-3 text-sm text-cream/80">
            <li>
              <Link
                href="/about"
                className="hover:text-saffron transition-colors"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                href="/our-journey"
                className="hover:text-saffron transition-colors"
              >
                Our Journey
              </Link>
            </li>
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
                href="/learn"
                className="hover:text-saffron transition-colors"
              >
                Learn
              </Link>
            </li>
          </ul>
        </div>

        <div className="md:col-span-4">
          <div className="eyebrow text-saffron/80">Contact</div>
          <ul className="mt-5 space-y-3 text-sm text-cream/80">
            <li>
              <Link
                href="/contact#booking"
                className="hover:text-saffron transition-colors"
              >
                Book a performance
              </Link>
            </li>
            <li>
              <a
                href="mailto:yakshamitrarugermany@gmail.com"
                className="hover:text-saffron"
              >
                yakshamitrarugermany@gmail.com
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/yakshamitrarugermany_e.v?igsh=MXRpZHNjYzIwcnQ4ZA=="
                className="flex items-center gap-2 hover:text-saffron"
              >
                <Instagram className="h-4 w-4" shrink-0 />{" "}
                <span>Instagram</span>
              </a>
            </li>
            <li>
              <a
                href="https://www.facebook.com/yakshamitrarugermany"
                className="flex items-center gap-2 hover:text-saffron"
              >
                <Facebook className="h-4 w-4 shrink-0" /> <span>Facebook</span>
              </a>
            </li>
            <li>
              <a
                href="https://youtube.com/@yakshamitrarugermany?si=pyfkxbeGN3Z47Gra"
                className="flex items-center gap-2 hover:text-saffron"
              >
                <Youtube className="h-4 w-4" shrink-0 /> <span>Youtube</span>
              </a>
            </li>
            <li>Yakshamitraru Germany e.V. - Germany</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-cream/10">
        <div className="container-page py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-cream/50">
          <span>
            © {new Date().getFullYear()} Yakshamitraru Germany e.V. All rights
            reserved.
          </span>
          <span className="eyebrow">Yakshagana in Europe · Since 2018</span>
        </div>
      </div>
    </footer>
  );
}
