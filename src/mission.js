import { models, routes } from "./data";

export const dataPolicies = [
  {
    id: "general",
    label: "ข้อมูลทั่วไป",
    brief: "ข้อมูลทั่วไป",
    rule: "ตรวจข้อเท็จจริงและแหล่งอ้างอิงก่อนส่งมอบ",
  },
  {
    id: "sensitive",
    label: "ข้อมูลอ่อนไหว",
    brief: "ข้อมูลอ่อนไหว · ต้องปกปิดข้อมูลระบุตัวบุคคล",
    rule: "ตัดข้อมูลระบุตัวบุคคลและตรวจระดับชั้นข้อมูลก่อนใช้เครื่องมือ",
  },
  {
    id: "local",
    label: "ต้องทำในเครื่อง",
    brief: "ประมวลผลในระบบที่ควบคุมเอง",
    rule: "ใช้ Local AI และไม่ส่งข้อมูลดิบออกนอกระบบที่ควบคุม",
  },
];

export const outputModes = [
  {
    id: "present",
    label: "พร้อมนำเสนอ",
    delivery: "สรุปประเด็นสำคัญ · แยกข้อเท็จจริง · ระบุสิ่งที่ต้องยืนยัน",
  },
  {
    id: "review",
    label: "ร่างเพื่อทบทวน",
    delivery: "ร่างอย่างมีโครงสร้าง · ชี้จุดไม่แน่นอน · เปิดทางให้แก้ไข",
  },
  {
    id: "checklist",
    label: "รายการตรวจสอบ",
    delivery: "แยกเป็นข้อปฏิบัติ · ระบุผู้รับผิดชอบ · กำหนดจุดอนุมัติ",
  },
];

function findModel(name) {
  return models.find((model) => name.includes(model.name));
}

export function createMissionPlan(missionIndex, policyId, outputId) {
  const route = routes[missionIndex];
  const policy = dataPolicies.find((item) => item.id === policyId) ?? dataPolicies[0];
  const output = outputModes.find((item) => item.id === outputId) ?? outputModes[0];
  const isLocal = policy.id === "local";

  const lead = isLocal ? "Qwen" : route[1];
  const reviewer = isLocal ? "GLM · DeepSeek" : route[2];
  const leadModel = findModel(lead);
  const reviewerModel = findModel(reviewer);

  const prompt = [
    "คุณคือทีม AI ที่ทำงานแบบหลายบทบาทตามโปรโตคอล 4-Gate",
    `ภารกิจ: ${route[0]}`,
    `บริบทและข้อจำกัด: ${policy.brief} · ${output.label}`,
    `ทีม AI: ${lead} → ${reviewer} → Human Gate`,
    `แนวทางส่งมอบ: ${output.delivery}`,
    "",
    "ขั้นตอนการทำงาน:",
    "1) FRAME: กำหนดผลลัพธ์ ผู้รับ และข้อจำกัด",
    `2) LEAD: ${lead} สร้างคำตอบชุดแรก`,
    `3) RED TEAM: ${reviewer} ตรวจข้อขัดแย้งและแหล่งอ้างอิง`,
    "4) HUMAN GATE: มนุษย์ตรวจทานและอนุมัติก่อนนำไปใช้จริง",
    "",
    `กติกาข้อมูล: ${policy.rule}`,
    "ห้ามแต่งข้อเท็จจริง หากไม่แน่ใจให้ระบุสิ่งที่ต้องยืนยันเพิ่ม",
  ].join("\n");

  return {
    task: route[0],
    lead,
    reviewer,
    leadRole: leadModel?.role ?? "ตัวหลัก",
    reviewerRole: reviewerModel?.role ?? "ตัวตรวจทาน",
    policy,
    output,
    prompt,
  };
}

