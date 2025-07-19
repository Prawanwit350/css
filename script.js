const roomSelect = document.getElementById('roomSelect');
const dateInput = document.getElementById('dateInput');
const loadBtn = document.getElementById('loadBtn');
const tableContainer = document.getElementById('tableContainer');

// ตัวอย่างรายชื่ออาคาร
const buildings = [
  { code: "101", name: "อาคารพัฒนาวิศัยทัศน์" },
  { code: "102", name: "ประเสริฐ ณ นคร" },
  { code: "103", name: "สมิตตานนท์" },
];

// ตัวอย่างข้อมูลจำลอง
const mockData = {
  "101": {
    rooms: ["101"],
    timeslots: ["08:00-09:00", "09:00-10:00", "10:00-11:00"],
    entries: [
      { timeslot: "08:00-09:00", room: "101", subject: "โครงสร้างข้อมูล", teacher: "อ.สมชาย" },
      { timeslot: "09:00-10:00", room: "101", subject: "ระบบฐานข้อมูล", teacher: "อ.วิรัตน์" },
    ]
  }
};

// เติม dropdown
buildings.forEach(b => {
  const opt = document.createElement('option');
  opt.value = b.code;
  opt.textContent = `${b.code} - ${b.name}`;
  roomSelect.appendChild(opt);
});

loadBtn.onclick = () => {
  const code = roomSelect.value;
  if (!code) {
    tableContainer.innerHTML = '<p>กรุณาเลือกอาคาร</p>';
    return;
  }

  const data = mockData[code] || { rooms: [], timeslots: [], entries: [] };
  renderTable(data);
};

function renderTable(data) {
  if (!data.rooms.length) {
    tableContainer.innerHTML = '<p>ไม่มีข้อมูลสำหรับอาคารที่เลือก</p>';
    return;
  }

  let html = '<table><thead><tr><th>เวลา\\ห้อง</th>';
  data.rooms.forEach(r => html += `<th>${r}</th>`);
  html += '</tr></thead><tbody>';

  data.timeslots.forEach(ts => {
    html += `<tr><th>${ts}</th>`;
    data.rooms.forEach(r => {
      const e = data.entries.find(en => en.timeslot === ts && en.room === r);
      if (e) {
        html += `<td data-label="เวลา: ${ts}, ห้อง: ${r}">${e.subject}<br><small>${e.teacher}</small></td>`;
      } else {
        html += `<td data-label="เวลา: ${ts}, ห้อง: ${r}" class="empty">–</td>`;
      }
    });
    html += '</tr>';
  });

  html += '</tbody></table>';
  tableContainer.innerHTML = html;
}
