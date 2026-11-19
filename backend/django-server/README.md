# React with Django Backend

This backend server for multiple react frontend apps.
- `react-app` - renders the list of customers using REST API with CRUD operations
- `react-graphql` - renders the list of customers with orders using GraphQL query with CRUD operations

## Prerequisites

- Python 3.10+ (recommended)
- Virtual environment (`venv`)
- WSL or Linux shell

Note: You likely don’t have Python or `pip` installed yet, or it's not linked properly. To fix this, Run the following in your WSL terminal:
```bash
sudo apt update
sudo apt install python3 python3-pip -y
```
Check installations
```bash
python3 --version     # should show something like Python 3.10.X
pip3 --version        # should show pip version
```

## Getting Started

### 1. Create and Activate Virtual Environment

```bash
python3 -m venv .venv
source .venv/bin/activate
```

If `python3-venv` is not available on your system, you can install it using:
```bash
sudo apt-get update && sudo apt-get install python3-venv
```

### 2. Install Django and other packages
Install Django package (if not available on your system)
```bash
pip install django
```
Install all packages mentioned inside `requirements.txt` file. These packages are then installed inside `.venv` folder
```bash
pip install -r requirements.txt
```
Verify all installed packages
```bash
pip list
```
You should see all the listed packages (`Django`, `graphene-django`, `djangorestframework`, etc.).

### 3. Start the Project
Run the migrations to create database
```bash
python manage.py migrate
```

Create superuser account
```bash
python manage.py createsuperuser
```

Load initial data into database from fixtures
```bash
python manage.py loaddata customers
```

Run the backend server in development mode
```bash
python manage.py runserver
```
Open [http://localhost:8000](http://localhost:8000) to view it in the browser.

Currently it following routes

- `/admin/` - Django Admin - login required
- `/api/token/` - View current Tokens (`refresh` and `access`) - login required
- `/api/token/refresh` - Update Tokens (by using `refresh`)
- `/graphql/` - GraphQL Admin
- `/customers/` - GET customers list - run at `Postman` with `access` as `Bearer Token` as authentication
- `/customers/:id/` - GET customer by ID - run at `Postman` with `access` as `Bearer Token` as authentication

### Misc Scripts
- `pip freeze > requirements.txt` - freeze the current state of a virtual environment (with installed packages).
- `python manage.py dumpdata customers --indent 2 > customers/fixtures/customers.json` - store latest data in separate fixture file which can be used to load data into database
- `python manage.py makemigrations`- creating new migrations based on the changes you have made to your models.
- `python manage.py sqlmigrate`- displays the SQL statements for a migration.
- `deactivate` - deactivate the virtual environment
