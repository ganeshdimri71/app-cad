import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';
import init_modelSlice from './initialStateModel'
import * as edge from './redEdge'
const modelSlice = createSlice({
    name: "model",
    initialState: init_modelSlice,
    reducers: {
        updateFloatingNode: (state, action) => { state._n = action.payload },
        updateModelId: (state, action) => { state[state.activeModelKey]._id = action.payload },
        updateModifiedTime: (state, action) => { state[state.activeModelKey].modifiedTime = action.payload },
        updateModelsData: (state, action) => { state.models = action.payload },
        setActiveModelKey: (state, action) => { state.activeModelKey = action.payload },
        updateSavingStatus: (state, action) => { state.savingStatus = action.payload },
        removeHangingLine: (state, action) => { state.hangingLine = [] },
        updateModel: (state, action) => {
            const { modelKey, model } = action.payload;
            state[modelKey] = model;
        },

        addEdge: (state, action) => { edge.addEdge(state, action) },
        closeShape: (state, action) => { edge.closeEdge(state, action) },

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
    updateFloatingNode,
    removeHangingLine
} = modelSlice.actions;

export default modelSlice.reducer;