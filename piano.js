class Piano {
    constructor(x, y, w, h, startingOctave, octaveRange) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.keyOffset = 2;
        this.keyWidth = w / (octaveRange * 7 + 1) - this.keyOffset;
        this.startingNote = startingOctave * 12;
        this.noteCount = octaveRange * 12 + 1;
        this.whiteNoteCount = octaveRange * 7 + 1;
        this.notes = [];
        for (let i = 0; i < this.noteCount; i++) {
            this.notes.push(false);
        }
        this.whiteNoteColor = color(230, 230, 230);
        this.blackNoteColor = color(40, 40, 40);
        this.whitePlayColor = color(50, 150, 210);
        this.blackPlayColor = color(30, 110, 170);
    }

    draw() {
        const imodLookup = [0, 1, 2, 2, 3, 4, 5];
        for (let i = 0; i < this.whiteNoteCount; i++) {
            let imod = i % 7;
            let ioct = Math.floor(i / 7);
            let offset = imodLookup[imod] + ioct * 5;
            let idx = i + offset;
            let c = this.notes[idx] ? this.whitePlayColor : this.whiteNoteColor;
            fill(c);
            rect(this.x + (this.keyWidth + this.keyOffset) * i, this.y, this.keyWidth, this.h);
        }
        fill(this.blackNoteColor);
        for (let i = 0; i < this.whiteNoteCount - 1; i++) {
            if ((i + 5) % 7 == 0 || (i + 1) % 7 == 0) {
                continue;
            }
            let imod = i % 7;
            let ioct = Math.floor(i / 7);
            let offset = imodLookup[imod] + ioct * 5 + 1;
            let idx = i + offset;
            let c = this.notes[idx] ? this.blackPlayColor : this.blackNoteColor;
            fill(c);
            rect(this.x + (this.keyWidth + this.keyOffset) * i + this.keyWidth * 0.67, this.y, this.keyWidth * 0.67, this.h * 0.6);
        }
    }

    noteOn(midiVal) {
        let i = midiVal - this.startingNote;
        if (i >= 0 && i < this.noteCount) {
            this.notes[i] = true;
        }
    }

    noteOff(midiVal) {
        let i = midiVal - this.startingNote;
        if (i >= 0 && i < this.noteCount) {
            this.notes[i] = false;
        }
    }
}