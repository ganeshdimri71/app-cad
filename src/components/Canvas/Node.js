import React, { memo } from 'react';
import { Circle } from 'react-konva';
import { useSelector } from 'react-redux';
import { getNode } from '../../store/modelSlice';

const Node = ({ nodeKey }) => {
    const node = useSelector(state => getNode(state, nodeKey));
    console.log('node',node)

    return (
        <Circle draggable onMouseDown={e => e.cancelBubble = true} key={nodeKey} radius={4} fill='#777777' x={node.x} y={node.y} />
    )
}

export default memo(Node);