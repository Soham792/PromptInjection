import React from 'react';

export default function ResultDisplay({ apiResult, loading, error, defenseType }) {
  const isDetection = defenseType === 'llm_detection' || defenseType === 'known_answer';

  if (loading) {
    return (
      <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '300px' }}>
        <div className="spinner" style={{ width: '40px', height: '40px', borderWidth: '4px', marginBottom: '1rem' }} />
        <p style={{ color: 'var(--text-secondary)' }}>Querying Local LLM and executing defense checks...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card">
        <h3 className="card-title" style={{ color: 'var(--accent-attack)' }}>
          <span>❌</span> API Error
        </h3>
        <div className="error-alert">
          {error}
        </div>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          Please make sure your backend server is running on <code style={{ fontFamily: 'var(--font-mono)' }}>localhost:5001</code> and Ollama is properly configured.
        </p>
      </div>
    );
  }

  if (!apiResult) {
    return (
      <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '300px', borderStyle: 'dashed' }}>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', textAlign: 'center' }}>
          💡 Configuration complete. Click the "Run Attack" button to see the prompt injection and defense results.
        </p>
      </div>
    );
  }

  const {
    llm_response,
    attack_succeeded,
    detection_triggered,
    detection_reason
  } = apiResult;

  return (
    <div className="card">
      <h3 className="card-title">
        <span>📊</span> Results
      </h3>

      {/* Status Badges */}
      <div className="status-badge-container">
        {/* Main Attack Success Badge */}
        {attack_succeeded ? (
          <div className="status-badge success">
            💥 Attack Succeeded
          </div>
        ) : (
          <div className="status-badge defended">
            🛡️ Attack Failed / Defended
          </div>
        )}

        {/* Detection Status (only visible if detection defense chosen) */}
        {isDetection && (
          detection_triggered ? (
            <div className="status-badge success" style={{ backgroundColor: 'rgba(239, 68, 68, 0.15)', borderColor: 'var(--accent-attack)' }}>
              ⚠️ Injection Detected — Blocked
            </div>
          ) : (
            <div className="status-badge warning">
              ⚠️ Passed Detection — Attack Through
            </div>
          )
        )}
      </div>

      {/* Detection Explanation Box */}
      {isDetection && (
        <div className="detection-details" style={{ marginBottom: '1.5rem' }}>
          <div className="detection-details-title">
            🔍 Detection Diagnostics
          </div>
          <p style={{ color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
            <strong>Scanner Verdict:</strong> {detection_triggered ? "COMPROMISED" : "SAFE"}
          </p>
          <p style={{ color: 'var(--text-secondary)' }}>
            <strong>Details:</strong> {detection_reason}
          </p>
        </div>
      )}

      {/* LLM Response */}
      <div className="form-group" style={{ marginBottom: 0 }}>
        <label className="form-label" style={{ fontWeight: 600 }}>
          LLM Response Output
        </label>
        <div className="response-box" style={{ 
          borderLeft: `4px solid ${attack_succeeded ? 'var(--accent-attack)' : 'var(--accent-defense)'}` 
        }}>
          {llm_response}
        </div>
      </div>
    </div>
  );
}
