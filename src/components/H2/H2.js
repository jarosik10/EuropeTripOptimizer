import PropTypes from 'prop-types';
import styled from 'styled-components';

const H2 = styled.h2`
    position: relative;
    margin: 0;
    padding: 16px 16px 16px 16px;
    width: 100%;
    font-size: 18px;
    color: ${({ isDark, theme }) => isDark ? theme.colors.white : theme.colors.darkBlue};
    background-color: ${({ isDark, theme }) => isDark ? theme.colors.darkBlue : theme.colors.lightBlue};

    ::before {
        display: ${({ isDark }) => isDark ? 'none' : 'block'};
        content: '';
        position: absolute;
        bottom: 0;
        width: 95%;
        height: 2px;
        border-radius: 5px;
        left: 50%;
        background-color: ${({ theme }) => theme.colors.darkBlue};
        transform: translateX(-50%);
    }
`;

H2.propTypes = {
    isDark: PropTypes.bool
}

export default H2;