import { useState } from 'react';

const CustomAccordion = ({ faqTranslations }) => {
    const [expanded, setExpanded] = useState(null);

    const handleToggle = (key) => {
        setExpanded(expanded === key ? null : key);
    };

    return (
        <div className="overflow-hidden rounded-3xl border border-black/[0.06] bg-white shadow-apple divide-y divide-black/[0.06]">
            {faqTranslations.map((item, index) => (
                <div key={index}>
                    <button
                        type="button"
                        className="flex w-full cursor-pointer items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-[#fafafa] sm:px-6 sm:py-5"
                        onClick={() => handleToggle(index)}
                    >
                        <span className="text-[15px] font-medium text-[#1d1d1f]">{item.question}</span>
                        <span
                            className={`shrink-0 text-[#86868b] transition-transform duration-200 ${
                                expanded === index ? 'rotate-180' : ''
                            }`}
                            aria-hidden
                        >
                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </span>
                    </button>
                    {expanded === index && (
                        <div className="border-t border-black/[0.04] bg-[#fafafa] px-5 py-4 text-[15px] leading-relaxed text-[#6e6e73] sm:px-6 sm:py-5">
                            {item.answer}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default CustomAccordion;
