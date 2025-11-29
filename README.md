# Blood Donor Finder

A full-stack web application designed to connect patients with blood donors and hospitals. It facilitates quick search for donors, blood request management, and hospital-donor coordination.

## Features

- **Donor Search**: Find blood donors by blood group and location.
- **Donor Management**: Admin interface to add, edit, and delete donor records.
- **Blood Requests**: Public interface for patients to request blood units.
- **Hospital Dashboard**: Dedicated dashboard for hospitals to manage requests and view donor availability.
- **Notifications**: Real-time notifications for users (hospitals/admins) regarding new requests.
- **Admin & Hospital Roles**: Secure login and role-based access control.

## Tech Stack

- **Frontend**: React (Vite), Vanilla CSS (Modern Design)
- **Backend**: Node.js, Express.js
- **Database**: SQLite
- **Authentication**: Custom role-based authentication

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd blood-donor-finder
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   npm start
   ```
   The server will start on `http://localhost:5000`.

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   The application will run on `http://localhost:5173`.

## Usage

1. **Public Users**: 
   - Visit the home page to search for donors.
   - Use the "Request Blood" page to submit a blood request.
   
2. **Admins**:
   - Login with `admin` / `admin123`.
   - Manage donor records (Add/Edit/Delete).
   
3. **Hospitals**:
   - Login with `hospital1` / `hospital123`.
   - Access the Hospital Dashboard to view and create blood requests.
   - Check notifications for updates.

## API Endpoints

- `GET /api/donors`: List all donors (supports filters).
- `POST /api/donors`: Add a new donor.
- `POST /api/requests`: Create a blood request.
- `GET /api/requests`: List blood requests.
- `GET /api/notifications/:userId`: Get user notifications.

## License

This project is open-source and available under the MIT License.
