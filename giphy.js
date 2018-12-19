$(document).ready(function() {

var foods = [
    "cookies", "salad", "shrimp", "wings", "steak", 
    "eggs", "bread", "potatoe", "pizza", "soup", "fries", 
    "hot dog", "waffles", "bacon", "chowder", "corn dog", 
    "deviled egg", "doughnut", "eggos", "fried chicken", 
    "fried fish", "meat loaf", "oreos", "onion ring", 
    "pepperoni", "pickles"
];

function populateButtons(arrayToUse, ClassToAdd, areaToAddTo) {
$(areaToAddTo).empty();

for (var i = 0; i < arrayToUse.length; i++) {
    var a = $("<button>");
    a.addClass(ClassToAdd);
    a.attr("data-type", arrayToUse[i]);
    a.text(arrayToUse[i]);
    $(areaToAddTo).append(a);
}

}
$(document).on("click", ".food-button", function() {
    $("#foods").empty();
    $(".food-button").removeClass("active");
    $(this).addClass("active");

    var type = $(this).attr("data-type");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=erCeXbTcCbQx2Qnys9U8Ekakikca881w";

    $.ajax({
        url: queryURL,
        method: "GET"
    })
    .then(function(response) {
        var results = response.data;

        for (var i = 0; i < results.length; i++) {
            var foodDiv = $("<div class=\"food-item\">");

            var rating = results[i].rating;

          var p = $("<p>").text("Rating: " + rating);

          var animated = results[i].images.fixed_height.url;
          var still = results[i].images.fixed_height_still.url;

          var foodImage = $("<img>");
          foodImage.attr("src", still);
          foodImage.attr("data-still", still);
          foodImage.attr("data-animate", animated);
          foodImage.attr("data-state", "still");
          foodImage.addClass("food-image");

          foodDiv.append(p);
          foodDiv.append(foodImage);

          $("#foods").append(foodDiv);
    }
    });
});
$(document).on("click", ".food-image", function(){
    var state = $(this).attr("data-state");

    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    }
    else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});

$("#add-food").on("click", function(event) {
    event.preventDefault();
    var newFood = $("input").eq(0).val();

    if (newFood.length > 2) {
        foods.push(newFood);
    }
    populateButtons(foods, "food-button", "#food-buttons");
});
populateButtons(foods, "food-button", "#food-buttons");
});