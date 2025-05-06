export const gridCells = n => {
    return n * 16;
}

export const isSpaceFree = (walls, x, y) => {
    // const str = `${x},${y}`;
    // const isWallPresent = walls.has(str);
    // //console.log(`Checking collision at: ${str}`);
    // //console.log(`Wall coordinates:`, Array.from(walls));
    // return !isWallPresent;

    // Check surrounding area for walls
    for(let offsetX = -5; offsetX <= 5; offsetX++) {
        for(let offsetY = -5; offsetY <= 5; offsetY++) {
            const checkStr = `${x + offsetX},${y + offsetY}`;
            if(walls.has(checkStr)) {
                return false;
            }
        }
    }
    return true;
}
