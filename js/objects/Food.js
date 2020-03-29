class Food {
    constructor() {
        this.id = uuid()
        this.x = randomInt(0, cw - boxSize, boxSize)
        this.y = randomInt(0, ch - boxSize, boxSize)
        this.color = 'yellow'
        this.size = boxSize
    }

    draw() {
        drawRect(this.x, this.y, this.size, this.size, this.color)
    }

    render() {
        this.draw()
    }
}