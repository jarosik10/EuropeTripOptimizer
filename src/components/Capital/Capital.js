import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledCapitalWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin: 16px 0;
`;

const StyledCapital = styled.div`
    background-color: ${({ theme }) => theme.colors.white};
    border: 1px solid #1f1f1f;
    display: flex;
    border-radius: 10px;
    align-items: center;
    justify-content: space-between;
    width: 60%;
    padding: 4px 12px;
`;

const FlagImage = styled.div`
    width: 15%;
    height: auto;

    img {
        display: block;
        height: 100%;
        width: 100%;
    }
`;

const H3 = styled.h3`
    margin:0;
    padding:0;
    font-size: 14px;
    text-transform: capitalize;
`;

const CancelButton = styled.button`
    padding: 15px;
    border: none;
    background: none;
    position: relative;

    ::before, ::after{
        content: '';
        display: block;
        position: absolute;
        transform-origin: center;
        background-color: ${({ theme }) => theme.colors.black};
        width: 20px;
        height: 2px;
    }

    ::before{
        transform: translateX(-50%) rotate(45deg);
    }

    ::after {
        transform: translateX(-50%) rotate(-45deg);
    }
`;

const Capital = ({ name, countryShortcut, handleCancel }) => {
    const capitalName = `${name} (${countryShortcut.toUpperCase()})`
    return (
        <StyledCapitalWrapper>
            <StyledCapital>
                <H3>{capitalName}</H3>
                <FlagImage><img src={`https://www.countryflags.io/${countryShortcut}/shiny/64.png`} alt={`${countryShortcut.toUpperCase()} flag`} /></FlagImage>
            </StyledCapital>
            {handleCancel ? <CancelButton onClick={() => handleCancel(countryShortcut)} /> : null}
        </StyledCapitalWrapper>
    );
}

Capital.propTypes = {
    name: PropTypes.string.isRequired,
    countryShortcut: PropTypes.string.isRequired,
    handleCancel: PropTypes.func,
}

export default Capital;