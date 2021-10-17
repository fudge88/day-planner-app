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

const colourCodingHours = function () {
  const currentTime = {
    text: moment().format("h:00 A"),
    hour: moment().hour(),
  };
  console.log(currentTime.hour);

  hourKey = Object.keys(timeBlockArray);
  console.log(hourKey);

  if (currentTime.hour < hour) {
    // future
    console.log("yellow");
  } else if (currentTime.hour == hour) {
    // present
    console.log("green");
  } else {
    // past
    console.log("grey");
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
  colourCodingHours();
};

// render each hour slots
const renderCurrentHourValue = function (hour) {
  const appointments = getFromLocalStorage("appointments", []);
  const currentHourAppointment = appointments.find(
    (appointment) => appointment.hour == hour
  );

  return currentHourAppointment;
};

// create each hour slots
const constructCurrentHour = function () {
  const callback = function (element) {
    const hour = element.key;
    const label = element.label;
    const appointmentValue = renderCurrentHourValue(hour);
    const hourSchedule = `<div class="row" id=${hour}>
        <div class=" col time">${label}</div>
       
          <textarea class="col activity text-area" value=${
            appointmentValue?.appointment || ""
          } id=${hour} rows="">${appointmentValue?.appointment || ""}</textarea>
        
          <button class=" col save btn btn-outline-info" data-time=${hour}>button</button>
        
        </div>`;

    $(".container").append(hourSchedule);
  };
  $(".container").click(storeInput);
  return timeBlockArray.map(callback);
};

$(document).ready(onReady);
