document.getElementById('loadBtn').addEventListener('click', async () => {
  const sem = document.getElementById('semester').value;
  const date = document.getElementById('dateInput').value;
  const container = document.getElementById('tableContainer');

  const res = await fetch(`api/room_time.php?semester=${sem}&date=${date}`);
  const data = await res.json();

  // สร้างตาราง
  let html = '<table><thead><tr><th>เวลา\\ห้อง</th>';
  data.rooms.forEach(r => html += `<th>${r}</th>`);
  html += '</tr></thead><tbody>';

  data.timeslots.forEach(ts => {
    html += `<tr><th>${ts}</th>`;
    data.rooms.forEach(room => {
      const e = data.entries.find(x => x.timeslot===ts && x.room===room);
      html += e ? `<td>${e.subject}<br><small>${e.teacher}</small></td>` : '<td>-</td>';
    });
    html += '</tr>';
  });

  html += '</tbody></table>';
  container.innerHTML = html;
});
