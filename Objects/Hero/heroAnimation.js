//animation scrolling thfough different sprite sheet frames
// will be coded to loop once it reaches final 400 ms point
//amd to accoutn for directions
const makeWalkingFrames = (rootFrame = 0) => {

return {
    duration: 400,
    frames: [
        {
        time:0,
        frame:rootFrame
        },
        {
        time:100,
        frame:rootFrame+1
        },
        {
        time:200,
        frame:rootFrame+2
        },
        {
        time:300,
        frame:rootFrame+3
        },
    ]
}
}
const makeStandingFrames = (rootFrame = 0) => {

return {
    duration: 400,
    frames: [
        {
        time:0,
        frame:rootFrame
        },
    ]
}
}

// we pass these into the FIP to create the sereis of frames 
//to loop through
export const STAND_DOWN = makeStandingFrames(0);
export const STAND_UP = makeStandingFrames(4);
export const STAND_LEFT = makeStandingFrames(8);
export const STAND_RIGHT = makeStandingFrames(12);

export const WALK_DOWN = makeWalkingFrames(0);
export const WALK_UP = makeWalkingFrames(4);
export const WALK_LEFT = makeWalkingFrames(8);
export const WALK_RIGHT = makeWalkingFrames(12);