export const gridCells = n => {
    return n * 16;

}

export const isSpaceFree = (walls,x, y) => {
    //converts to string for ease??
    const str = `${x},${y}`; // this needs to be a string in linked file too
    // check if walls are there at location
    const isWallPresent = walls.has(str);
    return !isWallPresent;
}