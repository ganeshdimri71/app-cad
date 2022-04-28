import { configureStore } from '@reduxjs/toolkit';
import modelReducer from './modelSlice';
import drawSpaceReducer from './drawSpaceSlice';

export default configureStore({
    reducer: {
        model: modelReducer,
        drawSpace: drawSpaceReducer,
    },
    devTools: true
})