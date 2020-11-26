class Food {
    constructor() {
        this.image = loadImage("Milk.png");
        this.lastFed;
    }

    display() {
        let x = 80;
        let y = 50;
        for (let i = 0; i < foodS; i++, x += 30) {
            if (i % 10 == 0) {
                x = 80;
                y += 50;
            }
            image(this.image, x, y, 40, 50);
        }
    }
}