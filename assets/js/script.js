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

// local storage
const getFromLocalStorage = function (key, defaultValue) {
  const localStorageData = JSON.parse(localStorage.getItem(key));

  if (!localStorageData) {
    return defaultValue;
  } else {
    return localStorageData;
  }
};

// storing the value the user keys into the textarea against the hour in the LS
const storeInput = function (event) {
  if ($(event.target).is(":button")) {
    const button = event.target;
    const hour = $(button).data("time");
    const appointment = $(button).prev().val();
    const schedule = {
      hour: hour,
      appointment: appointment,
    };
    const savedInput = getFromLocalStorage("appointments", []);
    savedInput.push(schedule);
    localStorage.setItem("appointments", JSON.stringify(savedInput));
  }
};

// colour coding current past and present hour using moment JS
const colourCodingHours = function (hour) {
  const currentTime = moment().hour();
  if (currentTime > hour) {
    return "past";
  } else if (currentTime == hour) {
    return "present";
  } else {
    return "future";
  }
};

// initializing LS
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

// render each hour slots with value against the correct hour
const renderCurrentHourValue = function (hour) {
  const appointments = getFromLocalStorage("appointments", []);
  const currentHourAppointment = appointments.find(
    (appointment) => appointment.hour == hour
  );
  return currentHourAppointment;
};

// create each hour slots on a loop for every object in teh array
const constructCurrentHour = function () {
  const callback = function (element) {
    const hour = element.key;
    const label = element.label;
    const appointmentValue = renderCurrentHourValue(hour);
    const renderColours = colourCodingHours(hour);
    const hourSchedule = `<div class="row" id=${hour}>
        <div class=" col time">${label}:00</div>
        <textarea class="col activity text-area ${renderColours}" value="${
      appointmentValue?.appointment || ""
    }" id="${hour}" rows="">${appointmentValue?.appointment || ""}</textarea>
          <button class=" col save" data-time=${hour}>Save</button>
        </div>`;
    $(".container").append(hourSchedule);
  };
  $(".container").click(storeInput);
  return timeBlockArray.map(callback);
};

$(document).ready(onReady);
