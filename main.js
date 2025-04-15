let piano;

function setup() {
    createCanvas(windowWidth, windowHeight);

    piano = new Piano(windowWidth * 0.05, windowHeight * 0.25, windowWidth * 0.9, windowHeight * 0.5, 2, 3);
    piano.noteOn(1);
    piano.noteOn(30);
    piano.noteOn(40);
    piano.noteOn(60);

    noStroke();
}

function draw() {
    background(120, 120, 120);

    piano.draw();
}
