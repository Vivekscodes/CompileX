import React from "react";
import { LANGUAGE_VERSIONS } from "../utils/language";

const LanguageSelector = ({ onSelect }) => {
    const languages = Object.entries(LANGUAGE_VERSIONS);
    const selectedLanguage = localStorage.getItem('selectedLanguage');

    return (
        <select name="languages" id="languages" value={selectedLanguage} onChange={(e) => onSelect(e.target.value)}>
            {languages.map(([lang, version]) => (
                <option key={lang} value={lang} >
                    {lang} ({version})
                </option>
            ))}
        </select>
    );
};

export default LanguageSelector;
