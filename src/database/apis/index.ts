import Realm from "realm";

import { Users, Feeds, Message, Comments, USERS_SCHEMA, NewsFeed } from "../schema";

export const CREATED_SUCCESS = "Created Successfully";
export const UPDATED_SUCCESS = "Updated Successfully";

export const databaseOptions = {
    path: 'database.realm',
    schema: [Users, Comments, Message, Feeds, NewsFeed],
    schemaVersion: 1, //optional
};

//code for insert new data into the database
export const insertNewData = (SCHEMA: any, formData: any) =>
    new Promise((resolve, reject) => {
        Realm.open(databaseOptions as never)
            .then((realm: any) => {
                realm.write(() => {
                    let addedData = realm.create(SCHEMA, formData).toJSON();
                    handleSuccess(resolve, CREATED_SUCCESS, addedData);
                });
            })
            .catch((error: any) => reject(error));
    });

//code for get list of data
export const queryListData = (SCHEMA: any) =>
    new Promise((resolve, reject) => {
        Realm.open(databaseOptions as never)
            .then((realm: any) => {
                let allData = realm.objects(SCHEMA).toJSON();
                handleSuccess(resolve, null as never, allData);
            })
            .catch((error: any) => reject(error));
    });

//code for get list of data
export const queryAuthenticateUser = (data: any) =>
    new Promise((resolve, reject) => {
        Realm.open(databaseOptions as never)
            .then((realm: any) => {
                let allData = realm.objects(USERS_SCHEMA).toJSON();
                const filteredObj = allData.find((item: any) => (item?.email === data?.email && item?.password === data?.password)) || null;
                handleSuccess(resolve, null as never, filteredObj);
            })
            .catch((error: any) => reject(error));
    });

//code for update object data
export const updateObjectData = (SCHEMA: any, ID: any, key: any) =>
    new Promise((resolve, reject) => {
        Realm.open(databaseOptions)
            .then((realm: any) => {
                realm.write(() => {
                    const allData = realm.objects(SCHEMA)
                    let object = allData.find((item: any) => (item?.id === ID)) || {};
                    object[key] = object[key] + 1
                    handleSuccess(resolve, UPDATED_SUCCESS, object);
                });
            })
            .catch((error) => reject(error));
    });


const handleSuccess = (resolve: any, message: string, data: any) => {
    let object = {
        status: 200,
        message: message,
        data: data,
    };
    resolve(object);
};

export default new Realm(databaseOptions as never);