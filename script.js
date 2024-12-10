// script.js
document.getElementById('generateBtn').addEventListener('click', handleFileUpload);

function handleFileUpload() {
  const fileInput = document.getElementById('fileInput');
  if (!fileInput.files[0]) {
    alert("Please upload a CSV file.");
    return;
  }

  const reader = new FileReader();
  reader.onload = function (event) {
    const csvData = event.target.result;
    const rows = csvData.split("\n").map(row => row.split(","));
    generateCertificates(rows);
  };
  reader.readAsText(fileInput.files[0]);
}

function generateCertificates(data) {
  const canvas = document.getElementById('certificateCanvas');
  const ctx = canvas.getContext('2d');
  const preview = document.getElementById('preview');
  const downloadArea = document.getElementById('downloadArea');
  const linksDiv = document.getElementById('certificateLinks');
  
  canvas.width = 800;
  canvas.height = 600;

  linksDiv.innerHTML = ""; // Clear previous links
  preview.classList.remove('hidden');
  downloadArea.classList.remove('hidden');

  data.forEach((row, index) => {
    const [name] = row;

    // Create certificate design
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#4CAF50";
    ctx.font = "40px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Certificate of Participation", canvas.width / 2, 150);

    ctx.fillStyle = "#000";
    ctx.font = "30px Arial";
    ctx.fillText(`Presented to: ${name}`, canvas.width / 2, 300);

    ctx.font = "20px Arial";
    ctx.fillText("For outstanding participation in the event", canvas.width / 2, 400);

    // Generate download link
    const link = document.createElement('a');
    link.href = canvas.toDataURL();
    link.download = `Certificate_${name.trim()}.png`;
    link.textContent = `Download ${name}`;
    linksDiv.appendChild(link);

    // Preview first certificate
    if (index === 0) {
      const img = new Image();
      img.src = canvas.toDataURL();
      img.onload = () => ctx.drawImage(img, 0, 0);
    }
  });
}

document.getElementById('downloadAllBtn').addEventListener('click', () => {
  const links = document.getElementById('certificateLinks').querySelectorAll('a');
  links.forEach(link => link.click());
});
