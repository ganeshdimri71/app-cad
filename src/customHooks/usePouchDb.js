import PouchDB from "pouchdb";
import { useDispatch } from "react-redux";
import { addModelToDb, fetchModelFromDb } from "../middlewares/autoSaveMiddleware";

export let localDB = new PouchDB("user", { auto_compaction: true });
PouchDB.plugin(require('pouchdb-upsert'));



const usePouchDb = () => {
    //dispatch
    const dispatch = useDispatch();
    //----------------------

    const createModelInDb = () => {
        localDB
            .query(
                function (doc, emit) {
                    emit(doc.type);
                },
                { key: "model", include_docs: true }
            )
            .then(function (result) {
                if (result.rows.length === 0) {
                    dispatch(addModelToDb()); // if localDb doesn't have the document, create the doc        
                } else {
                    dispatch(fetchModelFromDb(result.rows));//if doc exixts fetch the doc from db and update to store
                }
            })
            .catch();
    }
    return { createModelInDb }
}

export default usePouchDb
