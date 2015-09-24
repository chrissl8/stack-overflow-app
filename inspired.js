/*
StackOverflow Reputation Builder App
By Chris Slaight, 2015
"Get Inspired Feature" Simplified AJAX/JSON logic for working with Stack API
*/

//Initial function on page load
$(function(){
	$('.inspiration-getter').submit(function(){
		//event.preventDefault();
		$('.results').html(''); //Set previous results div to blank
		$('.inspiredResults').html(''); //Set inspiredResults div to blank as well
		$('.search-results').html(''); //Set counter to blank as well
		var selectedTopic = $(this).find("input[name='answerers']").val(); //Grab input from form
		getRequest(selectedTopic);
		console.log("Form submitted");
		
	});
});

function getRequest(selectedTopic) {
	var params = {
		site: "stackoverflow"
	};
	console.log("Sets params");
	var url = 'http://api.stackexchange.com/2.2/tags/' + selectedTopic + '/top-answerers/all_time';

	$.getJSON(url, params, function(data){
		showResults(selectedTopic, data.items, data.items.length);
		console.log("Performed getJSON, there are " + data.items.length + "items for this search");
	});
};

function showResults(topic, results, count){
	var html = "";
	//$('.inspiredResults').html(html);
	console.log(results.length);
	$.each(results,function(index,value){
			
			html += '<dl class="result answerer">';
			html += '<dt>User Name: </dt>';
			html += '<dd class="display-name"><a href="' + value.user.link + '" target="_blank">' + value.user.display_name + '</a></dd>';
			html += '<dt>Reputation: </dt>';
			html += '<dd class="reputation">' + value.user.reputation + '</dd>';
			html += '<dt>User Type: </dt>';
			html += '<dd class="user-type">' + value.user.user_type + '</dd>';
			html += '<dt>Accept Rate: </dt>';
			html += '<dd class="accept-rate">' + value.user.accept_rate + '</dd>';
			html += '</dl>';
	});
	$('.search-results').html(count + ' results for <strong>' + topic);
	$('.results').html(html);
	$('.inspiredResults').show();
};