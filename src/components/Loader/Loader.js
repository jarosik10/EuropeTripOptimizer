import React from 'react';
import styled from 'styled-components';
import Spinner from './Spinner/Spinner';

const StyledLoader = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    grid-row: 1 / -1;
`;

const Message = styled.p`
    color: ${({ theme }) => theme.colors.darkBlue};
    font-weight: bold;
    font-size: 18px;
    margin: 0 0 36px 0;
`;

const Loader = ({ text }) => {
    return (
        <StyledLoader>
            <Message>{text}</Message>
            <Spinner />
        </StyledLoader>
    );
}

export default Loader;