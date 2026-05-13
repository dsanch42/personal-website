import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react";
import "./App.css";

type Achievement = {
  id: number;
  title: string;
  impact: string;
  year: string;
};

const defaultAchievements: Achievement[] = [
  {
    id: 1,
    title: "Promoted Project Delivery Maturity",
    impact: "Led a cross-functional initiative that reduced average delivery time by 28%.",
    year: "2025",
  },
  {
    id: 2,
    title: "Built Data-Driven Reporting",
    impact: "Designed dashboards used by leadership for quarterly planning decisions.",
    year: "2024",
  },
  {
    id: 3,
    title: "Mentored New Team Members",
    impact: "Created onboarding docs and coached 6 hires to full productivity.",
    year: "2023",
  },
];

const RESUME_KEY = "professional_site_resume";
const PROFILE_KEY = "professional_site_profile";
const ACHIEVEMENTS_KEY = "professional_site_achievements";

function parseStoredJson<T>(value: string | null): T | null {
  if (!value) return null;

  try {
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
}

function App() {
  const [name, setName] = useState("Your Name");
  const [headline, setHeadline] = useState("Program & Technology Professional");
  const [about, setAbout] = useState(
    "I am a results-focused professional who combines strategic thinking and hands-on execution to solve business challenges."
  );
  const [email, setEmail] = useState("your.email@example.com");
  const [linkedin, setLinkedin] = useState("https://www.linkedin.com/in/your-profile");
  const [location, setLocation] = useState("City, State");

  const [resumeName, setResumeName] = useState<string | null>(null);
  const [resumeDataUrl, setResumeDataUrl] = useState<string | null>(null);
  const [achievements, setAchievements] = useState<Achievement[]>(defaultAchievements);

  const [newTitle, setNewTitle] = useState("");
  const [newImpact, setNewImpact] = useState("");
  const [newYear, setNewYear] = useState("");

  useEffect(() => {
    const savedResume = parseStoredJson<{ name: string; dataUrl: string }>(
      localStorage.getItem(RESUME_KEY)
    );
    if (savedResume) {
      const parsed = savedResume;
      setResumeName(parsed.name);
      setResumeDataUrl(parsed.dataUrl);
    } else {
      localStorage.removeItem(RESUME_KEY);
    }

    const savedProfile = parseStoredJson<{
        name: string;
        headline: string;
        about: string;
        email: string;
        linkedin: string;
        location: string;
      }>(localStorage.getItem(PROFILE_KEY));
    if (savedProfile) {
      const parsed = savedProfile;
      setName(parsed.name);
      setHeadline(parsed.headline);
      setAbout(parsed.about);
      setEmail(parsed.email);
      setLinkedin(parsed.linkedin);
      setLocation(parsed.location);
    } else {
      localStorage.removeItem(PROFILE_KEY);
    }

    const savedAchievements = parseStoredJson<Achievement[]>(
      localStorage.getItem(ACHIEVEMENTS_KEY)
    );
    if (savedAchievements) {
      setAchievements(savedAchievements);
    } else {
      localStorage.removeItem(ACHIEVEMENTS_KEY);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      PROFILE_KEY,
      JSON.stringify({ name, headline, about, email, linkedin, location })
    );
  }, [name, headline, about, email, linkedin, location]);

  useEffect(() => {
    localStorage.setItem(ACHIEVEMENTS_KEY, JSON.stringify(achievements));
  }, [achievements]);

  const mailtoHref = useMemo(() => {
    const subject = encodeURIComponent(`Connecting from ${name}'s portfolio`);
    const body = encodeURIComponent("Hello, I would like to discuss a professional opportunity.");
    return `mailto:${email}?subject=${subject}&body=${body}`;
  }, [email, name]);

  const onResumeUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setResumeName(file.name);
      setResumeDataUrl(result);
      localStorage.setItem(RESUME_KEY, JSON.stringify({ name: file.name, dataUrl: result }));
    };
    reader.readAsDataURL(file);
  };

  const onAddAchievement = (event: FormEvent) => {
    event.preventDefault();
    if (!newTitle.trim() || !newImpact.trim() || !newYear.trim()) return;

    setAchievements((current) => [
      {
        id: Date.now(),
        title: newTitle.trim(),
        impact: newImpact.trim(),
        year: newYear.trim(),
      },
      ...current,
    ]);

    setNewTitle("");
    setNewImpact("");
    setNewYear("");
  };

  const onRemoveAchievement = (id: number) => {
    setAchievements((current) => current.filter((item) => item.id !== id));
  };

  return (
    <div className="site-shell">
      <header className="hero" id="top">
        <p className="eyebrow">Professional Website</p>
        <h1>{name}</h1>
        <p className="headline">{headline}</p>
        <nav className="hero-nav">
          <a href="#about">About</a>
          <a href="#accomplishments">Accomplishments</a>
          <a href="#resume">Resume</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main>
        <section id="about" className="card reveal">
          <h2>About Me</h2>
          <div className="grid-two">
            <label>
              Name
              <input value={name} onChange={(e) => setName(e.target.value)} />
            </label>
            <label>
              Professional Headline
              <input value={headline} onChange={(e) => setHeadline(e.target.value)} />
            </label>
          </div>
          <label>
            Professional Summary
            <textarea value={about} onChange={(e) => setAbout(e.target.value)} rows={5} />
          </label>
        </section>

        <section id="accomplishments" className="card reveal delay-1">
          <h2>Accomplishments</h2>
          <form className="achievement-form" onSubmit={onAddAchievement}>
            <input
              placeholder="Achievement title"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
            <input
              placeholder="Business impact"
              value={newImpact}
              onChange={(e) => setNewImpact(e.target.value)}
            />
            <input placeholder="Year" value={newYear} onChange={(e) => setNewYear(e.target.value)} />
            <button type="submit">Add</button>
          </form>

          <ul className="achievement-list">
            {achievements.map((item) => (
              <li key={item.id}>
                <div>
                  <p className="item-year">{item.year}</p>
                  <h3>{item.title}</h3>
                  <p>{item.impact}</p>
                </div>
                <button type="button" onClick={() => onRemoveAchievement(item.id)}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </section>

        <section id="resume" className="card reveal delay-2">
          <h2>Resume</h2>
          <p>Upload your latest resume so this site always shares your current professional profile.</p>
          <label className="file-upload">
            <span>Upload Resume (PDF or DOCX)</span>
            <input type="file" accept=".pdf,.doc,.docx" onChange={onResumeUpload} />
          </label>
          {resumeDataUrl ? (
            <a className="download-btn" href={resumeDataUrl} download={resumeName ?? "Resume"}>
              Download {resumeName}
            </a>
          ) : (
            <p className="muted">No resume uploaded yet.</p>
          )}
        </section>

        <section id="contact" className="card reveal delay-3">
          <h2>Contact</h2>
          <div className="grid-two">
            <label>
              Email
              <input value={email} onChange={(e) => setEmail(e.target.value)} />
            </label>
            <label>
              Location
              <input value={location} onChange={(e) => setLocation(e.target.value)} />
            </label>
          </div>
          <label>
            LinkedIn URL
            <input value={linkedin} onChange={(e) => setLinkedin(e.target.value)} />
          </label>
          <div className="contact-actions">
            <a href={mailtoHref}>Email Me</a>
            <a href={linkedin} target="_blank" rel="noreferrer">
              LinkedIn Profile
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
