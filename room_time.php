<?php
header('Content-Type: application/json');
$date = $_GET['date'] ?? '';
$sem = $_GET['semester'] ?? '1';

// โม๊คข้อมูล ตัวอย่าง
$rooms = ["ICT 101","ICT 102","Lab A"];
$timeslots = ["08:00‑09:00","09:00‑10:00","10:00‑11:00"];
$entries = [
  ["timeslot"=>"08:00‑09:00","room"=>"ICT 101","subject"=>"โปรแกรม","teacher"=>"อ.เอ"],
  ["timeslot"=>"09:00‑10:00","room"=>"Lab A","subject"=>"โครงสร้าง","teacher"=>"อ.บี"],
];

echo json_encode(compact('rooms','timeslots','entries'));
