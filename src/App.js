import { useEffect, useState } from "react";
import "./App.scss";
import moment from "moment/moment";
import ContributionGraph from "./components/ContributionGraph/ContributionGraph";

function App() {
  const [contributions, setContributions] = useState({});
  const [data, setData] = useState([]);
  const [range, setRange] = useState();
  
  const fetchingContributions = async () => {
    const response = await fetch("https://dpg.gg/test/calendar.json");
    const data = await response.json();
    setContributions(data);
  };

  const createCalendar = () => {
    let startDate = moment(Object.keys(contributions)[0], "YYYY-MM-DD");
    let endDate = moment(
      Object.keys(contributions)[Object.keys(contributions).length - 1],
      "YYYY-MM-DD"
    );
    setRange([startDate, endDate]);

    while (startDate.diff(endDate) <= 0) {
      data.push({
        date: startDate.format("YYYY-MM-DD"),
        value: contributions.hasOwnProperty(startDate.format("YYYY-MM-DD"))
          ? contributions[startDate.format("YYYY-MM-DD")]
          : 0,
      });
      startDate.add(1, "days");
    }
  };

  useEffect(() => {
    fetchingContributions();
  }, []);
  useEffect(() => {
    if (Object.keys(contributions).length > 0) {
      createCalendar();
    }
  }, [contributions]);
  return (
    <div className="App">
      <h2>Тестовое задание</h2>
      {contributions && data && range && (
        <ContributionGraph range={range} data={data} />
      )}
    </div>
  );
}

export default App;
