import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import { getPatternNodes, getPatternPaths } from '../../store/modelSlice';
import Node from './Node';
import Path from "./Path";

const Pattern = ({ patternKey }) => {

    const patternNodes = useSelector(state => getPatternNodes(state, patternKey));
    const patternPaths = useSelector(state => getPatternPaths(state, patternKey));
    console.log('patternNodes , patternPaths', patternNodes, patternPaths)

    return (
        <>
            {
                patternNodes?.map(nodeKey => {
                    return <Node key={nodeKey} nodeKey={nodeKey} />
                })
            }{
                patternPaths?.map(pathKey => {
                    return <Path key={pathKey} pathKey={pathKey} />
                })
            }



        </>





    )
}

export default memo(Pattern)