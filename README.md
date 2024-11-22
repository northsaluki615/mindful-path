Here’s a detailed `README.md` for your **Mindful Path** journaling app:

---

# Mindful Path

Mindful Path is a Stoic-inspired journaling web application designed to help users reflect on their daily actions. Inspired by a simple yet powerful journaling framework, the app provides an easy way to review your day and foster self-improvement.

---

## Features

- **Daily Journaling**: Answer three core Stoic questions:
  1. What did you do well today?
  2. What did you do poorly?
  3. What should you do to become a better version of yourself?
- **Quote of the Day**: Get inspired with random Stoic quotes displayed on the journaling page.
- **Journal Archives**: View past journal entries sorted by date.
- **Markdown Export**: Export all journal entries as markdown files in a ZIP archive.
- **Responsive Design**: Accessible on desktops, tablets, and mobile devices.

---

## Getting Started

### Prerequisites
1. **Python**: Version 3.8 or higher
2. **Flask**: Installed as the primary backend framework
3. **Node.js** (optional for CSS preprocessing or frontend scripts)
4. **Git**: To clone the repository
5. **Dokku or Docker** (optional for production deployment)

---

### Installation

#### Clone the Repository
```bash
git clone https://github.com/northsaluki615/mindful-path.git
cd mindful-path
```

#### Set Up a Virtual Environment
```bash
python3 -m venv venv
source venv/bin/activate
```

#### Install Python Dependencies
```bash
pip install -r requirements.txt
```

---

### Running the App Locally

1. **Start the Flask Development Server**
   ```bash
   flask run
   ```
   The app will run at `http://127.0.0.1:5000`.

2. **Access the App**
   Open your browser and navigate to `http://127.0.0.1:5000`.

---

## File Structure

```
mindful-path/
├── app.py                 # Main Flask application
├── templates/             # HTML templates
│   ├── index.html         # Home page
│   ├── journal.html       # Journal page
│   ├── archive.html       # Archive page
│   └── entry.html         # Individual entry view
├── static/                # Static files (CSS, JS, fonts, images)
│   ├── css/
│   │   ├── style.css      # Main stylesheet
│   │   ├── fonts.css      # Font definitions
│   └── js/
│       ├── script.js      # Frontend interactivity
├── entries/               # Markdown files for saved journal entries
├── requirements.txt       # Python dependencies
├── README.md              # Project documentation
└── .env                   # Environment variables (optional)
```

---

### Environment Variables

Create a `.env` file in the root directory to configure the app. Example:
```bash
FLASK_APP=app.py
FLASK_ENV=development
SECRET_KEY=your-secret-key
```

---

## Deployment

### Using Dokku
1. **Push the Code to Dokku**
   ```bash
   git remote add dokku dokku@<dokku-server>:mindful-path
   git push dokku master
   ```

2. **Configure the App**
   - Set the port and environment variables as needed:
     ```bash
     dokku config:set mindful-path FLASK_ENV=production
     dokku config:set mindful-path SECRET_KEY=your-secret-key
     ```

3. **Access the App**
   Open your browser and navigate to your Dokku server URL.

---

## Customization

- **Update Styling**: Modify the `static/css/style.css` file for custom styles.
- **Modify Quotes**: Connect to a different API for inspirational content by updating the `script.js` file.
- **Font Management**: Fonts are stored in `static/css/fonts.css` for easy reuse.

---

## Contributing

We welcome contributions! To contribute:
1. Fork the repository.
2. Create a feature branch.
3. Commit your changes.
4. Submit a pull request.

---

## License

This project is licensed under the MIT License. See `LICENSE` for details.

---

## Acknowledgments

- Inspired by the journaling framework shared by Pat Helmers.
- Built with Flask for the backend and responsive design principles for usability.
- Stoic quotes powered by [Stoic Quotes API](https://stoic-quotes.com).

---

Let me know if there’s anything you’d like to add or tweak! 😊