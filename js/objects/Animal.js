class Animal {
    constructor() {
        this.id = uuid()
        this.size = boxSize * 2
        this.x = randomInt(0, cw - this.size, boxSize)
        this.y = randomInt(0, ch - this.size, boxSize)
        this.color = 'red'
        this.startEnergy = 200
        this.energy = this.startEnergy
        this.foodFound = 0
        this.canMove = true
        this.daysAlive = 1
        this.direction = getRandomDirection()
        this.startChangingDirection()
    }

    revoke() {
        this.energy = this.startEnergy
        this.foodFound = 0
        this.canMove = true
        this.daysAlive++
        incrementDays()
    }

    changeDirection() {
        this.direction = getRandomDirection()
    }

    startChangingDirection() {
        let self = this
        setInterval(function () {
            self.changeDirection()
        }, directionUpdate)
    }


    draw() {
        drawRect(this.x, this.y, this.size, this.size, this.color, this.daysAlive)
    }

    move() {
        if (this.canMove){
            switch (this.direction) {
                case 'left':
                    this.x -= this.size
                    break;
                case 'right':
                    this.x += this.size
                    break;
                case 'up':
                    this.y -= this.size
                    break;
                case 'down':
                    this.y += this.size
                    break;
            }
        }

        if (this.x < 0) {
            this.x = 0
            this.changeDirection()
        }
        if (this.y < 0) {
            this.y = 0
            this.changeDirection()
        }
        if (this.x >= cw - this.size) {
            this.x = cw - this.size
            this.changeDirection()
        }
        if (this.y >= ch - this.size) {
            this.y = ch - this.size
            this.changeDirection()
        }

        if (this.energy > 0) {
            this.energy--
        } else if (!this.foodFound) {
            removeAnimal(this.id)
        }else{
            this.revoke()
        }

        this.draw()
    }

    checkCollision(){
        let xFrom = this.x
        let xTo = this.x + this.size
        let yFrom = this.y
        let yTo = this.y + this.size

        let collision = false
        let foundId
        for (let i = 0; i < foods.length; i++){
            let food = foods[i]
            if (food.x >= xFrom && food.x < xTo && food.y >= yFrom && food.y < yTo){
                foundId = food.id
                collision = true
                break
            }
        }

        if (collision){
            this.foodFound++
            removeFood(foundId)
        }
    }

    render() {
        this.move()
        this.checkCollision()
    }
}