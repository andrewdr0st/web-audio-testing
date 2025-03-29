let pianoWidth;
let pianoOffset;
let keyOffset;
let keyWidth;

function setup() {
    createCanvas(windowWidth, windowHeight);

    pianoWidth = windowWidth * 0.9;
    pianoOffset = windowWidth * 0.05;
    keyOffset = 5;
    keyWidth = pianoWidth / 15 - keyOffset;

    noStroke();
}

function draw() {
    background(120, 120, 120);

    drawPiano();
}


function drawPiano() {
    fill(230, 230, 230);
    for (let i = 0; i < 15; i++) {
        rect(pianoOffset + (keyWidth + keyOffset) * i, 150, keyWidth, 500);
    }
    fill(40, 40, 40);
    for (let i = 0; i < 14; i++) {
        if ((i + 5) % 7 == 0 || (i + 1) % 7 == 0) {
            continue;
        }
        rect(pianoOffset + (keyWidth + keyOffset) * i + keyWidth * 0.67, 150, keyWidth * 0.67, 300);
    }
}