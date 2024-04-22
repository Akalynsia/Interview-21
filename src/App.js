import React, { useState, useEffect, lazy, Suspense } from "react";
import { BrowserRouter, Link, Routes, Route, Navigate } from "react-router-dom";

function App() {
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
  const [showCaptcha, setShowCaptcha] = useState(false);

  useEffect(() => {
    setShowCaptcha(true);
  }, []);

  return (
    <div>
      <h1>Protected Page</h1>
      <Suspense fallback={<div>Loading...</div>}>
        {showCaptcha && <LazyCaptchaAnswer />}
      </Suspense>
    </div>
  );
};

const LazyCaptchaAnswer = lazy(() => import("./Captcha"));

export default App;
