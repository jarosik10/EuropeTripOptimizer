import PropTypes from 'prop-types';
import styled from 'styled-components';

const DistanceArrow = styled.div`
    position: relative;
    width: 0;
    height: 0;
    font-size: 30px;
    border-top: 1em solid ${({ theme }) => theme.colors.darkBlue};
    border-left: 0.6em solid transparent;
    border-right: 0.6em solid transparent;

    ::before {
        content: '';
        font-size: calc(1em + 5px);
        position: absolute;
        bottom: 0px;
        left: calc(-0.6em + 6px);
        width: 0;
        height: 0;
        border-top: 1em solid ${({ theme }) => theme.colors.lightBlue};
        border-left: 0.6em solid transparent;
        border-right: 0.6em solid transparent;
        z-index: ${({ theme }) => theme.zindex.minus};
    }

    ::after {
        content: '${({distance}) => distance} km';
        white-space: nowrap;
        font-size: 16px;
        position: absolute;
        margin: 0 8px;
        font-weight: bold;
        bottom: .5em;
        left: 1em;
    }
`;

DistanceArrow.propTypes = {
    distance: PropTypes.number.isRequired,
}

export default DistanceArrow