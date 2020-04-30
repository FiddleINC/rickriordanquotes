const quotes = require('./public/data.json');
const random = require('unique-random-array');

module.exports = {
	all: quotes,
	random: random(quotes)
};
