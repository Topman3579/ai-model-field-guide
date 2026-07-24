import { useEffect, useMemo, useState } from "react";
import { models, routes } from "./data";
import { createMissionPlan, dataPolicies, outputModes } from "./mission";

const navItems = [
  ["Mission Console", "console"],
  ["4-Gate Protocol", "protocol"],
  ["บทบาทโมเดล", "roles"],
  ["ความปลอดภัย", "safety"],
];

const gates = [
  ["01", "FRAME", "กำหนดผลลัพธ์ ผู้รับ และข้อจำกัด", "target"],
  ["02", "LEAD", "สร้างคำตอบชุดแรก", "document"],
  ["03", "RED TEAM", "ตรวจข้อขัดแย้งและแหล่งอ้างอิง", "shield"],
  ["04", "HUMAN GATE", "อนุมัติก่อนนำไปใช้จริง", "human"],
];

function Icon({ name }) {
  const paths = {
    target: (
      <>
        <circle cx="12" cy="12" r="7" />
        <circle cx="12" cy="12" r="2.5" />
        <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
      </>
    ),
    document: (
      <>
        <path d="M6 3h9l3 3v15H6z" />
        <path d="M15 3v4h3M9 11h6M9 15h6" />
      </>
    ),
    shield: (
      <>
        <path d="M12 2.5 20 6v6c0 5-3.4 8.1-8 9.5C7.4 20.1 4 17 4 12V6z" />
        <path d="m8.5 12 2.2 2.2 4.8-5" />
      </>
    ),
    human: (
      <>
        <circle cx="12" cy="8" r="3.2" />
        <path d="M5.5 20c.5-4 2.7-6 6.5-6s6 2 6.5 6" />
        <path d="m16.5 16.5 1.5 1.5 3-3" />
      </>
    ),
    copy: (
      <>
        <rect x="8" y="8" width="11" height="12" rx="1.5" />
        <path d="M16 8V5a1 1 0 0 0-1-1H6a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h2" />
      </>
    ),
    book: (
      <>
        <path d="M4 5.5A3.5 3.5 0 0 1 7.5 4H12v15H7.5A3.5 3.5 0 0 0 4 20z" />
        <path d="M20 5.5A3.5 3.5 0 0 0 16.5 4H12v15h4.5A3.5 3.5 0 0 1 20 20z" />
      </>
    ),
  };

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      {paths[name]}
    </svg>
  );
}

function Brand() {
  return (
    <a className="brand" href="#console" aria-label="TOPMANIDMB AI Mission Console">
      <img src="/topmanidmb-emblem.svg" alt="" />
      <span>
        <strong>TOPMANIDMB</strong>
        <small>AI MISSION CONSOLE</small>
      </span>
    </a>
  );
}

function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="header-inner">
        <Brand />
        <nav className={open ? "open" : ""} aria-label="เมนูหลัก">
          {navItems.map(([label, id]) => (
            <a href={`#${id}`} key={id} onClick={() => setOpen(false)}>
              {label}
            </a>
          ))}
        </nav>
        <a className="usage-link" href="#brief">
          <Icon name="book" />
          วิธีใช้งาน
        </a>
        <button
          className="menu-button"
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

function Selector({ number, label, value, onChange, children }) {
  return (
    <label className="selector-row">
      <span className="selector-number">{number}</span>
      <span className="selector-label">{label}</span>
      <select value={value} onChange={onChange}>
        {children}
      </select>
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="m7 9 5 5 5-5" />
      </svg>
    </label>
  );
}

function TeamNode({ type, name, role, icon }) {
  const mark =
    icon ??
    (name.includes("GPT")
      ? "G"
      : name.includes("Claude")
        ? "C"
        : name.includes("Qwen")
          ? "Q"
          : name.includes("GLM")
            ? "GL"
            : name.includes("DeepSeek")
              ? "D"
              : name.slice(0, 1));

  return (
    <div className={`team-node ${type}`}>
      <span className="team-orb">{mark}</span>
      <small>{type === "human" ? "HUMAN GATE" : type.toUpperCase()}</small>
      <strong>{name}</strong>
      <em>{role}</em>
    </div>
  );
}

function MissionConsole({ plan, selections, onSelection, onGenerate, briefReady }) {
  return (
    <section className="mission-hero" id="console">
      <div className="hero-left">
        <div className="hero-copy">
          <h1>
            บอกภารกิจมา
            <span>เราจัดทีม AI ให้</span>
          </h1>
          <p>
            เลือกจากลักษณะงาน ความเสี่ยงของข้อมูล และวิธีตรวจทาน
            ไม่ใช่ชื่อเสียงของโมเดล
          </p>
        </div>

        <div className="composer" aria-label="สร้าง Mission Brief">
          <Selector
            number="1"
            label="ภารกิจ"
            value={selections.mission}
            onChange={(event) => onSelection("mission", Number(event.target.value))}
          >
            {routes.map(([task], index) => (
              <option value={index} key={task}>
                {task}
              </option>
            ))}
          </Selector>
          <Selector
            number="2"
            label="ระดับข้อมูล"
            value={selections.policy}
            onChange={(event) => onSelection("policy", event.target.value)}
          >
            {dataPolicies.map((policy) => (
              <option value={policy.id} key={policy.id}>
                {policy.label}
              </option>
            ))}
          </Selector>
          <Selector
            number="3"
            label="ผลลัพธ์ที่ต้องการ"
            value={selections.output}
            onChange={(event) => onSelection("output", event.target.value)}
          >
            {outputModes.map((output) => (
              <option value={output.id} key={output.id}>
                {output.label}
              </option>
            ))}
          </Selector>
          <button className="generate-button" type="button" onClick={onGenerate}>
            <span aria-hidden="true">✦</span>
            {briefReady ? "อัปเดต Mission Brief" : "สร้าง Mission Brief"}
          </button>
        </div>
      </div>

      <article className="team-output" aria-live="polite">
        <h2>ทีมที่แนะนำ</h2>
        <div className="routing-field" aria-hidden="true">
          <span className="route route-one" />
          <span className="route route-two" />
          <span className="route route-three" />
          <i className="decision-pulse" />
        </div>
        <div className="team-chain">
          <TeamNode type="lead" name={plan.lead} role={plan.leadRole} />
          <span className="chain-arrow" aria-hidden="true">
            →
          </span>
          <TeamNode type="reviewer" name={plan.reviewer} role={plan.reviewerRole} />
          <span className="chain-arrow" aria-hidden="true">
            →
          </span>
          <TeamNode type="human" name="มนุษย์" role="ผู้อนุมัติ" icon="◎" />
        </div>
        <div className="verification-strip">
          {["ข้อเท็จจริง", "แหล่งอ้างอิง", "ข้อมูลอ่อนไหว", "ผู้รับผิดชอบ"].map(
            (label) => (
              <span key={label}>
                <i>✓</i>
                {label}
              </span>
            ),
          )}
        </div>
        <p className="data-rule">
          <span>กติกาข้อมูล</span>
          {plan.policy.rule}
        </p>
        <p className="routing-note">
          คำแนะนำระดับบทบาท — ตรวจรุ่น บริการ และนโยบายข้อมูลจริงก่อนใช้
        </p>
        <a className="quiet-action" href="#brief">
          ดู Mission Brief
          <span aria-hidden="true">↘</span>
        </a>
      </article>
      <div className="next-preview" aria-hidden="true">
        <span>MISSION BRIEF</span>
        <i />
      </div>
    </section>
  );
}

function MissionBrief({ plan, briefReady }) {
  const [copied, setCopied] = useState(false);

  async function copyBrief() {
    await navigator.clipboard.writeText(plan.prompt);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <section className={`brief-section ${briefReady ? "generated" : ""}`} id="brief">
      <div className="section-title">
        <h2>Mission Brief ที่เอาไปใช้ต่อได้จริง</h2>
        <p>ไม่ใช่แค่บอกชื่อโมเดล แต่จัดบทบาท ขั้นตอน และจุดตรวจให้ครบ</p>
      </div>
      <div className="brief-document">
        <div className="brief-fields">
          {[
            ["ภารกิจ", plan.task, "target"],
            ["บริบทและข้อจำกัด", `${plan.policy.brief} · ${plan.output.label}`, "shield"],
            ["ทีม AI", `${plan.lead} → ${plan.reviewer} → Human Gate`, "human"],
            ["แนวทางส่งมอบ", plan.output.delivery, "document"],
          ].map(([label, value, icon]) => (
            <div className="brief-field" key={label}>
              <span>
                <Icon name={icon} />
                {label}
              </span>
              <strong>{value}</strong>
            </div>
          ))}
        </div>
        <div className="prompt-panel">
          <div className="prompt-heading">
            <span>&lt;/&gt;</span>
            <h3>คำสั่งพร้อมใช้</h3>
          </div>
          <pre>{plan.prompt}</pre>
          <button type="button" onClick={copyBrief}>
            <Icon name="copy" />
            {copied ? "คัดลอกแล้ว" : "คัดลอก Mission Brief"}
          </button>
        </div>
      </div>
    </section>
  );
}

function Protocol() {
  return (
    <section className="protocol-section" id="protocol">
      <div className="section-title">
        <h2>หนึ่งโจทย์ ไม่ใช่หนึ่งโมเดล</h2>
        <p>ทุกผลลัพธ์ต้องผ่านบทบาทที่ต่างกัน ก่อนถึงผู้ตัดสินใจ</p>
      </div>
      <div className="protocol-line">
        <span className="protocol-beam" aria-hidden="true" />
        {gates.map(([number, title, description, icon]) => (
          <article key={title}>
            <span className="gate-number">{number}</span>
            <span className="gate-icon">
              <Icon name={icon} />
            </span>
            <h3>{title}</h3>
            <p>{description}</p>
          </article>
        ))}
      </div>
      <p className="protocol-principle">
        <span>AI ช่วยคิด</span>
        <i>·</i>
        <strong>มนุษย์รับผิดชอบ</strong>
      </p>
    </section>
  );
}

function ModelRoles() {
  return (
    <section className="roles-section" id="roles">
      <div className="section-title split">
        <div>
          <h2>คลังบทบาทโมเดล</h2>
          <p>เลือกบทบาทให้เหมาะกับภารกิจ ไม่ยึดติดกับค่ายเดียว</p>
        </div>
        <span>7 MODEL FAMILIES</span>
      </div>
      <div className="role-rail">
        {models.map((model, index) => (
          <article
            className="role-row"
            style={{ "--model-color": model.color, "--model-glow": model.glow }}
            key={model.name}
          >
            <span className="role-index">{String(index + 1).padStart(2, "0")}</span>
            <span className="role-monogram">{model.monogram}</span>
            <strong>{model.name}</strong>
            <em>{model.role}</em>
            <p>{model.summary}</p>
            <span className="role-best">
              <small>เหมาะกับ</small>
              {model.bestFor}
            </span>
          </article>
        ))}
      </div>
    </section>
  );
}

function Safety() {
  return (
    <section className="safety-section" id="safety">
      <div>
        <h2>
          ใช้ AI อย่างชาญฉลาด
          <span>ยืนยันโดยมนุษย์ ปกป้องข้อมูลเสมอ</span>
        </h2>
        <p>
          ตรวจชื่อ ตัวเลข วันเวลา กฎหมาย แหล่งอ้างอิง
          และระดับชั้นข้อมูลก่อนนำไปใช้จริง
        </p>
      </div>
      <div className="safety-checks">
        {["ยืนยันข้อเท็จจริง", "ปกปิดข้อมูลอ่อนไหว", "อ้างอิงแหล่งที่มา", "มนุษย์รับผิดชอบ"].map(
          (label, index) => (
            <span key={label}>
              <i>{String(index + 1).padStart(2, "0")}</i>
              {label}
            </span>
          ),
        )}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer>
      <Brand />
      <p>AI ช่วยคิด · มนุษย์รับผิดชอบ</p>
      <nav aria-label="เมนูส่วนท้าย">
        {navItems.map(([label, id]) => (
          <a href={`#${id}`} key={id}>
            {label}
          </a>
        ))}
      </nav>
      <small>© 2026 TOPMANIDMB</small>
    </footer>
  );
}

export default function App() {
  const [selections, setSelections] = useState({
    mission: 0,
    policy: "general",
    output: "present",
  });
  const [briefReady, setBriefReady] = useState(false);
  const plan = useMemo(
    () => createMissionPlan(selections.mission, selections.policy, selections.output),
    [selections],
  );

  function updateSelection(key, value) {
    setSelections((current) => ({ ...current, [key]: value }));
    setBriefReady(false);
  }

  function generateBrief() {
    setBriefReady(true);
    window.setTimeout(() => {
      document.querySelector("#brief")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 180);
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -32px" },
    );

    document
      .querySelectorAll(".section-title, .brief-document, .protocol-line, .role-row, .safety-section")
      .forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="app-shell">
      <Header />
      <main>
        <MissionConsole
          plan={plan}
          selections={selections}
          onSelection={updateSelection}
          onGenerate={generateBrief}
          briefReady={briefReady}
        />
        <MissionBrief plan={plan} briefReady={briefReady} />
        <Protocol />
        <ModelRoles />
        <Safety />
      </main>
      <Footer />
    </div>
  );
}
