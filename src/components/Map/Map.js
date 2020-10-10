import React, { useRef, useEffect} from 'react';
import { ReactComponent as MapSVG } from './../../assets/images/map.svg';
import styled from 'styled-components';

const StyledMapWrapper = styled.div`
    width: 100%;
    height: calc(100vh - 60px);
    position: relative;
    overflow: hidden;
`;

const StyledMapSVG = styled(MapSVG)`
    display: block;
    margin: auto;
    position: absolute;
    height: 100%;
    width: auto;
    left: -50%;
`;



const Map = props => {
    const mapContainerRef = useRef();
    const mapRef = useRef(null);
    let isDraggingStarted = false;
    let isPointerMoved = false;
    let initialPosition;
    let refrencePoint;
    let viewBox;
    const previousFingersPostion = {
        firstFinger: { x: -1, y: -1 },
        secondFinger: { x: -1, y: -1 }
    }
    const touchTolerance = 1.5;
    // const [text, setText] = useState('nothing');
    useEffect(() => {
        const mapContainer = mapContainerRef.current;
        const map = mapRef.current;
        initMapParams(map);

        mapContainer.addEventListener('mousedown', (event) => handleDragStart(event));
        mapContainer.addEventListener('mousemove', (event) => handleDragging(event));
        mapContainer.addEventListener('mouseup', handleDragEnd);
        mapContainer.addEventListener('wheel', handleMouseZooming)

        mapContainer.addEventListener('touchstart', (event) => handleDragStart(event));
        mapContainer.addEventListener('touchstart', handleRegisterTouch);
        mapContainer.addEventListener('touchmove', (event) => handleTouchDragging(event));
        mapContainer.addEventListener('touchend', handleDragEnd);
        mapContainer.addEventListener('touchend', handleUnregisterTouch);

        const [elements] = mapRef.current.children;
        const countires = elements.querySelectorAll('.country');
        [...countires].forEach(country => {
            country.addEventListener('mouseup', () => handleClick(country));
            country.addEventListener('touchend', () => handleClick(country));
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    const initMapParams = (map) => {
        initialPosition = map.createSVGPoint();
        refrencePoint = map.createSVGPoint();
        viewBox = map.viewBox.baseVal;
    }

    const updateSvgPoint = (x, y, svgPoint) => {
        svgPoint.x = x;
        svgPoint.y = y;
        const invertedSVGMatrix = mapRef.current.getScreenCTM().inverse();
        return svgPoint.matrixTransform(invertedSVGMatrix);
    }

    const handleDragStart = event => {
        event.preventDefault();
        isPointerMoved = false;
        isDraggingStarted = true;
        const { clientX, clientY } = event.touches ? event.touches[0] : event;
        initialPosition = updateSvgPoint(clientX, clientY, initialPosition);
    }

    const handleDragging = event => {
        if (!isDraggingStarted) return;
        if (event.touches) {
            const xDiff = previousFingersPostion.firstFinger.x - event.changedTouches[0].clientX;
            const yDiff = previousFingersPostion.firstFinger.y - event.changedTouches[0].clientY;
            const diff = Math.hypot(xDiff, yDiff);
            isPointerMoved = diff > touchTolerance;
        } else {
            isPointerMoved = true;
        }
        event.preventDefault();
        const { clientX, clientY } = event.touches ? event.touches[0] : event;
        const { x, y } = updateSvgPoint(clientX, clientY, refrencePoint);
        viewBox.x -= (x - initialPosition.x);
        viewBox.y -= (y - initialPosition.y);
    }

    const handleDragEnd = event => {
        event.preventDefault();
        isDraggingStarted = false;
    }

    const handleMouseZooming = event => {
        const zoomingFactor = event.deltaY > 0 ? 1.1 : 0.9;
        const { clientX, clientY } = event.touches ? event.touches[0] : event;
        const { x, y } = updateSvgPoint(clientX, clientY, refrencePoint);
        viewBox.x -= (x - viewBox.x) * (zoomingFactor - 1);
        viewBox.y -= (y - viewBox.y) * (zoomingFactor - 1);
        viewBox.width *= zoomingFactor;
        viewBox.height *= zoomingFactor;
    }

    const handleRegisterTouch = event => {
        const [firstFinger, secondFinger] = event.touches;
        previousFingersPostion.firstFinger = { x: firstFinger.clientX, y: firstFinger.clientY };
        if (event.changedTouches.length === 2) previousFingersPostion.secondFinger = { x: secondFinger.clientX, y: secondFinger.clientY };
    }

    const handleUnregisterTouch = event => {
        previousFingersPostion.firstFinger = { x: -1, y: -1 };
        previousFingersPostion.secondFinger = { x: -1, y: -1 };
    }

    const handleTouchDragging = event => {
        const numberOfFinger = event.changedTouches.length
        if (numberOfFinger === 1) {
            handleDragging(event);
        }
        if (numberOfFinger === 2) {
            if (previousFingersPostion.secondFinger.x === -1) {
                handleRegisterTouch(event);
            }
            handleTouchZooming(event);
        }
    }

    const handleTouchZooming = event => {
        event.preventDefault();
        const xDiff = event.touches[1].clientX - event.touches[0].clientX;
        const yDiff = event.touches[1].clientY - event.touches[0].clientY;
        const fingersDistance = Math.hypot(xDiff, yDiff);
        const prefXDiff = previousFingersPostion.firstFinger.x - previousFingersPostion.secondFinger.x;
        const prefYDiff = previousFingersPostion.firstFinger.y - previousFingersPostion.secondFinger.y;
        const previousFingersDistance = Math.hypot(prefXDiff, prefYDiff);
        const diff = Math.abs(fingersDistance - previousFingersDistance);

        if (diff > 0) {
            const zoomingFactor = previousFingersDistance / fingersDistance;
            const middleX = previousFingersPostion.firstFinger.x + xDiff / 2;
            const middleY = previousFingersPostion.firstFinger.y + yDiff / 2;
            const { x, y } = updateSvgPoint(middleX, middleY, refrencePoint);
            viewBox.x -= (x - viewBox.x) * (zoomingFactor - 1);
            viewBox.y -= (y - viewBox.y) * (zoomingFactor - 1);
            viewBox.width *= zoomingFactor;
            viewBox.height *= zoomingFactor;

            isPointerMoved = true;
            handleRegisterTouch(event);
        }
    }

    const handleClick = country => {
        if (isPointerMoved) return;
        const [...elements] = country.children;
        const [capitol] = elements.filter(({ attributes: { class: { value } } }) => value === 'capitol');
        console.log(capitol.attributes.name.value);
        // setText(capitol.attributes.name.value);
    }

    return (
        <StyledMapWrapper ref={mapContainerRef}>
            <StyledMapSVG ref={mapRef} />
            {/* <p>{text}</p> */}
        </StyledMapWrapper>
    );
}

export default Map;