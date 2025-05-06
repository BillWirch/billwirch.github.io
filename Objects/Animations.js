

export class Animations {
    constructor(patterns) {
        this.patterns = patterns;
        // this is plucking out teh first one, the active frame? using keys
        //the first key in this spwcific patterns bucket
        // this could be filled with all kinds of different animations
        this.activeKey = Object.keys(this.patterns)[0];
    }

    get frame() {
        return this.patterns[this.activeKey].frame;
    }

    play(key, startAtTime = 0) {
        if (this.activeKey === key) {
            return;
        }
        //switch???
        this.activeKey = key;
        this.patterns[this.activeKey].currentTime = startAtTime;

    }

    step(delta) {
        this.patterns[this.activeKey].step(delta);
    }
}