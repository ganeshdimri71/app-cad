import React, { useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import { Layer, Stage, Circle, Line, Group } from 'react-konva'
import { Provider, ReactReduxContext, useSelector, useDispatch } from 'react-redux';
import { addEdge, closeShape, getModelPatterns, updateNodeStatic, getModelNodes, getModelPaths, getPatterns, updateFloatingNode, getHangingLine } from '../../store/modelSlice';
import Pattern from '../Canvas/Pattern';
import _ from 'lodash'
import HangingPath from './HangingPath';
const DrawingSpace = () => {
    const [isDrawing, setIsDrawing] = useState(false);
    const [mousePos, setMousePos] = useState([])

    const patterns = useSelector(getPatterns);
    const hangingLine = useSelector(getHangingLine);
    const dispatch = useDispatch()
    //  ================ DRAW FUNCTION ============
    const draw = (e) => {
        let { x, y } = e.target.getStage().getPointerPosition();
        if (!isDrawing) {
            setIsDrawing(true);
            dispatch(addEdge({ x, y }))

        } else if (isDrawing) {
            dispatch(closeShape({ x, y }))
        }
    }

    //   =================== STAGE EVENTS ==================
    const handleStageMouseDown = (e) => {
        draw(e)
    }

    const handleStageMouseMove = (e) => {
        let { x, y } = e.target.getStage().getPointerPosition();
        dispatch(updateFloatingNode({ x, y }))
    }
    //  ==================== STAGE EVENTS END ================
    // console.log(mousePos)
    return (
        <ReactReduxContext.Consumer>
            {({ store }) => (
                <Stage
                    width={window.innerWidth}
                    height={window.innerHeight}
                    onMouseDown={(e) => handleStageMouseDown(e)}
                    onMouseMove={(e) => handleStageMouseMove(e)}>
                    <Provider store={store}>
                        <Layer>
                            <Group>
                                {
                                    patterns.map(patternKey => {
                                        return <Group key={patternKey}>
                                            <Pattern patternKey={patternKey} />
                                        </Group>
                                    })
                                }
                            </Group>
                            <Group>
                                {
                                    hangingLine.length !== 0 ? <HangingPath path={hangingLine} /> : <></>

                                    // Object.entries(mPaths).map(path => {
                                    //     let nodes = path[1].connectedNodes;
                                    //     let lastNode = nodes[1] === '_n' ? [...mousePos] : [mNodes[nodes[1]].x, mNodes[nodes[1]].y];
                                    //     let pathPoints = [mNodes[nodes[0]].x, mNodes[nodes[0]].y, lastNode[0],lastNode[1]]
                                    //     return <Line 
                                    //         points={pathPoints}
                                    //         stroke= "#777777"
                                    //         strokeWidth= {2}
                                    //     />
                                    // })
                                }
                            </Group>



                        </Layer>
                    </Provider>

                </Stage>

            )}

        </ReactReduxContext.Consumer>
    )
}

export default DrawingSpace