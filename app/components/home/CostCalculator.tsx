import { useState, useMemo, useCallback } from "react";
import { cn } from "~/lib/cn";
import { Container } from "~/components/ui/Container";
import { ScrollReveal } from "~/components/motion/ScrollReveal";
import { CountUp } from "~/components/motion/CountUp";
import {
  UserCircle,
  Users,
  ArrowUp,
  UserCheck,
  Minus,
  Plus,
  ChevronDown,
  Settings,
} from "lucide-react";

/**
 * CostCalculator -- a full-featured interactive ROI calculator matching
 * the gowindmill.com live site. Two-column layout on desktop:
 * Left: interactive calculator card with toggle switches and green slider
 * Right: results card with dashed border
 *
 * Key assumptions (documented for transparency):
 * - Each review question takes ~15 minutes to write thoughtfully
 * - With Windmill: ~3 minutes per question (AI-assisted drafting)
 * - Savings scale with number of active review types and participants
 * - 2 review cycles per year
 * - Hourly cost derived from annual salary / 2080 work hours
 *
 * The savings are displayed with animated CountUp numbers that
 * re-trigger when any input changes (via React key prop).
 */

// ── Constants ──────────────────────────────────────────────────────────────

const CYCLES_PER_YEAR = 2;
const WORK_HOURS_PER_YEAR = 2080;

/** Minutes per question in a traditional process. */
const MINUTES_PER_QUESTION_TRADITIONAL = 15;

/** Minutes per question with Windmill. */
const MINUTES_PER_QUESTION_WINDMILL = 3;

const EMPLOYEE_SLIDER_MAX = 5000;

const EMPLOYEE_STOPS = [
  { value: 0, label: "0" },
  { value: 1250, label: "1,250" },
  { value: 2500, label: "2,500" },
  { value: 3750, label: "3,750" },
  { value: 5000, label: "5,000+" },
];

// ── Review type definitions ────────────────────────────────────────────────

interface ReviewType {
  id: string;
  label: string;
  description: string;
  icon: typeof UserCircle;
  /** Multiplier on participant count -- how many reviews per employee. */
  multiplier: (peers: number) => number;
}

const REVIEW_TYPES: ReviewType[] = [
  {
    id: "self",
    label: "Self Review",
    description: "Employees reflect on their own performance",
    icon: UserCircle,
    multiplier: () => 1,
  },
  {
    id: "peer",
    label: "Peer Review",
    description: "Colleagues provide feedback on each other",
    icon: Users,
    multiplier: (peers) => peers,
  },
  {
    id: "upward",
    label: "Upward Review",
    description: "Direct reports evaluate their managers",
    icon: ArrowUp,
    multiplier: () => 1,
  },
  {
    id: "manager",
    label: "Manager Review",
    description: "Managers assess their direct reports",
    icon: UserCheck,
    multiplier: () => 1,
  },
];

// ── Toggle Switch sub-component ──────────────────────────────────────────

/**
 * iOS-style toggle switch. Rounded pill shape, blue when active,
 * gray when inactive. Includes a sliding white circle indicator.
 */
function ToggleSwitch({
  checked,
  onChange,
  ariaLabel,
}: {
  checked: boolean;
  onChange: () => void;
  ariaLabel: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={ariaLabel}
      onClick={onChange}
      className={cn(
        "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full",
        "border-2 border-transparent transition-colors duration-200 ease-in-out",
        "focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2",
        checked ? "bg-sky-500" : "bg-gray-300"
      )}
    >
      <span
        className={cn(
          "pointer-events-none inline-block h-5 w-5 transform rounded-full",
          "bg-white shadow-lg ring-0 transition duration-200 ease-in-out",
          checked ? "translate-x-5" : "translate-x-0"
        )}
      />
    </button>
  );
}

// ── Stepper sub-component ──────────────────────────────────────────────────

/**
 * A simple numeric stepper with minus/plus buttons.
 * Used for "Questions per review" and "Peers per person" inputs.
 */
function Stepper({
  label,
  value,
  onChange,
  min = 1,
  max = 20,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm font-medium text-foreground">{label}</span>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => onChange(Math.max(min, value - 1))}
          disabled={value <= min}
          className={cn(
            "flex items-center justify-center w-8 h-8 rounded-lg border border-border",
            "text-foreground transition-colors cursor-pointer",
            "hover:bg-muted active:scale-95",
            "disabled:opacity-30 disabled:cursor-not-allowed"
          )}
          aria-label={`Decrease ${label}`}
        >
          <Minus className="w-4 h-4" />
        </button>
        <span className="w-8 text-center text-lg font-semibold font-display tabular-nums text-foreground">
          {value}
        </span>
        <button
          type="button"
          onClick={() => onChange(Math.min(max, value + 1))}
          disabled={value >= max}
          className={cn(
            "flex items-center justify-center w-8 h-8 rounded-lg border border-border",
            "text-foreground transition-colors cursor-pointer",
            "hover:bg-muted active:scale-95",
            "disabled:opacity-30 disabled:cursor-not-allowed"
          )}
          aria-label={`Increase ${label}`}
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────

export function CostCalculator() {
  const [employeeCount, setEmployeeCount] = useState(0);
  const [annualSalary, setAnnualSalary] = useState(120_000);
  const [activeReviews, setActiveReviews] = useState<Set<string>>(
    new Set(["self", "peer", "upward", "manager"])
  );
  const [questionsPerType, setQuestionsPerType] = useState<Record<string, number>>({
    self: 5,
    peer: 5,
    upward: 5,
    manager: 5,
  });
  const [peersPerPerson, setPeersPerPerson] = useState(3);
  const [advancedOpen, setAdvancedOpen] = useState(false);

  /** Toggle a review type on/off. */
  const toggleReview = useCallback((id: string) => {
    setActiveReviews((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  /** Format a raw number string as the user types into the salary field. */
  const handleSalaryChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value.replace(/[^0-9]/g, "");
      const num = parseInt(raw, 10);
      if (!isNaN(num)) {
        setAnnualSalary(Math.min(num, 1_000_000));
      } else {
        setAnnualSalary(0);
      }
    },
    []
  );

  // ── Savings calculation ────────────────────────────────────────────────

  const savings = useMemo(() => {
    if (employeeCount === 0 || activeReviews.size === 0) {
      return { hoursPerCycle: 0, yearlyHours: 0, yearlyCost: 0 };
    }

    const hourlyRate = annualSalary / WORK_HOURS_PER_YEAR;

    // Total time saved per employee per cycle, summing across active review types
    const minutesSavedPerQuestion =
      MINUTES_PER_QUESTION_TRADITIONAL - MINUTES_PER_QUESTION_WINDMILL;
    let minutesSavedPerEmployee = 0;
    for (const rt of REVIEW_TYPES) {
      if (activeReviews.has(rt.id)) {
        const reviews = rt.multiplier(peersPerPerson);
        const questions = questionsPerType[rt.id] ?? 5;
        minutesSavedPerEmployee += reviews * questions * minutesSavedPerQuestion;
      }
    }
    const hoursSavedPerEmployee = minutesSavedPerEmployee / 60;

    const hoursPerCycle = Math.round(employeeCount * hoursSavedPerEmployee);
    const yearlyHours = Math.round(hoursPerCycle * CYCLES_PER_YEAR);
    const yearlyCost = Math.round(yearlyHours * hourlyRate);

    return { hoursPerCycle, yearlyHours, yearlyCost };
  }, [
    employeeCount,
    annualSalary,
    activeReviews,
    questionsPerType,
    peersPerPerson,
  ]);

  /** A stable key that changes whenever any input changes, to re-trigger CountUp. */
  const animKey = `${employeeCount}-${annualSalary}-${[...activeReviews].join(",")}-${JSON.stringify(questionsPerType)}-${peersPerPerson}`;

  /** Compute slider fill percentage for the green track effect. */
  const sliderPercent = (employeeCount / EMPLOYEE_SLIDER_MAX) * 100;

  return (
    <section className="py-20 sm:py-28 bg-[var(--color-beige-section)]">
      <Container size="wide">
        {/* ── Header ───────────────────────────────────────────────── */}
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="display-headline-2 text-3xl sm:text-4xl text-foreground">
              See how much time you&rsquo;re wasting.
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Calculate the true cost of your current performance review
              process&mdash;and how much you could save.
            </p>
          </div>
        </ScrollReveal>

        {/* ── Two-column layout ─────────────────────────────────────── */}
        <ScrollReveal delay={0.15}>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">

            {/* ═══ LEFT COLUMN: Calculator Card (3/5 = 60%) ═══ */}
            <div className="lg:col-span-3">
              <div className="bg-background border border-border shadow-card rounded-xl p-6 sm:p-8">
                {/* Section header with cog icon */}
                <div className="flex items-center gap-2 mb-8">
                  <Settings className="w-4 h-4 text-muted-foreground" />
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Configure Your Review Cycle
                  </p>
                </div>

                {/* ── 1. Number of Employees ─────────────────────────── */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-3">
                    <label
                      htmlFor="employee-count-input"
                      className="text-sm font-semibold text-foreground"
                    >
                      Number of Employees
                    </label>
                    <input
                      id="employee-count-input"
                      type="number"
                      min={0}
                      max={EMPLOYEE_SLIDER_MAX}
                      step={10}
                      value={employeeCount}
                      onChange={(e) => {
                        const val = Math.min(
                          Math.max(0, Number(e.target.value)),
                          EMPLOYEE_SLIDER_MAX
                        );
                        setEmployeeCount(val);
                      }}
                      className={cn(
                        "w-24 px-3 py-1.5 rounded-lg border border-border bg-background",
                        "text-foreground font-semibold tabular-nums text-right text-base",
                        "focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500/50",
                        "transition-colors",
                        "[appearance:textfield] [&::-webkit-outer-spin-button]:opacity-100",
                        "[&::-webkit-inner-spin-button]:opacity-100"
                      )}
                    />
                  </div>

                  {/* Green slider track */}
                  <div className="relative">
                    <input
                      id="employee-slider"
                      type="range"
                      min={0}
                      max={EMPLOYEE_SLIDER_MAX}
                      step={10}
                      value={employeeCount}
                      onChange={(e) => setEmployeeCount(Number(e.target.value))}
                      style={{
                        background: `linear-gradient(to right, #10b981 0%, #10b981 ${sliderPercent}%, #e5e7eb ${sliderPercent}%, #e5e7eb 100%)`,
                      }}
                      className={cn(
                        "w-full h-2 rounded-full appearance-none cursor-pointer",
                        "[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5",
                        "[&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white",
                        "[&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-emerald-500",
                        "[&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:cursor-pointer",
                        "[&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5",
                        "[&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white",
                        "[&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-emerald-500",
                        "[&::-moz-range-thumb]:shadow-md [&::-moz-range-thumb]:cursor-pointer"
                      )}
                    />
                  </div>

                  {/* Quick-select stops */}
                  <div className="flex justify-between mt-2">
                    {EMPLOYEE_STOPS.map((stop) => (
                      <button
                        key={stop.value}
                        type="button"
                        onClick={() => setEmployeeCount(stop.value)}
                        className={cn(
                          "text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer",
                          employeeCount === stop.value &&
                            "text-foreground font-semibold"
                        )}
                      >
                        {stop.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* ── 2. Average Annual Salary ───────────────────────── */}
                <div className="mb-8">
                  <label
                    htmlFor="salary-input"
                    className="block text-sm font-semibold text-foreground mb-3"
                  >
                    Average Annual Salary
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">
                      $
                    </span>
                    <input
                      id="salary-input"
                      type="text"
                      inputMode="numeric"
                      value={annualSalary.toLocaleString()}
                      onChange={handleSalaryChange}
                      className={cn(
                        "w-full pl-8 pr-4 py-3 rounded-lg border border-border bg-background",
                        "text-foreground font-semibold tabular-nums text-base",
                        "focus:outline-none focus:ring-2 focus:ring-foreground/20 focus:border-foreground/40",
                        "transition-colors"
                      )}
                    />
                  </div>
                </div>

                {/* ── 3. Review Type Toggles ─────────────────────────── */}
                <div className="mb-8">
                  <h3 className="text-sm font-semibold text-foreground mb-3">
                    Review Types
                  </h3>
                  <div className="space-y-3">
                    {REVIEW_TYPES.map((rt) => {
                      const isActive = activeReviews.has(rt.id);
                      const Icon = rt.icon;
                      return (
                        <div key={rt.id}>
                          {/* Review type card with toggle */}
                          <div
                            className={cn(
                              "flex items-center gap-3 p-4 border transition-all",
                              isActive
                                ? "border-sky-200 bg-sky-50/50"
                                : "border-border bg-background",
                              isActive && activeReviews.has(rt.id)
                                ? "rounded-t-xl"
                                : "rounded-xl"
                            )}
                          >
                            {/* Icon */}
                            <div
                              className={cn(
                                "flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center",
                                isActive
                                  ? "bg-sky-100 text-sky-600"
                                  : "bg-muted text-muted-foreground"
                              )}
                            >
                              <Icon className="w-4 h-4" />
                            </div>

                            {/* Label and description */}
                            <div className="flex-1 min-w-0">
                              <p
                                className={cn(
                                  "text-sm font-semibold",
                                  isActive
                                    ? "text-foreground"
                                    : "text-muted-foreground"
                                )}
                              >
                                {rt.label}
                              </p>
                              <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                                {rt.description}
                              </p>
                            </div>

                            {/* iOS-style toggle switch */}
                            <ToggleSwitch
                              checked={isActive}
                              onChange={() => toggleReview(rt.id)}
                              ariaLabel={`Toggle ${rt.label}`}
                            />
                          </div>

                          {/* Per-type steppers shown when active */}
                          {isActive && (
                            <div className="border border-sky-200 border-t-0 bg-sky-50/30 rounded-b-xl px-4 py-3 space-y-3">
                              <Stepper
                                label="Questions"
                                value={questionsPerType[rt.id] ?? 5}
                                onChange={(v) =>
                                  setQuestionsPerType((prev) => ({
                                    ...prev,
                                    [rt.id]: v,
                                  }))
                                }
                                min={1}
                                max={20}
                              />
                              {rt.id === "peer" && (
                                <Stepper
                                  label="Peers per person"
                                  value={peersPerPerson}
                                  onChange={setPeersPerPerson}
                                  min={1}
                                  max={10}
                                />
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* ── Advanced Settings ─────────────────────────────── */}
                <div>
                  <button
                    type="button"
                    onClick={() => setAdvancedOpen((prev) => !prev)}
                    className={cn(
                      "flex items-center gap-2 text-sm font-semibold text-muted-foreground",
                      "hover:text-foreground transition-colors cursor-pointer"
                    )}
                  >
                    Advanced Settings
                    <ChevronDown
                      className={cn(
                        "w-4 h-4 transition-transform",
                        advancedOpen && "rotate-180"
                      )}
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* ═══ RIGHT COLUMN: Results Card (2/5 = 40%) ═══ */}
            <div className="lg:col-span-2">
              <div
                className={cn(
                  "border-2 border-dashed border-border rounded-xl p-6 sm:p-8",
                  "bg-muted/30 h-full flex flex-col"
                )}
              >
                {employeeCount === 0 ? (
                  /* ── Empty state ────────────────────────────────── */
                  <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
                    <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
                      <Settings className="w-6 h-6 text-muted-foreground" />
                    </div>
                    <p className="text-muted-foreground text-sm max-w-[200px]">
                      Enter your employee count to see potential savings
                    </p>
                  </div>
                ) : (
                  /* ── Calculated results ────────────────────────── */
                  <div className="flex-1 flex flex-col justify-center space-y-8">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                        Hours Saved Per Cycle
                      </p>
                      <div className="text-4xl sm:text-5xl font-bold font-display text-foreground">
                        <CountUp
                          key={`hours-${animKey}`}
                          to={savings.hoursPerCycle}
                          duration={1}
                        />
                      </div>
                    </div>

                    <div className="border-t border-border" />

                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                        Hours Saved Per Year
                      </p>
                      <div className="text-4xl sm:text-5xl font-bold font-display text-foreground">
                        <CountUp
                          key={`yearly-${animKey}`}
                          to={savings.yearlyHours}
                          duration={1}
                        />
                      </div>
                    </div>

                    <div className="border-t border-border" />

                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                        Annual Cost Savings
                      </p>
                      <div className="text-4xl sm:text-5xl font-bold font-display text-emerald-600">
                        <CountUp
                          key={`cost-${animKey}`}
                          to={savings.yearlyCost}
                          prefix="$"
                          duration={1}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
