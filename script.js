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
        // Pre-populate with some values
        dailyPlanArray[4] = "Eat a Pizza!";
        dailyPlanArray[1] = "Start the Day";
        dailyPlanArray[9] = "Go home!"
    }

    // Loop through hours in a work day
    for (var i = 9; i <= 17; i++) {

        // Create DIV object via JQuery
        var row = $("<div>");

        // Define and Set Display suffix default value
        var ampm = "am";

        // Determine suffix based on hour of work day
        if (i <= 13) {
            ampm = "am"
        } else ampm = "pm";

        // Add attributes to DIV object
        row.addClass('row');
        row.addClass('plannerRow');

        // Set custom attribute 'hour-index'
        row.attr('hour-index', i - 9);

        var currentTime = moment().format("H");
        console.log(currentTime);

        // Add display text, adjust to 12hr clock display
        if (i - 12 > 0) {
            row.attr('display', i - 12 + " " + ampm);
        } else {
            row.attr('display', i + " " + ampm);
        }

        row.text(row.attr('display'));

        // Color the rows dpending on system clock time
        // NOTE, if this is runoutside business hours, all hours will be grey!!
        if (i < parseInt(currentTime)) {
            row.css("background-color", "lightgrey");
        } else if (i = parseInt(currentTime)) {
            row.css("background-color", "tomato");
        } else {
            row.css("background-color", "lightgreen");
        }

        // Set up event for click on this row
        row.on("click", function () {
            //alert("clicked this row" + $(this).attr("hour-index"));
            var eventDetails = prompt("Please enter event details");
            //$(this).val(eventDetails);
            //alert($(this).val());
            var textToSet = $(this).attr("display") + " : " + eventDetails;
            console.log(textToSet);

            $(this).text(textToSet);

            // Push onto array in local storage at this index for future loading
            dailyPlanArray[parseInt($(this).attr("hour-index"))] = eventDetails;

            // Update Local Storage, use Stringify to convert to text
            //localStorage.setItem("storedArray", JSON.stringify(dailyPlanArray));

        });

        // Append to HTML object #plannerContainer
        $("#plannerContainer").append(row);
    }

});