import * as actionTypes from './actionTypes';
import axios from '../../axios-distanceMatrix';
import antColonyOptimizer from '../../antColonyOptimizer';

export const fetchDistanceMatrixStart = () => {
    return {
        type: actionTypes.FETCH_DISTANCE_MATRIX_START,
    };
}

export const fetchDistanceMatrixSuccess = (distances, capitalsOrder) => {
    return {
        type: actionTypes.FETCH_DISTANCE_MATRIX_SUCCESS,
        distances: distances,
        capitalsOrder: capitalsOrder,
    };
}

export const fetchDistanceMatrixFail = (error) => {
    return {
        type: actionTypes.FETCH_DISTANCE_MATRIX_FAIL,
        error: error,
    };
}

export const fetchDistanceMatrix = (locations, capitalsOrder) => {
    return dispatch => {
        dispatch(fetchDistanceMatrixStart());
        const API_KEY = '5b3ce3597851110001cf62487537592427e7443b9c7833eb30532a89'
        // const API_KEY = 'erroooor'
        const url = `https://api.openrouteservice.org/v2/matrix/driving-car?api_key=${API_KEY}`;
        const data = {
            "locations": locations,
            "metrics": ["distance"],
            "units": "km",
        };
        axios.post(url, data)
            .then(res => {
                dispatch(fetchDistanceMatrixSuccess(res.data.distances, capitalsOrder));
            })
            .catch(err => {
                dispatch(fetchDistanceMatrixFail(err));
            });
    }
}

export const antColonyOptimizationStart = () => {
    return {
        type: actionTypes.ANT_COLONY_OPTIMIZATION_START,
    };
}

export const antColonyOptimizationSuccess = (optimalRoute, optimalDistance) => {
    return {
        type: actionTypes.ANT_COLONY_OPTIMIZATION_SUCCESS,
        optimalRoute: optimalRoute,
        optimalDistance: optimalDistance,
    };
}

export const executeAntColonyOptimization = (distances) => {
    return dispatch => {
        dispatch(antColonyOptimizationStart());
        antColonyOptimizer(distances)
            .then(({ route, distance }) => {
                dispatch(antColonyOptimizationSuccess(route, distance));
            });
    }
}

export const resetResultsState = () => {
    return {
        type: actionTypes.RESET_RESULTS_STATE,
    }
}