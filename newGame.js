//https://www.youtube.com/watch?v=HmxNrlPx8iY&t=515s

import { resources } from "./Resources.js";
import { Sprite } from "./sprite.js";
import { Vector2 } from "./Vector2.js";

// need to build some image files for the game - sky, grass, wall, player, enemy, door, key


function startGame() {
  // Initialize the game area
  myGameArea.start();
}

const myGameArea = {
  canvas: document.createElement("canvas"),
  start: function () {
    this.canvas.width = 640;
    this.canvas.height = 360;
    this.context = this.canvas.getContext("2d");
    //this.canvas.style.borderRadius = "50%";
    const main = document.querySelector("main");
    main.append(this.canvas);
    requestAnimationFrame(draw);
  }}

 
  const skySprite = new Sprite({
    resource: resources.images.sky,
    frameSize: new Vector2(640, 360)
})
  const groundSprite = new Sprite({
    resource: resources.images.ground,
    frameSize: new Vector2(640, 360)
})

const hero = new Sprite({
    resource: resources.images.hero,
    frameSize: new Vector2(125,150),
    hFrames: 4,
    vFrames: 4,
    frame: 0,
    scale: 0.5,
});

const heroPos = new Vector2(64 * 4, 75 * 3)

  const draw = ()   =>  {
    skySprite.drawImage(myGameArea.context, 0, 0);
    groundSprite.drawImage(myGameArea.context, 80, 0);

    // centrre hero in cell
    const heroOffset = new Vector2(-8, -21);
    const heroPosX = heroPos.x+heroOffset.x;
    const heroPosY = heroPos.y+1+heroOffset.y;
    
    hero.drawImage(myGameArea.context,heroPos.x, heroPos.y)
    //myGameArea.context.clearRect(0, 0, myGameArea.canvas.width, myGameArea.canvas.height);
    
    
};
// this is outdated, shoudl be removed
    //  // Clear canvas first
   // myGameArea.context.clearRect(0, 0, myGameArea.canvas.width, myGameArea.canvas.height);
    // //load the sky
    // const sky = resources.images.sky;
    // if (sky.isLoaded)   {
    //     //scaling the image so it fits on the canvas regardless oif size
    //     const scale = Math.max(
    //         myGameArea.canvas.width / sky.width,
    //         myGameArea.canvas.height / sky.height
    //     );
    //     const scaledWidth = sky.width * scale;
    //     const scaledHeight = sky.height * scale;

    //     // centreingt tr5he image

    //     const x = (myGameArea.canvas.width - scaledWidth) / 2;
    //     const y = (myGameArea.canvas.height - scaledHeight) / 2;

    //     myGameArea.context.drawImage(
    //         sky.image,
    //         x, y, 
    //         scaledWidth, 
    //         scaledHeight);
    // };

    // //Load the ground
    // //ground is currently scaling the same way as sky
    // // would be better to create the ground and other peices in scale and not 
    // //fuck about with the scale thing all the time

    // const ground = resources.images.ground;
    // if (ground.isLoaded)   {
    //     //scaling the image so it fits on the canvas regardless oif size
    //     const scale = Math.max(
    //         myGameArea.canvas.width / sky.width,
    //         myGameArea.canvas.height / sky.height
    //     );
    //     const scaledWidth = sky.width * scale;
    //     const scaledHeight = sky.height * scale;

    //     // centreingt tr5he image

    //     const x = (myGameArea.canvas.width - scaledWidth) / 2;
    //     const y = (myGameArea.canvas.height - scaledHeight) / 2;

    //     myGameArea.context.drawImage(
    //         ground.image,
    //         80, 30, 
    //         scaledWidth/1.5, 
    //         scaledHeight/1.5);
    // }


 

    // useing REA instead of SI -REA syncs to refresh rate of dispay and is more efficient
    //working thnrough instructiobs with SI though
    
   // requestAnimationFrame(draw);

  





setInterval(()  =>  {
    console.log("draw");
    draw();
}, 300)

document.addEventListener('DOMContentLoaded', () => {
    startGame();
});