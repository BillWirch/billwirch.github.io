export class Vector2    {
    constructor(x = 0, y = 0)   {
        this.x = x;
        this.y = y;
    }


    // do not understad why we need a dusplicate in the vector2 file
    duplicate() {
        return new Vector2(this.x, this.y);
    }
}