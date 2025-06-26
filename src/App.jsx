import React, { useRef, useState } from "react";
import "./styles.css";

export default function App() {
  const canvasRef = useRef(null);
  const [image, setImage] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      // Match canvas to image size
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;

      console.log("Image size:", img.naturalWidth, img.naturalHeight); // 💡 Use this to align boxes

      ctx.drawImage(img, 0, 0);
      setImage(img);

      drawFakeBoxes(ctx);
    };
  };

  const drawFakeBoxes = (ctx) => {
    ctx.strokeStyle = "lime";
    ctx.lineWidth = 2;
    ctx.font = "14px Arial";
    ctx.fillStyle = "lime";

    // ✅ These coordinates are for a 450x932 mobile screenshot
    ctx.strokeRect(20, 20, 110, 40); // YouTube logo
    ctx.fillText("Logo", 25, 15);

    ctx.strokeRect(380, 25, 35, 35); // Search icon
    ctx.fillText("Search", 382, 20);

    ctx.strokeRect(20, 120, 100, 40); // Shorts section
    ctx.fillText("Shorts", 25, 115);

    ctx.strokeRect(10, 180, 180, 300); // Shorts video
    ctx.fillText("Shorts Video", 15, 175);

    ctx.strokeRect(0, 860, 450, 60); // Bottom nav
    ctx.fillText("Navigation", 10, 855);
  };

  return (
    <div className="App">
      <h1>🧠 Screenshot UI Analyzer</h1>
      <p>Upload a screenshot to simulate UI detection.</p>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      <br />
      <canvas
        ref={canvasRef}
        style={{
          marginTop: "20px",
          border: "1px solid #444",
          width: "100%", // Scales visually on desktop
          height: "auto",
        }}
      />
    </div>
  );
}
