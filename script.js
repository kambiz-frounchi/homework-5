var currentDay = moment().format("dddd, MMMM Do YYYY");
$("#currentDay").text(currentDay);
var currentHour = moment().get("hour");

function setTimeBlockColor(hour, timeBlock) {
    var currentHour = moment().get("hour");
    if (hour === currentHour) {
        timeBlock.addClass("present");
    } else if (hour < currentHour) {
        timeBlock.addClass("past");
    } else {
        timeBlock.addClass("future");
    }
}

function createRow(hourIndex, bAM) {
    var container = $(".container");
    var row = $("<div>").addClass("row");
    var hour = $("<div>").addClass("hour col-md-2").text("" + hourIndex + (bAM ? "AM" : "PM"));
    var timeBlock = $("<textArea>").addClass("time-block description col-md-8").attr("data-hour", hourIndex);
    setTimeBlockColor(bAM ? hourIndex : hourIndex + 12, timeBlock);
    var text;
    if (text = localStorage.getItem(hourIndex)) {
        timeBlock.text(text);
    }
    var saveButton = $("<div>").addClass("saveBtn col-md-2").attr("data-hour", hourIndex);
    var saveImage = $("<img>").attr("src", "./images/icons8-save-48.png");
    saveButton.append(saveImage);
    row.append(hour).append(timeBlock).append(saveButton);
    container.append(row);
}

//AM business hours
for (var hourIndex = 9; hourIndex < 13; hourIndex++) {
    createRow(hourIndex, true);
}

//PM business hours
for (var hourIndex = 1; hourIndex < 6; hourIndex++) {
    createRow(hourIndex, false);
}

$(".saveBtn").click(function () {
    var dataHour = $(this).attr("data-hour");
    var textArea = $("textArea[data-hour=" + dataHour + "]");

    var text = textArea.val();
    localStorage.setItem(dataHour, text);
    
});

