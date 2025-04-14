export class gameLoop{
    constructor(update, render) {

        this.lastFrameTime = 0;
        this/accumulatedTime = 0;
        this.timeStep = 1000/60; //60FPS

        this.update = update;
        this.render = render;

        this.rafID = null;
        this.isRunning = false;
 
    }
// this is all about the frames and what happens in each frame
    mainLoop = (timestamp) => {
        if (!this.isRunning) return;


        // delta time is how much time has passed
        let deltaTime = timestamp - this.lastFrameTime;
        this.lastFrameTime = timestamp;

        // accumulate all the time since the last frame.
        this.accumulatedTime += deltaTime;
        
        // fixed time step updates??
        // if there's enough accumulated time to run one or more fixed updates
        while (this.accumulatedTime >= this.timeStep) {
            this.update(thisd.timeStep); // here, we pass the fixed time step
            this.accumulatedTime -= this.timeStep;
        }

        // Render 
        this.render();
        
        // this fires the mainloop function everytime just before the browser refreshes(raf)
        //assigns id to that frame
        //this update loop isx uysed to change state of characters etc
        // this line beklow privdes unique identifier for us to use
        
        this.rafID = requestAnimationFrame(this.mainLoop); 
    }

}