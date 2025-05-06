export const walls = new Set();

// this needs to be redone in a switch break or if levle 1,2,3
//for this to work needs coordinates to be top left top rigtht etc
// alternativly could coordinate 4 corners  as abcd and use them as 
//consts to map x and y from using forEach

// need to add perimeter

// shore line boundary - left to right


// coudl this bit be a class instead???
// check pixel coords

let topLeft = {
    x:270,
    y:210
};
let topRight = {
    x:415,
    y:220
};
let bottomRight = {
    x:225,
    y:360
};
let bottomLeft = {
    x:0,
    y:360
};

//drawing left wall, bottom to top - sloped
for (let y = bottomLeft.y; y > topLeft.y; y -= 16) {
    const progress = (bottomLeft.y - y) / (bottomLeft.y - topLeft.y);
    const x = bottomLeft.x + (topLeft.x - bottomLeft.x) * progress;
    walls.add(`${Math.round(x)},${y}`);
}

// drawing top wall, left to right - sloped
for (let x = topLeft.x; x < topRight.x; x += 16) {
    const progress = (x - topLeft.x) / (topRight.x - topLeft.x);
    const y = topLeft.y + (topRight.y - topLeft.y) * progress;
    walls.add(`${x},${Math.round(y)}`);
}

// drawing bottom wall - left to right - sloped
for (let x = bottomLeft.x; x < bottomRight.x; x += 16) {
    const progress = (x - bottomLeft.x) / (bottomRight.x - bottomLeft.x);
    const y = bottomLeft.y + (bottomRight.y - bottomLeft.y) * progress;
    walls.add(`${x},${Math.round(y)}`);
}

// drawing right wall, bottom to top - sloped
for (let y = bottomRight.y; y > topRight.y; y -= 16) {
    const progress = (bottomRight.y - y) / (bottomRight.y - topRight.y);
    const x = bottomRight.x + (topRight.x - bottomRight.x) * progress;
    walls.add(`${Math.round(x)},${y}`);
}

// walls.add('210,155'); // shore line
// walls.add('180,175'); 
// walls.add('150,185'); 
// walls.add('120,205'); 
// walls.add('90,220'); 
// walls.add('60,230'); 
// walls.add('60,230');
