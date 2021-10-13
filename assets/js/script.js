console.log(moment().format());
console.log(moment().startOf("hour").fromNow());

$("#currentDay").text(now.format("dddd MMMM DD, YYYY"));

$(document).ready(onReady);
