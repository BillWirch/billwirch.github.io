//https://www.youtube.com/watch?v=HmxNrlPx8iY&t=515s

// this is a great tutorial, everythng is in diff docuemtns which are imported
// easy to look at and dismantle mentally

import { GameLoop } from "./Objects/GameLoop.js";
import { gridCells, isSpaceFree } from "./helpers/grid.js";
import { moveTowards } from "./helpers/moveTowards.js";
import { DOWN, Input, LEFT, RIGHT, UP } from "./Objects/Input.js";
import { resources } from "./Objects/Resources.js";
import { Sprite } from "./Objects/sprite.js";
import { Vector2 } from "./Objects/Vector2.js";
import { Animations } from "./Objects/Animations.js";
import { FrameIndexPattern } from "./Objects/frameIndexPattern.js";
import { STAND_DOWN, STAND_LEFT, STAND_RIGHT, STAND_UP, WALK_DOWN, WALK_LEFT, WALK_RIGHT, WALK_UP } from "./Objects/Hero/heroAnimation.js";
import { walls } from "./Levels/Level1.js";

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

 
  const level1Sprite = new Sprite({
    resource: resources.images.level1,
    frameSize: new Vector2(640, 360)
})
//   const groundSprite = new Sprite({
//     resource: resources.images.ground,
//     frameSize: new Vector2(640, 360)
// })

const hero = new Sprite({
    resource: resources.images.hero,
    frameSize: new Vector2(64,75),
    hFrames: 4,
    vFrames: 4,
    frame: 0,
    position: new Vector2(gridCells(10), gridCells(15)),
    animations: new Animations ({
        walkDown: new FrameIndexPattern(WALK_DOWN),
        walkUp: new FrameIndexPattern(WALK_UP),
        walkLeft: new FrameIndexPattern(WALK_LEFT),
        walkRight: new FrameIndexPattern(WALK_RIGHT),
        standDown: new FrameIndexPattern(STAND_DOWN),
        standUp: new FrameIndexPattern(STAND_UP),
        standLeft: new FrameIndexPattern(STAND_LEFT),
        standRight: new FrameIndexPattern(STAND_RIGHT),
        
    })
})

const heroDestinationPosition = hero.position.duplicate();
let heroFacing = DOWN;


const shadow = new Sprite({
    resource: resources.images.shadow,
    frameSize: new Vector2(64, 75)
})


const input = new Input();

const update = (delta) => {

    const distance = moveTowards(hero, heroDestinationPosition, 1);
    // 1 instead of 0, this allows you to reach destintion even if you release key
    const hasArrived = distance <= 1;
    // attemot to move again if the characrter is at new position
    if (hasArrived) {
        tryMove();
    }
    
    // hero animation controls
    hero.step(delta);
    

   

};
console.log(input.direction);

const tryMove = () => {
    if (!input.direction) {

       if(heroFacing ===LEFT) {hero.animations.play('standLeft')} 
       if(heroFacing === RIGHT) {hero.animations.play('standRight')} 
       if(heroFacing === UP) {hero.animations.play('standUp')} 
       if(heroFacing === DOWN) {hero.animations.play('standDown')} 

        return;
    }
    // where dstinatin pos is now, grid size is like
    //minimum move distance
    //so we move toward dest position by 1 incremented grid size +=
    let nextX = heroDestinationPosition.x;
    let nextY = heroDestinationPosition.y;
    const gridSize = 16;

    if (input.direction === DOWN) {
        nextY += gridSize;
        hero.animations.play('walkDown');
        //hero.position.y += 1;
        // hero.frame = 0;
        // keydown for frames1-3, keyup frame 0?
    }
    if (input.direction === UP) {
        nextY -= gridSize;
        hero.animations.play('walkUp');
        //hero.position.y -= 1;
        //hero.frame = 4;
    }
    if (input.direction === LEFT) {
        nextX -= gridSize;
        hero.animations.play('walkLeft');
        // hero.position.x -= 1;
       // hero.frame = 8;
    }
    if (input.direction === RIGHT) {
        nextX += gridSize;
        hero.animations.play('walkRight');
        //hero.position.x += 1;
        //hero.frame = 12;
    }
    //console.log('Current walls:', Array.from(walls));
   
    //updating position of hero

    if (isSpaceFree(walls, nextX, nextY)) 
        {
            heroFacing = input.direction ?? heroFacing;
            console.log(input.direction);
    heroDestinationPosition.x = nextX;
    heroDestinationPosition.y = nextY;
    }

}

  const draw = ()   =>  {
    level1Sprite.drawImage(myGameArea.context, 0, 0);

    // Debug: Draw wall coordinates
    myGameArea.context.fillStyle = 'rgba(255, 0, 0, 0.5)';
    walls.forEach(wall => {
        const [x, y] = wall.split(',').map(Number);
        myGameArea.context.fillRect(x, y, 4, 4);
    });

     // Debug: Draw collision check point in blue
     myGameArea.context.fillStyle = 'rgba(0, 0, 255, 0.5)';
     myGameArea.context.fillRect(heroDestinationPosition.x, heroDestinationPosition.y, 4, 4);

    // Hero drawing
    const heroOffset = new Vector2(-16, -16);
    const heroPosX = hero.position.x+heroOffset.x;
    const heroPosY = hero.position.y+1+heroOffset.y;

        //drawimg shadow first so it is underneatrh hero
    shadow.drawImage(myGameArea.context,heroPosX, heroPosY)
    hero.drawImage(myGameArea.context,heroPosX, heroPosY)

}


    const gameLoop = new GameLoop(update, draw);
    gameLoop.start();

    document.addEventListener('DOMContentLoaded', () => {
        startGame();
    });

    //myGameArea.context.clearRect(0, 0, myGameArea.canvas.width, myGameArea.canvas.height);
    
    

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

  





// setInterval(()  =>  {
//     console.log("draw");
//    // hero.frame +=1;
//     draw();
// }, 300)

