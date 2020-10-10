import styled from 'styled-components';

const H2 = styled.h2`
    margin: 0;
    padding: 20px;
    font-size: 18px;
    color: ${({ isDark }) => isDark ? '#FFFFFF' : '#02369B'}
`;

export default H2;