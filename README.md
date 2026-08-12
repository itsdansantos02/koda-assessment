# Koda Assessment
## Project Structure
koda-assessment/
├── koda-assessment-api/
└── koda-assessment-web/

# Prerequisites
Before running the project, make sure the following are installed:
* PHP 8.1 or higher
* Composer
* Node.js
* npm
* MySQL
* Git

You can verify your installations:
Run:
php -v
composer -V
node -v
npm -v
mysql --version
git --version

# 1. Clone the Repository
Clone the repository:

git clone <repository-url>

Go to the project directory:
cd koda-assessment

The project should contain:
koda-assessment/
├── koda-assessment-api/
└── koda-assessment-web/

# 2. Setup the Backend API
Open a terminal and navigate to the API:
Run:
cd koda-assessment-api

## Install PHP Dependencies
Run:
composer install

## Create Environment File
Copy the example environment file:
Run:
cp .env.example .env
OR
copy .env.example and rename as .env

## Configure Database
Open the `.env` file:
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=koda_assessment_api
DB_USERNAME=root
DB_PASSWORD=

Update the database credentials according to your local MySQL setup.
## Run Database Migrations
Run:
php artisan migrate
php artisan db:seed
## Start the API
Run:
php artisan serve

# 3. Setup the Frontend Web Application
Open a *new terminal*.
From the repository root:
cd koda-assessment-web

## Install Node Dependencies
Run:
npm install

## Start the Frontend
Run:
npm run dev

The frontend will normally be available at:
http://localhost:5173

Keep this terminal running.

# 4. Run Both Applications !important

You need **two terminals** running at the same time.

### Terminal 1 — Backend
cd koda-assessment/koda-assessment-api
php artisan serve

### Terminal 2 — Frontend
cd koda-assessment/koda-assessment-web
npm run dev

# Notes
* Start the backend API before using frontend features that require API access.
* Keep both the backend and frontend terminals running during development.
* Make sure MySQL is running before executing Laravel migrations.
