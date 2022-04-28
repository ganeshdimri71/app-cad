import React, { useState, useEffect } from 'react'
import { Layer, Stage } from 'react-konva'
import { Provider, ReactReduxContext, useSelector, useDispatch } from 'react-redux';
import _ from 'lodash'

//   =================== Store Imports ===========================
import { addEdge, closeShape, getPatterns, updateFloatingNode, getHangingLine } from '../../store/sliceModel';

//  =================== Component Imports ==========================
import Pattern from '../Canvas/Pattern';
import HangingPath from './HangingPath';
const DrawingSpace = () => {

    const patterns = useSelector(getPatterns);
    const hangingLine = useSelector(getHangingLine);
    const dispatch = useDispatch()

    //  ==================== EFFECTS =============



    //  ================ DRAW FUNCTION ============
    const draw = (e) => {
        let { x, y } = e.target.getStage().getPointerPosition();
        if (hangingLine.length === 0) dispatch(addEdge({ x, y }));
        else dispatch(closeShape({ x, y }))
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
                            {
                                patterns.map(patternKey => {
                                    return <Pattern key={patternKey} patternKey={patternKey} />
                                })
                            }
                            {
                                hangingLine.length !== 0 ? <HangingPath path={hangingLine} /> : null
                            }
                        </Layer>
                    </Provider>

                </Stage>

            )}

        </ReactReduxContext.Consumer>
    )
}

export default DrawingSpace