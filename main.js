const carCanvas = document.getElementById("carCanvas")
carCanvas.width = 200
const networkCanvas = document.getElementById("networkCanvas")
networkCanvas.width = 500
const buttonsDiv = document.getElementById("verticalButtons")

const carCtx = carCanvas.getContext("2d")
const road = new Road(carCanvas.width/2, carCanvas.width*0.9)

const N = 1000
let cars = generateCars(N)
let bestCar = cars[0]
let paused = false

if(localStorage.getItem("bestBrain")) {
    for (let i = 0; i < cars.length; i++) {
        cars[i].brain = JSON.parse(
        localStorage.getItem("bestBrain")
        )
    
        if(i != 0) {
            NeuralNetwork.mutate(cars[i].brain, 0.1)
        }
    }

}



const networkCtx = networkCanvas.getContext("2d")

const traffic = generateTraffic(road)

animate();

function generateCars(N) {
    const cars = []

    for (let i = 1; i < N; i++) {
        cars.push(new Car(road.getLaneCenter(1), 100, 30, 50, "AI"))
    }

    return cars
}

function animate(time) {
    for (let i = 0; i < traffic.length; i++) {
        traffic[i].update(road.borders, [])
    }
    for (let i = 0; i < cars.length; i++) {
        cars[i].update(road.borders, traffic)
    }

    bestCar = cars.find(
        c => c.y == Math.min(...cars.map(e=>e.y))
    )

    carCanvas.height=window.innerHeight
    networkCanvas.height=window.innerHeight
    buttonsDiv.height=window.innerHeight
    
    carCtx.save()
    carCtx.translate(0, -bestCar.y+carCanvas.height*0.7)

    road.draw(carCtx)
    for (let i = 0; i < traffic.length; i++) {
        traffic[i].draw(carCtx, "orange")
    }

    carCtx.globalAlpha = 0.2
    for (let i = 0; i < cars.length; i++) {
        cars[i].draw(carCtx, "blue")
    }
    carCtx.globalAlpha = 1
    bestCar.draw(carCtx, "blue", true)
    
    carCtx.restore()

    networkCtx.lineDashOffset = -time/50
    Visualizer.drawNetwork(networkCtx, bestCar.brain)

    if(!paused) requestAnimationFrame(animate)
}

function simulate() {
    console.log("simulate")
    cars = [cars[0]]
}

function pause() {
    paused = true
}

function resume() {
    paused = false
    requestAnimationFrame(animate)
}

function save() {
    localStorage.setItem("bestBrain",
    JSON.stringify(bestCar.brain))
}

function discard() {
    localStorage.removeItem("bestBrain")
}