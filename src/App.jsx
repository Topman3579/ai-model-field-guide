import { useEffect, useMemo, useState } from "react";
import { models, routes } from "./data";

const navItems = [
  ["ภาพรวม", "overview"],
  ["บทบาท", "roles"],
  ["เลือกตามภารกิจ", "missions"],
  ["ความปลอดภัย", "safety"],
];

const safetyPrinciples = [
  {
    label: "ยืนยันข้อเท็จจริง",
    icon: (
      <>
        <path d="M7 3.5h7l3 3V20H7z" />
        <path d="M14 3.5V7h3M10 12l2 2 4-4" />
      </>
    ),
  },
  {
    label: "ปกปิดข้อมูลอ่อนไหว",
    icon: (
      <>
        <path d="M6 10h12v10H6zM8.5 10V7.5a3.5 3.5 0 0 1 7 0V10" />
        <path d="M12 14v2" />
      </>
    ),
  },
  {
    label: "อ้างอิงแหล่งที่มา",
    icon: (
      <>
        <path d="M4 5.5A3.5 3.5 0 0 1 7.5 4H12v15H7.5A3.5 3.5 0 0 0 4 20z" />
        <path d="M20 5.5A3.5 3.5 0 0 0 16.5 4H12v15h4.5A3.5 3.5 0 0 1 20 20z" />
      </>
    ),
  },
  {
    label: "มนุษย์รับผิดชอบ",
    icon: (
      <>
        <circle cx="12" cy="8" r="3.5" />
        <path d="M5.5 20c.5-4 2.7-6 6.5-6s6 2 6.5 6" />
      </>
    ),
  },
];

function Emblem({ compact = false }) {
  return (
    <a className={`brand-lockup ${compact ? "compact" : ""}`} href="#overview">
      <img src="/topmanidmb-emblem.svg" alt="" />
      <span>
        <strong>TOPMANIDMB</strong>
        <small>AI FIELD GUIDE</small>
      </span>
    </a>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h14M14 7l5 5-5 5" />
    </svg>
  );
}

function Header() {
  const [open, setOpen] = useState(false);

  const closeAndScroll = () => setOpen(false);

  return (
    <header className="site-header">
      <div className="header-inner">
        <Emblem />
        <nav className={open ? "is-open" : ""} aria-label="เมนูหลัก">
          {navItems.map(([label, id]) => (
            <a key={id} href={`#${id}`} onClick={closeAndScroll}>
              {label}
            </a>
          ))}
        </nav>
        <a className="button button-small header-cta" href="#missions">
          เริ่มเลือกโมเดล
        </a>
        <button
          className="menu-toggle"
          type="button"
          aria-label={open ? "ปิดเมนู" : "เปิดเมนู"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}

function OrbitMap() {
  return (
    <div className="orbit-map" aria-label="โมเดล AI 7 ครอบครัว">
      <div className="orbit-grid" aria-hidden="true" />
      <div className="orbit-core">
        <span className="core-mark" aria-hidden="true">
          ✦
        </span>
        <strong>ภารกิจ</strong>
      </div>
      {models.map((model, index) => (
        <article
          className={`orbit-node node-${index + 1}`}
          style={{ "--model-color": model.color, "--model-glow": model.glow }}
          key={model.name}
        >
          <span className="orbit-monogram" aria-hidden="true">
            {model.monogram}
          </span>
          <strong>{model.name}</strong>
        </article>
      ))}
    </div>
  );
}

function Hero() {
  return (
    <section className="hero section-grid" id="overview">
      <div className="hero-copy" data-reveal>
        <h1>
          เลือก <span>AI</span>
          <br />
          ให้ตรงภารกิจ
        </h1>
        <p>
          ไม่มีโมเดลเดียวชนะทุกงาน — ใช้ให้เหมาะ ใช้เสริมกัน
          และให้มนุษย์เป็นผู้ตัดสินใจ
        </p>
        <div className="hero-actions">
          <a className="button" href="#missions">
            เริ่มเลือกโมเดล
            <ArrowIcon />
          </a>
          <a className="text-link" href="#roles">
            ดูบทบาททั้งหมด
            <ArrowIcon />
          </a>
        </div>
      </div>
      <div className="hero-visual" data-reveal>
        <OrbitMap />
      </div>
    </section>
  );
}

function SectionHeading({ id, title, accent, description }) {
  return (
    <div className="section-heading" data-reveal>
      <h2 id={id}>
        {title} {accent && <span>{accent}</span>}
      </h2>
      <p>{description}</p>
    </div>
  );
}

function RoleRail() {
  return (
    <section className="content-section roles-section" id="roles" aria-labelledby="roles-title">
      <SectionHeading
        id="roles-title"
        title="บทบาทเด่นของ"
        accent="แต่ละโมเดล"
        description="เลือกตามภารกิจ แล้วใช้ข้ามค่ายเพื่อตรวจทานกัน"
      />
      <div className="role-rail">
        {models.map((model, index) => (
          <article
            className="role-row"
            style={{ "--model-color": model.color, "--model-glow": model.glow }}
            key={model.name}
            data-reveal
          >
            <span className="role-index">{String(index + 1).padStart(2, "0")}</span>
            <span className="role-monogram" aria-hidden="true">
              {model.monogram}
            </span>
            <strong className="role-model">{model.name}</strong>
            <span className="role-title">{model.role}</span>
            <p>{model.summary}</p>
            <div className="best-for">
              <small>เหมาะกับ</small>
              <span>{model.bestFor}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function MissionSelector() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selected = routes[selectedIndex];

  const primaryModels = useMemo(
    () => models.filter((model) => selected[1].includes(model.name)),
    [selected],
  );
  const reviewerModels = useMemo(
    () => models.filter((model) => selected[2].includes(model.name)),
    [selected],
  );

  return (
    <section className="content-section mission-section" id="missions" aria-labelledby="missions-title">
      <SectionHeading
        id="missions-title"
        title="ภารกิจไหน"
        accent="ใช้โมเดลไหนดี?"
        description="ลำดับแนะนำเชิงใช้งาน ไม่ใช่คะแนน benchmark"
      />
      <div className="mission-workspace" data-reveal>
        <div className="mission-tabs" role="tablist" aria-label="เลือกภารกิจ">
          {routes.map(([task], index) => (
            <button
              type="button"
              role="tab"
              aria-selected={selectedIndex === index}
              className={selectedIndex === index ? "is-selected" : ""}
              onClick={() => setSelectedIndex(index)}
              key={task}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{task}</strong>
              <ArrowIcon />
            </button>
          ))}
        </div>
        <article className="mission-result" role="tabpanel" aria-live="polite">
          <div className="result-heading">
            <small>ภารกิจที่เลือก</small>
            <h3>{selected[0]}</h3>
          </div>
          <div className="model-pair">
            <div>
              <small>โมเดลหลัก</small>
              <strong>{selected[1]}</strong>
              <span>{primaryModels.map((model) => model.role).join(" · ")}</span>
            </div>
            <ArrowIcon />
            <div>
              <small>โมเดลตรวจทาน</small>
              <strong>{selected[2]}</strong>
              <span>{reviewerModels.map((model) => model.role).join(" · ")}</span>
            </div>
          </div>
          <div className="recommendation">
            <small>แนวทางการใช้งาน</small>
            <p>
              ใช้โมเดลหลักสร้างผลลัพธ์ตามภารกิจ
              แล้วให้โมเดลตรวจทานช่วยทบทวนความครบถ้วนก่อนนำไปใช้จริง
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}

function SafetySection() {
  return (
    <section className="content-section safety-section" id="safety" aria-labelledby="safety-title">
      <div className="safety-copy" data-reveal>
        <h2 id="safety-title">
          ใช้ AI อย่างชาญฉลาด
          <span>ยืนยันโดยมนุษย์ ปกป้องข้อมูลเสมอ</span>
        </h2>
        <p>
          ตรวจชื่อ ตัวเลข วันเวลา กฎหมาย แหล่งอ้างอิง
          และระดับชั้นข้อมูลก่อนนำไปใช้จริง
        </p>
      </div>
      <div className="principle-rail">
        {safetyPrinciples.map((principle, index) => (
          <article key={principle.label} data-reveal>
            <span className="principle-number">{String(index + 1).padStart(2, "0")}</span>
            <span className="principle-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24">{principle.icon}</svg>
            </span>
            <strong>{principle.label}</strong>
          </article>
        ))}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <Emblem compact />
        <p>
          AI คือเครื่องมือ — ความสำเร็จอยู่ที่โจทย์ กระบวนการ
          และวิจารณญาณของเรา
        </p>
        <nav aria-label="เมนูส่วนท้าย">
          {navItems.map(([label, id]) => (
            <a href={`#${id}`} key={id}>
              {label}
            </a>
          ))}
        </nav>
      </div>
      <div className="footer-bottom">
        <span>© 2026 TOPMANIDMB</span>
      </div>
    </footer>
  );
}

export default function App() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px" },
    );

    document.querySelectorAll("[data-reveal]").forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="app-shell">
      <Header />
      <main>
        <Hero />
        <RoleRail />
        <MissionSelector />
        <SafetySection />
      </main>
      <Footer />
    </div>
  );
}
