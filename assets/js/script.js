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

const getFromLocalStorage = function (key, defaultValue) {
  const localStorageData = JSON.parse(localStorage.getItem(key));

  if (!localStorageData) {
    return defaultValue;
  } else {
    return localStorageData;
  }
};

const storeInput = function (event) {
  if ($(event.target).is(":button")) {
    const button = event.target;
    //   hour
    const hour = $(button).data("time");

    // get user input
    const appointment = $(button).prev().val();

    const schedule = {
      hour: hour,
      appointment: appointment,
    };

    // get from LS before inserting object
    const savedInput = getFromLocalStorage("appointments", []);
    // insert the value object
    savedInput.push(schedule);

    // write back to LS
    localStorage.setItem("appointments", JSON.stringify(savedInput));
  }
};

const initialLocalStorage = function () {
  const dataFromLS = getFromLocalStorage("appointments", []);

  if (!dataFromLS) {
    localStorage.setItem("appointments", JSON.stringify([]));
  }
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
  initialLocalStorage();
  constructCurrentHour();
  renderCurrentHourValue();
};

// render each hour slots
const renderCurrentHourValue = function (hour) {
  const appointments = getFromLocalStorage("appointments", []);
  const currentHourAppointment = appointments.find(
    (appointment) => appointment.hour == hour
  );

  if (currentHourAppointment === undefined) {
    return "";
  } else {
    return currentHourAppointment;
  }
};

// create each hour slots
const constructCurrentHour = function () {
  const callback = function (element) {
    const appointmentValue = renderCurrentHourValue(element.key);
    console.log(appointmentValue?.appointment);
    const hourSchedule = `<div class="row" id=${element.key}>
        <div class=" col time">${element.label}</div>
       
          <textarea class="col activity text-area" value=${appointmentValue?.appointment} id=${element.key} rows="">${appointmentValue?.appointment}</textarea>
        
          <button class=" col save btn btn-outline-info" data-time=${element.key}>button</button>
        
        </div>`;

    $(".container").append(hourSchedule);
  };
  $(".container").click(storeInput);
  return timeBlockArray.map(callback);
};

$(document).ready(onReady);
