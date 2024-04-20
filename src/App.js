import React, { useState, useEffect } from "react";
import { BrowserRouter, Link, Routes, Route, Navigate } from "react-router-dom";
import classNames from "classnames";

function App() {
  // KODUNUZ BURAYA GELECEK
  return (
    <BrowserRouter>
      <div className="container mx-auto p-4">
        <nav className="mb-4">
          <ul className="flex space-x-4">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/protectedPage">Protected Page</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/protectedPage" element={<ProtectedPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

const Home = () => {
  // KODUNUZ BURAYA GELECEK
  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <Link to="/protectedPage">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
          Go to Protected Page
        </button>
      </Link>
    </div>
  );
};

const ProtectedPage = () => {
  //  KODUNUZ BURAYA GELECEK
  return (
    <div>
      <h1>Protected Page</h1>
      <Captcha />
    </div>
  );
};

const Captcha = () => {
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [message, setMessage] = useState(null);

  const generateRandomNumber = () => {
    return Math.floor(Math.random() * 6) + 1;
  };

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
  if (typeof document !== "undefined") {
    useEffect(() => {
      setCorrectAnswer(generateRandomNumber());
    }, []);
  }

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

export default App;
