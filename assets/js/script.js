const timeBlockArray = [
  {
    label: "9",
    key: 9,
  },
  {
    label: "10",
    key: 10,
  },
  {
    label: "11",
    key: 11,
  },
  {
    label: "12",
    key: 12,
  },
  {
    label: "13",
    key: 13,
  },
  {
    label: "14",
    key: 14,
  },
  {
    label: "15",
    key: 15,
  },
  {
    label: "16",
    key: 16,
  },
  {
    label: "17",
    key: 17,
  },
];

const currentTime = { text: moment().format("h:00 A"), hour: moment().hour() };
// onLoad

// get current day

// render current day

// render time-blocks using map (construct time block)or a for each

// get text from object
// if undefined - theres no value
// if present- true- class red
// if future - true -class green

const onSave = function () {
  // get time block btn was clicked
  // event delegation (target)
  // get text from text area .value
  // take text and key for time and write to LS
};

// sets current day and time on header
const currentDayTime = $("#currentDay");
const onReady = function () {
  const timerTick = function () {
    const dateTime = moment();
    const dateTimeFormat = dateTime.format("dddd DD MMMM, YYYY kk:mm");

    currentDayTime.text(dateTimeFormat);
  };
  const timer = setInterval(timerTick, 1000);
};

// render each hour slots
const renderCurrentDay = function () {};

// create each hour slots
const constructCurrentDay = function (label) {
  const callback = function (element) {
    const hourSchedule = `<div class="container align-items-center mx-6">
        <div class="time">${hr.text}</div>
        <div class="activity">
          <textarea class="text-area" id="" rows=""></textarea>
        </div>
        <div class="save">
          <button class="btn btn-outline-info">button</button>
        </div>
      </div>`;
    return hourSchedule;
  };
  return label.map(callback);
};
console.log(constructCurrentDay);

$(document).ready(onReady);
