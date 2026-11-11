const fs = require('fs');
const path = require('path');

const targetDir = 'client/public/images';
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}
const rootTargetDir = 'images';
if (!fs.existsSync(rootTargetDir)) {
  fs.mkdirSync(rootTargetDir, { recursive: true });
}

// Key curated photos from the Drive folder
const keyPhotos = [
  { id: '1bjOlSya705wj0bvlkRkxI7bNVkLbKo1W', filename: 'exam_hall_1.jpg', label: 'Sai Prudent SSE Exam Hall 1' },
  { id: '1uvdOSvl_lW0eeU0D0XZTingsn5ODVqbu', filename: 'exam_hall_2.jpg', label: 'Sai Prudent SSE Exam Hall 2' },
  { id: '1umCkeRnDiXhqUGjAb-jKdKmwLJLuT_0Y', filename: 'sps_banner_2025.png', label: 'SSE-SSB Sai Prudent 2025 Banner' },
  { id: '1LQZZA5mvvQJ6eL9SdndTFp_aYO7cGXMB', filename: 'official_banner.jpg', label: 'Official SPS Banner' },
  { id: '1I8d7ZBa6utQCZZCLGmnE2w-RQw8N4_A1', filename: 'campus_life_1.jpg', label: 'DSC_1204 Campus Life' },
  { id: '1YfHoDRsa0pceU1JAFyvthvtn6Jdki-1n', filename: 'felicitation_1.jpg', label: 'DSC_2115 Felicitation' },
  { id: '1WkSn_7wh6rU8pEpN-JyxNPcQrIv7Eix8', filename: 'felicitation_2.jpg', label: 'DSC_2118 Felicitation Ceremony' },
  { id: '1hYlp9w4YY0u2ReM55FR4LEkDTdwepoR-', filename: 'felicitation_3.jpg', label: 'DSC_2126 Prize Distribution' },
  { id: '1RAIbPjhiIbjP9cz621V-Y0wQxEgcTE9O', filename: 'students_group_1.jpg', label: 'DSC_3117 Students Group' },
  { id: '1ogQYqvif5EnIQ6DlFB_J261Fvj1xqO2M', filename: 'campus_building_1.jpg', label: 'DSC_3262 Sanskrithi Campus' },
  { id: '1UkjKv6sICw-ZYRwcxifPXyKx9W3EBode', filename: 'auditorium_1.jpg', label: 'DSC_3569 Auditorium' },
  { id: '1kx52BrOfhy6KphXJwumKYawlgTQ6Rlp5', filename: 'exam_hall_3.jpg', label: 'DSC_7837 Exam in Progress' },
  { id: '1aqLHnvP-jhys4yXUOhj9x4G8qFJdf5iM', filename: 'exam_hall_4.jpg', label: 'DSC_7908 Students Writing Exam' },
  { id: '1MRHzPpX6IxplzJXnIT_35VKJ4p3N2rI2', filename: 'exam_hall_5.jpg', label: 'DSC_7912 Exam Hall View' },
  { id: '1NgDpYFkJTSr3yJ0KemFqhpLACKCGRY8G', filename: 'laptop_award_1.jpg', label: 'DSC_8388 Laptop Award' },
  { id: '1FUrjgnW1ph1xOTPv4sb2Nv9a29AzIEYO', filename: 'award_stage_1.jpg', label: 'DSC_8420 Award Ceremony Stage' }
];

async function downloadOne(item) {
  // Direct Google usercontent thumbnail endpoint allows fetching high-res image without OAuth!
  const url = `https://lh3.googleusercontent.com/d/${item.id}=w1200`;
  try {
    const res = await fetch(url);
    if (!res.ok) {
      // Fallback to export=download
      const dlRes = await fetch(`https://drive.google.com/uc?export=download&id=${item.id}`);
      if (dlRes.ok) {
        const buffer = Buffer.from(await dlRes.arrayBuffer());
        fs.writeFileSync(path.join(targetDir, item.filename), buffer);
        fs.writeFileSync(path.join(rootTargetDir, item.filename), buffer);
        console.log(`[OK fallback] ${item.filename} (${buffer.length} bytes)`);
        return true;
      }
      console.log(`[FAILED] ${item.filename} (HTTP ${res.status})`);
      return false;
    }
    const buffer = Buffer.from(await res.arrayBuffer());
    fs.writeFileSync(path.join(targetDir, item.filename), buffer);
    fs.writeFileSync(path.join(rootTargetDir, item.filename), buffer);
    console.log(`[OK] ${item.filename} (${buffer.length} bytes)`);
    return true;
  } catch (err) {
    console.log(`[ERR] ${item.filename}: ${err.message}`);
    return false;
  }
}

async function run() {
  console.log('Downloading key photos from Google Drive...');
  for (const item of keyPhotos) {
    await downloadOne(item);
  }
  console.log('Done downloading photos.');
}

run();

