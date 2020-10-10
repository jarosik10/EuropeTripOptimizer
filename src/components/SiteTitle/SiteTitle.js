import React from 'react';
import styled from 'styled-components';

const StyledTitle = styled.h1`
    margin: 0;
    font-size: 24px;
    color: white;
    text-align: center;

    .title__start {
        display: block;
        letter-spacing: 0.2em;
        text-transform: uppercase;
        margin-left: 0.2em;
    }

    .title__end {
        display: block;
        font-size: 0.75em;
        /* letter-spacing: 0.1em; */
        line-height: 0.6em;
        margin-bottom: 0.4em;
        font-weight: normal;
    }
`;

const Title = props => {
    return (
        <StyledTitle>
            <span className="title__start">Europe</span>
            <span className="title__end">Trip optimizer</span>
        </StyledTitle>
    )
}

export default Title;