import React, { useState } from "react";
import "./ContributionGraph.scss";
import moment from "moment/moment";

const DayNames = {
  5: "Воскресенье",
  6: "Понедельник",
  0: "Вторник",
  1: "Среда",
  2: "Четверг",
  3: "Пятнца",
  4: "Суббота",
};
const colors = ["#EDEDED", "#ACD5F2", "#7FA8C9", "#527BA0", "#254E77"];
const chooseColor = (value) => {
  if (value === 0) {
    return colors[0];
  } else if (value > 0 && value <= 9) {
    return colors[1];
  } else if (value > 9 && value <= 19) {
    return colors[2];
  } else if (value > 19 && value <= 29) {
    return colors[3];
  } else if ((value) => 30) {
    return colors[4];
  }
};
function Cell({ color }) {
  let style = {
    backgroundColor: color,
  };
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <div className="timeline-cells-cell" style={style}></div>
    </div>
  );
}

function Month({ startDate, index }) {
  let date = moment(startDate).add(index * 7, "day");
  let monthName = date.format("MMM");

  return (
    <div className={`timeline-months-month ${monthName}`}>{monthName}</div>
  );
}

function WeekDay({ index }) {
  return <div className="timeline-weekdays-weekday">{DayNames[index]}</div>;
}

const ContributionGraph = ({ range, data, colorFunc }) => {
  let days = 353;
  let cells = Array.from(new Array(days));
  let weekDays = Array.from(new Array(7));
  let months = Array.from(new Array(Math.floor(days / 7)));
  let min = Math.min(0, ...data.map((d) => d.value));
  let max = Math.max(...data.map((d) => d.value));
  let colorMultiplier = 1 / (max - min);

  let startDate = range[0];
  const DayFormat = "DDMMYYYY";
  const [selectedItem, setSelecteditem] = useState();

  return (
    <div className="timeline">
      <div className="timeline-months">
        {months.map((_, index) => (
          <Month key={index} index={index} startDate={startDate} />
        ))}
      </div>

      <div className="timeline-body">
        <div className="timeline-weekdays">
          {weekDays.map((_, index) => (
            <WeekDay key={index} index={index} startDate={startDate} />
          ))}
        </div>

        <div className="timeline-cells">
          {data.map((val, index) => {
            return (
              <div
                onClick={() => {
                  console.log(moment(val.date).format("LLLL"));
                  setSelecteditem(index);
                }}
                className="cell-wrapper"
              >
                <Cell
                  key={index}
                  index={index}
                  date={val}
                  color={chooseColor(val.value)}
                />
                <div className={selectedItem === index ? "active" : "passive"}>
                  <p>Количество: {val.value}</p>
                  <p>{moment(val.date).format("LLLL")}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="overlay" onClick={() => setSelecteditem(null)} />
    </div>
  );
};

export default ContributionGraph;
