const quoteText = document.getElementById("quoteText");
const quoteAuthor = document.getElementById("quoteAuthor");
const newQuoteBtn = document.getElementById("nweQuoteBtn");

async function fetchQuote() {
    try {
        const res = await fetch("https://api.quotable.io/random");
        if (!res.ok) throw new Error("failed");
        const data = await res.json();
        displayQuote(data.content, data.author);
    } catch (err) {
        console.error("Quote fetch failed", err);
        const fallback = [
            ["Keep going - small steps.", "Anonymous"],
            ["You don't have to be great to start.", "Zig Ziglar"],
        ];
        const [q, a] = fallback[Math.floor(Math.random() * fallback.length)];
        displayQuote(q, a);
    }
}

function displayQuote(q, a) {
    if (quoteText) quoteText.textContent = q;
    if (quoteAuthor) quoteAuthor.textContent = a ? `-${a}` : "";
}

newQuoteBtn?.addEventListener("click", fetchQuote);
document.addEventListener("DOMContentLoaded", fetchQuote);