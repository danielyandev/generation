const canvas = document.getElementById('world')
const ctx = canvas.getContext('2d');
/**
 * Canvas width
 */
const cw = canvas.width

/**
 * Canvas height
 */
const ch = canvas.height

/**
 * Canvas background
 */
const cBg = 'darkgreen'

/**
 * Line color
 */
const lc = 'white'

/**
 * 1 box size in canvas web
 */
const boxSize = 6

/**
 * All directions
 * @type {string[]}
 */
const directions = [
    'left', 'right', 'up', 'down'
]

/**
 *
 * @type {*[]}
 */
let animals = []

/**
 *
 * @type {*[]}
 */
let foods = []

/**
 * Chart
 */
let chart = null

/**
 * Chart data points
 * @type {*[]}
 */
let dps = [];

/**
 * How many foods to render each day
 * @type {number}
 */
let dailyFoodCount = 300

/**
 * How many animals to render at start
 * @type {number}
 */
let animalsStartCount = 100

/**
 *
 * @type {number}
 */
let FPS = 30

/**
 * Time in milliseconds to update direction
 * @type {number}
 */
const directionUpdate = 300

/**
 * Current day
 * @type {number}
 */
let days = 1

/**
 * Animals created count through whole lifecycle
 * @type {number}
 */
let animalsCreated = 0

/**
 * Run life
 * @type {boolean}
 */
let run = true

/**
 *
 * @type {boolean}
 */
let daysIncremented = false