const quotes = [
    {
        quote: "Confidence is contagious. So is lack of confidence.",
        author: "Vince Lombardi"
    },
    {
        quote: "Shallow men believe in luck, Strong men believe in cause and effect.",
        author: "Ralph Waldo Emerson"
    },
    {
        quote: "Nothing is less productive than to make more efficient what should not be done at all.",
        author: "Peter Drucker"
    },
    {
        quote: "Do not follow where the path may lead. Go instead where there is no path and leave a trail.",
        author: "Ralph Waldo Emerson"
    },
    {
        quote: "He is richest who is content with the least.",
        author: "Socrates"
    },
    {
        quote: "Choose a job you love, and you will never have to work a day in your life.",
        author: "Confucius"
    },
    {
        quote: "Only those who dare to fail greatly can ever achieve greatly.",
        author: "John F. Kennedy"
    },
    {
        quote: "As I grow older, I pay less attention to what men say. I just watch what they do.",
        author: "Andrew Carnegie"
    },
    {
        quote: "Well begun is half done.",
        author: "Aristoteles"
    }
]

const quote = document.querySelector("#quote span:first-child");
const author = document.querySelector("#quote span:last-child");

const randomNumber = Math.floor(Math.random() * quotes.length); 
const todaysQuote = quotes[randomNumber];


quote.innerText = `"${todaysQuote.quote}"`;
author.innerText = todaysQuote.author;