import { models, routes } from "./data";

function ModelNode({ model, className = "" }) {
  return (
    <article
      className={`model-node ${className}`}
      style={{ "--accent": model.color, "--glow": model.glow }}
      aria-label={`${model.name}: ${model.role}`}
    >
      <span className="node-mark" aria-hidden="true">
        {model.monogram}
      </span>
      <div>
        <h3>{model.name}</h3>
        <p>{model.role}</p>
      </div>
    </article>
  );
}

function OrbitMap() {
  const center = models[0];
  const satellites = models.slice(1);

  return (
    <section className="orbit-section" aria-label="แผนผังบทบาท AI">
      <div className="orbit-rings" aria-hidden="true" />
      <div className="orbit-lines" aria-hidden="true">
        {satellites.map((model, index) => (
          <span key={model.name} className={`orbit-line line-${index + 1}`} />
        ))}
      </div>
      <ModelNode model={center} className="center-node" />
      {satellites.map((model, index) => (
        <ModelNode
          key={model.name}
          model={model}
          className={`satellite-node satellite-${index + 1}`}
        />
      ))}
    </section>
  );
}

function RoleRail() {
  return (
    <section className="role-section" aria-labelledby="role-title">
      <div className="section-heading">
        <h2 id="role-title">บทบาทเด่นของแต่ละหน่วย</h2>
        <p>เลือกตามภารกิจ แล้วใช้ข้ามค่ายเพื่อตรวจทานกัน</p>
      </div>
      <div className="role-rail">
        {models.map((model) => (
          <article
            key={model.name}
            className="role-row"
            style={{ "--accent": model.color, "--glow": model.glow }}
          >
            <div className="role-name">
              <span className="role-monogram" aria-hidden="true">
                {model.monogram}
              </span>
              <strong>{model.name}</strong>
              <span>{model.role}</span>
            </div>
            <p>{model.summary}</p>
            <div className="role-best">
              <span>เหมาะกับ</span>
              {model.bestFor}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function RoutingMatrix() {
  return (
    <section className="routing-section" aria-labelledby="routing-title">
      <div className="section-heading compact">
        <h2 id="routing-title">ภารกิจไหน ใช้โมเดลไหนดี?</h2>
        <p>ลำดับแนะนำเชิงใช้งาน ไม่ใช่คะแนน benchmark</p>
      </div>
      <div className="routing-table" role="table" aria-label="ตารางเลือก AI ตามภารกิจ">
        <div className="routing-row routing-head" role="row">
          <span role="columnheader">ภารกิจ</span>
          <span role="columnheader">ตัวหลัก</span>
          <span role="columnheader">ตัวช่วยตรวจทาน</span>
        </div>
        {routes.map(([task, primary, support]) => (
          <div className="routing-row" role="row" key={task}>
            <span role="cell">{task}</span>
            <strong role="cell">{primary}</strong>
            <span role="cell">{support}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function SafetyStrip() {
  return (
    <section className="safety-strip" aria-labelledby="safety-title">
      <div className="shield" aria-hidden="true">
        ✓
      </div>
      <div className="safety-copy">
        <h2 id="safety-title">
          ใช้ AI อย่างชาญฉลาด <em>ยืนยันโดยมนุษย์ ปกป้องข้อมูลเสมอ</em>
        </h2>
        <p>
          ตรวจชื่อ ตัวเลข วันเวลา กฎหมาย แหล่งอ้างอิง และระดับชั้นข้อมูลก่อนนำไปใช้จริง
        </p>
      </div>
      <div className="safety-points" aria-label="หลักปฏิบัติ">
        <span>ยืนยันข้อเท็จจริง</span>
        <span>ปกปิดข้อมูลอ่อนไหว</span>
        <span>อ้างอิงแหล่งที่มา</span>
        <span>มนุษย์รับผิดชอบ</span>
      </div>
    </section>
  );
}

export default function App() {
  return (
    <main className="page-shell">
      <article className="poster">
        <div className="ambient ambient-one" aria-hidden="true" />
        <div className="ambient ambient-two" aria-hidden="true" />

        <header className="poster-header">
          <h1>
            เลือก <span>AI</span> ให้ตรงภารกิจ
          </h1>
          <p>
            ไม่มีโมเดลเดียวชนะทุกงาน — ใช้ให้เหมาะ ใช้เสริมกัน
            และให้มนุษย์เป็นผู้ตัดสินใจ
          </p>
        </header>

        <OrbitMap />
        <RoleRail />
        <RoutingMatrix />
        <SafetyStrip />

        <footer>
          <span aria-hidden="true">◇</span>
          AI คือเครื่องมือ — ความสำเร็จอยู่ที่โจทย์ กระบวนการ และวิจารณญาณของเรา
        </footer>
      </article>
    </main>
  );
}
