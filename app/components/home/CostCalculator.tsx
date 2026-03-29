import { useState, useMemo } from "react";
import { cn } from "~/lib/cn";
import { Container } from "~/components/ui/Container";
import { Card, CardContent } from "~/components/ui/Card";
import { Badge } from "~/components/ui/Badge";
import { ScrollReveal } from "~/components/motion/ScrollReveal";
import { CountUp } from "~/components/motion/CountUp";

/**
 * CostCalculator -- an interactive ROI calculator that demonstrates
 * the time savings of using Windmill for performance reviews.
 *
 * The user adjusts a slider for number of employees. The component
 * computes estimated hours saved per review cycle and dollar savings
 * based on average manager hourly cost.
 *
 * Key assumptions (documented for transparency):
 * - Traditional review: ~3 hours per employee per cycle
 * - With Windmill: ~0.5 hours per employee per cycle
 * - Average manager cost: $75/hour (fully-loaded)
 * - 2 review cycles per year
 *
 * The savings are displayed with animated CountUp numbers that
 * re-trigger when the slider value changes (via React key prop).
 */

const HOURS_TRADITIONAL = 3;
const HOURS_WINDMILL = 0.5;
const MANAGER_HOURLY_COST = 75;
const CYCLES_PER_YEAR = 2;

const SLIDER_STOPS = [25, 50, 100, 250, 500, 1000];

export function CostCalculator() {
  const [employeeCount, setEmployeeCount] = useState(100);

  const savings = useMemo(() => {
    const hoursSavedPerCycle = employeeCount * (HOURS_TRADITIONAL - HOURS_WINDMILL);
    const yearlyHours = hoursSavedPerCycle * CYCLES_PER_YEAR;
    const yearlyCost = yearlyHours * MANAGER_HOURLY_COST;
    return {
      hoursPerCycle: Math.round(hoursSavedPerCycle),
      yearlyHours: Math.round(yearlyHours),
      yearlyCost: Math.round(yearlyCost),
    };
  }, [employeeCount]);

  return (
    <section className="py-20 sm:py-28 bg-[var(--color-beige-section)]">
      <Container size="medium">
        <ScrollReveal>
          <div className="text-center mb-12">
            <Badge variant="brand" className="mb-4">
              ROI Calculator
            </Badge>
            <h2 className="display-headline-2 text-3xl sm:text-4xl text-foreground">
              See how much time you're wasting.
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Calculate the true cost of your current performance review process—and how much you could save.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <Card className="mx-auto max-w-2xl">
            <CardContent className="p-8 sm:p-10">
              {/* Slider */}
              <div className="mb-10">
                <div className="flex items-center justify-between mb-3">
                  <label
                    htmlFor="employee-slider"
                    className="text-sm font-semibold text-foreground"
                  >
                    Number of employees
                  </label>
                  <span className="text-2xl font-bold font-display text-foreground tabular-nums">
                    {employeeCount}
                  </span>
                </div>
                <input
                  id="employee-slider"
                  type="range"
                  min={10}
                  max={1000}
                  step={5}
                  value={employeeCount}
                  onChange={(e) => setEmployeeCount(Number(e.target.value))}
                  className={cn(
                    "w-full h-2 rounded-full appearance-none cursor-pointer",
                    "bg-border accent-foreground",
                    "[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5",
                    "[&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-foreground",
                    "[&::-webkit-slider-thumb]:shadow-card-hover [&::-webkit-slider-thumb]:cursor-pointer"
                  )}
                />
                {/* Quick-select stops */}
                <div className="flex justify-between mt-2">
                  {SLIDER_STOPS.map((stop) => (
                    <button
                      key={stop}
                      type="button"
                      onClick={() => setEmployeeCount(stop)}
                      className={cn(
                        "text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer",
                        employeeCount === stop && "text-foreground font-semibold"
                      )}
                    >
                      {stop}
                    </button>
                  ))}
                </div>
              </div>

              {/* Results grid */}
              <div className="grid grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-3xl sm:text-4xl font-bold font-display text-foreground">
                    <CountUp
                      key={`hours-${employeeCount}`}
                      to={savings.hoursPerCycle}
                      duration={1}
                    />
                  </div>
                  <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
                    Hours saved per cycle
                  </p>
                </div>
                <div>
                  <div className="text-3xl sm:text-4xl font-bold font-display text-foreground">
                    <CountUp
                      key={`yearly-${employeeCount}`}
                      to={savings.yearlyHours}
                      duration={1}
                    />
                  </div>
                  <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
                    Hours saved per year
                  </p>
                </div>
                <div>
                  <div className="text-3xl sm:text-4xl font-bold font-display text-foreground">
                    <CountUp
                      key={`cost-${employeeCount}`}
                      to={savings.yearlyCost}
                      prefix="$"
                      duration={1}
                    />
                  </div>
                  <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
                    Annual cost savings
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </ScrollReveal>
      </Container>
    </section>
  );
}
