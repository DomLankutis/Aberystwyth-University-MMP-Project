import React, {Component, useEffect, useRef} from "react";
import PropTypes from "prop-types"
import Canvas from "react-native-canvas"
import {Dimensions, Platform} from "react-native";

export default class MainCanvas extends Component {

    constructor(props) {
        super(props);

        this.size = {
            width: Dimensions.get("screen").width * 0.8,
            height: Dimensions.get('screen').height * 0.6
        };

        this.state = {
            arr: [],
            defaultPixelSize: 10,
            maximumPixelSize: 20,
            itemToAnimate: 0,
            pixelSign: 1
        };

        for (let i = 0; i < this.props.arrSize; i++) {
            let defaultArrObj = {
                value: i,
                size: this.state.defaultPixelSize
            };

            this.state.arr.push(defaultArrObj);
        }
    }

    componentDidUpdate() {
        this.ctx.fillStyle = "red";
        this.ctx.clearRect(0, 0, this.size.width, this.size.height)

        for (let i = 0; i < this.state.arr.length; i++) {
            const item = this.state.arr[i];
            this.ctx.fillRect(i + (this.state.maximumPixelSize * i), 0, item.size, item.size);
        }
    }

    handleCanvas = (canvas) => {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');

        this.draw();
    }

    updateArrayAnimationAtWith = (index, val) => {
        this.setState(state => {
            const arr = state.arr.map((item, i) => {
                if (i === index) {
                    item.size = val;
                    return item
                } else {
                    return item
                }
            });

            return {
                arr,
            };
        })
    }

    draw() {
        setInterval(() => {

            if (this.state.itemToAnimate >= this.state.arr.length)
                this.state.itemToAnimate = 0;

            if (this.state.arr[this.state.itemToAnimate].size === this.state.maximumPixelSize) {
                this.state.pixelSign = -1;
            }

            if (this.state.arr[this.state.itemToAnimate].size === this.state.defaultPixelSize &&
                this.state.pixelSign === -1) {
                this.state.pixelSign = 1;
                this.state.itemToAnimate += 1;
            }

            const itemToAnimate = this.state.itemToAnimate;
            const newValue = this.state.arr[itemToAnimate].size + this.state.pixelSign;

            this.updateArrayAnimationAtWith(itemToAnimate, newValue)


        }, 20)
    }

    render() {
        if (Platform.OS === "web") {
            return (<canvas {...this.size} ref={this.handleCanvas}/>)
        }
        return (<Canvas {...this.size} ref={this.handleCanvas}/>)
    }
}

// export default function MainCanvas({ arrSize }) {
//     // Set canvas Size to 80% of screen width and 60% screen height.
//     const size = {
//         width: Dimensions.get("screen").width * 0.8,
//         height: Dimensions.get('screen').height * 0.6
//     };
//     const canvasRef = useRef(null);
//     const requestIdRef = useRef(null);
//
//     const arrRef = useRef({
//         arrSize: arrSize,
//         pixelSize: 5
//     })
//
//     const renderFrame = () => {
//         const ctx = canvasRef.current.getContext("2d");
//
//         frameRenderer.call(ctx, size, arrRef.current);
//     };
//
//     const tick = () => {
//         if (!canvasRef.current) return;
//         renderFrame();
//         requestIdRef.current = requestAnimationFrame(tick);
//     }
//
//     useEffect(() => {
//         requestIdRef.current = requestAnimationFrame(tick);
//         return () => {
//             cancelAnimationFrame(requestIdRef.current);
//         };
//     }, []);
//
//     if (Platform.OS === "web") {
//         return (<canvas {...size} ref={canvasRef}/>)
//     }
//     return (<Canvas {...size} ref={canvasRef}/>)
// }

MainCanvas.propTypes = {
    arrSize: PropTypes.number.isRequired
}
