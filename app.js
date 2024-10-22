const express = require('express')
const app = express()
require("dotenv").config();
const db = require('./config/db_connection')
const reportingRoutes = require('./routes/reporting')
const storageRoutes = require('./routes/storage')

app.use(express.json());
db.connect()

app.use('/storage',storageRoutes)
app.use('/reporting',reportingRoutes)

app.get("/", (req, res) => {
	return res.json({
		success: true,
		message: "Your server is up and running ...",
	});
});

const PORT = 3000;
app.listen(PORT, () => {
	console.log(`App is listening at ${PORT}`);
});
