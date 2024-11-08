# Mindful Path

Mindful Path is a stoic journaling application designed to help users reflect on daily actions and thoughts. The app focuses on three core questions each day, and provides random Stoic quotes for inspiration. Users can export all entries for backup and personal use.

## Features

- **Daily Journaling Prompts**:
  - **What did you do well today?**
  - **What did you do poorly?**
  - **What should I do to become a better version of myself?**
- **Random Stoic Quotes** for daily inspiration, sourced from [stoic-quotes.com](https://stoic-quotes.com).
- **View and Export Past Journal Entries**: Easily access previous entries and download all entries as a single ZIP file.
- **Markdown Storage**: Entries are stored as markdown files for easy portability and backup.
- **Custom Typography**: Uses the TT2020 font for a distinct and readable journaling experience.

## Tech Stack

- **Frontend**: Vue.js
- **Backend**: Node.js with Express
- **Storage**: Markdown files for entries, served via the file system

## Setup

### Prerequisites

- **Node.js**: Make sure you have Node.js installed. You can download it from [nodejs.org](https://nodejs.org/).
- **Git** (optional, for version control)

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/your-username/mindful-path.git
   cd mindful-path
   ```

2. **Install Dependencies**

   - Install backend dependencies:

     ```bash
     cd mindful-path/backend
     npm install
     ```

   - Install frontend dependencies:

     ```bash
     cd ../frontend
     npm install
     ```

3. **Environment Variables**

   In the `backend` directory, create a `.env` file to store environment variables:

   ```plaintext
   # .env
   JWT_SECRET=your_jwt_secret
   PORT=3001
   ```

4. **Build the Frontend**

   - Run a production build of the frontend:

     ```bash
     npm run build
     ```

   This command will create a `dist/` folder with optimized files in the `frontend` directory.

5. **Run the Application**

   - Start the backend server from the `backend` directory:

     ```bash
     npm start
     ```

   - Serve the frontend using a static file server or integrate it into the backend for simplicity.

## Usage

### Access the Application

1. **Frontend**: Open `http://localhost:8080` in your browser to access the frontend.
2. **API**: Access backend routes at `http://localhost:3001/api`.

### Key Routes

- **`/`**: Home page with daily journaling prompts.
- **`/archives`**: View all previous journal entries.
- **`/api/entries/export`**: Download all entries as a ZIP file.

### Development

To run the application in development mode:

1. **Frontend**: Start the Vue dev server in the `frontend` directory:

   ```bash
   npm run serve
   ```

2. **Backend**: Start the Express server in the `backend` directory:

   ```bash
   npm run dev
   ```

### Running Tests

If you have tests set up (e.g., using Jest or Cypress), include instructions on running them here:

```bash
npm run test
```

## Font

Mindful Path uses the **TT2020 font** for all text, adding a unique and aesthetic style to the journaling experience. Make sure to include the font files in the correct directory if deploying on a new environment.

## Stoic Quotes Source

Random Stoic quotes are sourced from [stoic-quotes.com](https://stoic-quotes.com) via its public API, providing daily wisdom from ancient Stoic philosophers like Marcus Aurelius, Seneca, and Epictetus.

## Deployment

To deploy the application, you can use Docker, a cloud provider, or any hosting solution that supports Node.js and static files.

## Contributing

1. Fork the repository
2. Create a new branch
3. Commit your changes
4. Open a pull request

## Credits and Acknowledgments

- This project was built with assistance from OpenAI’s ChatGPT, which provided guidance on structuring, coding, and enhancing the application.
- **Font**: TT2020 font files.
- **Quotes API**: Sourced from [stoic-quotes.com](https://stoic-quotes.com).

## License

This project is licensed under the MIT License.
