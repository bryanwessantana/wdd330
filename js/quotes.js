(() => {
    const quotes = [
        { quote: "The body achieves what the mind believes.", author: "Napoleon Hill" },
        { quote: "The only bad workout is the one that didn't happen.", author: "Anonymous" },
        { quote: "Success isn't always about greatness. It's about consistency.", author: "Dwayne 'The Rock' Johnson" },
        { quote: "Strive for progress, not perfection.", author: "Anonymous" },
        { quote: "The pain you feel today will be the strength you feel tomorrow.", author: "Anonymous" },
        { quote: "It's hard to beat a person who never gives up.", author: "Babe Ruth" },
        { quote: "Don't count the days, make the days count.", author: "Muhammad Ali" },
        { quote: "The secret of getting ahead is getting started.", author: "Mark Twain" },
        { quote: "To give anything less than your best is to sacrifice the gift.", author: "Steve Prefontaine" },
        { quote: "The difference between the impossible and the possible lies in a person's determination.", author: "Tommy Lasorda" }
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