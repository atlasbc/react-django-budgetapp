# App Features
This app is a basic budget management app. The challenge was not to implement rich feature front-end but integrating React and Django together. Everything is recorded to a postgres database which is also hosted on heroku.

You can test the app by clicking to [django-react-budget.herokuapp.com](django-react-budget.herokuapp.com). You can create a user quickly for testing purposes then can make transaction and income entries.

**Features**:
- Save your Transactions. In transactions directory.
- Save your Income. In Income directory.
- Select four (4) category for income or transaction. This is hardcoded but customizable.
- Money form checks for correct format in both front-end and back-end.
- You can see your income or transaction in a table which can sort or filter based on each column. You can delete your entry and it updates immediately.
- In Home Directory you can see your total money that is calculated by your income and transaction data. It also has a pie chart that summarizes transaction history by categories. This changes every time you enter new data.
- Mobile Responsive: Layout changes when you visit the site in mobile. Side bar closes and a menu icon appears which can open side bar when clicked.
- Two themes. You can select dark or light mode clicking the icon aside login/logout button.

# Technical Details
I've developed the app using Django and React. Backend and Frontend are separated and treated as different django apps. Frontend sends fetch request to the backend which uses a django-rest-framework api.

## Frontend Technical Details

- Uses Material UI for theming, data table, and some of the layout components like sidebar.
- Routing is in Frontend. It is done with react-router-dom framework. Unauthorized user can't access to and see transactions, incomes and home pages.
- Pie chart is done with recharts framework.
- Uses CONTEXT API to retain username when a user is authenticated. This username state is necessary to restrict access but is not used in data requests.
- Configured with Webpack.
## Backend Technical Details

- Developed as an API with django-rest-framework.
- Default django authentication is used. When a user successfully logins, backend sends username to frontend. Frontend uses this information to restrict access.
- CSRF token is used to prevent Cross Site Request Forgeries. This is basically a default django behaviour. But it is kind of tricky to configure with React.
- For transaction and income APIs, generics API Views from django-rest-framework is used.
- Authentication views like register, login, and logout is done with vanilla django views.
- In development it uses sqlite database, but in production it uses postgres database.
