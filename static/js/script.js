document.getElementById("journal-form").addEventListener("submit", async (event) => {
    event.preventDefault();

    const quoteText = document.querySelector("#quote-component blockquote").innerText;
    const quoteAuthor = document.querySelector("#quote-component cite").innerText;
    const fullQuote = `${quoteText}\n\n${quoteAuthor}`;

    const entryData = {
        question1: document.getElementById("question1").value,
        question2: document.getElementById("question2").value,
        question3: document.getElementById("question3").value,
        quote: fullQuote,
    };

    try {
        const response = await fetch("/api/entries", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(entryData),
        });

        if (response.ok) {
            alert("Journal entry saved successfully!");
            event.target.reset();
        } else {
            alert("Failed to save journal entry.");
        }
    } catch (error) {
        console.error("Error saving journal entry:", error);
    }
});

// Function to load a random Stoic quote
async function loadQuote() {
    const quoteComponent = document.getElementById("quote-component");
    if (quoteComponent) {
        try {
            const response = await fetch("/api/quote"); // Use backend API route
            if (response.ok) {
                const data = await response.json();
                quoteComponent.innerHTML = `
                    <blockquote>"${data.text}"</blockquote>
                    <cite>— ${data.author}</cite>
                `;
            } else {
                throw new Error("Failed to fetch quote");
            }
        } catch (error) {
            console.error("Error loading quote:", error);
            quoteComponent.innerHTML = `
                <p>Failed to load quote. Please try again later.</p>
            `;
        }
    }
}

// Load quote when the page loads
document.addEventListener("DOMContentLoaded", loadQuote);
