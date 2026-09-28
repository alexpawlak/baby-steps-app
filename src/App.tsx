import { useEffect, useRef, useState } from "react";
import { birthDate, domainMeta, milestones, sources } from "./data";
import type { Checks, Milestone } from "./types";

const storageKey = "baby-steps-checks";
const legacyStorageKey = "baby-steps-prototype-observations";
// Hold the card in its checked state, then fold it away before it moves lists.
const celebrateMs = 520;
const leaveMs = 320;
const toastMs = 4500;

type Toast = { id: string; text: string; timing: Timing; key: number };

function prefersReducedMotion() {
  return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
}

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
  const [pending, setPending] = useState<Record<string, "celebrating" | "leaving">>({});
  const [arrived, setArrived] = useState<string | null>(null);
  const [toast, setToast] = useState<Toast | null>(null);
  const timers = useRef(new Map<string, number[]>());
  const toastTimer = useRef<number>(undefined);
  const age = ageInDays(new Date());

  useEffect(() => () => {
    timers.current.forEach((ids) => ids.forEach(clearTimeout));
    clearTimeout(toastTimer.current);
  }, []);

  function later(id: string, ms: number, run: () => void) {
    timers.current.set(id, [...(timers.current.get(id) ?? []), window.setTimeout(run, ms)]);
  }

  function cancelTimers(id: string) {
    timers.current.get(id)?.forEach(clearTimeout);
    timers.current.delete(id);
  }

  const open = milestones
    .filter((milestone) => !checks[milestone.id])
    .sort((a, b) => a.fromDays - b.fromDays || a.toDays - b.toDays);
  const done = milestones
    .filter((milestone) => checks[milestone.id])
    .sort((a, b) => checks[b.id].localeCompare(checks[a.id]));

  function persist(next: Checks) {
    try {
      localStorage.setItem(storageKey, JSON.stringify(next));
    } catch {
      // Storage unavailable: keep the in-memory state.
    }
  }

  function save(next: Checks) {
    setChecks(next);
    persist(next);
  }

  function showToast(next: Toast | null) {
    clearTimeout(toastTimer.current);
    setToast(next);
    if (next) toastTimer.current = window.setTimeout(() => setToast(null), toastMs);
  }

  function check(milestone: Milestone) {
    const { id } = milestone;
    if (pending[id]) return;
    const checkedAt = new Date().toISOString();
    const commit = () => {
      setChecks((current) => {
        const next = { ...current, [id]: checkedAt };
        persist(next);
        return next;
      });
      setPending(({ [id]: _done, ...rest }) => rest);
      setArrived(id);
      timers.current.delete(id);
    };
    showToast({ id, text: milestone.text, timing: checkedTiming(milestone, age), key: Date.now() });
    if (prefersReducedMotion()) return commit();
    setPending((current) => ({ ...current, [id]: "celebrating" }));
    later(id, celebrateMs, () => setPending((current) => ({ ...current, [id]: "leaving" })));
    later(id, celebrateMs + leaveMs, commit);
  }

  function undo(id: string) {
    showToast(null);
    cancelTimers(id);
    setPending(({ [id]: _cancelled, ...rest }) => rest);
    setChecks((current) => {
      const { [id]: _removed, ...rest } = current;
      persist(rest);
      return rest;
    });
  }

  function uncheck(id: string) {
    const { [id]: _removed, ...rest } = checks;
    save(rest);
    if (toast?.id === id) showToast(null);
  }

  return (
    <main className="app-shell">
      <section className="masthead" aria-label="Baby Steps overview">
        <div className="wordmark"><span className="wordmark-dot" aria-hidden="true" />baby steps</div>
        <div className="age-chip"><span aria-hidden="true">✦</span>{formatAge(age)} old</div>
        <h1>A small record of<br /><em>growing, together.</em></h1>
        <div className="progress-row" aria-label={`${done.length} of ${milestones.length} milestones checked`}>
          <div className="progress-orbit"><span key={done.length} className={arrived ? "bump" : undefined}>{done.length}</span><small>of {milestones.length}</small></div>
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
              const state = pending[milestone.id];
              const timing = state ? checkedTiming(milestone, age) : openTiming(milestone, age);
              return (
                <li key={milestone.id} className={state === "leaving" ? "leaving" : undefined}>
                  <div className="card-fold">
                    <button className={`milestone-card${milestone.image ? " has-image" : ""}${state ? " checked celebrating" : ""}`} onClick={() => check(milestone)} aria-label={`Check: ${milestone.text}`} aria-pressed={Boolean(state)}>
                      <MilestoneBody milestone={milestone} timing={timing} />
                      <span className="check-box" aria-hidden="true">{state && "✓"}</span>
                    </button>
                  </div>
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
                  <li key={milestone.id} className={milestone.id === arrived ? "arrived" : undefined}>
                    <button className={`milestone-card checked${milestone.image ? " has-image" : ""}`} onClick={() => uncheck(milestone.id)} aria-label={`Uncheck: ${milestone.text}`}>
                      <MilestoneBody
                        milestone={milestone}
                        timing={checkedTiming(milestone, checkedAge)}
                        detail={`${checkedAt.toLocaleDateString(undefined, { day: "numeric", month: "short" })} · at ${formatAge(checkedAge)}`}
                      />
                      <span className="check-box" aria-hidden="true">✓</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </>
        )}
      </section>

      <div className="toast-region" aria-live="polite">
        {toast && (
          <div className="toast" key={toast.key}>
            <span className="toast-spark" aria-hidden="true">✦</span>
            <span className="toast-text">
              <strong>Noticed!</strong> {toast.text}
            </span>
            <span className={`timing ${toast.timing.tone}`}>{toast.timing.label}</span>
            <button className="toast-undo" onClick={() => undo(toast.id)}>Undo</button>
          </div>
        )}
      </div>

      <aside className="care-note">
        <span aria-hidden="true">✦</span>
        <div>
          <p><strong>For gentle noticing, not diagnosing.</strong> Age ranges are approximate. If anything worries you, share your observations with your child’s doctor.</p>
          <p className="sources-heading">Sources</p>
          <ul className="sources">
            {Object.values(sources).map((source) => (
              <li key={source.url}><a href={source.url} target="_blank" rel="noreferrer">{source.label}</a></li>
            ))}
          </ul>
        </div>
      </aside>
    </main>
  );
}

function MilestoneBody({ milestone, timing, detail }: { milestone: Milestone; timing: Timing; detail?: string }) {
  const meta = domainMeta[milestone.domain];
  return (
    <>
    {milestone.image && (
      <span className="milestone-figure">
        <img className="milestone-image" src={`${import.meta.env.BASE_URL}${milestone.image}`} alt="" loading="lazy" width={512} height={512} />
      </span>
    )}
    <span className="milestone-body">
      <span className="milestone-text">{milestone.text}</span>
      <span className="milestone-meta">
        <span className={`domain-dot ${meta.colour}`} title={meta.label} aria-hidden="true">{meta.symbol}</span>
        <span>{formatRange(milestone)}</span>
        <span title={sources[milestone.source].label}>· {sources[milestone.source].short}</span>
        {detail && <span>· {detail}</span>}
        <span className={`timing ${timing.tone}`}>{timing.label}</span>
      </span>
      {milestone.activity && !detail && <span className="milestone-activity">Try: {milestone.activity}</span>}
    </span>
    </>
  );
}
