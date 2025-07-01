const canvas = document.getElementById("receiptCanvas");
const ctx = canvas.getContext("2d");
const morning = document.getElementById("morning");
const afternoon = document.getElementById("afternoon");
const downloadBtn = document.getElementById("downloadBtn");
const back = document.getElementById("back")

function getCurrentDay() {
    const now = new Date();
    return now.toLocaleDateString("en-GB", {
      weekday: "long"
    });
  }
  
function getFormattedDate() {
  const date = new Date();
  const day = String(date.getDate()).padStart(2, "0");
  const month = date.toLocaleString("en-GB", { month: "long" });
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
}

function drawHorizontallyCenteredText(ctx, text, centerX, y) {
    // Set the font before measuring
    ctx.font = "600 69px 'IBM Plex Sans'";
  
    // Measure the width of the text
    const textWidth = ctx.measureText(text).width;
  
    // Calculate the X position so the text is centered
    const x = centerX - (textWidth / 2);
  
    // Draw the text
    ctx.fillText(text, x, y);
  }
  

  function drawTable(day, date, isMorning) {
    canvas.width = 4419;
    canvas.height = 6250;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  
    const loadImage = src => new Promise(resolve => {
      const img = new Image();
      img.src = src;
      img.onload = () => resolve(img);
    });
  
    const loadFonts = () => {
      return document.fonts.load("600 69px 'IBM Plex Sans'").then(() => document.fonts.ready);
    };
  
    return Promise.all([
      loadImage("./images/morning.png"),
      loadImage("./images/afternoon.png"),
      loadFonts()
    ]).then(([morningImg, afternoonImg]) => {
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
  
      if (isMorning){
          ctx.drawImage(morningImg, 0, 0);
      } else {
          ctx.drawImage(afternoonImg, 0, 0);
      }
  
      ctx.font = "600 69px 'IBM Plex Sans', sans-serif";
      ctx.fillStyle = "black";
      drawHorizontallyCenteredText(ctx, day, 2565, 5555);
      ctx.fillText(date, 2359, 5650);
    });
  }

  


morning.addEventListener("click", async function (e) {
  const date = getFormattedDate();
  const day = getCurrentDay();
  const isMorning = true;

  await drawTable(day, date, isMorning); // Wait until drawing is done

  // Only runs after everything is drawn
  morning.style.display = "none";
  afternoon.style.display = "none";
  downloadBtn.style.display = "block";
  back.style.display = "block";
});


afternoon.addEventListener("click", async function (e) {
  const date = getFormattedDate();
  const day = getCurrentDay();
  const isMorning = false;

  await drawTable(day, date, isMorning); // Wait for drawing to finish

  // These run *after* the table is fully drawn
  morning.style.display = "none";
  afternoon.style.display = "none";
  downloadBtn.style.display = "block";
  back.style.display = "block";
});


downloadBtn.addEventListener("click", function () {
  canvas.toBlob(function (blob) {
    const a = document.createElement("a");
    a.download = "canvas-image.png";
    a.href = URL.createObjectURL(blob);
    a.click();
  }, "image/png");

  downloadBtn.style.display = "none";
  back.style.display = "none";
  morning.style.display = 'block';
  afternoon.style.display = 'block';
});


back.addEventListener('click', (e) => {
    downloadBtn.style.display = "none";
    back.style.display = "none";
    morning.style.display = 'block';
    afternoon.style.display = 'block';
})
