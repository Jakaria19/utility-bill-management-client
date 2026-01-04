Utility Bill Management System
A full-stack web application designed to help users manage and track their utility bills efficiently. Users can view available bills, pay them, and maintain a history of their payments.

🚀 Live Links
Client Side: https://utility-bill-management-client.vercel.app

🛠️ Tech Stack
Frontend: React.js, Tailwind CSS.

Backend: Node.js, Express.js.

Database: MongoDB Atlas.

Authentication: Firebase (Social Login/Email-Password).

Deployment: Vercel.

✨ Features
Public Routes:

Home Page: Displays a banner and the 6 most recent bills.

Bills Page: Lists all available bills with category filtering options.

Private Routes (User only):

Bill Details: View detailed information about a specific bill.

Pay Bill: Functional payment simulation to pay bills.

My Paid Bills: View, update, or delete personal payment records.

Responsive Design: Optimized for Mobile, Tablet, and Desktop.

📂 Database Structure (MongoDB)
The project uses the following collections in the UtilityBillDB database:

bills: Contains all available utility bill data.

payments: Stores user-specific payment history.

⚙️ Installation & Setup
Clone the repository:

Bash

git clone <repository-url>
Install Dependencies:

Bash

cd client && npm install
cd ../server && npm install
Set up Environment Variables: Create a .env file in the server directory with:

Code snippet

DB_USER=adminUser
DB_PASS=your_password
Run the Project:

Bash

# In server directory
npm start
# In client directory
npm run dev
🔗 API Endpoints
GET /bills - Fetch all bills.

GET /recent-bills - Fetch the latest 6 bills.

POST /payments - Save a new bill payment.

GET /payments?email=user@email.com - Fetch payments for a specific user.