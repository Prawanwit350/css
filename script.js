const buildings = [
  { code: "SCI", name: "คณะวิทยาศาสตร์" },
  // เพิ่มอาคารอื่นๆ ได้
];

const rooms = {
  "SCI": [
    { code: "LAB คอม3-4", name: "ประเภท : ไม่กำหนด ความจุ : 120 พื้นที่ : 120" }
  ]
};

const schedule = {
  "LAB คอม3-4": {
    "จันทร์": {
      "9:00-12:00": "10301231<br>(3) 1,<br>L1",
      "13:00-15:00": "10301222<br>(3) 1,<br>L1"
    },
    "อังคาร": {
      "8:00-10:00": "10301231<br>(3) 1,<br>L1",
      "13:00-15:00": "10301225<br>(3) 1,<br>L1"
    },
    "พุธ": {
      "9:00-12:00": "10301112<br>(3) 1,<br>L1"
    },
    "พฤหัสบดี": {
      "9:00-12:00": "10301222<br>(3) 1,<br>L1",
      "13:00-15:00": "10301223<br>(3) 1,<br>L1"
    },
    "ศุกร์": {
      "9:00-12:00": "10301111<br>(3) 1,<br>L1",
      "13:00-16:00": "10301223<br>(3) 1,<br>L1"
    }
  }
};

const buildingSelect = document.getElementById("buildingSelect");
const roomSelect = document.getElementById("roomSelect");
const scheduleBody = document.getElementById("scheduleBody");

buildings.forEach(b => {
  const opt = document.createElement("option");
  opt.value = b.code;
  opt.textContent = `${b.code} - ${b.name}`;
  buildingSelect.appendChild(opt);
});

buildingSelect.addEventListener("change", () => {
  const bCode = buildingSelect.value;
  roomSelect.innerHTML = `<option value="">-- เลือกห้อง --</option>`;
  if (rooms[bCode]) {
    rooms[bCode].forEach(r => {
      const opt = document.createElement("option");
      opt.value = r.code;
      opt.textContent = `${r.code} ${r.name}`;
      roomSelect.appendChild(opt);
    });
  }
});

roomSelect.addEventListener("change", () => {
  const rCode = roomSelect.value;
  renderSchedule(rCode);
});

function renderSchedule(roomCode) {
  const times = [
    "8:00-9:00", "9:00-10:00", "10:00-11:00", "11:00-12:00",
    "12:00-13:00", "13:00-14:00", "14:00-15:00", "15:00-16:00"
  ];
  const days = ["จันทร์", "อังคาร", "พุธ", "พฤหัสบดี", "ศุกร์"];

  scheduleBody.innerHTML = "";

  days.forEach(day => {
    const tr = document.createElement("tr");
    const th = document.createElement("th");
    th.textContent = day;
    tr.appendChild(th);

    times.forEach(time => {
      const td = document.createElement("td");
      const classData = schedule[roomCode]?.[day]?.[time] || "";
      if (classData) {
        td.innerHTML = classData;
        td.classList.add("active");
      }
      tr.appendChild(td);
    });

    scheduleBody.appendChild(tr);
  });
}
