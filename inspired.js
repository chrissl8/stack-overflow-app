

$(function(){
	$('.inspiration-getter').submit(function(){
		//event.preventDefault();
		$('.results').html('');
		$('.inspiredResults').html('');
		var selectedTopic = $(this).find("input[name='answerers']").val();
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
		showResults(data.items);
		console.log("Performed getJSON");
	});
};

function showResults(results){
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

			/*html += '<div class="resultBox">';
			html += '<a href="https://www.youtube.com/watch?v=' + value.id.videoId + '" target="newtab"><img src="' + value.snippet.thumbnails.default.url + '"></a>';
			html += '<p><a href="https://www.youtube.com/watch?v=' + value.id.videoId + '" target="newtab">' + value.snippet.title + '</a></p>';
			html += '<p>' + value.snippet.description + '</p>';
			html += '<p>Channel: ' + value.snippet.channelTitle + '</p>';
			html += '</div>';
			
			html += '<div class="inspiredResults">';
			html += '<p>' + value.user.display_name + '</p>';
			/*
			html += '<p><a href="https://www.youtube.com/watch?v=' + value.id.videoId + '" target="newtab">' + value.snippet.title + '</a></p>';
			html += '<p>' + value.snippet.description + '</p>';
			html += '<p>Channel: ' + value.snippet.channelTitle + '</p>';
			
			html += '</div>';


			console.log(value);

			/*
			$('.templates .answerer').clone();
	
			// Set the question properties in result
			var displayName = $('.display-name a');
			displayName.attr('href', value.link);
			displayName.text(value.display_name);

			// set the #views for question property in result
			var reputation = $('.reputation');
			reputation.text(value.reputation);

			// set the #views for question property in result
			var userType = $('.user-type');
			userType.text(value.user_type);

			// set the #views for question property in result
			var acceptRate = $('.accept-rate');
			acceptRate.text(value.accept_rate);
			*/

			//var answerer = showInspired(item);
			//$('.results').append(answerer);
	});

	$('.results').html(html);
	$('.inspiredResults').show();

	//$('.templates').show();
	//$('#search-results').html(html);
	//$('#search-results').fadeIn(1500);
};