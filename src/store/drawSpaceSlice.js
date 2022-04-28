import { createSlice } from "@reduxjs/toolkit";

const drawSpaceSlice = createSlice({
    name: "drawSpace",
    initialState: {
        initialModelData: {
            type: "model",
            active: {
                path: "",
                pattern: "a",
            },
            nodes: {},
            paths: {},
            patterns: ["a"],
            pattern_nodes: {},
            pattern_paths: {},
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

    },
});


export const {
    updateSavingStatus,
} = drawSpaceSlice.actions;

export default drawSpaceSlice.reducer;