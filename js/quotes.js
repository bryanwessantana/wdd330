// New js/quotes.js
// This wraps the code in a function that is executed immediately.
// It keeps all variables and functions private to this file.
(() => {
    const quotes = [
        { quote: "The body achieves what the mind believes.", author: "Napoleon Hill" },
        { quote: "The only bad workout is the one that didn't happen.", author: "Anonymous" },
        { quote: "Success isn't always about greatness. It's about consistency.", author: "Dwayne 'The Rock' Johnson" },
        { quote: "Strive for progress, not perfection.", author: "Anonymous" },
        { quote: "The pain you feel today will be the strength you feel tomorrow.", author: "Anonymous" }
    ];

    const quoteText = document.getElementById('quoteText');
    const quoteAuthor = document.getElementById('quoteAuthor');
    const newQuoteBtn = document.getElementById('newQuoteBtn');

    const updateQuote = () => {
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        if (quoteText && quoteAuthor) {
            quoteText.textContent = randomQuote.quote;
            quoteAuthor.textContent = randomQuote.author;
        }
    };

    newQuoteBtn?.addEventListener('click', updateQuote);

    document.addEventListener('DOMContentLoaded', updateQuote);
})();