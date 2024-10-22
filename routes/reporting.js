const express = require('express');
const router = express.Router();

const {
	generateCSVReport,
	generatePDFReport
} = require('../controllers/reporting')

router.post('/generatePDF', generatePDFReport);
router.post('/generateCSV', generateCSVReport);

module.exports = router

