import * as actionTypes from '../actions/actionTypes';

const initialState = {
    loadingDistanceMatrix: false,
    executedACO: false,
    loadingMessage: '',
    distanceMatrix: {
        distances: [],
        capitalsOrder: null,
    },
    ACO: {
        optimalRoute: [],
        optimalDistance: null,
    }
};

const fetchDistanceMatrixStart = (state, action) => {
    return {
        ...state,
        loadingDistanceMatrix: true,
        executedACO: false,
    }
}

const fetchDistanceMatrixSuccess = (state, { distances, capitalsOrder }) => {
    return {
        ...state,
        loadingDistanceMatrix: false,
        distanceMatrix: {
            distances: distances,
            capitalsOrder: capitalsOrder,
        },
    }
}

const fetchDistanceMatrixFail = (state, action) => {
    return {
        ...state,
        loadingDistanceMatrix: false,
        executedACO: true,
    }
}

const antColonyOptimizationStart = (state, action) => {
    return {
        ...state,
        executedACO: false,
    }
}

const antColonyOptimizationSuccess = (state, { optimalRoute, optimalDistance }) => {
    return {
        ...state,
        executedACO: true,
        ACO: {
            optimalRoute: optimalRoute,
            optimalDistance: optimalDistance,
        }
    }
}

const resetResultsState = () => {
    return initialState;
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_DISTANCE_MATRIX_START:
            return fetchDistanceMatrixStart(state, action);
        case actionTypes.FETCH_DISTANCE_MATRIX_SUCCESS:
            return fetchDistanceMatrixSuccess(state, action);
        case actionTypes.FETCH_DISTANCE_MATRIX_FAIL:
            return fetchDistanceMatrixFail(state, action);
        case actionTypes.ANT_COLONY_OPTIMIZATION_START:
            return antColonyOptimizationStart(state, action);
        case actionTypes.ANT_COLONY_OPTIMIZATION_SUCCESS:
            return antColonyOptimizationSuccess(state, action);
        case actionTypes.RESET_RESULTS_STATE:
            return resetResultsState();
        default:
            return state;
    }
}

export default reducer;