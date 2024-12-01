import React, { useState, useEffect } from "react";
import { LANGUAGE_VERSIONS } from "../utils/language";

const LanguageSelector = ({ onSelect }) => {
    const [selectedLanguage, setSelectedLanguage] = useState(
        localStorage.getItem("selectedLanguage") || Object.keys(LANGUAGE_VERSIONS)[0]
    );

    // Update localStorage and trigger the onSelect callback when the language changes
    const handleChange = (language) => {
        setSelectedLanguage(language);
        localStorage.setItem("selectedLanguage", language);
        onSelect(language);
    };

    return (
        <select
            name="languages"
            id="languages"
            value={selectedLanguage}
            onChange={(e) => handleChange(e.target.value)}
        >
            {Object.entries(LANGUAGE_VERSIONS).map(([lang, version]) => (
                <option key={lang} value={lang}>
                    {lang} ({version})
                </option>
            ))}
        </select>
    );
};

export default LanguageSelector;
