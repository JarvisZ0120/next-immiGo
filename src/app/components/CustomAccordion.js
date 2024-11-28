// CustomAccordion.js
import { useState } from 'react';

const CustomAccordion = ({ faqTranslations }) => {
    const [expanded, setExpanded] = useState(null);

    const handleToggle = (key) => {
        setExpanded(expanded === key ? null : key);
    };

    return (
        <div className="accordion border-t border-gray-300 rounded-lg max-w-4xl mx-auto">


            {faqTranslations.map((item, index) => (
                <div key={index} className="accordion-item border-b border-gray-300">
                    <div
                        className="accordion-header cursor-pointer p-4 bg-white flex justify-between items-center hover:bg-gray-200"
                        onClick={() => handleToggle(index)}
                    >
                        <h3 className="text-gray-600">{item.question}</h3>
                        <span
                            className={`transform transition-transform ${expanded === index ? 'rotate-90' : 'rotate-180'
                                }`}
                            style={{ color: 'gray' }}
                        >
                            &#x279C;
                        </span>
                    </div>
                    {expanded === index && (
                        <div className="accordion-content p-4 bg-white text-gray-600">
                            {item.answer}
                        </div>
                    )}
                </div>
            ))}



        </div>
    );
};

export default CustomAccordion;
