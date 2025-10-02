let mic;
let fft;

function setup() {
  createCanvas(500, 500, WEBGL);
  
  // Making the mic
  mic = new p5.AudioIn();
  mic.start();
  // making fft of the mic
  fft = new p5.FFT();
  fft.setInput(mic);
  

  noFill();
  strokeWeight(0);
  
  // making new texture
  rainbowTexture = createGraphics(100, 100);
  
  // the rainbow color mode for the texture
  rainbowTexture.colorMode(HSB, 360, 100, 100, 100);

}

function draw() {
  background("white");
  // Getting the sound levels
  let level = mic.getLevel();
  let mappedValue = map(level, 0, 1, 1, 30);
  // Enable orbiting with the mouse.
  orbitControl();
  
  // Rotate the coordinate system a little more each frame.
  let angle = frameCount * 0.01;
  rotateX(-angle);
  rotateZ(angle);
  
  // Set the noise level and scale.
  let noiseLevel = 360;
  let noiseScale = 0.01 + 0.01*level;

  // Iterate from top to bottom to make the texture randomized with noise
  // and sound.
  for (let y = 0; y < rainbowTexture.height; y += 1) {
    // Iterate from left to right.
    for (let x = 0; x < rainbowTexture.width; x += 1) {
      // Scale the input coordinates.
      let nx = noiseScale * x;
      let ny = noiseScale * y;
      let nt = noiseScale * frameCount;
      
      // Compute the noise value.
      let c = (noiseLevel * noise(nx, ny, nt));
      
      rainbowTexture.stroke(c, 100, 100, c);
      rainbowTexture.point(x, y);
    }
  }
  let sphereSize = 30;
  // Apply the rainbow as a texture
  texture(rainbowTexture);
  // Draw the main central sphere.
  push();
  sphere(random(sphereSize*mappedValue, sphereSize*mappedValue + 2), 24, 24);
  pop();
  
  
  //Making multiple small planets rotating around the center
  let planetLocation = 50;
  angle = frameCount * 0.1;
  sphereSize = 10;
  // General Rotation of the planets
  rotateX(-angle/2);
  rotateY(angle);
  rotateZ(-angle);
  // Making a planet for each quadrant in 3D space 1-8 with individual 
  // rotations
  for (let x = 0; x < level*10; x++) {
    // Quad 1
    rotateZ(angle); //rotation
    push()
    let px = random(planetLocation, planetLocation*mappedValue); 
    // randomize location
    let py = random(planetLocation, planetLocation*mappedValue);
    let pz = random(planetLocation, planetLocation*mappedValue);
    // change origin to the randomized location
    translate(px, py, pz);
    // add the planet to that random location
    sphere(5);
    pop();
    
    // Quad 2
    rotateZ(-angle);
    push()
    px = random(planetLocation, planetLocation*mappedValue);
    py = random(-planetLocation, -planetLocation*mappedValue);
    pz = random(planetLocation, planetLocation*mappedValue);
    translate(px, py, pz);
    sphere(5);
    pop();
    
    // Quad 5
    rotateZ(angle);
    push()
    px = random(-planetLocation, -planetLocation*mappedValue);
    py = random(planetLocation, planetLocation*mappedValue);
    pz = random(planetLocation, planetLocation*mappedValue);
    translate(px, py, pz);
    sphere(5);
    pop();
    
    // Quad 6
    rotateZ(-angle);
    push()
    px = random(-planetLocation, -planetLocation*mappedValue);
    py = random(-planetLocation, -planetLocation*mappedValue);
    pz = random(planetLocation, planetLocation*mappedValue);
    translate(px, py, pz);
    sphere(5);
    pop();
    
    // Quad 4
    rotateZ(angle);
    push()
    px = random(planetLocation, planetLocation*mappedValue);
    py = random(planetLocation, planetLocation*mappedValue);
    pz = random(-planetLocation, -planetLocation*mappedValue);
    translate(px, py, pz);
    sphere(5);
    pop();
    
    // Quad 3
    rotateZ(-angle);
    push()
    px = random(-planetLocation, -planetLocation*mappedValue);
    py = random(-planetLocation, -planetLocation*mappedValue);
    pz = random(-planetLocation, -planetLocation*mappedValue);
    translate(px, py, pz);
    sphere(5);
    pop();
    
    // Quad 7
    rotateZ(angle);
    push()
    px = random(-planetLocation, -planetLocation*mappedValue);
    py = random(-planetLocation, -planetLocation*mappedValue);
    pz = random(-planetLocation, -planetLocation*mappedValue);
    translate(px, py, pz);
    sphere(5);
    pop();
    
    // Quad 8
    rotateZ(-angle);
    push()
    px = random(-planetLocation, -planetLocation*mappedValue);
    py = random(planetLocation, planetLocation*mappedValue);
    pz = random(-planetLocation, -planetLocation*mappedValue);
    translate(px, py, pz);
    sphere(5);
    pop();
  }
  // Adding spikes using ellipsoids to show disturbances in
  // incremental levels and
  // starting the analysis of the mic input into different
  // energy levels
  fft.analyze();
  let bass = fft.getEnergy("bass") || 0;
  let mid = fft.getEnergy("mid") || 0;   
  let treble = fft.getEnergy("treble") || 0;
  // the variables are from 0-255, so we adjust them to 0 to 1.5
  let mapBass = map(bass, 0, 255, 0, 1.5);
  let mapMid = map(mid, 0, 255, 0, 1.5);
  let mapTreble = map(treble, 0, 255, 0, 1.5);
  // for the ellipsoid spike properties
  let spike = 40;
  let spikeThickness = 25*mappedValue;
  push();
  if (level >= 0 && level <= 0.0075) {
    // do nothing
  } 
  if (level > 0.025 && level <= 0.04) {
    // along x-axis we see bass reactions (low frequency) and low sound
    ellipsoid(random(spike*mappedValue, spike*mappedValue+mapBass), spikeThickness, spikeThickness);
  } 
  if (level > 0.04 && level <= 0.05) {
    // along y-axis we see bass and mid reactions (for vocals plus instruments) 
    // and mid-level sounds
    ellipsoid(random(spike*mappedValue, spike*mappedValue+mapBass+mapMid), spikeThickness, spikeThickness);
    ellipsoid(spikeThickness, random(spike*mappedValue, spike*mappedValue+mapBass+mapMid), spikeThickness);
  } 
  if (level > 0.05 && level <= 1) {
    // along z-axis we see bass, mid and treble reactions (for high-pitched things)
    // or high level sounds
    ellipsoid(random(spike*mappedValue, spike*mappedValue+mapBass+mapMid+mapTreble), spikeThickness, spikeThickness);
    ellipsoid(spikeThickness, random(spike*mappedValue, spike*mappedValue+mapBass+mapMid+mapTreble), spikeThickness);
    ellipsoid(spikeThickness, spikeThickness, random(spike*mappedValue, spike*mappedValue+mapBass+mapMid+mapTreble));
  }
  pop();
}