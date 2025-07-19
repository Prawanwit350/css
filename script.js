const buildings = [
  { code: "101", name: "อาคารพัฒนาวิศัยทัศน์" },
  { code: "102", name: "ประเสริฐ ณ นคร" },
];
const roomsByBuilding = {
  "101": ["101", "102", "103"],
  "102": ["201", "202"],
};
const scheduleData = {
  "101|101": {
    timeslots: ["08:00-09:00","09:00-10:00","10:00-11:00"],
    entries: [
      { day:"จันทร์", time:"08:00-09:00", code:"10301231", group:"(3),1", room:"101" },
      { day:"อังคาร", time:"09:00-10:00", code:"10301112", group:"(3),1", room:"101" },
      { day:"พฤหัสบดี", time:"10:00-11:00", code:"10301223", group:"(3),1", room:"101" },
    ]
  }
};

const buildingSelect = document.getElementById("buildingSelect");
const roomSelect = document.getElementById("roomSelect");
const loadBtn = document.getElementById("loadBtn");
const tableContainer = document.getElementById("tableContainer");

// init buildings
buildings.forEach(b => {
  const o = document.createElement("option");
  o.value = b.code;
  o.textContent = `${b.code} - ${b.name}`;
  buildingSelect.appendChild(o);
});

buildingSelect.addEventListener("change", () => {
  const b = buildingSelect.value;
  roomSelect.innerHTML = '<option value="">-- เลือกห้อง --</option>';
  if (!b) {
    roomSelect.disabled = true;
    loadBtn.disabled = true;
    return;
  }
  roomsByBuilding[b].forEach(r => {
    const o = document.createElement("option");
    o.value = r;
    o.textContent = r;
    roomSelect.appendChild(o);
  });
  roomSelect.disabled = false;
  loadBtn.disabled = true;
});

roomSelect.addEventListener("change", () => {
  loadBtn.disabled = !roomSelect.value;
});

loadBtn.addEventListener("click", () => {
  const b = buildingSelect.value, r = roomSelect.value;
  const key = `${b}|${r}`;
  if (!scheduleData[key]) {
    tableContainer.innerHTML = `<p>ไม่มีข้อมูลตาราง</p>`;
    return;
  }
  renderTable(scheduleData[key]);
});

function renderTable(data) {
  const days = ["จันทร์","อังคาร","พุธ","พฤหัสบดี","ศุกร์"];
  let html = `<table><thead><tr><th>วัน\\เวลา</th>`;
  data.timeslots.forEach(t => html += `<th>${t}</th>`);
  html += `</tr></thead><tbody>`;
  
  days.forEach(day => {
    html += `<tr><th>${day}</th>`;
    data.timeslots.forEach(time => {
      const e = data.entries.find(item => item.day === day && item.time === time);
      if (e) {
        html += `<td data-label="${day} ${time}">${e.code}<br>${e.group}<br>${e.room}</td>`;
      } else {
        html += `<td class="empty" data-label="${day} ${time}">-</td>`;
      }
    });
    html += "</tr>";
  });
  html += "</tbody></table>";
  tableContainer.innerHTML = html;
}
