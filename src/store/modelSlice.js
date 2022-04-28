import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';

const modelSlice = createSlice({
    name: "model",
    initialState: {
        activeModelKey: "M0",
        savingStatus: false,
        models: {
            M0: {
                modelName: "Model 0",
                visible: true,
            },
        },
        hangingLine: [],
        _n: {},
        M0: {
            type: "model",
            active: {
                path: "",
                pattern: "a",
            },
            nodes: {},
            paths: {},
            patterns: ["a", 'b'],
            pattern_nodes: {
                a: [],
                b: []
            },
            pattern_paths: {
                a: [],
                b: []
            },
            pattern_data: {
                a: {
                    patternName: "Pattern a",
                    visible: true,
                    checkBox: "E",
                    symmetry: false,
                },
            },
            modifiedTime: "",
            _id: "",
        },
    },
    reducers: {
        updateModelId: (state, action) => {
            state[state.activeModelKey]._id = action.payload;
        },
        updateModifiedTime: (state, action) => {
            state[state.activeModelKey].modifiedTime = action.payload;
        },
        updateModel: (state, action) => {
            const { modelKey, model } = action.payload;
            state[modelKey] = model;
        },
        updateModelsData: (state, action) => {
            state.models = action.payload;
        },
        setActiveModelKey: (state, action) => {
            state.activeModelKey = action.payload
        },
        updateSavingStatus: (state, action) => {
            state.savingStatus = action.payload;
        },
        addEdge: (state, action) => {
            const { x, y } = action.payload;
            const mNodes = state.M0.nodes;
            const mPaths = state.M0.paths;
            const activePattern = state.M0.active.pattern;
            const nodeLength = state.M0.pattern_nodes[activePattern].length + 1;
            console.log('x, y ,mNodes,mPaths,activePattern,nodeLength  ',x, y ,mNodes,mPaths,activePattern,nodeLength)
            let lastNode = 'a' + nodeLength;

            let lastPath = 'p' + (Number(Object.keys(mPaths).length) + 1);

            state.M0.pattern_nodes['a'].push(lastNode)
            // state.M0.pattern_paths['a'].push(lastPath)
            state.M0.nodes[lastNode] = { x, y }
            state.hangingLine = [lastPath, [lastNode, '_n']]
            // state.M0.paths[lastPath] ={connectedNodes: [lastNode, '_n']}
        },
        closeShape: (state, action) => {

            const { x, y } = action.payload;
            const mNodes = state.M0.nodes;
            const mPaths = state.M0.paths;
            const hangingLine = state.hangingLine;

            const activePattern = state.M0.active.pattern;
            const nodeLength = state.M0.pattern_nodes[activePattern]?.length + 1;
            let lastNode = 'a' + nodeLength;

            let lastPath;

            state.M0.pattern_nodes['a'].push(lastNode)
            state.M0.pattern_paths['a'].push(hangingLine[0])

            state.M0.nodes[lastNode] = { x, y }
            state.M0.paths[hangingLine[0]] = { connectedNodes: [hangingLine[1][0], lastNode] }
            lastPath = 'p' + (Number(Object.keys(mPaths).length) + 1);

            state.hangingLine = [lastPath, [lastNode, '_n']]
            // state.M0.paths[lastPath] ={connectedNodes: [lastNode, '_n']}

        },
        updateFloatingNode: (state, action) => {
            state._n = action.payload
        }

    }
});

export const getFloatingNode = (state) => state.model._n;

export const getHangingLine = (state) => state.model.hangingLine;

export const getPatterns = (state) => state.model.M0.patterns;

export const getPatternNodes = (state, pattern) => state.model.M0.pattern_nodes[pattern];

export const getPatternPaths = (state, pattern) => state.model.M0.pattern_paths[pattern];

export const getNode = (state, nodeKey) => state.model.M0.nodes[nodeKey];

export const getPath = (state, pathKey) => state.model.M0.paths[pathKey];

export const getModelNodes = (state) => state.model.M0.nodes;

export const getModelPaths = (state) => state.model.M0.paths;

export const getModelPatterns = (state, action) => state.model[state.model.activeModelKey].patterns;
export const getSavingStatus = (state, action) => state.drawSpace.savingStatus;


export const {
    updateModelId,
    updateModifiedTime,
    updateModel,
    updateModelsData,
    setActiveModelKey,
    updateSavingStatus,
    addEdge,
    closeShape,
    updateFloatingNode
} = modelSlice.actions;

export default modelSlice.reducer;