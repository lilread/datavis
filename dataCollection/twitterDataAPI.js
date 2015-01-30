var Twit = require('twit');
var fs = require('fs');
var twit = new Twit({
	consumer_key : '0fvRPtEUAKojtksW7ZVwwW5Ca',
	consumer_secret : 'n37nNOKnuhr3QBee7mUb5dCnU6kbwE0HVKEwN48544MO6EDKz2',
	access_token : '843822818-E5EutbZlltmygTKAVfXUpLUr0w5nADbfLUcKACMO',
	access_token_secret : 'd4JydnsekXY4NwfZxHCMcRAr53YmCesSNpj9wULja7KpD'
});

//var uk = [ '-0.08', '50.87', '0.66','51.01' ];
//var stream = twit.stream('statuses/filter', { locations: uk });


var stream = twit.stream('statuses/filter', { track: "boob, boobs" });
var log = fs.createWriteStream('tweets.log');

stream.on('tweet', processTweet);

function processTweet(tweet) {
	var regexp = /#\w+/g;
	var words = tweet.text.match(regexp);
	console.log(words);

//var strTweet= JSON.stringify(tweet);
//log.write (strTweet);
//console.log(tweet);
};