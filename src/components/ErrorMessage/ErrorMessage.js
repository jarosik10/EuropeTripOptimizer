import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledErrorMessage = styled.div`
    background-color: #FFABAB;
    color: black;
    padding: 14px 16px;
    text-align: center;
    margin: 16px 16px 0 16px;
`;

const ErrorMessage = ({ text }) => {
    return <StyledErrorMessage>{text}</StyledErrorMessage>
}

ErrorMessage.propTypes = {
    text: PropTypes.string.isRequired,
}

export default ErrorMessage;