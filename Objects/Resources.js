class Resources {
    constructor() {
        this.toLoad = {
            level1: './gameImages/TowerBridgeLevel1.png',
            //ground: './gameImages/ground.png',
            hero: './gameImages/hero.png',
            shadow: './gameImages/shadow.png',
        };

        this.images = {};

        // load the images into the bucket
        // this workjs by iterating through the keys of the toLoad object using forEach.
        // each key specfied in the toload object is used to referenmce an image src, using [key] as the generic index
        // for eacvh key -  const image is created, using new image object, th source is specified using the same key
        //this.imaghes object is then called, the object is then populated, 

        Object.keys(this.toLoad).forEach(key => {
            const img = new Image();
            
            // Set up onload before setting src
            img.onload = () => {
                this.images[key].isLoaded = true;
                this.images[key].width = img.width;
                this.images[key].height = img.height;
                console.log(`${key} image loaded: ${img.width}x${img.height}`);
            };

            img.onerror = () => {
                console.error(`Failed to load ${key} image from ${this.toLoad[key]}`);
            };

            this.images[key] = {
                image: img,
                isLoaded: false,
                width: 0,
                height: 0
            };

            // Set src after setting up event handlers
            img.src = this.toLoad[key];
        });
    }
}

export const resources = new Resources();
