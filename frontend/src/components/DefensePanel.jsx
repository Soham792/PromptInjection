import React from 'react';

const DEFENSE_DESCRIPTIONS = {
  none: "No defense applied — raw compromised data sent to LLM",
  delimiters: "Wraps data in triple quotes to signal it should be treated as data only",
  sandwich: "Appends a reminder of the original task after the data",
  instructional: "Modifies the system instruction to warn the LLM about injection attempts",
  llm_detection: "Uses Gemini itself to detect if the data contains injected instructions",
  known_answer: "Plants a secret key instruction; checks if LLM still outputs it"
};

export default function DefensePanel({ defenseType, setDefenseType }) {
  return (
    <div className="card">
      <h3 className="card-title section-header-defense">
        <span>🛡️</span> Defense Configuration
      </h3>

      <div className="form-group" style={{ marginBottom: 0 }}>
        <label className="form-label">
          Defense Strategy
          <span className="tooltip-container">
            ℹ️
            <span className="tooltip-text">
              <strong>{defenseType.toUpperCase()}:</strong> {DEFENSE_DESCRIPTIONS[defenseType]}
            </span>
          </span>
        </label>
        <select
          className="form-select"
          value={defenseType}
          onChange={(e) => setDefenseType(e.target.value)}
        >
          <option value="none">None (No Defense)</option>
          <option value="delimiters">Delimiters Defense ('''data''')</option>
          <option value="sandwich">Sandwich Prevention</option>
          <option value="instructional">Instructional Prevention</option>
          <option value="llm_detection">LLM-Based Detection</option>
          <option value="known_answer">Known-Answer Detection</option>
        </select>
      </div>
    </div>
  );
}
