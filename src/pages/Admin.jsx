// src/pages/Admin.jsx
// Portfolio Dashboard — edit profile.js and voluntary.js via the admin-server API
import React, { useState, useEffect, useCallback } from "react";

const API = "http://localhost:3001/api";

// ─── Tiny reusable field components ─────────────────────────────────────────

function Field({ label, value, onChange, multiline, placeholder, mono }) {
  const base =
    "w-full bg-white border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#96150f]/30 focus:border-[#96150f] transition-colors";
  return (
    <label className="block mb-4">
      <span className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1 block">
        {label}
      </span>
      {multiline ? (
        <textarea
          className={`${base} min-h-[100px] resize-y ${mono ? "font-mono text-xs" : ""}`}
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
        />
      ) : (
        <input
          className={`${base} ${mono ? "font-mono text-xs" : ""}`}
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
        />
      )}
    </label>
  );
}

function BilingualField({ label, value, onChange, multiline, placeholder, mono }) {
  const norm = (typeof value === "string" || value === null || value === undefined)
    ? { en: value ?? "", de: "" }
    : value;
  const set = (lang, v) => onChange({ ...norm, [lang]: v });
  const base =
    "w-full bg-white border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#96150f]/30 focus:border-[#96150f] transition-colors";
  return (
    <div className="mb-4">
      <span className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 block">
        {label}
      </span>
      <div className={multiline ? "space-y-2" : "grid grid-cols-2 gap-2"}>
        {["en", "de"].map((lang) => (
          <div key={lang}>
            <span className="text-[10px] font-black uppercase tracking-widest text-gray-300 mb-1 block">
              {lang.toUpperCase()}
            </span>
            {multiline ? (
              <textarea
                className={`${base} min-h-[80px] resize-y ${mono ? "font-mono text-xs" : ""}`}
                value={norm[lang] ?? ""}
                onChange={(e) => set(lang, e.target.value)}
                placeholder={placeholder}
              />
            ) : (
              <input
                className={`${base} ${mono ? "font-mono text-xs" : ""}`}
                value={norm[lang] ?? ""}
                onChange={(e) => set(lang, e.target.value)}
                placeholder={placeholder}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function BilingualArrayField({ label, items = [], onChange, placeholder }) {
  const norm = items.map((item) =>
    typeof item === "string" ? { en: item, de: "" } : item
  );
  const update = (i, lang, val) => {
    const next = [...norm];
    next[i] = { ...next[i], [lang]: val };
    onChange(next);
  };
  const add = () => onChange([...norm, { en: "", de: "" }]);
  const remove = (i) => onChange(norm.filter((_, idx) => idx !== i));

  return (
    <div className="mb-4">
      <span className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 block">
        {label}
      </span>
      {norm.map((item, i) => (
        <div key={i} className="mb-3 border border-gray-100 p-3">
          <div className="grid grid-cols-2 gap-2 mb-1">
            {["en", "de"].map((lang) => (
              <div key={lang}>
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-300 mb-1 block">
                  {lang.toUpperCase()}
                </span>
                <div className="flex gap-1">
                  <textarea
                    className="flex-1 bg-white border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#96150f]/30 min-h-[60px] resize-y"
                    value={item[lang] ?? ""}
                    onChange={(e) => update(i, lang, e.target.value)}
                    placeholder={placeholder}
                  />
                  {lang === "de" && (
                    <button
                      onClick={() => remove(i)}
                      className="self-start px-2 py-2 text-xs font-bold text-red-500 border border-red-200 hover:bg-red-50 transition-colors"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
      <button
        onClick={add}
        className="text-xs font-bold uppercase tracking-widest text-[#96150f] hover:underline mt-1"
      >
        + Add item
      </button>
    </div>
  );
}

function ArrayField({ label, items = [], onChange, placeholder }) {
  const update = (i, val) => {
    const next = [...items];
    next[i] = val;
    onChange(next);
  };
  const add = () => onChange([...items, ""]);
  const remove = (i) => onChange(items.filter((_, idx) => idx !== i));

  return (
    <div className="mb-4">
      <span className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 block">
        {label}
      </span>
      {items.map((item, i) => (
        <div key={i} className="flex gap-2 mb-2">
          <input
            className="flex-1 bg-white border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#96150f]/30"
            value={item}
            onChange={(e) => update(i, e.target.value)}
            placeholder={placeholder}
          />
          <button
            onClick={() => remove(i)}
            className="px-3 py-2 text-xs font-bold text-red-500 border border-red-200 hover:bg-red-50 transition-colors"
          >
            ✕
          </button>
        </div>
      ))}
      <button
        onClick={add}
        className="text-xs font-bold uppercase tracking-widest text-[#96150f] hover:underline mt-1"
      >
        + Add item
      </button>
    </div>
  );
}

// ─── Section wrapper ────────────────────────────────────────────────────────

function Section({ title, children }) {
  return (
    <div className="mb-8">
      <h3 className="text-sm font-black uppercase tracking-widest text-[#96150f] mb-4 pb-2 border-b border-gray-100">
        {title}
      </h3>
      {children}
    </div>
  );
}

// ─── Tab panels ─────────────────────────────────────────────────────────────

function PersonalTab({ data, setData }) {
  const set = (key, val) => setData((d) => ({ ...d, [key]: val }));
  const setContact = (key, val) =>
    setData((d) => ({ ...d, contact: { ...d.contact, [key]: val } }));

  return (
    <>
      <Section title="Identity">
        <Field label="Full Name" value={data.name} onChange={(v) => set("name", v)} />
        <BilingualField label="Role / Title" value={data.role} onChange={(v) => set("role", v)} />
        <BilingualField label="Tagline" value={data.tagline} onChange={(v) => set("tagline", v)} />
        <Field label="Year" value={data.year} onChange={(v) => set("year", v)} />
      </Section>
      <Section title="Contact">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
          <Field label="Location" value={data.contact?.location} onChange={(v) => setContact("location", v)} />
          <Field label="Phone" value={data.contact?.phone} onChange={(v) => setContact("phone", v)} />
          <Field label="Email" value={data.contact?.email} onChange={(v) => setContact("email", v)} />
          <Field label="LinkedIn URL" value={data.contact?.linkedin} onChange={(v) => setContact("linkedin", v)} />
          <Field label="LinkedIn Handle" value={data.contact?.linkedinHandle} onChange={(v) => setContact("linkedinHandle", v)} />
          <Field label="GitHub URL" value={data.contact?.github} onChange={(v) => setContact("github", v)} />
          <Field label="GitHub Handle" value={data.contact?.githubHandle} onChange={(v) => setContact("githubHandle", v)} />
        </div>
      </Section>
      <Section title="Profile Summary">
        <BilingualField
          label="Summary (used in CV header)"
          value={data.profileSummary}
          onChange={(v) => set("profileSummary", v)}
          multiline
        />
      </Section>
      <Section title="Bio">
        <BilingualField
          label="Short bio (About page)"
          value={data.bio}
          onChange={(v) => set("bio", v)}
          multiline
        />
      </Section>
    </>
  );
}

function ExperienceTab({ data, setData }) {
  const jobs = data.experience || [];

  const setJob = (i, key, val) =>
    setData((d) => {
      const next = [...d.experience];
      next[i] = { ...next[i], [key]: val };
      return { ...d, experience: next };
    });

  const addJob = () =>
    setData((d) => ({
      ...d,
      experience: [
        ...d.experience,
        { company: "", role: { en: "", de: "" }, date: "", impactMetrics: [], tasks: [] },
      ],
    }));

  const removeJob = (i) =>
    setData((d) => ({
      ...d,
      experience: d.experience.filter((_, idx) => idx !== i),
    }));

  return (
    <>
      {jobs.map((job, i) => (
        <Section key={i} title={job.company || `Position ${i + 1}`}>
          <Field label="Company" value={job.company} onChange={(v) => setJob(i, "company", v)} />
          <BilingualField label="Role" value={job.role} onChange={(v) => setJob(i, "role", v)} />
          <Field label="Date Range" value={job.date} onChange={(v) => setJob(i, "date", v)} placeholder="e.g. 10/2023 – 03/2024" />
          <BilingualArrayField
            label="Impact Metrics"
            items={job.impactMetrics}
            onChange={(v) => setJob(i, "impactMetrics", v)}
            placeholder="e.g. 50 survey participants"
          />
          <BilingualArrayField
            label="Tasks / Responsibilities"
            items={job.tasks}
            onChange={(v) => setJob(i, "tasks", v)}
            placeholder="Describe a key accomplishment..."
          />
          <button
            onClick={() => removeJob(i)}
            className="text-xs font-bold uppercase tracking-widest text-red-500 hover:underline mt-2"
          >
            Remove this position
          </button>
        </Section>
      ))}
      <button
        onClick={addJob}
        className="w-full py-3 border-2 border-dashed border-gray-300 text-sm font-bold uppercase tracking-widest text-gray-400 hover:border-[#96150f] hover:text-[#96150f] transition-colors"
      >
        + Add Position
      </button>
    </>
  );
}

function SkillsTab({ data, setData }) {
  const skills = data.skills || {};
  const categories = Object.keys(skills);

  const setCategory = (cat, items) =>
    setData((d) => ({ ...d, skills: { ...d.skills, [cat]: items } }));

  const renameCategory = (oldKey, newKey) => {
    if (!newKey || newKey === oldKey) return;
    setData((d) => {
      const next = {};
      Object.entries(d.skills).forEach(([k, v]) => {
        next[k === oldKey ? newKey : k] = v;
      });
      return { ...d, skills: next };
    });
  };

  const removeCategory = (cat) =>
    setData((d) => {
      const next = { ...d.skills };
      delete next[cat];
      return { ...d, skills: next };
    });

  const addCategory = () =>
    setData((d) => ({ ...d, skills: { ...d.skills, "New Category": [] } }));

  return (
    <>
      {categories.map((cat) => (
        <Section key={cat} title={cat}>
          <Field
            label="Category Name"
            value={cat}
            onChange={(v) => renameCategory(cat, v)}
          />
          <ArrayField
            label="Skills"
            items={skills[cat]}
            onChange={(v) => setCategory(cat, v)}
            placeholder="e.g. Figma, Usability Testing..."
          />
          <button
            onClick={() => removeCategory(cat)}
            className="text-xs font-bold uppercase tracking-widest text-red-500 hover:underline"
          >
            Remove category
          </button>
        </Section>
      ))}
      <button
        onClick={addCategory}
        className="w-full py-3 border-2 border-dashed border-gray-300 text-sm font-bold uppercase tracking-widest text-gray-400 hover:border-[#96150f] hover:text-[#96150f] transition-colors"
      >
        + Add Skill Category
      </button>
    </>
  );
}

function EducationTab({ data, setData }) {
  const items = data.education || [];

  const setEdu = (i, key, val) =>
    setData((d) => {
      const next = [...d.education];
      next[i] = { ...next[i], [key]: val };
      return { ...d, education: next };
    });

  const addEdu = () =>
    setData((d) => ({
      ...d,
      education: [...d.education, { school: "", degree: "", date: "" }],
    }));

  const removeEdu = (i) =>
    setData((d) => ({
      ...d,
      education: d.education.filter((_, idx) => idx !== i),
    }));

  return (
    <>
      {items.map((edu, i) => (
        <Section key={i} title={edu.school || `Education ${i + 1}`}>
          <Field label="School / University" value={edu.school} onChange={(v) => setEdu(i, "school", v)} />
          <BilingualField label="Degree / Programme" value={edu.degree} onChange={(v) => setEdu(i, "degree", v)} />
          <Field label="Date Range" value={edu.date} onChange={(v) => setEdu(i, "date", v)} />
          <button
            onClick={() => removeEdu(i)}
            className="text-xs font-bold uppercase tracking-widest text-red-500 hover:underline mt-2"
          >
            Remove this entry
          </button>
        </Section>
      ))}
      <button
        onClick={addEdu}
        className="w-full py-3 border-2 border-dashed border-gray-300 text-sm font-bold uppercase tracking-widest text-gray-400 hover:border-[#96150f] hover:text-[#96150f] transition-colors"
      >
        + Add Education
      </button>
    </>
  );
}

function PortfolioHighlightsTab({ data, setData }) {
  const items = data.portfolioHighlights || [];

  const setItem = (i, key, val) =>
    setData((d) => {
      const next = [...d.portfolioHighlights];
      next[i] = { ...next[i], [key]: val };
      return { ...d, portfolioHighlights: next };
    });

  const setMetric = (i, mi, key, val) =>
    setData((d) => {
      const next = [...d.portfolioHighlights];
      const metrics = [...(next[i].metrics || [])];
      metrics[mi] = { ...metrics[mi], [key]: val };
      next[i] = { ...next[i], metrics };
      return { ...d, portfolioHighlights: next };
    });

  const addMetric = (i) =>
    setData((d) => {
      const next = [...d.portfolioHighlights];
      next[i] = {
        ...next[i],
        metrics: [...(next[i].metrics || []), { value: "", label: { en: "", de: "" } }],
      };
      return { ...d, portfolioHighlights: next };
    });

  const removeMetric = (i, mi) =>
    setData((d) => {
      const next = [...d.portfolioHighlights];
      next[i] = {
        ...next[i],
        metrics: next[i].metrics.filter((_, idx) => idx !== mi),
      };
      return { ...d, portfolioHighlights: next };
    });

  const addHighlight = () =>
    setData((d) => ({
      ...d,
      portfolioHighlights: [
        ...d.portfolioHighlights,
        { id: `project-${Date.now()}`, title: { en: "", de: "" }, type: { en: "", de: "" }, metrics: [], summary: { en: "", de: "" } },
      ],
    }));

  const removeHighlight = (i) =>
    setData((d) => ({
      ...d,
      portfolioHighlights: d.portfolioHighlights.filter((_, idx) => idx !== i),
    }));

  return (
    <>
      {items.map((item, i) => (
        <Section key={item.id || i} title={typeof item.title === "object" ? (item.title.en || `Highlight ${i + 1}`) : (item.title || `Highlight ${i + 1}`)}>
          <Field label="Project ID" value={item.id} onChange={(v) => setItem(i, "id", v)} mono />
          <BilingualField label="Title" value={item.title} onChange={(v) => setItem(i, "title", v)} />
          <BilingualField label="Type / Methods" value={item.type} onChange={(v) => setItem(i, "type", v)} placeholder="e.g. Quantitative UX · Eye-Tracking · Python" />
          <BilingualField label="Summary" value={item.summary} onChange={(v) => setItem(i, "summary", v)} multiline />

          <div className="mt-4">
            <span className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 block">
              Metrics
            </span>
            {(item.metrics || []).map((m, mi) => (
              <div key={mi} className="mb-3 border border-gray-100 p-3">
                <div className="flex gap-2 mb-2 items-end">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-300 mb-1 block">Value</span>
                    <input
                      className="w-24 bg-white border border-gray-200 px-3 py-2 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#96150f]/30"
                      value={m.value ?? ""}
                      onChange={(e) => setMetric(i, mi, "value", e.target.value)}
                      placeholder="N=30"
                    />
                  </div>
                  <div className="flex-1">
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-300 mb-1 block">Label EN</span>
                    <input
                      className="w-full bg-white border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#96150f]/30"
                      value={typeof m.label === "object" ? (m.label.en ?? "") : (m.label ?? "")}
                      onChange={(e) => setMetric(i, mi, "label", { ...(typeof m.label === "object" ? m.label : { en: m.label ?? "", de: "" }), en: e.target.value })}
                      placeholder="within-subject experiment"
                    />
                  </div>
                  <div className="flex-1">
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-300 mb-1 block">Label DE</span>
                    <input
                      className="w-full bg-white border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#96150f]/30"
                      value={typeof m.label === "object" ? (m.label.de ?? "") : ""}
                      onChange={(e) => setMetric(i, mi, "label", { ...(typeof m.label === "object" ? m.label : { en: m.label ?? "", de: "" }), de: e.target.value })}
                      placeholder="Innersubjekt-Experiment"
                    />
                  </div>
                  <button
                    onClick={() => removeMetric(i, mi)}
                    className="px-3 py-2 text-xs font-bold text-red-500 border border-red-200 hover:bg-red-50 self-end"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
            <button
              onClick={() => addMetric(i)}
              className="text-xs font-bold uppercase tracking-widest text-[#96150f] hover:underline mt-1"
            >
              + Add metric
            </button>
          </div>

          <button
            onClick={() => removeHighlight(i)}
            className="text-xs font-bold uppercase tracking-widest text-red-500 hover:underline mt-4"
          >
            Remove this highlight
          </button>
        </Section>
      ))}
      <button
        onClick={addHighlight}
        className="w-full py-3 border-2 border-dashed border-gray-300 text-sm font-bold uppercase tracking-widest text-gray-400 hover:border-[#96150f] hover:text-[#96150f] transition-colors"
      >
        + Add Portfolio Highlight
      </button>
    </>
  );
}

function VoluntaryTab({ voluntary, setVoluntary }) {
  const items = voluntary || [];

  const setItem = (i, key, val) => {
    const next = [...items];
    next[i] = { ...next[i], [key]: val };
    setVoluntary(next);
  };

  const addItem = () =>
    setVoluntary([...items, { id: Date.now(), title: { en: "", de: "" }, year: "", org: "", desc: { en: "", de: "" } }]);

  const removeItem = (i) => setVoluntary(items.filter((_, idx) => idx !== i));

  return (
    <>
      {items.map((item, i) => (
        <Section key={item.id || i} title={typeof item.title === "object" ? (item.title.en || `Activity ${i + 1}`) : (item.title || `Activity ${i + 1}`)}>
          <BilingualField label="Title" value={item.title} onChange={(v) => setItem(i, "title", v)} />
          <Field label="Year(s)" value={item.year} onChange={(v) => setItem(i, "year", v)} placeholder="e.g. 2023 - Present" />
          <Field label="Organisation" value={item.org} onChange={(v) => setItem(i, "org", v)} />
          <BilingualField label="Description" value={item.desc} onChange={(v) => setItem(i, "desc", v)} multiline />
          <button
            onClick={() => removeItem(i)}
            className="text-xs font-bold uppercase tracking-widest text-red-500 hover:underline mt-2"
          >
            Remove
          </button>
        </Section>
      ))}
      <button
        onClick={addItem}
        className="w-full py-3 border-2 border-dashed border-gray-300 text-sm font-bold uppercase tracking-widest text-gray-400 hover:border-[#96150f] hover:text-[#96150f] transition-colors"
      >
        + Add Voluntary Activity
      </button>
    </>
  );
}

function NavLinksTab({ data, setData }) {
  const links = data.navLinks || [];

  const setLink = (i, key, val) =>
    setData((d) => {
      const next = [...d.navLinks];
      next[i] = { ...next[i], [key]: val };
      return { ...d, navLinks: next };
    });

  const addLink = () =>
    setData((d) => ({
      ...d,
      navLinks: [...d.navLinks, { name: "", path: "" }],
    }));

  const removeLink = (i) =>
    setData((d) => ({
      ...d,
      navLinks: d.navLinks.filter((_, idx) => idx !== i),
    }));

  return (
    <Section title="Navigation Links">
      {links.map((link, i) => (
        <div key={i} className="flex gap-3 mb-3 items-end">
          <div className="flex-1">
            <Field label="Label" value={link.name} onChange={(v) => setLink(i, "name", v)} />
          </div>
          <div className="flex-1">
            <Field label="Path" value={link.path} onChange={(v) => setLink(i, "path", v)} mono />
          </div>
          <button
            onClick={() => removeLink(i)}
            className="px-3 py-2 mb-4 text-xs font-bold text-red-500 border border-red-200 hover:bg-red-50 transition-colors"
          >
            ✕
          </button>
        </div>
      ))}
      <button
        onClick={addLink}
        className="text-xs font-bold uppercase tracking-widest text-[#96150f] hover:underline"
      >
        + Add nav link
      </button>
    </Section>
  );
}

// ─── Main Dashboard ─────────────────────────────────────────────────────────

const TABS = [
  { id: "personal", label: "Personal" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "highlights", label: "Portfolio" },
  { id: "voluntary", label: "Voluntary" },
  { id: "nav", label: "Navigation" },
];

export default function Admin() {
  const [profileData, setProfileData] = useState(null);
  const [voluntary, setVoluntary] = useState(null);
  const [tab, setTab] = useState("personal");
  const [status, setStatus] = useState({ type: "", msg: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const statusTimerRef = React.useRef(null);

  const showStatus = useCallback((type, msg) => {
    setStatus({ type, msg });
    if (statusTimerRef.current) clearTimeout(statusTimerRef.current);
    if (type !== "error") {
      statusTimerRef.current = setTimeout(() => setStatus({ type: "", msg: "" }), 3000);
    }
  }, []);

  const setProfile = useCallback((updater) => {
    setProfileData(updater);
    setIsDirty(true);
  }, []);

  const setVol = useCallback((updater) => {
    setVoluntary(updater);
    setIsDirty(true);
  }, []);

  // ── Load data from the admin-server API ─────────────────────────────────
  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [pRes, vRes] = await Promise.all([
        fetch(`${API}/profile`),
        fetch(`${API}/voluntary`),
      ]);
      if (!pRes.ok || !vRes.ok) throw new Error("API not reachable");
      setProfileData(await pRes.json());
      setVoluntary(await vRes.json());
      setIsDirty(false);
    } catch {
      showStatus("error", "Cannot reach admin-server. Run: node admin-server.mjs");
    } finally {
      setLoading(false);
    }
  }, [showStatus]);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { void loadData(); }, [loadData]);

  // ── Save ────────────────────────────────────────────────────────────────
  const save = useCallback(async () => {
    setSaving(true);
    try {
      const [pRes, vRes] = await Promise.all([
        fetch(`${API}/profile`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(profileData),
        }),
        fetch(`${API}/voluntary`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(voluntary),
        }),
      ]);
      if (!pRes.ok || !vRes.ok) throw new Error("Save failed");
      setIsDirty(false);
      showStatus("ok", "Saved! Vite will hot-reload your site.");
    } catch (error) {
      console.error("Save failed", error);
      showStatus("error", "Failed to save changes.");
    } finally {
      setSaving(false);
    }
  }, [profileData, voluntary, showStatus]);

  // ── Ctrl+S shortcut ──────────────────────────────────────────────────────
  useEffect(() => {
    const handler = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "s") {
        e.preventDefault();
        if (!saving && profileData) save();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [profileData, save, saving]);

  // ── Render ──────────────────────────────────────────────────────────────

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-sm font-bold uppercase tracking-widest text-gray-400 animate-pulse">
          Loading dashboard...
        </p>
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
        <div className="max-w-md text-center">
          <h1 className="text-2xl font-black text-gray-800 mb-4">Admin Server Not Running</h1>
          <p className="text-sm text-gray-500 mb-6">
            Start the API server in a separate terminal:
          </p>
          <code className="block bg-gray-900 text-green-400 px-4 py-3 text-sm font-mono rounded mb-6">
            node admin-server.mjs
          </code>
          <p className="text-xs text-gray-400">
            Then refresh this page. The server reads and writes your <code className="font-mono">src/data/</code> files directly.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ── Header bar ── */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-5xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-lg font-black tracking-tight text-gray-900">
              Portfolio Dashboard
            </h1>
            <span className="text-[10px] font-bold uppercase tracking-widest bg-[#96150f]/10 text-[#96150f] px-2 py-0.5">
              Local
            </span>
          </div>
          <div className="flex items-center gap-4">
            {status.msg && (
              <span
                className={`text-xs font-bold ${
                  status.type === "error" ? "text-red-500" : "text-green-600"
                }`}
              >
                {status.msg}
              </span>
            )}
            {isDirty && !status.msg && (
              <span className="text-xs font-bold text-amber-500">
                Unsaved changes
              </span>
            )}
            <button
              onClick={loadData}
              className="text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-gray-800 transition-colors"
            >
              Reload
            </button>
            <button
              onClick={save}
              disabled={saving}
              title="Save (Ctrl+S)"
              className="px-5 py-2 bg-[#96150f] text-white text-xs font-black uppercase tracking-widest hover:bg-[#7a110c] transition-colors disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save All"}
            </button>
          </div>
        </div>
      </header>

      {/* ── Layout: Sidebar + Content ── */}
      <div className="max-w-5xl mx-auto px-6 py-8 flex gap-8">
        {/* Sidebar tabs */}
        <nav className="w-48 shrink-0">
          <div className="sticky top-20 space-y-1">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`w-full text-left px-4 py-2.5 text-xs font-bold uppercase tracking-widest transition-colors ${
                  tab === t.id
                    ? "bg-[#96150f] text-white"
                    : "text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </nav>

        {/* Content area */}
        <main className="flex-1 bg-white border border-gray-200 shadow-sm p-8">
          {tab === "personal" && <PersonalTab data={profileData} setData={setProfile} />}
          {tab === "experience" && <ExperienceTab data={profileData} setData={setProfile} />}
          {tab === "skills" && <SkillsTab data={profileData} setData={setProfile} />}
          {tab === "education" && <EducationTab data={profileData} setData={setProfile} />}
          {tab === "highlights" && <PortfolioHighlightsTab data={profileData} setData={setProfile} />}
          {tab === "voluntary" && <VoluntaryTab voluntary={voluntary} setVoluntary={setVol} />}
          {tab === "nav" && <NavLinksTab data={profileData} setData={setProfile} />}
        </main>
      </div>
    </div>
  );
}