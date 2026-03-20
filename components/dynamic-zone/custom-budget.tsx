import type { CustomBudgetBlock } from "@/types";
import { LocaleLink } from "@/components/locale-link";

export function CustomBudget({
  heading,
  sub_heading,
  trust_signals,
  cta_text,
  cta_url,
}: Readonly<CustomBudgetBlock>) {
  const defaultHeading = "Have a specific budget in mind?";
  const defaultSubHeading =
    "Tell us your project and budget. We'll design the right team for you — no commitment required.";
  const defaultTrustSignals = [
    "No commitment",
    "Response within 48h",
    "Any budget considered",
  ];
  const defaultCtaText = "Submit your project & budget";
  const defaultCtaUrl = "#custom-project";

  const signals =
    trust_signals && trust_signals.length > 0
      ? trust_signals.map((s) => s.text ?? "")
      : defaultTrustSignals;

  return (
    <section
      id="custom-project"
      className="w-full border-b border-[rgba(55,50,47,0.12)] flex justify-center items-center"
    >
      <div className="flex-1 px-4 md:px-12 py-16 md:py-20 flex flex-col lg:flex-row justify-between items-start gap-10 lg:gap-16">
        {/* Left: text */}
        <div className="w-full lg:max-w-[420px] flex flex-col gap-4">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[rgba(55,50,47,0.16)] w-fit">
            <div className="w-1.5 h-1.5 rounded-full bg-[#37322F] opacity-60" />
            <span className="text-[#605A57] text-xs font-medium leading-4">
              Custom Model
            </span>
          </div>

          <h2 className="text-[#49423D] text-3xl md:text-4xl font-semibold leading-tight tracking-tight">
            {heading ?? defaultHeading}
          </h2>

          <p className="text-[#605A57] text-base leading-7">
            {sub_heading ?? defaultSubHeading}
          </p>

          {/* Trust signals */}
          <ul className="flex flex-col gap-2 mt-2">
            {signals.map((signal, i) => (
              <li key={i} className="flex items-center gap-2.5">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.5 4.5L6.5 11.5L3 8"
                    stroke="#37322F"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="text-[#49423D] text-sm font-medium">
                  {signal}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right: card */}
        <div className="w-full lg:flex-1 p-6 md:p-8 bg-white border border-[#E0DEDB] flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <p className="text-[rgba(55,50,47,0.60)] text-xs font-medium uppercase tracking-widest">
              How it works
            </p>
            <div className="flex flex-col gap-3 mt-3">
              {[
                { step: "01", text: "You describe your project and share your maximum budget." },
                { step: "02", text: "Our team analyses the scope and designs the right team composition." },
                { step: "03", text: "We send you a tailored proposal within 48 hours — no obligation." },
              ].map(({ step, text }) => (
                <div key={step} className="flex items-start gap-4">
                  <span className="text-[rgba(55,50,47,0.30)] text-sm font-medium font-serif w-6 shrink-0 pt-0.5">
                    {step}
                  </span>
                  <p className="text-[#49423D] text-sm leading-6">{text}</p>
                </div>
              ))}
            </div>
          </div>

          <LocaleLink
            href={cta_url ?? defaultCtaUrl}
            className="self-stretch px-4 py-3 bg-[#37322F] text-[#FBFAF9] text-sm font-medium text-center rounded-sm hover:bg-[#49423D] transition-colors duration-200"
          >
            {cta_text ?? defaultCtaText}
          </LocaleLink>

          <p className="text-[rgba(55,50,47,0.45)] text-xs text-center leading-5">
            We maintain a minimum 8% margin on all custom projects.
            <br />
            If your budget doesn&apos;t fit, we&apos;ll tell you honestly.
          </p>
        </div>
      </div>
    </section>
  );
}
