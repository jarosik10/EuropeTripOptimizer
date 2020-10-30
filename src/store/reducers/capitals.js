import * as actionTypes from '../actions/actionTypes';

const initialState = {
    selectedCapitals: [],
};

const addCapital = (state, { capitalName, countryId }) => {
    const newCapital = {
        capitalName: capitalName,
        countryId: countryId,
        isStartingPoint: false
    }
    if (state.selectedCapitals.filter(({ isStartingPoint }) => isStartingPoint).length === 0) {
        newCapital.isStartingPoint = true
    }

    return { selectedCapitals: state.selectedCapitals.concat(newCapital) };
}

const removeCapital = (state, { countryId }) => {
    return { selectedCapitals: state.selectedCapitals.filter(({ countryId: id }) => countryId !== id) }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_CAPITAL:
            return addCapital(state, action);
        case actionTypes.REMOVE_CAPITAL:
            return removeCapital(state, action);
        default:
            return state;
    }
}

export default reducer;