import React, { memo } from 'react'
import { Line } from 'react-konva';
import { useSelector } from 'react-redux';
import { getFloatingNode, getNode } from '../../store/modelSlice';

const HangingPath = ({ path }) => {
    const startNode = useSelector(state => getNode(state, path[1][0]));
    const endNode = useSelector(getFloatingNode);

    return (
        <Line
            points={[startNode.x, startNode.y, endNode.x, endNode.y]}
            stroke="#777777"
            strokeWidth={2}
        />
    )
}

export default memo(HangingPath)