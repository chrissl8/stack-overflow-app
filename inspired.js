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
		getRequest(selectedTopic); //Perform JSON request to get data based on selected topic
		//console.log("Form submitted");
		
	});
});


//Function to get the request from the API
function getRequest(selectedTopic) {
	var params = {site: "stackoverflow"}; //Define parameters to send to API
	//console.log("Sets params");
	var url = 'http://api.stackexchange.com/2.2/tags/' + selectedTopic + '/top-answerers/all_time'; //Define API Endpoint URL variable

	//Call getJSON jQuery function to actually pull the data from the API
	$.getJSON(url, params, function(data)
	{
		//Send result data to below method to update the DOM
		showResults(selectedTopic, data.items, data.items.length);
		//console.log("Performed getJSON, there are " + data.items.length + "items for this search");
	});
};

//Function to update the DOM to show the results one by one
function showResults(topic, results, count){
	var html = ""; //Initialize HTML variable to clear any previous results as well
	//$('.inspiredResults').html(html);
	//console.log(results.length);
	//Iterate through each result object from the API response
	$.each(results,function(index,value){
			//Builds a dl class result answer to be added to results class
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
	$('.search-results').html(count + ' results for <strong>' + topic); //Set result count variable in DOM
	$('.results').html(html); //Send above results to the DOM
	$('.inspiredResults').show(); //Show the DIV for the inspiredResults
};



