
// main.append('canvas');
function startGame() {
  myGameArea.start();
}

const myGameArea = {
  canvas : document.createElement("canvas"),
  start : function() {
    this.canvas.width = 480;
    this.canvas.height = 270;
    this.context = this.canvas.getContext("2d");
    this.canvas.style.display = "block"; // Ensure the canvas is displayed
    this.canvas.style.margin = "0 auto"; // Center the canvas horizontally
    this.canvas.style.border = "3px solid black"; // Add a border for visibility
    document.main.appendChild(this.canvas);