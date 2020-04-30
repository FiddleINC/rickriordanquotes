const url = 'https://www.goodreads.com/quotes/tag/percy-jackson';
const rp = require('request-promise');
const cheerio = require('cheerio');
const fs = require('fs');
const chalk = require('chalk');

const outputFile = 'data.json';
const pageLimit = 22;
var pageCounter = 1;
var resultCount = 0;

var quotes = [];
var quoteArray;

const exportResults = (parsedResults) => {
	fs.writeFile(outputFile, JSON.stringify(parsedResults, null, 4), (err) => {
		if (err) {
			console.log(err);
		}
		console.log(
			chalk.yellow.bgBlue(
				`\n ${chalk.underline.bold(
					parsedResults.length
				)} Results exported successfully to ${chalk.underline.bold(outputFile)}\n`
			)
		);
	});
};

console.log(chalk.yellow.bgBlue(`\n  Scraping of ${chalk.underline.bold(url)} initiated...\n`));

const getSiteContent = (url) => {
	rp(url)
		.then(function(html) {
			//success!
			const $ = cheerio.load(html);
			$('.quoteText').each(function(index, element) {
				const count = ++resultCount;
				quoteArray = $(this).text().trim().split('\n');

				quotes.push({
					count: count,
					title: quoteArray.length == 7 ? quoteArray[6].trim() : 'title not available',
					quote: quoteArray[0]
				});
			});
			++pageCounter;
			if (pageCounter === pageLimit) {
				exportResults(quotes);
				return false;
			}
			const nextPageLink = url.split('?')[0] + '?page=' + pageCounter;
			console.log(chalk.cyan(`  Scraping: ${nextPageLink}`));
			console.log('\n');

			getSiteContent(nextPageLink);
		})
		.catch(function(err) {
			//handle error
			console.log(chalk.red(err));
		});
};

getSiteContent(url);
