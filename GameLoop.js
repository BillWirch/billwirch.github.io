export class GameLoop{

    // will create dedicated functions for these contructor elements 
    // 
    constructor(update, render) {
        // counting time we need to know WHEN it is ok to move to next frame
        this.lastFrameTime = 0;
        this.accumulatedTime = 0;
        this.timeStep = 1000/60; //60FPS - time step is FPS

        this.update = update;
        this.render = render;

        this.rafID = null;
        this.isRunning = false; //  this will be flipped to true on game commencement
 
    }
// this is all about the frames and what happens in each frame
    mainLoop = (timestamp) => {
        // this checks if the loop is running, if it is, nothing happens, if no, loop fires
        if (!this.isRunning) return;


        // delta time is how much time has passed
        // these 2 valaues are subtracted from one another, very similar fvalues
        let deltaTime = timestamp - this.lastFrameTime;
        this.lastFrameTime = timestamp;

        // accumulate all the time since the last frame.is this the same as delta time?
        this.accumulatedTime += deltaTime;
        
        // fixed time step updates?? this is really fucking confusing]
        // if there's enough accumulated time to run one or more fixed updates
        while (this.accumulatedTime >= this.timeStep) {
            // console.log('update')
            this.update(this.timeStep); // here, we pass the fixed time step
            this.accumulatedTime -= this.timeStep;
        }

        // Render 
        this.render();
        
        // this fires the mainloop function everytime just before the browser refreshes(raf)
        //assigns id to that frame
        //this update loop is used to change state of characters etc
        // this line beklow privdes unique identifier for us to use
        // this replaces the 'null' value previously passed
        // this happens at the frame rate we have assigned, over anbd over again, assigning 
        
        this.rafID = requestAnimationFrame(this.mainLoop); 
    }

    start() {
    if (!this.isRunning) {
        this.isRunning = true;
        this.rafID = requestAnimationFrame(this.mainLoop);  
    }
}

//this is to pause the game if needed, it checks if RAFid is true, it is, it cancels
// then it declares is running false to be clear
    stop() {
        if (this.rafID) {
            cancelAnimationFrame(this.rafID);
        }
        this.isRunning = false;
    }

}