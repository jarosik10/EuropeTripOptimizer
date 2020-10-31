import styled from 'styled-components';

const Backdrop = styled.div`
width: 100%;
height: 100%;
position: fixed;
left: 0;
top: 0;
background-color: rgba(0, 0, 0 , 0.5);
z-index: ${({ theme }) => theme.zindex.level8};
`;

export default Backdrop;