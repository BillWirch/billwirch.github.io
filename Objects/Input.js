//this will simplify the checking and use of these instructions, no strings

export const LEFT = 'LEFT'
export const RIGHT = 'RIGHT'
export const UP = 'UP'
export const DOWN = 'DOWN'


// this method of handling keyboard input should queue up the commands
// rather than allowing them to cancel each other out if opposite are keyed
// this is medium complex, will understand soon

export class Input {
    constructor() {

        this.heldDirections = [];
        document.addEventListener('keydown', (e)=> {

            if (e.code === 'ArrowUp' || e.code ==='KeyW') {
                this.onArrowPressed(UP);
            }
            if (e.code === 'ArrowDown' || e.code ==='KeyS') {
                this.onArrowPressed(DOWN);
            }
            if (e.code === 'ArrowLeft' || e.code ==='KeyA') {
                this.onArrowPressed(LEFT);
            }
            if (e.code === 'ArrowRight' || e.code ==='KeyD') {
                this.onArrowPressed(RIGHT);
            }
            // console.log(e.code)
        })
        document.addEventListener('keyup', (e)=> {

            if (e.code === 'ArrowUp' || e.code ==='KeyW') {
                this.onArrowReleased(UP);
            }
            if (e.code === 'ArrowDown' || e.code ==='KeyS') {
                this.onArrowReleased(DOWN);
            }
            if (e.code === 'ArrowLeft' || e.code ==='KeyA') {
                this.onArrowReleased(LEFT);
            }
            if (e.code === 'ArrowRight' || e.code ==='KeyD') {
                this.onArrowReleased(RIGHT);
            }
            // console.log(e.code)
        })
    }

    get direction() {
        return this.heldDirections[0];
    }


    onArrowPressed(direction) {
        // add this coimmand to teh queue if it's new
        // indexOf returns -1 if the value is not found / false
        // unshiofts it into the array and creates the list
        if (this.heldDirections.indexOf(direction) === -1) {
            this.heldDirections.unshift(direction);
        }
    }


    // checks to see if the diretion is in the list
    // if it is not, nothing, if it IS
    // takes the original direction out and replaces using SPLICE

    onArrowReleased(direction) {
        const index = this.heldDirections.indexOf(direction);
        if (index === -1) {
        return;
        }

    // remove key from list
    this.heldDirections.splice(index, 1);
    }
}