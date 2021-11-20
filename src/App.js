import React, { useEffect, useState } from "react";
import axios from "axios";
import Counter from "./Components/Counter";
import CounterVal from "./Components/CounterValue";

import "./App.css";
function App() {
  const [initialValue, setInitialValue] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [counter, setCounter] = useState(1);
  const [max, setMax] = useState(1000);
  const [changing, setChanging] = useState(false);

  useEffect(() => {
    const fetchCounter = async () => {
      try {
        setCounter(counter);
        setIsLoading(true);
        setInitialValue(initialValue);
        const response = await axios.get(
          "https://interview-8e4c5-default-rtdb.firebaseio.com/front-end/dhanush.json"
        );
        setInitialValue(response.data || 1);
        setCounter(response.data || 1);
        setIsLoading(false);
      } catch (e) {
        // console.log(e);
        setInitialValue(initialValue);
        setCounter(counter);
        setIsLoading(false);
      }
    };

    fetchCounter();
  }, []);

  useEffect(() => {
    if (Number(max) < counter) {
      setCounter(Number(max));
      changeCounterValue(Number(max));
    }
  }, [counter, max]);

  const changeCounterValue = async (val) => {
    try {
      const data = { dhanush: val };
      setChanging(true);
      const response = await axios.put(
        "https://interview-8e4c5-default-rtdb.firebaseio.com/front-end.json",
        data
      );
      console.log(response);
      setChanging(false);
    } catch (e) {
      console.log(e);
      setChanging(false);
    }
  };

  const handleAdded = () => {
    setChanging(true);
    setCounter(counter + 1);
    changeCounterValue(counter + 1);
  };

  const handleSubtracted = () => {
    setChanging(true);
    setCounter(counter - 1);
    changeCounterValue(counter - 1);
  };

  const handleChanged = (newValue) => {
    setChanging(true);
    setCounter(newValue);
    changeCounterValue(newValue);
  };

  return (
    <div className="App">
      {isLoading ? (
        <div className="plzWait">
          <div>Loading...!</div>
        </div>
      ) : (
        <div>
          <div className="title">
            <h1>Counter App</h1>
          </div>
          <div>
            <label for="initial">Initial value: </label>
            <input
              name="initial"
              style={{ marginRight: "5%" }}
              type="number"
              value={initialValue}
              disabled
            />
            <label for="max">Max value: </label>
            <input
              name="max"
              type="number"
              value={max}
              onChange={(e) => setMax(e.target.value)}
            />
          </div>
          <div className="main-box">
            <Counter
              counterValue={counter}
              saving={changing}
              maxValue={max}
              added={handleAdded}
              subtracted={handleSubtracted}
              changed={(val) => handleChanged(Number(val))}
            />
            <CounterVal data={counter} />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
