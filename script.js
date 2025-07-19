const roomData = {
  "Lab คอม3-4": [
    {
      name: "Lab คอม3-4",
      code: "LAB-COM34",
      schedule: {
        "จันทร์": {
          "9:00-12:00": { subject: "10301231", section: "1", group: "L1" },
          "13:00-15:00": { subject: "10301222", section: "1", group: "L1" }
        },
        "อังคาร": {
          "8:00-10:00": { subject: "10301231", section: "1", group: "L1" },
          "13:00-14:00": { subject: "10301225", section: "1", group: "L1" }
        },
        "พุธ": {
          "9:00-12:00": { subject: "10301112", section: "1", group: "L1" }
        },
        "พฤหัสบดี": {
          "9:00-12:00": { subject: "10301222", section: "1", group: "L1" },
          "13:00-15:00": { subject: "10301223", section: "1", group: "L1" }
        },
        "ศุกร์": {
          "9:00-12:00": { subject: "10301111", section: "1", group: "L1" },
          "13:00-16:00": { subject: "10301223", section: "1", group: "L1" }
        }
      }
    }
  ]
};

const buildingSelect = document.getElementById("buildingSelect");
const roomSelect = document.getElementById("roomSelect");
const scheduleContainer = document.getElementById("scheduleContainer");

buildingSelect.addEventListener("change", () => {
  const building = buildingSelect.value;
  roomSelect.innerHTML = `<option value="">-- เลือกห้อง --</option>`;
  if (roomData[building]) {
    roomData[building].forEach(room => {
      const opt = document.createElement("option");
      opt.value = room.code;
      opt.textContent = `${room.name} ประเภท: ไม่กำหนด ความจุ: 120 พื้นที่: 120`;
      roomSelect.appendChild(opt);
    });
    roomSelect.disabled = false;
  } else {
    roomSelect.disabled = true;
  }
  scheduleContainer.innerHTML = "";
});

roomSelect.addEventListener("change", () => {
  const building = buildingSelect.value;
  const selectedRoom = roomData[building].find(r => r.code === roomSelect.value);
  if (selectedRoom) {
    renderSchedule(selectedRoom.schedule);
  }
});

function renderSchedule(schedule) {
  const times = ["8:00-9:00", "9:00-10:00", "10:00-11:00", "11:00-12:00", "12:00-13:00", "13:00-14:00", "14:00-15:00", "15:00-16:00"];
  const days = ["จันทร์", "อังคาร", "พุธ", "พฤหัสบดี", "ศุกร์"];

  let html = `<table><thead><tr><th>Day/Time</th>`;
  times.forEach(t => html += `<th>${t}</th>`);
  html += `</tr></thead><tbody>`;

  days.forEach(day => {
    html += `<tr><th>${day}</th>`;
    times.forEach(time => {
      const entry = schedule[day]?.[time];
      if (entry) {
        html += `<td class="highlight">${entry.subject}<br>(3) ${entry.section},<br>${entry.group}</td>`;
      } else {
        html += `<td></td>`;
      }
    });
    html += `</tr>`;
  });

  html += `</tbody></table>`;
  scheduleContainer.innerHTML = html;
}
