export const Walls = new Set();

// this is not efficient, need to figure out a way of scattering the 
// coords across wihtout inputting each figure 
// like x = 60 - 210, y = 230 - 155
// could this be done with a for loop?
// have implemented below, will thsi work?

// shore line boundary - left to right
for (let x = 0; x > 210; x + 16) {
    for(let y = 255; y < 155; y - 16) {
        walls.add(x, y);
    }
};

// bottom line boundary - right to left
for (let x = 0; x > 192; x + 16) {
    for(let y = 255; y < 272; y - 15) {
        walls.add(x, y);
    }
};



walls.add('210,155'); // shore line
walls.add('180,175'); 
walls.add('150,185'); 
walls.add('120,205'); 
walls.add('90,220'); 
walls.add('60,230'); 
walls.add('60,230'); 
