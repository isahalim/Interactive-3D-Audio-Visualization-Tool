# Interactive-3D-Audio-Visualization-Tool

Developed a real-time 3D visualization tool in JavaScript that responds dynamically to live microphone input with the p5.js library.
Implemented FFT analysis on live audio data to extract several frequency bands (bass, mid, treble) and mapped them onto 3D objects to animate them. 
Designed noise-based visual effects and procedural textures that respond to sound intensity. 
Built features such as orbiting electron-like objects and frequency-driven spikes to create an engaging visualization reminiscent of charged particles and particle fission.

## Quick Start

To view this project locally, you need to run a local web server. Since many browsers block local file access (CORS) for security, simply double-clicking `index.html` may not work.

Choose **one** of the methods below:

### Option 1: Using Python (Recommended)

If you have Python installed, run this in your terminal from the project root:

```bash
python3 -m http.server 8000

```

### Option 2: Using Node.js (npm)

If you prefer Node, use `npx` to run a server without installing it globally:

```bash
npx http-server -p 8000

```

### Option 3: VS Code "Live Server"

1. Open the project folder in **VS Code**.
2. Install the **Live Server** extension by Ritwick Dey.
3. Click the **"Go Live"** button in the bottom status bar.

---

## Viewing the Project

Once your server is running, open your browser and navigate to:

> **[http://localhost:8000](https://www.google.com/search?q=http://localhost:8000)**

## Project Structure

* `index.html` - The main entry point.
* `sketch.js` - (main logic file).
