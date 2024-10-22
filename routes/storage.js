const express = require('express');
const router = express.Router();

const {
	SendDataToDb,
	ETLQuery,
	FetchData
} = require('../controllers/storage')

router.post('/sendDataToDb', SendDataToDb);
router.post('/generateInsights', ETLQuery);
router.get('/fetchData', FetchData);

module.exports = router

