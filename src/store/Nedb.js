import { CONSTANTS } from '../config/Constants';
const Datastore = require('nedb');

export const SagIoDB = new Datastore({
  filename: `./${CONSTANTS.DB_NAME}`,
  autoload: true,
});
