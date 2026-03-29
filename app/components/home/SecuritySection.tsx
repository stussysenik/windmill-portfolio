import { ScrollReveal } from "~/components/motion/ScrollReveal";
import { cdnImage } from "~/lib/images";

/**
 * SecuritySection -- a simple, centered dark section that communicates
 * Windmill's enterprise security posture at a glance.
 *
 * HR data is highly sensitive. This section addresses the #1 objection
 * enterprise buyers have ("Is my data safe?") with a brief, confident
 * statement rather than a wall of cards.
 */
export function SecuritySection() {
  return (
    <section className="relative bg-black m-0 md:m-8 lg:m-16 rounded-none md:rounded-2xl py-20 sm:py-28">
      {/* Background gradient image */}
      <img
        src={cdnImage("marketing/security-gradient.png", { width: 2880, height: 1737, fit: "cover", format: "webp" })}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="relative mx-auto max-w-2xl text-center px-6">
        <ScrollReveal>
          {/* Pulsing green dot badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-gray-300">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <a
              href="https://app.drata.com/trust/7bd6416b-c1ac-4c6c-afb4-a015fe83db6b"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              SOC 2 Type II and GDPR compliant
            </a>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold tracking-tight text-white">
            Backed by enterprise-grade security and scale
          </h2>

          <p className="mt-5 text-lg text-gray-400 leading-relaxed max-w-xl mx-auto">
            Security isn&apos;t an add-on at Windmill. It&apos;s integral to every
            layer of our system. We use industry-standard encryption and secure
            infrastructure to protect your data.
          </p>

        </ScrollReveal>
      </div>
    </section>
  );
}
