# Node.js ETL and Reporting System
This project provides an ETL (Extract, Transform, Load) workflow along with report generation capabilities in PDF and CSV formats. It allows fetching data, storing it in MongoDB, generating insights, and sending email notifications when reports are downloaded.

## Table of Contents
1. Project Setup
2. Environment Variables
3. Controllers
4. Routes
5. Utility Function
6. How to Start
7. Dependencies

## Project Setup
1. Clone the repository:
    - git clone your-repo-url
    - cd your-project-folder
2. Install the dependencies:
    - npm install
3. Create a .env file in the root directory and add the required environment variables (refer to the Environment Variables section).

## Environment Variables
Make sure to configure the following variables in your .env file:
  - MONGODB_URL = your-mongodb-connection-string
  - MAIL_HOST = your-mail-host
  - MAIL_USER = your-mail-user
  - MAIL_PASS = your-mail-password
  - MAIL_PORT = your-mail-port

## Controllers
1. FetchData:
    - Fetches data from an external source.
    - Usage: Handles fetching and retrieving data from APIs or other sources.
2. SendDataToDb:
    - Sends new data to MongoDB (only if the data hasn’t been sent earlier).
3. ETLQuery:
    - Generates a report by querying the leads and campaign tables.
    - Report: Total number of leads grouped by campaign and city.
4. generatePDF:
    - Converts the report schema into a PDF and provides a download option.
5. generateCSV:
    - Converts the report schema into a CSV and provides a download option.

## Routes
1. GET /storage/fetchData:
   - Fetches the data from the external source.
   - URL: https://localhost:300/storage/fetchData
2. POST /storage/sendDataToDb:
    - Sends new data to the MongoDB database.
    - URL: https://localhost:300/storage/sendDataToDb
3. POST /storage/generateInsights:
    - Generates a report with the total number of leads grouped by city and campaignId.
    - URL: https://localhost:300/storage/generateInsights
4. POST /reporting/generatePDF:
    - Generates a PDF report from the schema and allows it to be downloaded.
    - URL: https://localhost:300/reporting/generatePDF
5. POST /reporting/generateCSV:
    - Generates a CSV report from the schema and allows it to be downloaded.
    - URL: https://localhost:300/reporting/generateCSV

## Utility Function
1. mailSender(email, title, body):
    - Sends an email when either the PDF or CSV report is downloaded successfully.
    - Parameters:
        - email: Recipient email address
        - title: Email subject
        - body: Email content
    - Usage: Notify users of successful report generation via email.
  
## How to Start
1. Make sure MongoDB is running and accessible through the connection string in the .env file.
2. Run the following command to start the server:
    - node app.js
3. If you are using nodemon (for auto-restarts during development), start with:
    - npx nodemon app.js
4. The server will start at:
    - http://localhost:300/

## Dependencies
1. The package.json contains the following dependencies:
    - "express": "^4.18.2",
    - "mongoose": "^7.5.0",
    - "fs": "0.0.1-security",
    - "nodemailer": "^6.9.3",
    - "csv-writer": "^1.6.0",
    - "pdfkit": "^0.12.1",
    - "path": "^0.12.7",
    - "dotenv": "^16.3.1"
