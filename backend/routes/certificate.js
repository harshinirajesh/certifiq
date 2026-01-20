const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const { createCanvas, loadImage } = require("canvas");
const multer = require("multer");
const xlsx = require("xlsx");
const archiver = require("archiver");

const upload = multer({ dest: "uploads/" });
const certsDir = path.join(__dirname, "../certs");
if (!fs.existsSync(certsDir)) fs.mkdirSync(certsDir);

router.post("/bulk-generate", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).send("No file uploaded");
    if (!req.file.originalname.endsWith(".xlsx")) {
      fs.unlinkSync(req.file.path);
      return res.status(400).send("Only .xlsx files are supported");
    }

    const templateConfig = JSON.parse(req.body.templateConfig);
    console.log("Received templateConfig:", templateConfig);

    const workbook = xlsx.readFile(req.file.path);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = xlsx.utils.sheet_to_json(sheet);

    const zipPath = path.join(certsDir, "certificates.zip");
    const output = fs.createWriteStream(zipPath);
    const archive = archiver("zip", { zlib: { level: 9 } });
    archive.pipe(output);

    const templatePath = path.join(
      __dirname,
      "../assets",
      templateConfig.template + ".png"
    );
    if (!fs.existsSync(templatePath))
      return res.status(400).send("Template not found");

    const template = await loadImage(templatePath);

    for (let row of rows) {
      const name =
        row.name?.trim() ||
        row.Name?.trim() ||
        row["Full Name"]?.trim() ||
        row["Participant"]?.trim();
      if (!name) continue;

      const canvas = createCanvas(template.width, template.height);
      const ctx = canvas.getContext("2d");

      ctx.drawImage(template, 0, 0, template.width, template.height);

      // Position scaled by ratio
      const x = Math.round(templateConfig.position.xRatio * template.width);
      const y = Math.round(templateConfig.position.yRatio * template.height);

      // Scale font size relative to template size
      const scaledFontSize = Math.round(
        templateConfig.fontSize *
          (template.width / templateConfig.naturalWidth)
      );

      console.log(
        `Drawing name "${name}" at (${x}, ${y}) with font size ${scaledFontSize}`
      );

      ctx.fillStyle = templateConfig.fontColor || "#000000";
      ctx.font = `${scaledFontSize}px ${templateConfig.fontFamily || "Arial"}`;
      ctx.fillText(name, x, y);

      const buffer = canvas.toBuffer("image/png");
      archive.append(buffer, { name: `${name}_certificate.png` });
    }

    await archive.finalize();

    output.on("close", () => {
      console.log("ZIP generation complete:", zipPath);
      res.json({ zipFile: "certificates.zip" });
    });
  } catch (err) {
    console.error("Error generating certificates:", err);
    res.status(500).send("Error generating certificates");
  } finally {
    if (req.file && fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
  }
});

router.get("/download-zip", (req, res) => {
  const zipPath = path.join(certsDir, "certificates.zip");
  if (fs.existsSync(zipPath)) res.download(zipPath);
  else res.status(404).send("No ZIP file found. Generate certificates first.");
});

module.exports = router;
