// frontend/src/assets/js/entry.js

// Get date parameter from URL
const urlParams = new URLSearchParams(window.location.search);
const date = urlParams.get("date");

// Function to fetch and display the specific journal entry
async function loadEntry() {
    const entryContent = document.getElementById("entry-content");
    if (date && entryContent) {
        try {
            const response = await fetch(`http://localhost:5000/api/entries/${date}`);
            if (response.ok) {
                const entry = await response.json();
                entryContent.innerHTML = `
                    <h2>Entry for ${entry.date}</h2>
                    <div>${entry.content}</div>
                `;
            } else {
                entryContent.innerHTML = "<p>Entry not found.</p>";
            }
        } catch (error) {
            console.error("Error loading entry:", error);
            entryContent.innerHTML = "<p>Error loading entry. Please try again later.</p>";
        }
    }
}

// Load the entry when the page is ready
window.addEventListener("DOMContentLoaded", loadEntry);
