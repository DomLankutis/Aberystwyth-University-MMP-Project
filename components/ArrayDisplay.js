import React, {useEffect, useRef} from "react";
import PropTypes from "prop-types"
import Canvas from "react-native-canvas"
import {Dimensions, Platform} from "react-native";

export default function ArrayDisplay() {
    // Set canvas Size to 80% of screen width and 60% screen height.
    const size = {
        width: Dimensions.get("screen").width * 0.8,
        height: Dimensions.get('screen').height * 0.6
    };
    const canvasRef = useRef(null);
    const requestIdRef = useRef(null);

    const clearScreen = (ctx) => {
        ctx.clearRect(0, 0, size.width, size.height);
    }

    const renderArray = (ctx) => {
        ctx.fillStyle = "blue";
    }

    const renderFrame = () => {
        const ctx = canvasRef.current.getContext('2d');
        clearScreen(ctx);
    };

    const tick = () => {
        if (!canvasRef.current) return;
        renderFrame();
        requestIdRef.current = requestAnimationFrame(tick);
    }

    useEffect(() => {
        requestIdRef.current = requestAnimationFrame(tick);
        return () => {
            cancelAnimationFrame(requestIdRef.current);
        };
    }, []);

    if (Platform.OS === "web") {
        return (<canvas {...size} ref={canvasRef}/>)
    }
    return (<Canvas {...size} ref={canvasRef}/>)
}

ArrayDisplay.propTypes = {
    arrSize: PropTypes.number.isRequired
}
