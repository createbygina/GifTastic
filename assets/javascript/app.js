$(document).ready(function () {
  var topics = ["german shepherd", "doberman", "chihuahua", "pit bull", "golden retriever", "husky", "pomeranian", "beagle", "french bulldog", "corgi"];
  var dog = "";
  gifsON = 0;

  function displayDogBreeds() {
    if (gifsON === 1) {
      $(".dogGif").remove();
      $(".ratings").remove();
    }
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=EF16SX5J4Rx6p3QcgdV3kiMG3GOnO2Xt&q=" + dog + "&limit=10&offset=0&lang=en";
    console.log(dog);
    console.log("post queryURL")
    console.log(queryURL);
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {
      console.log(response);
      var results = response.data;
      for (var i = 0; i < results.length; i++) {
        var dogDiv = $("<div>");
        var p = $("<p class ='ratings'>").text("Rating: " + results[i].rating);
        var dogImage = $("<img class = 'dogGif'>");
        dogImage.attr("data-still", results[i].images.fixed_height_still.url);
        dogImage.attr("data-animate", results[i].images.fixed_height.url);
        dogImage.attr("data-state", "still");
        dogImage.attr("src", results[i].images.fixed_height_still.url);
        dogDiv.append(p);
        dogDiv.append(dogImage);
        $("#dogGifs").append(dogDiv);
      }
    })
  }

  function dogButtons() {
    for (var i = 0; i < topics.length; i++) {
      var dogbtn = $("<button class='btn btn-info dogbutton'>")
      $(dogbtn).text(topics[i]);
      $("#dogButtons").append(dogbtn);
      console.log(topics[i]);
    }
  }
  dogButtons();
  $("body").on("click", ".dogbutton", function () {
    dog = $(this).text();
    displayDogBreeds();
    gifsON = 1;
    console.log(dogButtons);
    console.log(dog);
  })
  $("#add-dog").on("click", function (event) {
    event.preventDefault();
    var newGif = $("#breed-input").val().trim();
    topics.push(newGif);
    $(".dogbutton").remove();
    dogButtons();
  })
  $("body").on("click", ".dogGif", function () {
    let state = $(this).attr("data-state");
    if (state === "still") {
      let animate = $(this).attr("data-animate");
      $(this).attr("src", animate);
      $(this).attr("data-state", animate)
      state = $(this).attr("data-state");
    } else {
      let still = $(this).attr("data-still");
      $(this).attr("src", still);
      $(this).attr("data-state", "still");
      state = $(this).attr("data-state");
    }
  })
})
