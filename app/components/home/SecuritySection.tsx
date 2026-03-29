import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { ScrollReveal } from "~/components/motion/ScrollReveal";

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
    <section className="bg-black m-0 md:m-8 lg:m-16 rounded-none md:rounded-2xl py-20 sm:py-28">
      <div className="mx-auto max-w-2xl text-center px-6">
        <ScrollReveal>
          {/* Pulsing green dot badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-gray-300">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            SOC 2 Type II and GDPR compliant
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold tracking-tight text-white">
            Backed by enterprise-grade security and scale
          </h2>

          <p className="mt-5 text-lg text-gray-400 leading-relaxed max-w-xl mx-auto">
            Security isn&apos;t an add-on at Windmill &mdash; it&apos;s foundational. We&apos;re
            SOC 2 Type II certified and GDPR compliant.
          </p>

          <Link
            to="/trust"
            className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-white hover:text-gray-300 transition-colors"
          >
            Learn more
            <ArrowRight size={14} />
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
