export const addEdge = (state, action) => {
    const { x, y } = action.payload;
    const mPaths = state.M0.paths;
    const activePattern = state.M0.active.pattern;
    const nodeLength = state.M0.pattern_nodes[activePattern].length + 1;
    let lastNode = 'a' + nodeLength;
    let lastPath = 'p' + (Number(Object.keys(mPaths).length) + 1);
    state.M0.pattern_nodes['a'].push(lastNode)
    state.M0.nodes[lastNode] = { x, y }
    state.hangingLine = [lastPath, [lastNode, '_n']]
}

export const closeEdge = (state, action) => {
    const { x, y } = action.payload;
    const mPaths = state.M0.paths;
    const hangingLine = state.hangingLine;
    const activePattern = state.M0.active.pattern;
    const nodeLength = state.M0.pattern_nodes[activePattern].length + 1;
    let lastNode = 'a' + nodeLength;
    let lastPath;

    state.M0.pattern_nodes['a'].push(lastNode)
    state.M0.pattern_paths['a'].push(hangingLine[0])
    state.M0.nodes[lastNode] = { x, y }
    state.M0.paths[hangingLine[0]] = { connectedNodes: [hangingLine[1][0], lastNode] }
    lastPath = 'p' + (Number(Object.keys(mPaths).length) + 1);
    state.hangingLine = [lastPath, [lastNode, '_n']]
    // state.M0.paths[lastPath] ={connectedNodes: [lastNode, '_n']}
}