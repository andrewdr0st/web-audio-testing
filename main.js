const keyToMidi = new Uint8Array([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,15,0,1,3,0,6,8,10,0,13,0,0,0,0,0,0,0,0,24,21,20,4,0,23,25,12,0,28,30,27,26,14,16,0,5,18,7,11,22,2,19,9,17,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,32,0,29,0,31,33,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
let piano;

function setup() {
    createCanvas(windowWidth, windowHeight);

    piano = new Piano(windowWidth * 0.05, windowHeight * 0.25, windowWidth * 0.9, windowHeight * 0.5, 2, 3);

    noStroke();
}

function draw() {
    background(120, 120, 120);

    piano.draw();
}

function keyPressed() {
    let midiNumber = keyToMidi[keyCode] + 24;
    piano.noteOn(midiNumber);
}

function keyReleased() {
    let midiNumber = keyToMidi[keyCode] + 24;
    piano.noteOff(midiNumber);
}

function midiToFreq(n) {
    return 440 * Math.pow(2, (n - 69) / 12);
}