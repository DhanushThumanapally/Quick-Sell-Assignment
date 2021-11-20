import React, { useEffect, useState } from "react";

function Counter({
  counterValue,
  saving,
  maxValue,
  added,
  subtracted,
  changed,
}) {
  const [addDisabled, setAddDisabled] = useState(false);

  useEffect(() => {
    if (counterValue >= maxValue) setAddDisabled(true);
    else setAddDisabled(false);
  }, [counterValue, maxValue]);

  const handleChange = (e) => {
    if (Number(e.target.value) > maxValue) return;
    changed(e.target.value);
  };

  const handleSubtraction = () => {
    subtracted();
  };

  const handleAddition = () => {
    if (counterValue >= maxValue) {
      return;
    }
    added();
  };

  return (
    <div>
      {saving ? (
        <div className="saving">
          {" "}
          <div class="lds-ring preloader-custom">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>{" "}
          Saving counter value
        </div>
      ) : (
        <div className="saving" style={{ color: "white" }}>
          .
        </div>
      )}
      <button className="button-subtract" onClick={handleSubtraction}>
        <em>-</em>
      </button>
      <input
        className="input-custom"
        type="number"
        value={counterValue}
        onChange={handleChange}
      />
      <button
        className={addDisabled ? "button-add-disabled" : "button-add"}
        onClick={handleAddition}
      >
        <em>+</em>
      </button>
    </div>
  );
}

export default Counter;
