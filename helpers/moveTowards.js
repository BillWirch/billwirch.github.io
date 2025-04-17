// person, moves towards the destination, at this speed
// if its close enough it will auto snap to position
//if not it will proceed there at the given speed
// then will return distance to destination when called

// this is all about moving the destination rather than the character to
// create a grid and nicer feel, the destination is always grid aligned
// not quite sure why the character couldnt be done this way instead
export function moveTowards(person, destinationPosition, speed) {
    
    //this is disatnce calcd by minusing positon from destination
    let distanceToTravelX = destinationPosition.x - person.position.x;
    let distanceToTravelY = destinationPosition.y - person.position.y;
    
    // here disatnce is calcd as the hypotenuse after squaring the x and y
    let distance = Math.sqrt(distanceToTravelX**2 + distanceToTravelY**2);

    if (distance <= speed) {
        // if D is less than S we are close enough to d so go strsight there
        person.position.x  = destinationPosition.x;
        person.position.y  = destinationPosition.y;
    } else {
        // else move at the speed toward D
        let normalizedX = distanceToTravelX / distance;
        let normalizedY = distanceToTravelY / distance;

        person.position.x += normalizedX * speed;
        person.position.y += normalizedY * speed; // Fixed: was incorrectly using position.x

        // here we recakc the remaining distance after player moves 
        // exact same as above

        distanceToTravelX = destinationPosition.x - person.position.x;
        distanceToTravelY = destinationPosition.y - person.position.y;
        distance = Math.sqrt(distanceToTravelX**2 + distanceToTravelY**2);
    }
    

    
    return distance;
}