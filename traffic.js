function trainingTraffic(road) {
    return [
        new Car(road.getLaneCenter(1), -100, 30, 50, "DUMMY", 2),
        new Car(road.getLaneCenter(0), -300, 30, 50, "DUMMY", 2),
        new Car(road.getLaneCenter(3), -300, 30, 50, "DUMMY", 2),
        new Car(road.getLaneCenter(0), -500, 30, 50, "DUMMY", 2),
        new Car(road.getLaneCenter(1), -500, 30, 50, "DUMMY", 2),
        new Car(road.getLaneCenter(1), -700, 30, 50, "DUMMY", 2),
        new Car(road.getLaneCenter(3), -700, 30, 50, "DUMMY", 2),
    ]
}
    

function generateTraffic(road) {
    let cars = []

    for(let i = -100; i > -3000; i -= 200) {
        const generate = Math.random() > 0.85 ? false : true

        if(generate) {
            let num = Math.round(Math.random())+1
            console.log(num)
            let lanes = Array.from(Array(road.laneCount).keys())
            
            for (; num > 0; --num) {
                const index = Math.floor(Math.random()*lanes.length+1)-1
                lanes.splice(index, 1)
            }

            lanes.forEach(lane => {
                cars.push(new Car(road.getLaneCenter(lane), i, 30, 50, "DUMMY", 2))
            });
        } 
    }

    return cars
}