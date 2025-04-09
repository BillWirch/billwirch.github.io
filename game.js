function startGame() {
  myGameArea.start();
}

const myGameArea = {
  canvas: document.createElement("canvas"),
  start: function () {
    this.canvas.width = 480;
    this.canvas.height = 480;
    this.context = this.canvas.getContext("2d");
    this.canvas.style.display = "block";
    this.canvas.style.margin = "0 auto";
    this.canvas.style.border = "3px solid black";

    const main = document.querySelector("main");
    main.append(this.canvas);

    drawCircularMaze(); // Draw the circular maze
  },
};

function drawCircularMaze() {
  const canvas = document.querySelector("canvas");
  const ctx = canvas.getContext("2d");

  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const radius = 200; // Outer radius of the maze
  const rings = 6; // Number of concentric rings
  const segments = 12; // Number of angular segments per ring

  // Generate the maze
  const maze = generateCircularMaze(rings, segments);

  // Draw the maze
  ctx.lineWidth = 2;
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

  // Start carving from the center
  maze[0][0].visited = true;
  carvePassages(0, 0);

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

