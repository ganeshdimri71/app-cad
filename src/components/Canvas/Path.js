import React, { memo } from 'react'
import { Line } from 'react-konva';
import { useSelector } from 'react-redux'
import { getNode, getPath } from '../../store/modelSlice'

const Path = ({ pathKey }) => {
    console.log(pathKey)
    const path = useSelector(state => getPath(state, pathKey));
    const nodes = path.connectedNodes;
    const startNode = useSelector(state => getNode(state, nodes[0]));
    const endNode = useSelector(state => getNode(state, nodes[1]));
    return (
        <Line
            points={[startNode.x, startNode.y, endNode.x, endNode.y]}
            stroke="#777777"
            strokeWidth={2}
        />
    )
}

export default memo(Path)