import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { sum, index, matrix, zeros, subset, range, clone, re } from 'mathjs';
import * as actions from '../../store/actions/index';
import Loader from '../Loader/Loader';

const StyledResults = styled.div`
    position: absolute;
    width: 100%;
    height: calc(100% - 60px);
    top: 60px;
    z-index: 9999;
    background-color: ${({ theme }) => theme.colors.white};
    /* display: flex; */
`;

const Results = ({ selectedCapitals, loadingDistanceMatrix, executedACO, distances, capitalsOrder, executeAntColonyOptimization, optimalRoute, optimalDistance }) => {
    let citiesNumber = distances.length;
    let unreachableCapitals = useRef([]);
    let results;

    const equalizeDistances = (distanceMatrix) => {
        let newDistanceMatrix = clone(distanceMatrix);
        for (let i = 0; i < citiesNumber; i++) {
            for (let j = 0; j < citiesNumber; j++) {
                newDistanceMatrix = subset(newDistanceMatrix, index(j, i), subset(newDistanceMatrix, index(i, j)));
            }
        }
        return newDistanceMatrix;
    }

    const findUnreachableRoutes = (distanceMatrix) => {
        let unreachableCapitals = []
        for (let i = 0; i < citiesNumber; i++) {
            const distSum = sum(subset(distanceMatrix, index(i, range(0, citiesNumber))));
            if (distSum === 0) {
                unreachableCapitals.push(i);
            }
        }
        return unreachableCapitals;
    }

    const deleteUnreachableRoutes = (distanceMatrix, unreachableCapitals) => {
        let newDistanceMatrix = zeros(matrix([citiesNumber - unreachableCapitals.length, citiesNumber - unreachableCapitals.length]));
        let iIndex = 0;
        for (let i = 0; i < citiesNumber; i++) {
            let jIndex = 0;
            if (unreachableCapitals.includes(i)) {
                continue;
            }
            for (let j = 0; j < citiesNumber; j++) {
                if (unreachableCapitals.includes(j)) {
                    continue;
                }
                const replacement = subset(distanceMatrix, index(i, j));
                newDistanceMatrix = subset(newDistanceMatrix, index(iIndex, jIndex), replacement);
                jIndex++;
            }
            iIndex++;
        }
        return newDistanceMatrix;
    }

    useEffect(() => {
        if (!loadingDistanceMatrix) {
            let distanceMatrix = matrix(distances);
            distanceMatrix = equalizeDistances(distanceMatrix);
            unreachableCapitals.current = findUnreachableRoutes(distanceMatrix);
            console.log('unreachableCapitals', unreachableCapitals);
            if (unreachableCapitals.current.length > 0) {
                distanceMatrix = deleteUnreachableRoutes(distanceMatrix, unreachableCapitals.current);
            }
            console.log('Final distance matrix', distanceMatrix);
            executeAntColonyOptimization(distanceMatrix);
        }
    }, [loadingDistanceMatrix])

    if (executedACO) {
        let errorMessage;
        let fixedOptimalRoute = [...optimalRoute];
        fixedOptimalRoute = fixedOptimalRoute.map(cityNumber => {
            const indexShift = unreachableCapitals.current.filter(unreachableCapital => cityNumber >= unreachableCapital).length;
            return cityNumber + indexShift;
        });
        console.log('fixedOptimalRoute', fixedOptimalRoute);
        const orderedCountriesID = fixedOptimalRoute.map((cityNumber) => capitalsOrder[cityNumber]);
        console.log('orderedCountriesID', orderedCountriesID);
        const routeCapitalsName = orderedCountriesID.map(orderedCountryId => {
            const [{ capitalName }] = selectedCapitals.filter(({ countryId }) => countryId.toUpperCase() === orderedCountryId);
            return capitalName;
        })
        console.log(routeCapitalsName);

        if (unreachableCapitals.current.length > 0) {
            const unreachableCountiresID = unreachableCapitals.current.map((cityNumber) => capitalsOrder[cityNumber]);
            console.log('unreachableCountiresID', unreachableCountiresID);
            const unreachableRouteCapitalsName = unreachableCountiresID.map(unreachableCountryID => {
                const [{ capitalName }] = selectedCapitals.filter(({ countryId }) => countryId.toUpperCase() === unreachableCountryID);
                return capitalName.charAt(0).toUpperCase() + capitalName.slice(1);
            })
            console.log('unreachableRouteCapitalsName', unreachableRouteCapitalsName);
            errorMessage = `Couldn't find route to ${unreachableRouteCapitalsName.join(', ')}.`;
        }

        results = (
            <>
                <div>
                    {errorMessage ? <p>{errorMessage}</p> : null}
                    <p>Total distance: {optimalDistance}</p>
                    <button>Plan new trip</button>
                    <button>Return</button>
                </div>
                <div>
                    <p>Route component</p>
                </div>
            </>
        )
    }

    const loaderMessage = loadingDistanceMatrix ? 'Calculating the distance matrix' : !executedACO ? 'Executing ant colony optimization' : '';
    return (
        <StyledResults>
            {(loadingDistanceMatrix || !executedACO) ? <Loader text={loaderMessage} /> : results}
        </StyledResults>
    );
}

const mapStateToProps = state => {
    return {
        selectedCapitals: state.capitals.selectedCapitals,
        loadingDistanceMatrix: state.results.loadingDistanceMatrix,
        distances: state.results.distanceMatrix.distances,
        capitalsOrder: state.results.distanceMatrix.capitalsOrder,
        executedACO: state.results.executedACO,
        optimalRoute: state.results.ACO.optimalRoute,
        optimalDistance: state.results.ACO.optimalDistance,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        executeAntColonyOptimization: (distances) => dispatch(actions.executeAntColonyOptimization(distances))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Results);