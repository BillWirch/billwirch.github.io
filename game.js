const mazeConfig = {
  maxRadius: 300,
  segments: 24,
  ringThickness: 20,
  scrollSpeed: 0.2,
  rotationSpeed: 0.002
};

let maze; // Global maze variable
let mazeAnimationStarted = false;
let offset = 0;
let rotation = 0;

function startGame() {
  // Initialize the game area
  myGameArea.start();
  
  // Generate initial maze
  maze = generateCircularMaze(
    Math.ceil(mazeConfig.maxRadius / mazeConfig.ringThickness),
    mazeConfig.segments
  );
  
  // Reset animation variables
  mazeAnimationStarted = false;
  offset = 0;
  rotation = 0;
  
  // Position Terry at the edge of the maze
  const angle = Math.random() * 2 * Math.PI;
  const radius = myGameArea.canvas.width / 2 - terry.size;
  terry.x = myGameArea.canvas.width / 2 + radius * Math.cos(angle);
  terry.y = myGameArea.canvas.height / 2 + radius * Math.sin(angle);
  terry.hasStartedMoving = false;
  
  // Initialize controls after maze is created
  controls.init();
}

const myGameArea = {
  canvas: document.createElement("canvas"),
  start: function () {
    this.canvas.width = 480;
    this.canvas.height = 480;
    this.context = this.canvas.getContext("2d");
    this.canvas.style.borderRadius = "50%"; // Make canvas circular
    
    const main = document.querySelector("main");
    main.append(this.canvas);
    
    // Start the animation loop
    requestAnimationFrame(drawCircularMazeAnimated);
  }
};

const terry = {
  x: 240, // Will be set to edge position in startGame
  y: 240,
  size: 8, // Smaller size to fit in maze cells
  speed: 2,
  rotation: 0,
  morphProgress: 0,
  morphSpeed: 0.005, // Adjust for smooth morphing
  sides: 3,
  hasStartedMoving: false, // Track if Terry has moved
  
  update: function() {
    this.morphProgress += this.morphSpeed;
    if (this.morphProgress >= 1) {
      this.morphProgress = 0;
      this.sides = this.sides >= 8 ? 3 : this.sides + 1;
    }
  },

  draw: function(ctx) {
    ctx.save();
    ctx.fillStyle = "black";
    ctx.translate(this.x, this.y);
    
    ctx.beginPath();
    const currentSides = this.sides;
    const nextSides = this.sides >= 8 ? 3 : this.sides + 1;
    const progress = this.morphProgress;
    
    // Smooth interpolation between shapes
    const actualSides = currentSides + (nextSides - currentSides) * progress;
    const totalPoints = Math.max(32, Math.floor(actualSides) * 4); // More points for smoother morphing
    
    for (let i = 0; i < totalPoints; i++) {
      const angle = (i * 2 * Math.PI / totalPoints) - Math.PI / 2;
      const radius = this.size * this.getInterpolatedRadius(angle, actualSides);
      const x = radius * Math.cos(angle);
      const y = radius * Math.sin(angle);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  },

  // Helper function for smooth shape morphing
  getInterpolatedRadius: function(angle, sides) {
    const baseAngle = (angle + Math.PI / 2) % (2 * Math.PI / Math.floor(sides));
    const ratio = Math.cos(Math.PI / sides) / Math.cos(baseAngle - (Math.PI / sides));
    return ratio;
  }
};

const controls = {
  keyboardEnabled: true,
  tiltEnabled: false,
  tiltSensitivity: 2,
  
  init: function() {
    // Add separate keyboard event listener
    window.addEventListener('keydown', (e) => {
      if (!this.keyboardEnabled) return;
      
      let newX = terry.x;
      let newY = terry.y;
      
      switch(e.key) {
        case 'ArrowUp':
          newY -= terry.speed;
          break;
        case 'ArrowDown':
          newY += terry.speed;
          break;
        case 'ArrowLeft':
          newX -= terry.speed;
          break;
        case 'ArrowRight':
          newX += terry.speed;
          break;
        default:
          return; // Ignore other keys
      }

      e.preventDefault(); // Prevent page scrolling
      
      // Check both collision and canvas bounds
      if (!this.checkCollision(newX, newY) && this.checkInBounds(newX, newY)) {
        terry.x = newX;
        terry.y = newY;
        if (!terry.hasStartedMoving) {
          terry.hasStartedMoving = true;
          mazeAnimationStarted = true; // This triggers the animation
        }
      } else if (!this.checkInBounds(newX, newY)) {
        this.gameOver();
      }
    }.bind(this)); // Bind 'this' to maintain context

    // Initialize tilt controls if available
    if (window.DeviceOrientationEvent) {
      this.tiltEnabled = true;
      window.addEventListener('deviceorientation', this.handleTilt.bind(this));
    }
  },

  handleTilt: function(e) {
    if (!this.tiltEnabled) return;
    
    const tiltX = e.gamma;
    const tiltY = e.beta;
    
    let newX = terry.x + (tiltX * this.tiltSensitivity) / 60;
    let newY = terry.y + (tiltY * this.tiltSensitivity) / 60;
    
    if (!this.checkCollision(newX, newY) && this.checkInBounds(newX, newY)) {
      terry.x = newX;
      terry.y = newY;
      if (!terry.hasStartedMoving) {
        terry.hasStartedMoving = true;
        mazeAnimationStarted = true;
      }
    } else if (!this.checkInBounds(newX, newY)) {
      this.gameOver();
    }
  },

  checkCollision: function(newX, newY) {
    // Convert position to maze coordinates
    const centerX = myGameArea.canvas.width / 2;
    const centerY = myGameArea.canvas.height / 2;
    const dx = newX - centerX;
    const dy = newY - centerY;
    const radius = Math.sqrt(dx * dx + dy * dy);
    const angle = Math.atan2(dy, dx);
    
    // Calculate ring and segment using mazeConfig values
    const ring = Math.floor(radius / mazeConfig.ringThickness);
    const segment = Math.floor(((angle + Math.PI) / (2 * Math.PI)) * mazeConfig.segments);
    
    // Check if moving into a wall
    const cell = maze[ring]?.[segment];
    if (!cell) return true; // Outside maze bounds
    
    // Check walls based on movement direction
    return (cell.outerWall || cell.innerWall || cell.leftWall || cell.rightWall);
  }, // Add missing comma here

  checkInBounds: function(x, y) {
    const canvas = myGameArea.canvas;
    const buffer = terry.size; // Give a small buffer based on Terry's size
    return (
      x >= buffer &&
      x <= canvas.width - buffer &&
      y >= buffer &&
      y <= canvas.height - buffer
    );
  },

  gameOver: function() {
    // Stop the game
    this.keyboardEnabled = false;
    this.tiltEnabled = false;
    mazeAnimationStarted = false;
    
    // Show game over message
    const ctx = myGameArea.canvas.getContext("2d");
    ctx.save();
    ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
    ctx.fillRect(0, 0, myGameArea.canvas.width, myGameArea.canvas.height);
    ctx.fillStyle = "white";
    ctx.font = "30px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Game Over!", myGameArea.canvas.width/2, myGameArea.canvas.height/2);
    ctx.restore();
  }
};

function drawCircularMaze() {
  const canvas = document.querySelector("canvas");
  const ctx = canvas.getContext("2d");

  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const radius = 300; // Outer radius of the maze
  const rings = 20; // Number of concentric rings
  const segments = 80; // Number of angular segments per ring

  // Generate the maze
  const maze = generateCircularMaze(rings, segments);

  // Draw the maze
  ctx.lineWidth = 3;
  ctx.strokeStyle = "black";

  for (let ring = 0; ring < rings; ring++) {
    const innerRadius = (radius / rings) * ring;
    const outerRadius = (radius / rings) * (ring + 1);

    for (let segment = 0; segment < segments; segment++) {
      const startAngle = (2 * Math.PI / segments) * segment;
      const endAngle = (2 * Math.PI / segments) * (segment + 1);

      const cell = maze[ring][segment];

      // Draw the outer wall
      if (cell.outerWall) {
        ctx.beginPath();
        ctx.arc(centerX, centerY, outerRadius, startAngle, endAngle);
        ctx.stroke();
      }

      // Draw the inner wall
      if (cell.innerWall) {
        ctx.beginPath();
        ctx.arc(centerX, centerY, innerRadius, startAngle, endAngle);
        ctx.stroke();
      }

      // Draw the left wall
      if (cell.leftWall) {
        ctx.beginPath();
        ctx.moveTo(
          centerX + innerRadius * Math.cos(startAngle),
          centerY + innerRadius * Math.sin(startAngle)
        );
        ctx.lineTo(
          centerX + outerRadius * Math.cos(startAngle),
          centerY + outerRadius * Math.sin(startAngle)
        );
        ctx.stroke();
      }

      // Draw the right wall
      if (cell.rightWall) {
        ctx.beginPath();
        ctx.moveTo(
          centerX + innerRadius * Math.cos(endAngle),
          centerY + innerRadius * Math.sin(endAngle)
        );
        ctx.lineTo(
          centerX + outerRadius * Math.cos(endAngle),
          centerY + outerRadius * Math.sin(endAngle)
        );
        ctx.stroke();
      }
    }
  }
}

function drawCircularMazeAnimated() {
  const ctx = myGameArea.canvas.getContext("2d");
  
  // Clear the canvas
  ctx.clearRect(0, 0, myGameArea.canvas.width, myGameArea.canvas.height);
  
  // Update maze position if animation has started
  if (mazeAnimationStarted) {
    offset += mazeConfig.scrollSpeed;
    rotation += mazeConfig.rotationSpeed;
    
    if (offset >= mazeConfig.ringThickness) {
      offset = 0;
      maze.pop();
      const newRing = generateNewRing(mazeConfig.segments, maze[0], maze);
      maze.unshift(newRing);
    }
  }
  
  // Draw maze walls
  const centerX = myGameArea.canvas.width / 2;
  const centerY = myGameArea.canvas.height / 2;
  const rings = maze.length;

  for (let ring = rings - 1; ring >= 0; ring--) {
    const innerRadius = offset + ring * mazeConfig.ringThickness;
    const outerRadius = innerRadius + mazeConfig.ringThickness;

    if (innerRadius > mazeConfig.maxRadius) continue;

    for (let segment = 0; segment < mazeConfig.segments; segment++) {
      const startAngle = (2 * Math.PI / mazeConfig.segments) * segment + rotation;
      const endAngle = (2 * Math.PI / mazeConfig.segments) * (segment + 1) + rotation;
      const cell = maze[ring][segment];

      if (cell.outerWall) {
        ctx.beginPath();
        ctx.arc(centerX, centerY, outerRadius, startAngle, endAngle);
        ctx.stroke();
      }

      if (cell.innerWall && ring > 0) {
        ctx.beginPath();
        ctx.arc(centerX, centerY, innerRadius, startAngle, endAngle);
        ctx.stroke();
      }

      if (cell.leftWall) {
        ctx.beginPath();
        ctx.moveTo(
          centerX + innerRadius * Math.cos(startAngle),
          centerY + innerRadius * Math.sin(startAngle)
        );
        ctx.lineTo(
          centerX + outerRadius * Math.cos(startAngle),
          centerY + outerRadius * Math.sin(startAngle)
        );
        ctx.stroke();
      }
    }
  }
  
  // Update and draw Terry
  terry.update();
  terry.draw(ctx);
  
  // Continue the animation loop
  requestAnimationFrame(drawCircularMazeAnimated);
}

function generateNewRing(segments, previousRing, maze) { // Add maze parameter
  const outerRing = maze[maze.length - 1];
  
  const newRing = Array.from({ length: segments }, (_, segment) => ({
    outerWall: outerRing[segment].outerWall,
    innerWall: outerRing[segment].innerWall,
    leftWall: outerRing[segment].leftWall,
    rightWall: outerRing[segment].rightWall,
    visited: false
  }));

  // Ensure connectivity with the previous ring
  for (let segment = 0; segment < segments; segment++) {
    if (previousRing && segment % 5 === 0) {
      newRing[segment].innerWall = false;
      previousRing[segment].outerWall = false;
    }
  }

  return newRing;
}

function generateCircularMaze(rings, segments) {
  // Initialize the maze grid
  const maze = Array.from({ length: rings }, (_, ring) =>
    Array.from({ length: segments }, () => ({
      outerWall: true,
      innerWall: ring > 0, // No inner wall for the innermost ring
      leftWall: true,
      rightWall: true,
      visited: false,
    }))
  );

  // Recursive backtracking algorithm
  function carvePassages(ring, segment) {
    const directions = ["outer", "inner", "left", "right"];
    shuffleArray(directions);

    for (const direction of directions) {
      const [nextRing, nextSegment] = getNextCell(ring, segment, direction, rings, segments);

      if (
        nextRing >= 0 &&
        nextRing < rings &&
        nextSegment >= 0 &&
        nextSegment < segments &&
        !maze[nextRing][nextSegment].visited
      ) {
        // Remove walls between the current cell and the next cell
        if (direction === "outer") {
          maze[ring][segment].outerWall = false;
          maze[nextRing][nextSegment].innerWall = false;
        } else if (direction === "inner") {
          maze[ring][segment].innerWall = false;
          maze[nextRing][nextSegment].outerWall = false;
        } else if (direction === "left") {
          maze[ring][segment].leftWall = false;
          maze[nextRing][nextSegment].rightWall = false;
        } else if (direction === "right") {
          maze[ring][segment].rightWall = false;
          maze[nextRing][nextSegment].leftWall = false;
        }

        maze[nextRing][nextSegment].visited = true;
        carvePassages(nextRing, nextSegment);
      }
    }
  }

  // Start carving from the second ring (skip the center)
  maze[1][0].visited = true;
  carvePassages(1, 0);

  return maze;
}

function getNextCell(ring, segment, direction, rings, segments) {
  switch (direction) {
    case "outer":
      return [ring + 1, segment];
    case "inner":
      return [ring - 1, segment];
    case "left":
      return [ring, (segment - 1 + segments) % segments];
    case "right":
      return [ring, (segment + 1) % segments];
  }
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

