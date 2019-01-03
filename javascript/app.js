var topics = [];
var buttonTopic;
var newTopic = ""; // new topic that will be added via the input field 

// function to create new buttons from the topics array
var btnCreator = function () {
    // the previous div elements are emptied 
    $("#buttonSection").empty();
    // loops through the array and creates buttons
    for (i = 0; i < topics.length; i++) {
        buttonTopic = $("<button type=" + "button" + ">" + topics[i] + "</button>").addClass("btn btn-info col-xs-2").attr("data-topic", topics[i]);
        $("#buttonSection").prepend(buttonTopic);
    };
    //console.log(buttonTopic);
}

//Event listener when clicking on the Submit button to add a new topic
$("#submitTopic").on("click", function (event) {
    event.preventDefault();
    // Set the value of the variable new topic to the user input in the input field with id=inputTopic
    newTopic = $("#inputTopic").val();
    // Add new topic to the Topics array
    topics.push(newTopic);
    //console.log(topics);
    // call the function that creates the new button
    btnCreator();
    // Clear input text field
    $("#inputTopic").val("");
});

// Click on generated button to display images. 
$("#buttonSection").on("click", ".btn", function () {
    //Create variavle to hold the value of the button that contains that topic of interest selected by the user.
    var interestTopic = $(this).attr("data-topic");
    console.log(interestTopic);
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + interestTopic + "&api_key=dc6zaTOxFJmzC&limit=10";
    console.log(queryURL);

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {
            //console.log(response);
            var results = response.data;
            $("#imageDisplay").empty(topicDiv);

            for (var i = 0; i < results.length; i++) {

                var topicDiv = $("<div>");

                var rating = results[i].rating;

                var p = $("<p>").text("Rating: " + rating);

                var topicImage = $("<img>").addClass("gif");
                topicImage.attr("src", results[i].images.fixed_height_still.url);
                topicImage.attr("data-still", results[i].images.fixed_height_still.url);
                topicImage.attr("data-animate", results[i].images.fixed_height.url)
                topicImage.attr("data-state", "still")
                


                if (results[i].rating !== "r" && results[i].rating !== "pg-13") {

                    console.log(topicImage);
                    topicDiv.prepend(p);
                    topicDiv.append(topicImage);

                    $("#imageDisplay").prepend(topicDiv);
                }

                $(".gif").on("click", function (event) {

                    $(".gif").each(function () {
                        event.preventDefault();

                        // gets the current state of the clicked gif 
                        var state = $(this).attr("data-state");
                        console.log(state);
                        // according to the current state gifs toggle between animate and still 
                        if (state === "still") {
                            $(this).attr("src", $(this).attr("data-animate"));
                            $(this).attr("data-state", "animate");
                        } else {
                            $(this).attr("src", $(this).attr("data-still"));
                            $(this).attr("data-state", "still");
                        }
                    });

                });

            }
        });

});
