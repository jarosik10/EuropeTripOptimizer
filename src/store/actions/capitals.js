import * as actionTypes from './actionTypes';

export const addCapital = (capitalName, countryId) => {
    return {
        type: actionTypes.ADD_CAPITAL,
        capitalName: capitalName,
        countryId: countryId
    }
}

export const removeCapital = countryId => {
    return {
        type: actionTypes.REMOVE_CAPITAL,
        countryId: countryId
    }
}