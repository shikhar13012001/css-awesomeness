//import express from "express"
// controller imports
import {
  fetchsymbols,
  lookup,
  fetchData,
  newRecord,
  addToRecord,
  deleteStocks,
  getStocks,
  Addtostock,
  getCurrentprice,
} from '../controllers/dataController.js';
// middleware imports
import verifyToken from '../middleware/verifyToken.js';

import express from 'express';

//const router = express.Router();
import axios from 'axios';
// const iexApiToken = require("../../../serverside/config/keys").iexApiToken;
// const iexSandboxToken = require("../../../serverside/config/keys").iexSandboxToken;

const router = express.Router();

// routers
router.post('/newrecord', verifyToken, newRecord);
router.put('/addtorecord', verifyToken, addToRecord);
router.get('/', verifyToken, fetchData);
router.get('/batch/:symbols', fetchsymbols);
router.get('/lookup/:symbol', lookup);
router.post('/getcurrentprice', verifyToken, getCurrentprice);
router.post('/removestock/:userID', verifyToken, deleteStocks);
router.put('/addstock', verifyToken, Addtostock);
router.post('/getstock', verifyToken, getStocks);

export default router;
