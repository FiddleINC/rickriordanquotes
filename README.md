Get a random quote from Rick Riordan Books as an NPM Module

## Installation

You can find the npm module here on

https://www.npmjs.com/package/rickriordanquotes

Just install the module using ```npm i rickriordanquotes```

## Usage

To include in CommonJS Module
```javascript
const quotes = require('rickriordanquotes')
```
To include in ES6 Module
```javascript
import {all, random} from 'rickriordanquotes'
```

### Get All Quotes

```javascript
//Prints a Array of Quotes and Title of the Book
const allQuotes = quotes.all;
```
### Get Random Quote

```javascript
//Prints a random Quote from the list
const randomQuote = quotes.random();
```

## Scraping

I have also included the scrape.js file in the scrapper folder. I used Cheerio for scraping the GoodReads Page for the data.