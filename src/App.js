import React, { useEffect, useState } from "react";
import "./App.css";

import data from "./quotes/preguntas";

const App = () => {
  return (
    <div className="App">
      <Quote />
    </div>
  );
};

const randomQuestion = (dataList = [], prev) => {
  const randomQuote = dataList[Math.floor(Math.random() * dataList.length)];
  if (prev && randomQuote.question === prev.question)
    return dataList[Math.floor(Math.random() * dataList.length)];
  return randomQuote;
};

const addUniqueValue = (array, value) => {
  if (array.indexOf(value) === -1) return [...array, value];
  return array;
};

const Quote = () => {
  const categories = data.reduce(
    (acc, e) => addUniqueValue(acc, e.category),
    []
  );

  const [hint, setHint] = useState(false);

  const [state, setState] = useState({
    question: randomQuestion(data),
    ...categories.reduce((acc, e) => ({ ...acc, [e]: true }), {}),
  });

  const handleChange = () => {
    setHint(false);
    setState((prev) => ({
      ...prev,
      question: randomQuestion(
        data.filter((e) => state[e.category]),
        state.question
      ),
    }));
  };
  const HandleHint = () => {
    setHint((prev) => !prev);
  };

  const handleCheckbox = (e) => {
    setState((prev) => ({
      ...prev,
      [e]: !prev[e],
    }));
  };

  useEffect(() => {
    console.log(state[state.question.category])
    if (!state[state.question.category]){
      handleChange()
    }
  }, [state])

  return (
    <>
      <div className="category__container">
        {categories.map((e) => {
          return (
            <label key={e}>
              {e}
              <input
                className="category__input"
                type="checkbox"
                onChange={() => handleCheckbox(e)}
                checked={state[e]}
              />
            </label>
          );
        })}
      </div>
      <div className="quote">
        {state.question ? (
          <>
            <h1 className="text">Pregunta de: {state.question.category}</h1>
            <h3 className="text">{state.question.question}</h3>
            {hint && <p>{state.question.hint}</p>}
          </>
        ) : (
          <h1 className="text">No hay preguntas u.u</h1>
        )}
        <div className="btns">
          <button
            className="btn-next"
            disabled={data.filter((e) => state[e.category]).length < 2}
            onClick={handleChange}
          >
            Siguiente
          </button>
          {state.question && state.question.hint && (
            <button className="btn-next" onClick={HandleHint}>
              Pista
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default App;
