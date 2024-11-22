// CustomAccordion.js
import { useState } from 'react';

const CustomAccordion = () => {
    const [expanded, setExpanded] = useState(null);

    const handleToggle = (key) => {
        setExpanded(expanded === key ? null : key);
    };

    const content1 = "In the Express Entry (EE) system for Canadian immigration, the category with the most people typically is the Federal Skilled Worker Program (FSW).";
    const contenet2 = "If you're not receiving emails, they might be flagged as spam by your email provider, especially if you’re using Outlook. To fix this, consider whitelisting our email address in your spam settings or switching to a different email provider.";
    const contenet3 = "The EE data is directly from IRCC official website.";

    return (
        <div className="accordion border-t border-gray-300 rounded-lg max-w-4xl mx-auto">
            {/* 手风琴项 1 */}
            <div className="accordion-item border-b border-gray-300">
                <div
                    className="accordion-header cursor-pointer p-4 bg-white flex justify-between items-center hover:bg-gray-200"
                    onClick={() => handleToggle("1")}
                >
                    <h3 className="text-gray-600">Which category has the most people?</h3>
                    <span className={`transform transition-transform ${expanded === "1" ? "rotate-90" : "rotate-180"}`} style={{ color: "gray" }}>&#x279C;</span>
                </div>
                {expanded === "1" && <div className="accordion-content p-4 bg-white text-gray-600">{content1}</div>}
            </div>

            {/* 手风琴项 2 */}
            <div className="accordion-item border-b border-gray-300">
                <div
                    className="accordion-header cursor-pointer p-4 bg-white flex justify-between items-center hover:bg-gray-200"
                    onClick={() => handleToggle("2")}
                >
                    <h3 className="text-gray-600"> Why can't I receive emails?</h3>
                    <span className={`transform transition-transform ${expanded === "2" ? "rotate-90" : "rotate-180"}`} style={{ color: "gray" }}>&#x279C;</span>
                </div>
                {expanded === "2" && <div className="accordion-content p-4 bg-white text-gray-600">{contenet2}</div>}
            </div>

            {/* 手风琴项 3 */}
            <div className="accordion-item border-b border-gray-300">
                <div
                    className="accordion-header cursor-pointer p-4 bg-white flex justify-between items-center hover:bg-gray-200"
                    onClick={() => handleToggle("3")}
                >
                    <h3 className="text-gray-600">Where is the EE system data from?</h3>
                    <span className={`transform transition-transform ${expanded === "3" ? "rotate-90" : "rotate-180"}`} style={{ color: "gray" }}>&#x279C;</span>
                </div>
                {expanded === "3" && <div className="accordion-content p-4 bg-white text-gray-600">{contenet3}</div>}
            </div>
        </div>
    );
};

export default CustomAccordion;
