/**
 * Draw line
 * @param fromX
 * @param fromY
 * @param toX
 * @param toY
 * @param lineWidth
 * @param color
 */
function drawLine(fromX, fromY, toX, toY, color = null, lineWidth = 1) {
    ctx.beginPath();
    ctx.strokeStyle = color || lc;
    ctx.lineWidth = lineWidth;
    ctx.lineJoin = "round";
    ctx.moveTo(fromX, fromY);
    ctx.lineTo(toX, toY);
    ctx.closePath();
    ctx.stroke();
}

function drawRect(fromX, fromY, toX, toY, bg, text = null) {
    ctx.fillStyle = bg;
    ctx.fillRect(fromX, fromY, toX, toY)
    if (text) {
        ctx.fillStyle = "white";
        ctx.font = "16pt sans-serif";
        ctx.fillText(text, fromX + boxSize, fromY + boxSize);
    }
}

function drawWeb() {
    // draw verticals
    let fromX = 0
    let fromY = 0
    for (let i = 0; i < ch; i += boxSize) {
        drawLine(fromX, fromY, fromX, ch, 'green')
        fromX += boxSize
    }

    // draw horizontals
    fromX = 0
    fromY = 0
    for (let i = 0; i < cw; i += boxSize) {
        drawLine(fromX, fromY, cw, fromY, 'green')
        fromY += boxSize
    }
}

function drawWorld() {
    drawRect(0, 0, cw, ch, cBg)
}

function randomInt(min = 0, max = 100, step = 1) {
    let randInt = Math.floor(Math.random() * (+max - +min)) + +min
    if (step > 1){
        do {
            randInt = Math.floor(Math.random() * (+max - +min)) + +min
        }while (randInt % step !== 0)
    }
    return randInt
}

function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

function getRandomDirection() {
    return directions[randomInt(0, 4)]
}

function removeAnimal(id) {
    let newAnimals = []

    for (let i = 0; i < animals.length; i++) {
        if (animals[i].id !== id) {
            newAnimals.push(animals[i])
        }
    }

    animals = newAnimals
}

function removeFood(id) {
    let newFoods = []

    for (let i = 0; i < foods.length; i++) {
        if (foods[i].id != id) {
            newFoods.push(foods[i])
        }
    }
    foods = newFoods
}

function drawAnimals() {
    for (let i = 0; i < animals.length; i++) {
        let animal = animals[i]
        animal.render()
    }
}

function drawFoods() {
    for (let i = 0; i < foods.length; i++) {
        let food = foods[i]
        food.render()
    }
}

function handleDayPassed() {
    if (!run) return false

    let newChildren = 0
    for (let i = 0; i < animals.length; i++) {
        let animal = animals[i]

        if (animal.foodFound) {
            if (animal.foodFound > 1){
                newChildren++
            }
            animal.revoke()
        } else {
            removeAnimal(animal.id)
        }
    }

    initAnimals(newChildren)
    foods = []
    initFoods()

    updateChart()
}

function createChart() {
    dps = []
    chart = new CanvasJS.Chart("chartContainer", {
        title :{
            text: "Life cycle"
        },
        axisY: {
            includeZero: false
        },
        data: [{
            type: "line",
            dataPoints: dps
        }]
    });
}

function updateChart() {
    dps.push({
        x: days,
        y: animals.length
    });

    chart.render();
}

function initAnimals(count){
    animalsCreated += count
    for (let i = 0; i < count; i++){
        let animal = new Animal()
        animals.push(animal)
    }
}

function initFoods(){
    for (let i = 0; i < dailyFoodCount; i++){
        let food = new Food()
        foods.push(food)
    }
}

function init() {
    drawWorld()
    drawWeb()
}

function render() {
    init()

    if (!run) return false

    if (animals.length) {
        drawAnimals()
    } else {
        document.getElementById('days-alive').innerText = days
        document.getElementById('max-animals').innerText = animalsCreated
        document.getElementById('stats').style.display = 'block'
        console.log('##########################')
        console.log('Days alive - ' + days)
        console.log('Max animals - ' + animalsCreated)
        console.log('##########################')
        run = false
    }

    drawFoods()
}

function loop() {
    setInterval(function () {
        render()
    }, FPS)
}

function start(){
    createChart()
    initAnimals(animalsStartCount)
    initFoods()
    updateChart()
    loop()
}

// function onSettingsUpdate(){
//     animalsStartCount = document.getElementById('animals').value
//     dailyFoodCount = document.getElementById('foods').value
//     start()
// }


function incrementDays() {
    if(!daysIncremented){
        daysIncremented = true
        days += 1
        document.getElementById('days').innerText = days
        handleDayPassed()
    }

    setTimeout(function () {
        daysIncremented = false
    }, 3000)
}