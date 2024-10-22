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
  - MONGODB_URL=<your-mongodb-connection-string>
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
