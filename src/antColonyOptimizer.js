import { matrix, dotDivide, dotMultiply, ones, subset, range, index, pow, min, zeros, clone, sum } from 'mathjs';

const antColonyOptimizer = async (distances) => {
    let optimalRoute = [];
    let optimalDistance = -1;
    let distanceMatrix = matrix(distances);
    const ITERATIONS = 50;
    const CITIES_NUMBER = distanceMatrix.size()[0];
    const ANTS_NUMBER = distanceMatrix.size()[0];
    const EVAPORATION_RATE = .5;
    const alpha = 1;
    const beta = 10;

    let visibility = dotDivide(1, distanceMatrix);
    visibility = visibility.map(vis => vis === Infinity ? 0 : vis);

    let pheromones = ones(matrix([CITIES_NUMBER, CITIES_NUMBER]));
    pheromones = dotMultiply(.1, pheromones);

    let route = zeros(matrix([ANTS_NUMBER, CITIES_NUMBER + 1]))
    for (let i = 0; i < ITERATIONS; i++) {
        route = subset(route, index(range(0, ANTS_NUMBER), 1), zeros(ANTS_NUMBER));
        for (let k = 0; k < ANTS_NUMBER; k++) {
            let currentVisibility = clone(visibility);
            for (let n = 0; n < CITIES_NUMBER - 1; n++) {
                const currentLocation = subset(route, index(k, n));
                currentVisibility = subset(currentVisibility, index(range(0, CITIES_NUMBER), currentLocation), zeros(CITIES_NUMBER));
                let vFactor = subset(currentVisibility, index(currentLocation, range(0, CITIES_NUMBER)));
                let pFactor = subset(pheromones, index(currentLocation, range(0, CITIES_NUMBER)));
                vFactor = vFactor.map((value) => pow(value, beta));
                pFactor = pFactor.map((value) => pow(value, alpha));
                const pvFactor = dotMultiply(pFactor, vFactor);
                const total = sum(pvFactor);
                const probs = dotDivide(pvFactor, total)
                const cumProbs = [];
                probs.toArray()[0].reduce((prev, curr, index) => {
                    return cumProbs[index] = prev + curr;
                }, 0);
                const r = Math.random();
                const city = cumProbs.findIndex(prob => prob > r);
                route = subset(route, index(k, n + 1), city);
            }
        }
        // Calculate the distances traveled
        const distances = [];
        for (let k = 0; k < ANTS_NUMBER; k++) {
            let distance = 0;
            for (let n = 0; n < CITIES_NUMBER; n++) {
                const from = subset(route, index(k, n));
                const to = subset(route, index(k, n + 1));
                distance += subset(distanceMatrix, index(from, to));
            }
            distances.push(distance);
        }
        // Pheromone update
        pheromones = dotMultiply(EVAPORATION_RATE, pheromones); // evaporation
        for (let k = 0; k < ANTS_NUMBER; k++) { // ant trail
            for (let n = 0; n < CITIES_NUMBER; n++) {
                const trail = ANTS_NUMBER / distances[k];
                const from = subset(route, index(k, n));
                const to = subset(route, index(k, n + 1));
                pheromones = subset(pheromones, index(from, to), subset(pheromones, index(from, to)) + trail);
            }
        }
        const minDist = min(distances);
        const minDistanceIndex = distances.findIndex(dist => dist === minDist);
        optimalRoute = subset(route, index(minDistanceIndex, range(0, CITIES_NUMBER + 1)));
        optimalDistance = minDist;
    }
    return {
        route: optimalRoute.toArray()[0],
        distance: optimalDistance,
    }
}

export default antColonyOptimizer;