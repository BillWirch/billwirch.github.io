import { Vector2 } from "./Vector2.js";


export class Sprite {
    constructor({
        resource,   //image we will be drawing
        frameSize,  // size of the crop of the image
        hFrames,    //sprite sheet item horizontal
        vFrames,    // sprite sheet items vertical
        frame,      // which frame we want to show
        scale,      // how large to draw image
        position,       // where to draw image

        // this is going to be called everytimne we use a new sprite, 
        // we will genersate a grid oin the sprite sheet so we call frame 
        // numbers not pixel coordinates

    })  {
        this.resource = resource;
        this.frameSize = frameSize ?? new Vector2(16,16);
        this.hFrames = hFrames ?? 1;
        this.vFrames = vFrames ?? 1;
        this.frame = frame ?? 0;
        this.frameMap = new Map(); //unsure how this links to BFM below
        this.scale = scale ?? 1;
        this.position = position ?? new Vector2(0,0);
        this.buildFrameMap();
    }

    // this is the frame map which will be used to take frames from the sprite sheet
    // thsi generatres the grid by looping vertically then hzntally, within are FRAMES
    // this uses the amount of h and v frames  in the class to generate set number of frames
    buildFrameMap()  {
        let frameCount = 0;
        for (let v = 0; v < this.vFrames; v++)  {
            for (let h = 0; h < this.hFrames; h++ )  {
                console.log("frame", h, v)

                this.frameMap.set(
                    frameCount,
                    new Vector2(this.frameSize.x * h, this.frameSize.y * v)
                );
                frameCount++;
            }
        }

    }

    
   drawImage(context, x, y)    {
        if (!this.resource.isLoaded) {
            console.log('Resource not loaded yet');
        return;
    }

    //find correct framne to use within sprite sheet and select within sheet
    let frameCoordX = 0;
    let frameCoordY = 0;
    const frame = this.frameMap.get(this.frame);
    if (frame)  {
        frameCoordX = frame.x;
        frameCoordY = frame.y;
    }
    const frameSizeX = this.frameSize.x; 
    const frameSizeY = this.frameSize.y;

    context.drawImage(
        this.resource.image,
        frameCoordX,
        frameCoordY, // top y corner of frame
        frameSizeX, //how much to crop off sprite shjeet x axis
        frameSizeY, // how much to crop off sprite sheet yu axis
        x, //where to t place this on the canvas tag x - 0
        y, //whewre toi place this on canvas tag y - 0
        frameSizeX * this.scale, // how larget oscale it x
        frameSizeY * this.scale, // how larget oscale it y
    )
    }
        
        
}

