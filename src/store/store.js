import { configureStore } from '@reduxjs/toolkit';
import modelReducer from './sliceModel';
import drawSpaceReducer from './sliceDrawSpace';

export default configureStore({
    reducer: {
        model: modelReducer,
        drawSpace: drawSpaceReducer,
    },
    devTools: true
})