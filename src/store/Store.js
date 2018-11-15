import { SagIoDB } from './Nedb';
import { CONSTANTS } from '../config/Constants';

export const createBasicCollections = () => {
  SagIoDB.findOne({ _id: CONSTANTS.DIRECTORY_COLLECTION_ID }, (error, doc) => {
    if (doc === null) {
      SagIoDB.insert({ _id: CONSTANTS.DIRECTORY_COLLECTION_ID, path: false });
    }
  })
}

export const cleanFiles = () => {
  SagIoDB.update(
    { _id: CONSTANTS.FILES_COLLECTION_ID },
    {  },
  );
}

export const updateDirectory = (directory) => {
  SagIoDB.update(
    { _id: CONSTANTS.DIRECTORY_COLLECTION_ID },
    { path: directory },
  );
}
