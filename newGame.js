//https://www.youtube.com/watch?v=HmxNrlPx8iY&t=515s

import { resources } from "./Resources.js";

// need to build some image files for the game - sky, grass, wall, player, enemy, door, key


function startGame() {
  // Initialize the game area
  myGameArea.start();
}

const myGameArea = {
  canvas: document.createElement("canvas"),
  start: function () {
    this.canvas.width = 320;
    this.canvas.height = 180;
    this.context = this.canvas.getContext("2d");
    //this.canvas.style.borderRadius = "50%";
    const main = document.querySelector("main");
    main.append(this.canvas);
    requestAnimationFrame(draw);
  }}

 


  const draw = ()   =>  {
    //load the sky
    const sky = resources.images.sky;
    if (sky.isLoaded)   {
        //scaling the image so it fits on the canvas regardless oif size
        const scale = Math.max(
            myGameArea.canvas.width / sky.width,
            myGameArea.canvas.height / sky.height
        );
        const scaledWidth = sky.width * scale;
        const scaledHeight = sky.height * scale;

        // centreingt tr5he image

        const x = (myGameArea.canvas.width - scaledWidth) / 2;
        const y = (myGameArea.canvas.height - scaledHeight) / 2;

        myGameArea.context.drawImage(
            sky.image,
            x, y, 
            scaledWidth, 
            scaledHeight);
    };
    //Load the ground
    //ground is currently scaling the same way as sky
    // would be better to create the ground and other peices in scale and not 
    //fuck about with the scale thing all the time
    const ground = resources.images.ground;
    if (ground.isLoaded)   {
        //scaling the image so it fits on the canvas regardless oif size
        const scale = Math.max(
            myGameArea.canvas.width / sky.width,
            myGameArea.canvas.height / sky.height
        );
        const scaledWidth = sky.width * scale;
        const scaledHeight = sky.height * scale;

        // centreingt tr5he image

        const x = (myGameArea.canvas.width - scaledWidth) / 2;
        const y = (myGameArea.canvas.height - scaledHeight) / 2;

        myGameArea.context.drawImage(
            ground.image,
            80, 40, 
            scaledWidth/2, 
            scaledHeight/2);
    };

    
    requestAnimationFrame(draw);
  }

  document.addEventListener('DOMContentLoaded', () => {
    startGame();
});
// setInterval(()  =>  {
//     console.log("draw");
//     draw();
// }, 300);
  