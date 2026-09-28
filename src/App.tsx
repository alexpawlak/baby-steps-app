import { useMemo, useState } from "react";
import { domainMeta, milestones } from "./data";
import type { Milestone, MilestoneStatus, Observation } from "./types";

type View = "today" | "milestones" | "timeline";

const statusMeta: Record<MilestoneStatus, { label: string; symbol: string }> = {
  observed: { label: "Observed", symbol: "✓" },
  emerging: { label: "Emerging", symbol: "◐" },
  not_yet: { label: "Not yet", symbol: "○" },
};

const storageKey = "baby-steps-prototype-observations";

function readObservations(): Observation[] {
  try {
    return JSON.parse(localStorage.getItem(storageKey) ?? "[]") as Observation[];
  } catch {
    return [];
  }
}

function dayCount() {
  const start = new Date("2026-08-01T12:00:00");
  const now = new Date();
  return Math.max(0, Math.floor((now.getTime() - start.getTime()) / 86_400_000));
}

function activityCards() {
  return milestones.filter((milestone) => milestone.activity).slice(0, 3);
}

export default function App() {
  const [view, setView] = useState<View>("today");
  const [observations, setObservations] = useState<Observation[]>(readObservations);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [note, setNote] = useState("");
  const [caregiver, setCaregiver] = useState<"Mum" | "Dad">("Mum");
  const days = dayCount();

  const latestByMilestone = useMemo(() => {
    return observations.reduce<Record<string, Observation>>((latest, observation) => {
      const current = latest[observation.milestoneId];
      if (!current || current.recordedAt < observation.recordedAt) latest[observation.milestoneId] = observation;
      return latest;
    }, {});
  }, [observations]);

  const observedCount = Object.values(latestByMilestone).filter((observation) => observation.status === "observed").length;
  const activeMilestone = milestones.find((milestone) => milestone.id === activeId) ?? null;

  function recordStatus(milestoneId: string, status: MilestoneStatus) {
    const observation: Observation = {
      milestoneId,
      status,
      note: note.trim() || undefined,
      recordedAt: new Date().toISOString(),
      recordedBy: caregiver,
    };
    const next = [...observations, observation];
    setObservations(next);
    localStorage.setItem(storageKey, JSON.stringify(next));
    setActiveId(null);
    setNote("");
  }

  return (
    <main className="app-shell">
      <section className="masthead" aria-label="Baby Steps overview">
        <div className="wordmark"><span className="wordmark-dot" aria-hidden="true" />baby steps</div>
        <div className="age-chip"><span aria-hidden="true">✦</span>{days} days together</div>
        <h1>A small record of<br /><em>growing, together.</em></h1>
        <p className="intro">A private family prototype for noticing the little things. Nothing here is a score.</p>
        <div className="progress-row" aria-label={`${observedCount} of ${milestones.length} milestones observed`}>
          <div className="progress-orbit"><span>{observedCount}</span><small>noticed</small></div>
          <p><strong>There is no rush.</strong><br />Notice what feels familiar, when it feels right.</p>
        </div>
      </section>

      <nav className="tabbar" aria-label="Baby Steps sections">
        {(["today", "milestones", "timeline"] as View[]).map((item) => (
          <button key={item} className={view === item ? "active" : ""} onClick={() => setView(item)}>
            {item === "today" ? "Today" : item === "milestones" ? "Milestones" : "Timeline"}
          </button>
        ))}
      </nav>

      {view === "today" && <Today onOpen={(id) => { setActiveId(id); setView("milestones"); }} />}
      {view === "milestones" && (
        <Milestones latest={latestByMilestone} onOpen={(id) => setActiveId(id)} />
      )}
      {view === "timeline" && <Timeline observations={observations} />}

      <aside className="care-note">
        <span aria-hidden="true">✦</span>
        <p><strong>For gentle noticing, not diagnosing.</strong> If anything worries you, share your observations with your child’s doctor.</p>
      </aside>

      {activeMilestone && (
        <ObservationSheet
          milestone={activeMilestone}
          note={note}
          caregiver={caregiver}
          onNoteChange={setNote}
          onCaregiverChange={setCaregiver}
          onClose={() => { setActiveId(null); setNote(""); }}
          onRecord={recordStatus}
        />
      )}
    </main>
  );
}

function Today({ onOpen }: { onOpen: (id: string) => void }) {
  const cards = activityCards();
  return (
    <section className="content-section entering">
      <div className="section-heading">
        <span>Today</span>
        <h2>Things to do<br /><em>together</em></h2>
        <p>Pick one small moment. That is enough.</p>
      </div>
      <div className="activity-stack">
        {cards.map((milestone, index) => (
          <article className={`activity-card activity-${index + 1}`} key={milestone.id}>
            <span className="activity-number">0{index + 1}</span>
            <p>{milestone.activity}</p>
            <button onClick={() => onOpen(milestone.id)}>Notice this <span aria-hidden="true">↗</span></button>
          </article>
        ))}
      </div>
      <p className="soft-note">These are gentle invitations, not a daily list to complete.</p>
    </section>
  );
}

function Milestones({ latest, onOpen }: { latest: Record<string, Observation>; onOpen: (id: string) => void }) {
  const domains = Object.keys(domainMeta) as Array<keyof typeof domainMeta>;
  return (
    <section className="content-section entering">
      <div className="section-heading compact-heading">
        <span>Around 2 months</span>
        <h2>Little things<br /><em>to notice</em></h2>
        <p>These are shared observations, never a pass or fail.</p>
      </div>
      <div className="milestone-groups">
        {domains.map((domain) => {
          const group = milestones.filter((milestone) => milestone.domain === domain);
          const meta = domainMeta[domain];
          return (
            <section className="domain-group" key={domain}>
              <h3><span className={`domain-mark ${meta.colour}`} aria-hidden="true">{meta.symbol}</span>{meta.label}</h3>
              {group.map((milestone) => {
                const observation = latest[milestone.id];
                return (
                  <button className="milestone-card" key={milestone.id} onClick={() => onOpen(milestone.id)}>
                    <span>{milestone.text}</span>
                    <span className={`status-pill ${observation?.status ?? "empty"}`}>
                      {observation ? <><b aria-hidden="true">{statusMeta[observation.status].symbol}</b>{statusMeta[observation.status].label}</> : "Notice"}
                    </span>
                  </button>
                );
              })}
            </section>
          );
        })}
      </div>
    </section>
  );
}

function Timeline({ observations }: { observations: Observation[] }) {
  const items = [...observations].sort((a, b) => b.recordedAt.localeCompare(a.recordedAt));
  return (
    <section className="content-section entering">
      <div className="section-heading compact-heading">
        <span>Our timeline</span>
        <h2>A trail of<br /><em>small moments</em></h2>
      </div>
      {items.length === 0 ? (
        <div className="empty-timeline"><span aria-hidden="true">✦</span><p>When you record a small observation, it will live here.</p></div>
      ) : (
        <ol className="timeline-list">
          {items.map((observation, index) => {
            const milestone = milestones.find((item) => item.id === observation.milestoneId);
            return <li key={`${observation.milestoneId}-${observation.recordedAt}-${index}`}>
              <span className={`timeline-symbol ${observation.status}`} aria-hidden="true">{statusMeta[observation.status].symbol}</span>
              <div><strong>{milestone?.text}</strong><p>{statusMeta[observation.status].label} · {observation.recordedBy} · {new Date(observation.recordedAt).toLocaleDateString(undefined, { month: "short", day: "numeric" })}</p>{observation.note && <em>“{observation.note}”</em>}</div>
            </li>;
          })}
        </ol>
      )}
    </section>
  );
}

function ObservationSheet({ milestone, note, caregiver, onNoteChange, onCaregiverChange, onClose, onRecord }: {
  milestone: Milestone;
  note: string;
  caregiver: "Mum" | "Dad";
  onNoteChange: (value: string) => void;
  onCaregiverChange: (value: "Mum" | "Dad") => void;
  onClose: () => void;
  onRecord: (id: string, status: MilestoneStatus) => void;
}) {
  const meta = domainMeta[milestone.domain];
  const [pendingStatus, setPendingStatus] = useState<MilestoneStatus | null>(null);
  return (
    <div className="sheet-backdrop" role="presentation" onMouseDown={onClose}>
      <section className="observation-sheet" role="dialog" aria-modal="true" aria-labelledby="observation-title" onMouseDown={(event) => event.stopPropagation()}>
        <div className="sheet-handle" />
        <button className="close-button" onClick={onClose} aria-label="Close observation panel">×</button>
        <span className={`sheet-domain ${meta.colour}`}>{meta.symbol} {meta.label}</span>
        <h2 id="observation-title">{milestone.text}</h2>
        <p className="sheet-prompt">What have you noticed? Choose the closest fit for today.</p>
        <div className="status-choices">
          {(Object.keys(statusMeta) as MilestoneStatus[]).map((status) => (
            <button key={status} className={`${status} ${pendingStatus === status ? "selected" : ""}`} aria-pressed={pendingStatus === status} onClick={() => setPendingStatus(status)}>
              <b aria-hidden="true">{statusMeta[status].symbol}</b><span>{statusMeta[status].label}</span>
            </button>
          ))}
        </div>
        <label className="note-field">A small note <span>(optional)</span><textarea value={note} onChange={(event) => onNoteChange(event.target.value)} placeholder="What did you notice?" maxLength={300} /></label>
        <fieldset className="caregiver-field"><legend>Who noticed it?</legend>{(["Mum", "Dad"] as const).map((name) => <label key={name}><input type="radio" checked={caregiver === name} onChange={() => onCaregiverChange(name)} />{name}</label>)}</fieldset>
        <button className="save-observation" disabled={!pendingStatus} onClick={() => pendingStatus && onRecord(milestone.id, pendingStatus)}>Save observation</button>
        <p className="prototype-note">Prototype only: observations stay in this browser until shared sync is built.</p>
      </section>
    </div>
  );
}
