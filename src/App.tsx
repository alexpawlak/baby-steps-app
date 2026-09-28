import { useState } from "react";
import { birthDate, domainMeta, milestones } from "./data";
import type { Checks, Milestone } from "./types";

const storageKey = "baby-steps-checks";
const legacyStorageKey = "baby-steps-prototype-observations";

function readChecks(): Checks {
  try {
    const saved = localStorage.getItem(storageKey);
    if (saved) return JSON.parse(saved) as Checks;
    // Carry over "observed" entries from the earlier tabbed prototype.
    const legacy = JSON.parse(localStorage.getItem(legacyStorageKey) ?? "[]") as Array<{ milestoneId: string; status: string; recordedAt: string }>;
    return legacy.reduce<Checks>((checks, item) => {
      if (item.status === "observed") checks[item.milestoneId] = item.recordedAt;
      else delete checks[item.milestoneId];
      return checks;
    }, {});
  } catch {
    return {};
  }
}

function localDay(date: Date) {
  return Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
}

function ageInDays(at: Date) {
  const [year, month, day] = birthDate.split("-").map(Number);
  return Math.max(0, Math.round((localDay(at) - Date.UTC(year, month - 1, day)) / 86_400_000));
}

function formatAge(days: number) {
  if (days < 14) return `${days} ${days === 1 ? "day" : "days"}`;
  return `${Math.floor(days / 7)} weeks`;
}

function formatRange({ fromDays, toDays }: Milestone) {
  if (fromDays === 0 && toDays === 7) return "First week";
  const from = fromDays === 0 ? "Birth" : `${fromDays / 7}`;
  return `${from}–${toDays / 7} weeks`;
}

type Timing = { label: string; tone: "now" | "soon" | "late" | "early" | "ontime" };

function openTiming(milestone: Milestone, age: number): Timing {
  if (age < milestone.fromDays) return { label: `In ${formatAge(milestone.fromDays - age)}`, tone: "soon" };
  if (age > milestone.toDays) return { label: "Past usual range", tone: "late" };
  return { label: "Now", tone: "now" };
}

function checkedTiming(milestone: Milestone, age: number): Timing {
  if (age < milestone.fromDays) return { label: "Early", tone: "early" };
  if (age > milestone.toDays) return { label: "Later", tone: "late" };
  return { label: "On time", tone: "ontime" };
}

export default function App() {
  const [checks, setChecks] = useState<Checks>(readChecks);
  const age = ageInDays(new Date());

  const open = milestones
    .filter((milestone) => !checks[milestone.id])
    .sort((a, b) => a.fromDays - b.fromDays || a.toDays - b.toDays);
  const done = milestones
    .filter((milestone) => checks[milestone.id])
    .sort((a, b) => checks[b.id].localeCompare(checks[a.id]));

  function save(next: Checks) {
    setChecks(next);
    try {
      localStorage.setItem(storageKey, JSON.stringify(next));
    } catch {
      // Storage unavailable: keep the in-memory state.
    }
  }

  function check(id: string) {
    save({ ...checks, [id]: new Date().toISOString() });
  }

  function uncheck(id: string) {
    const { [id]: _removed, ...rest } = checks;
    save(rest);
  }

  return (
    <main className="app-shell">
      <section className="masthead" aria-label="Baby Steps overview">
        <div className="wordmark"><span className="wordmark-dot" aria-hidden="true" />baby steps</div>
        <div className="age-chip"><span aria-hidden="true">✦</span>{formatAge(age)} old</div>
        <h1>A small record of<br /><em>growing, together.</em></h1>
        <div className="progress-row" aria-label={`${done.length} of ${milestones.length} milestones checked`}>
          <div className="progress-orbit"><span>{done.length}</span><small>of {milestones.length}</small></div>
          <p><strong>Tap a milestone when you notice it.</strong><br />Every baby has their own pace.</p>
        </div>
      </section>

      <section className="content-section">
        <h2 className="list-heading">To notice <span>{open.length}</span></h2>
        {open.length === 0 ? (
          <p className="empty-note">Everything here is checked. Lovely.</p>
        ) : (
          <ul className="milestone-list">
            {open.map((milestone) => {
              const timing = openTiming(milestone, age);
              return (
                <li key={milestone.id}>
                  <button className="milestone-card" onClick={() => check(milestone.id)} aria-label={`Check: ${milestone.text}`}>
                    <span className="check-box" aria-hidden="true" />
                    <MilestoneBody milestone={milestone} timing={timing} />
                  </button>
                </li>
              );
            })}
          </ul>
        )}

        {done.length > 0 && (
          <>
            <h2 className="list-heading">Checked <span>{done.length}</span></h2>
            <ul className="milestone-list">
              {done.map((milestone) => {
                const checkedAt = new Date(checks[milestone.id]);
                const checkedAge = ageInDays(checkedAt);
                return (
                  <li key={milestone.id}>
                    <button className="milestone-card checked" onClick={() => uncheck(milestone.id)} aria-label={`Uncheck: ${milestone.text}`}>
                      <span className="check-box" aria-hidden="true">✓</span>
                      <MilestoneBody
                        milestone={milestone}
                        timing={checkedTiming(milestone, checkedAge)}
                        detail={`${checkedAt.toLocaleDateString(undefined, { day: "numeric", month: "short" })} · at ${formatAge(checkedAge)}`}
                      />
                    </button>
                  </li>
                );
              })}
            </ul>
          </>
        )}
      </section>

      <aside className="care-note">
        <span aria-hidden="true">✦</span>
        <p><strong>For gentle noticing, not diagnosing.</strong> Age ranges are approximate. If anything worries you, share your observations with your child’s doctor.</p>
      </aside>
    </main>
  );
}

function MilestoneBody({ milestone, timing, detail }: { milestone: Milestone; timing: Timing; detail?: string }) {
  const meta = domainMeta[milestone.domain];
  return (
    <span className="milestone-body">
      <span className="milestone-text">{milestone.text}</span>
      <span className="milestone-meta">
        <span className={`domain-dot ${meta.colour}`} title={meta.label} aria-hidden="true">{meta.symbol}</span>
        <span>{formatRange(milestone)}</span>
        {detail && <span>· {detail}</span>}
        <span className={`timing ${timing.tone}`}>{timing.label}</span>
      </span>
      {milestone.activity && !detail && <span className="milestone-activity">Try: {milestone.activity}</span>}
    </span>
  );
}
