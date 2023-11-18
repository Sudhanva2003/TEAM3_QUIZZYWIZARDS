import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';

import './ProgressBar.css';

const ProgressBar = (props) => {
    const [offset, setOffset] = useState(0);
    const [timer, setTimer] = useState(props.timer); // Timer duration in seconds
    const circleRef = useRef(null);
    const timerRef = useRef(null);

    const { size, progress, strokeWidth, circleOneStroke, circleTwoStroke } = props;
    const center = size / 2;
    const radius = size / 2 - strokeWidth / 2;
    const circumference = 2 * Math.PI * radius;

    useEffect(() => {
        const progressOffset = ((100 - progress) / 100) * circumference;
        setOffset(progressOffset);
        circleRef.current.style = 'transition: stroke-dashoffset 850ms ease-in-out';

    }, [setOffset, progress, circumference, offset]);

    useEffect(() => {
        if (timer > 0) {
            timerRef.current = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000);
        }

        return () => {
            clearInterval(timerRef.current);
        };
    }, [timer]);

    return (
        <>
            <div className="progress-container">
                <svg className="svg" width={size} height={size}>
                    <circle
                        className="svg-circle-bg"
                        stroke={circleOneStroke}
                        cx={center}
                        cy={center}
                        r={radius}
                        strokeWidth={strokeWidth}
                    />
                    <circle
                        className="svg-circle"
                        ref={circleRef}
                        stroke={circleTwoStroke}
                        cx={center}
                        cy={center}
                        r={radius}
                        strokeWidth={strokeWidth}
                        strokeDasharray={circumference}
                        strokeDashoffset={offset}
                    />
                    <text x={`${center}`} y={`${center}`} className="svg-circle-text">
                        {progress}%
                    </text>
                </svg>

                {props.timer && (
                    <div className="timer">
                        {timer}s
                    </div>
                )}
            </div>
        </>
    );
};

ProgressBar.propTypes = {
    size: PropTypes.number.isRequired,
    progress: PropTypes.number.isRequired,
    strokeWidth: PropTypes.number.isRequired,
    circleOneStroke: PropTypes.string.isRequired,
    circleTwoStroke: PropTypes.string.isRequired,
    timer: PropTypes.number, // Timer duration in seconds
};

export default ProgressBar;
