$(document).ready(function() {
    var topics = ["Iron Man", "Thor", "Starlord", "Black Panther", "The Incredible Hulk", "Dr. Strange", "Captian America", "Drax"];

    function createButtons() {

        $("#btnContainer").empty();

        for (var i = 0; i < topics.length; i++) {
          var a = $("<button>").addClass("topic").attr("data-name", topics[i]).text(topics[i]);
          $("#btnContainer").append(a);
        }
    }

    $("#add-hero").click(function() {
      console.log("clicked");
      // Preventing the buttons default behavior when clicked (which is submitting a form)
      event.preventDefault();
      // This line grabs the input from the textbox
      var hero = $("#add-input").val().trim();

      // Adding the movie from the textbox to our array
      topics.push(hero);

      // Calling renderButtons which handles the processing of our movie array
      createButtons();

    });

    createButtons();

    $(document).on("click", ".topic", (function(){
        $("#gifsContainer").empty();
        $("#gifsContainer2").empty();
        
        var name = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        name + "&api_key=J2eF5P2ZoeBrbpLFgV5orVBr1wYTrI3o&limit=10";

      $.ajax({
        url: queryURL,
        method: "GET"
      })
        .then(function(response) {
          var results = response.data;
            console.log(response);
          for (var i = 0; i < 5; i++) {
            var gifDiv = $("<div>");
            var rating = results[i].rating;
            var p = $("<p>").text("Rating: " + rating).addClass("rating");
            var image = $("<img>");
            image.attr("src", results[i].images.fixed_height_small_still.url).attr("data-still", results[i].images.fixed_height_small_still.url).attr("data-animate", results[i].images.fixed_height_small.url).attr("data-state", "still").addClass("gif");

            gifDiv.append(p);
            gifDiv.prepend(image);

            $("#gifsContainer").prepend(gifDiv);
          }
          for (var i =5; i < 10; i++) {
              var gifDiv = $("<div>");
              var rating = results[i].rating;
              var p = $("<p>").text("Rating: " + rating).addClass("rating");
              var image = $("<img>");
              image.attr("src", results[i].images.fixed_height_small_still.url).attr("data-still", results[i].images.fixed_height_small_still.url).attr("data-animate", results[i].images.fixed_height_small.url).attr("data-state", "still").addClass("gif");
  
              gifDiv.append(p);
              gifDiv.prepend(image);
  
              $("#gifsContainer2").prepend(gifDiv);
          }

          $(".gif").on("click", function(){
            console.log("Hello!");
            var state = $(this).attr("data-state");
            if (state === "still") {
              $(this).attr("src", $(this).attr("data-animate"));
              $(this).attr("data-state", "animate");
            } else {
              $(this).attr("src", $(this).attr("data-still"));
              $(this).attr("data-state", "still");
            }
          });
        });
      

    $(".gif").on("click", function(){
      console.log("Hello!");
    });

    

  }));
});
    