const quotes = [
    {
        quote: "a",
        author: "John"
    },
    {
        quote: "a2",
        author: "John2"
    },
    {
        quote: "a3",
        author: "John3"
    },
    {
        quote: "a4",
        author: "John4"
    },
    {
        quote: "a5",
        author: "John5"
    },
    {
        quote: "a6",
        author: "John6"
    },
    {
        quote: "a7",
        author: "John7"
    },
    {
        quote: "a8",
        author: "John8"
    },
    {
        quote: "a9",
        author: "John9"
    }
]

const quote = document.querySelector("#quote span:first-child");
const author = document.querySelector("#quote span:last-child");

const randomNumber = Math.floor(Math.random() * quotes.length); 
const todaysQuote = quotes[randomNumber];


quote.innerText = todaysQuote.quote;
author.innerText = todaysQuote.author;