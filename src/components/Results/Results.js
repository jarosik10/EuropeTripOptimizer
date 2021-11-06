import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { sum, index, matrix, zeros, subset, range, clone } from 'mathjs';
import * as actions from '../../store/actions/index';
import Loader from '../Loader/Loader';
import H2 from '../H2/H2';
import Button from '../Button/Button';
import Capital from '../Capital/Capital';
import DistanceArrow from '../DistanceArrow/DistanceArrow';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Backdrop from '../Backdrop/Backdrop';

const StyledResults = styled.div`
    position: absolute;
    width: 100%;
    height: calc(100vh - 60px);
    top: 60px;
    z-index: ${({ theme }) => theme.zindex.level9};
    background-color: ${({ theme }) => theme.colors.white};
    display: grid;
    grid-template-rows: auto 1fr;

    ${({ theme }) => theme.media.tablet} {
        text-align: center;
    }

    ${({ theme }) => theme.media.smallDesktop} {
        width: 80%;
        max-width: 1000px;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        box-shadow: 1px 1px 4px 2px rgba(0, 0, 0, 0.25);
    }
`;

const StyledSummaryWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    background-color: ${({ theme }) => theme.colors.lightBlue};
`;

const StyledButtonsWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-evenly;
`;

const OptimizedRoute = styled.div`
    display: flex;
    flex-direction: column;
    overflow: hidden;
`;

const StyledOL = styled.ol`
    overflow-y: scroll;
    list-style: none;
    padding: 0;
    margin: 0;
`;

const StyledDistanceWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const StyledBackdrop = styled(Backdrop)`
    display: none;

    ${({ theme }) => theme.media.smallDesktop} {
            display: block
    }
`;

const Results = ({ selectedCapitals, loadingDistanceMatrix, executedACO, distances, capitalsOrder, executeAntColonyOptimization, optimalRoute, optimalDistance, closeResults, resetCapitalsState, resetResultsState }) => {
    let citiesNumber = distances.length;
    let distanceMatrix = useRef();
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

    const planNewTrip = () => {
        closeResults();
        resetCapitalsState();
        resetResultsState();
    }

    useEffect(() => {
        if (!loadingDistanceMatrix) {
            let newDistanceMatrix = matrix(distances);
            newDistanceMatrix = equalizeDistances(newDistanceMatrix);
            unreachableCapitals.current = findUnreachableRoutes(newDistanceMatrix);
            if (unreachableCapitals.current.length > 0) {
                newDistanceMatrix = deleteUnreachableRoutes(newDistanceMatrix, unreachableCapitals.current);
            }
            distanceMatrix.current = newDistanceMatrix;
            executeAntColonyOptimization(newDistanceMatrix._data);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loadingDistanceMatrix])

    if (executedACO) {
        let errorMessage;
        let fixedOptimalRoute = [...optimalRoute];
        let orderedDistances = [];

        fixedOptimalRoute = fixedOptimalRoute.map(cityNumber => {
            const indexShift = unreachableCapitals.current.filter(unreachableCapital => cityNumber >= unreachableCapital).length;
            return cityNumber + indexShift;
        });
        const orderedCountriesID = fixedOptimalRoute.map((cityNumber) => capitalsOrder[cityNumber]);
        const routeCapitals = orderedCountriesID.map(orderedCountryId => {
            const [capital] = selectedCapitals.filter(({ countryId }) => countryId.toUpperCase() === orderedCountryId);
            return capital;
        })

        for (let i = 0; i < optimalRoute.length - 1; i++) {
            orderedDistances.push(subset(distanceMatrix.current, index(optimalRoute[i], optimalRoute[i + 1])));
        }

        if (unreachableCapitals.current.length > 0) {
            const unreachableCountiresID = unreachableCapitals.current.map((cityNumber) => capitalsOrder[cityNumber]);
            const unreachableRouteCapitalsName = unreachableCountiresID.map(unreachableCountryID => {
                const [{ capitalName }] = selectedCapitals.filter(({ countryId }) => countryId.toUpperCase() === unreachableCountryID);
                return capitalName.charAt(0).toUpperCase() + capitalName.slice(1);
            })
            errorMessage = `A route to ${unreachableRouteCapitalsName.join(', ')} could not be found.`;
        }

        results = (
            <>
                <StyledSummaryWrapper>
                    {errorMessage ? <ErrorMessage text={errorMessage} /> : null}
                    <H2>Total distance: {Math.round(optimalDistance)} km</H2>
                    <StyledButtonsWrapper>
                        <Button handleClick={planNewTrip} isEnabled isSmall>Plan new trip</Button>
                        <Button handleClick={closeResults} isEnabled isSmall>Return</Button>
                    </StyledButtonsWrapper>
                </StyledSummaryWrapper>
                <OptimizedRoute>
                    <H2 isDark>Optimal route</H2>
                    <StyledOL>
                        {routeCapitals.map((capital, index, array) => (
                            <li key={index + capital.countryId}>
                                <Capital
                                    name={capital.capitalName}
                                    countryShortcut={capital.countryId}
                                />
                                {index !== array.length - 1 ?
                                    <StyledDistanceWrapper>
                                        <DistanceArrow distance={Math.round(orderedDistances[index])} />
                                    </StyledDistanceWrapper>
                                    : null}
                            </li>
                        ))}
                    </StyledOL>
                </OptimizedRoute>
            </>
        )
    }

    const loaderMessage = loadingDistanceMatrix ? 'Calculating the distance matrix' : !executedACO ? 'Executing ant colony optimization' : '';
    return (
        <>
            <StyledBackdrop />
            <StyledResults>
                {(loadingDistanceMatrix || !executedACO) ? <Loader text={loaderMessage} /> : results}
            </StyledResults>
        </>
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
        executeAntColonyOptimization: (distances) => dispatch(actions.executeAntColonyOptimization(distances)),
        resetCapitalsState: () => dispatch(actions.resetCapitalsState()),
        resetResultsState: () => dispatch(actions.resetResultsState()),
    }
}

Results.propTypes = {
    selectedCapitals: PropTypes.arrayOf(PropTypes.shape({
        capitalName: PropTypes.string.isRequired,
        countryId: PropTypes.string.isRequired,
        isStartingPoint: PropTypes.bool.isRequired,
    })),
    loadingDistanceMatrix: PropTypes.bool.isRequired,
    executedACO: PropTypes.bool.isRequired,
    distances: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
    capitalsOrder: PropTypes.arrayOf(PropTypes.string),
    executeAntColonyOptimization: PropTypes.func.isRequired,
    optimalRoute: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.number),
    ]),
    optimalDistance: PropTypes.oneOfType([
        PropTypes.number,
    ]),
    closeResults: PropTypes.func.isRequired,
    resetCapitalsState: PropTypes.func.isRequired,
    resetResultsState: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(Results);