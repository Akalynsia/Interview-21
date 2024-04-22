import { useState, useEffect } from "react";
import classNames from "classnames";
import { getCaptchaAnswer } from "./getCaptchaAnswer";

const Captcha = () => {
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [message, setMessage] = useState(null);

  const handleImageSelect = (number) => {
    setSelectedNumber(number);
  };

  const handleSubmit = () => {
    if (selectedNumber === correctAnswer) {
      setMessage(
        <div className="text-green-500">
          You passed the CAPTCHA test! Protected content: Gizli mesaj
        </div>
      );
    } else {
      setMessage(
        <div className="text-red-500">Incorrect answer, please try again.</div>
      );
    }
  };

  useEffect(() => {
    import("./getCaptchaAnswer").then(({ getCaptchaAnswer }) => {
      const randomAnswer = getCaptchaAnswer();
      setCorrectAnswer(randomAnswer);
    });
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.title = "Captcha Page";
    }
  }, []);

  return (
    <div className="mt-4">
      <h2>Please select the image containing the number {correctAnswer}</h2>
      <div className="grid grid-cols-3 gap-4 mt-4">
        {[1, 2, 3, 4, 5, 6].map((number) => (
          <img
            key={number}
            src={`/number_${number}.jpg`}
            alt={`Number ${number}`}
            className={classNames("cursor-pointer", "border border-blue-500", {
              "opacity-50":
                selectedNumber !== null && selectedNumber !== number,
              "border-blue-500": selectedNumber === number,
            })}
            style={{ width: "200px", height: "200px" }}
            onClick={() => handleImageSelect(number)}
          />
        ))}
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
        onClick={handleSubmit}
      >
        Submit
      </button>
      {message && <div className="mt-4">{message}</div>}
    </div>
  );
};

export default Captcha;
