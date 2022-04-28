import { createAsyncThunk } from "@reduxjs/toolkit";
import { updateModifiedTime, updateModelId, updateModel, updateModelsData, setActiveModelKey, updateSavingStatus } from "../store/modelSlice";
import { localDB } from "../customHooks/usePouchDb";


export const addModelToDb = createAsyncThunk(
    'model/addModel',
    async (args, thunkAPI) => {
        const state = thunkAPI.getState();

        const date = new Date();
        const timeStamp = date.toString();//modified time
        let model = { ...state.drawSpace.initialModelData };

        let modelData = {};// add model data(name and visibilty) to model obj
        modelData[state.model.activeModelKey] = state.model.models[state.model.activeModelKey];
        model.modelData = modelData;

        model.modifiedTime = timeStamp;
        //----create doc in localDb-------
        localDB
            .post(model)
            .then(function (res) {
                thunkAPI.dispatch(updateModelId(res.id));//update the id of the doc to store ,bcoz we need id for update the document to db when saveModel()
                thunkAPI.dispatch(updateModifiedTime(timeStamp));
                thunkAPI.dispatch(updateSavingStatus(true));//to display (saving...) msg
                setTimeout(() => {
                    thunkAPI.dispatch(updateSavingStatus(false));
                }, 1000);
            })
            .catch();

    });

export const fetchModelFromDb = createAsyncThunk(
    'model/fetchModel',
    async (res, thunkAPI) => {
        let modelsData = {};
        res.forEach(document => {
            let model = document.doc;
            const modelKey = Object.keys(model.modelData)[0];
            modelsData = Object.assign(model.modelData, modelsData);
            if (model.modelData[modelKey].visible) thunkAPI.dispatch(setActiveModelKey(modelKey));// set activeModelKey if model visibility is true
            delete model.modelData;//deleting the modelData from model , bcoz we are appending this data to modelsData object (this obj is common for all the model)
            thunkAPI.dispatch(updateModel({ modelKey, model }));//(update/replace) saved model obj
        });
        //order the model data by modelkey(e.g., M0,M1,M2)(to display the model orderwise, db will not return the doc in order,it will return the doc based on the modified doc)
        let orderedModel = Object.keys(modelsData)
            .sort((a, b) => a.substring(1) - b.substring(1))
            .reduce(function (acc, key) {
                acc[key] = modelsData[key];
                return acc;
            }, {});

        thunkAPI.dispatch(updateModelsData(orderedModel));//replace saved models data(name and visibilty)
    });

export const saveModel = createAsyncThunk(
    'model/saveModel',
    async (res, thunkAPI) => {
        const state = thunkAPI.getState();
        const model = { ...state.model[state.model.activeModelKey] };

        const date = new Date();
        const timeStamp = date.toString();//modified time

        let modelData = {};// add model data(name and visibilty) to model obj
        modelData[state.model.activeModelKey] = state.model.models[state.model.activeModelKey];

        model.modelData = modelData;
        model.modifiedTime = timeStamp;

        if (model._id) {
            localDB.upsert(model._id, function (doc) {
                return model;
            }).then(function (res) {
                // success, res is {rev: '1-xxx', updated: true, id: 'myDocId'}
                thunkAPI.dispatch(updateModifiedTime(timeStamp));
            }).catch(function (err) {
                console.log(err);
                // error
            });
            thunkAPI.dispatch(updateSavingStatus(true));//to display (saving...) msg
            setTimeout(() => {
                thunkAPI.dispatch(updateSavingStatus(false));
            }, 1000);
        }
    });


