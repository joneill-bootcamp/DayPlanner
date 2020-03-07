$(document).ready(function () {

    var dayName = moment().format("dddd, MMMM Do");
    $("#currentDay").text(dayName);

    // Get items from local storage convert to object using JSON parse to convert from string
    var storedItems = JSON.parse(localStorage.getItem("storedArray"));

    // If there is items in local storage, populate array 
    if (storedItems !== null) {
        var dailyPlanArray = storedItems;
    } else {
        // Create a new Array of 9 elements
        var dailyPlanArray = new Array(9);
    }

    // Loop through hours in a work day
    for (var i = 9; i <= 17; i++) {

        // Create DIV object via JQuery
        var row = $("<div>");

        // Define and Set Display suffix default value
        var ampm = "am";

        // Determine suffix based on hour of work day for 12 hour display
        if (i <= 11) {
            ampm = "am"
        } else ampm = "pm";

        // Add classes to DIV object
        row.addClass('row');
        row.addClass('plannerRow');

        // Set custom attribute 'hour-index', used to facilitate array placement 
        row.attr('hour-index', i - 9);

        var currentTime = moment().format("H");
        console.log(currentTime);

        // Add display text, adjust to 12hr clock display
        if (i - 12 > 0) {
            row.attr('display', i - 12 + " " + ampm);
        } else {
            row.attr('display', i + " " + ampm);
        }

        // Use local storage 
        if (dailyPlanArray[i - 9] == null) {
            row.text(row.attr('display'));
        } else {
            row.text(dailyPlanArray[i - 9]);
        }

        // Color the rows dpending on system clock time
        // NOTE, if this is run outside business hours, all hours will be grey!!
        if (i < parseInt(currentTime)) {
            row.css("background-color", "lightgrey"); // Past
        } else if (i = parseInt(currentTime)) {
            row.css("background-color", "tomato"); // Current
        } else {
            row.css("background-color", "lightgreen"); // Future
        }

        // Set up event for click on this row
        row.on("click", function () {

            // Get event details
            var eventDetails = prompt("Please enter event details");

            // Check to see if eventDetails actually has a value
            if (eventDetails) {

                // Set what the text for Row will be
                var textToSet = $(this).attr("display") + " : " + eventDetails;
                console.log(textToSet);

                // Refresh row with it's new Text
                $(this).text(textToSet);

            } else {
                // If eventDetails has nothing, then revert to row's default display
                $(this).text($(this).attr('display'));
            }

            // Always assign element of Array to be equal to the text that Row will display 
            dailyPlanArray[parseInt($(this).attr("hour-index"))] = textToSet;

            // Always update Local Storage, use Stringify to convert array to text
            localStorage.setItem("storedArray", JSON.stringify(dailyPlanArray));
        });

        // Append to HTML object #plannerContainer
        $("#plannerContainer").append(row);
    }

});