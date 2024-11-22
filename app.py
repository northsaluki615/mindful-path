import os
import io
import zipfile
import markdown
import requests
from flask import Flask, render_template, request, jsonify, send_file
from datetime import datetime

app = Flask(__name__)

# Configuration
app.secret_key = os.getenv("SECRET_KEY", "default_secret_key")
ENTRIES_DIR = "entries"
if not os.path.exists(ENTRIES_DIR):
    os.makedirs(ENTRIES_DIR)

# Routes
@app.route("/")
def home():
    """Homepage with information about Stoicism."""
    return render_template("index.html")


@app.route("/journal/")
def journal():
    """Page for creating a new journal entry."""
    return render_template("journal.html")


@app.route("/archive/")
def archive():
    """Page to view all journal entries."""
    entries = [
        filename.replace(".md", "") for filename in os.listdir(ENTRIES_DIR) if filename.endswith(".md")
    ]
    entries.sort(reverse=True)  # Display entries in descending order
    return render_template("archive.html", entries=entries)


@app.route("/entry/<date>")
def entry(date):
    """View a specific journal entry."""
    filepath = os.path.join(ENTRIES_DIR, f"{date}.md")
    if not os.path.exists(filepath):
        return "Entry not found", 404

    # Convert Markdown content to HTML
    with open(filepath, "r") as file:
        md_content = file.read()
    html_content = markdown.markdown(md_content)

    return render_template("entry.html", date=date, content=html_content)


@app.route("/api/entries", methods=["POST"])
def save_entry():
    """Save a journal entry as a Markdown file."""
    data = request.get_json()
    if not data:
        return jsonify({"error": "Invalid input"}), 400

    # Generate unique filename for the entry
    date = datetime.now().strftime("%Y-%m-%d")
    filepath = os.path.join(ENTRIES_DIR, f"{date}.md")
    counter = 1
    while os.path.exists(filepath):
        filepath = os.path.join(ENTRIES_DIR, f"{date}-{counter}.md")
        counter += 1

    # Create Markdown content
    entry_content = f"""---
# Journal Entry for {date}

{data['quote']}

## What did you do well today?

{data['question1']}

## What did you do poorly?

{data['question2']}

## What should you do to become better?

{data['question3']}
"""
    # Save the content to a Markdown file
    with open(filepath, "w") as file:
        file.write(entry_content)

    return jsonify({"message": "Entry saved successfully", "date": date}), 201


@app.route("/api/entries/export", methods=["GET"])
def export_entries():
    """Export all journal entries as a ZIP file."""
    zip_buffer = io.BytesIO()
    with zipfile.ZipFile(zip_buffer, "w", zipfile.ZIP_DEFLATED) as zip_file:
        for filename in os.listdir(ENTRIES_DIR):
            if filename.endswith(".md"):
                filepath = os.path.join(ENTRIES_DIR, filename)
                with open(filepath, "r") as file:
                    zip_file.writestr(filename, file.read())

    zip_buffer.seek(0)
    return send_file(
        zip_buffer,
        mimetype="application/zip",
        as_attachment=True,
        download_name="journal_entries.zip"
    )


@app.route("/api/quote", methods=["GET"])
def fetch_quote():
    """Fetch a random Stoic quote."""
    try:
        response = requests.get("https://stoic-quotes.com/api/quote")
        response.raise_for_status()
        return jsonify(response.json())
    except requests.RequestException as e:
        return jsonify({"error": "Failed to fetch quote"}), 500


# Start the application
if __name__ == "__main__":
    app.run(debug=False)
