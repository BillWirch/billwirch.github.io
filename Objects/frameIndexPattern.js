// constructors are a way to paramtrically control the creation of objects by
// defining the paramtrers at constructor level, 
// these paramters are then left blank, to be initialised when pulling
// the contructor out of teh bag and writing a sprite for example
//this.ting = 'ting' - the this. part of the object accepts the input on the right


// classes are a way of combining constructors and functions as a scalable 
//parametric object. we call things from the classes using dot notation
// kind of like building a repo within the code
// assuming faster memory allows thsi to be a modern thing
// this means we can call funtions from the classes too

// i think the intial parameters of the constructor, held within the 
// first set of brackets () denote a required parameter, whereas the rest are 
// not mandatory. this means the logic can be extracted from this sole param
// which needs to be coded within the class

export class FrameIndexPattern {
    constructor(animationConfig) {
        this.currentTime = 0;
        this.animationTime = 0;
        this.animationConfig = animationConfig;
        this.duration = animationConfig.duration ?? 500;

    }

    // this is referencing the animation.config yet to be input
    // heroanimcation.forward is an example
    // so this is a destructurig assignment based on the input 
    // this is only to grab a frame id to then use specifci frame
    get frame() {
        const {frames} = this.animationConfig;
        for (let i = frames.length - 1; i >= 0; i--) {
            if (this.currentTime >= frames[i].time) {
                return frames[i].frame;
            }
        }
        throw 'time is before first keyframe oh no';
    }


    // this step method is basically the loop, 
    // it adds delta(time elapsed) to current time (set to 0)
    // delta is created from this equation
    // current time should be > than duration
    // if it is bigger then the reset occurs

    step(delta) {
        this.currentTime += delta;
        if (this.currentTime >= this.duration) {
            this.currentTime = 0;
        }
    }
}