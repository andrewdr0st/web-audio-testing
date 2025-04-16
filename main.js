const keyToMidi = new Uint8Array([255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,35,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,15,255,1,3,255,6,8,10,255,13,255,255,255,255,255,255,255,255,24,21,20,4,22,255,25,12,27,255,30,28,26,14,16,0,5,18,7,11,23,2,19,9,17,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,32,255,29,255,31,33,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,34,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255]);
let piano;

const audioCtx = new AudioContext();

const oscillators = new Map();
const masterGain = new GainNode(audioCtx);

function setup() {
    createCanvas(windowWidth, windowHeight);

    piano = new Piano(windowWidth * 0.05, windowHeight * 0.25, windowWidth * 0.9, windowHeight * 0.5, 3, 3);
    masterGain.gain.setValueAtTime(0.15, audioCtx.currentTime);
    masterGain.connect(audioCtx.destination);

    noStroke();
}

function draw() {
    background(120, 120, 120);

    piano.draw();
}

function playNote(pitch) {
    if (oscillators.has(pitch)) {
        return;
    }

    const osc = new OscillatorNode(audioCtx, {
        type: "square",
        frequency: midiToFreq(pitch)
    });
    osc.connect(masterGain);
    osc.start();

    oscillators.set(pitch, osc);
}

function stopNote(pitch) {
    const osc = oscillators.get(pitch);
    if (osc) {
        osc.stop();
        osc.disconnect();
        oscillators.delete(pitch);
    }
}

function keyPressed() {
    let midiNumber = keyToMidi[keyCode] + 36;
    if (midiNumber > 127) {
        return;
    }
    piano.noteOn(midiNumber);
    playNote(midiNumber);
}

function keyReleased() {
    let midiNumber = keyToMidi[keyCode] + 36;
    if (midiNumber > 127) {
        return;
    }
    piano.noteOff(midiNumber);
    stopNote(midiNumber);
}

function midiToFreq(n) {
    return 440 * Math.pow(2, (n - 69) / 12);
}