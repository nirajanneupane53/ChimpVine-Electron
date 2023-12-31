import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

import Home from './screens/Home/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Subject from './screens/subject/Subject';
import Content from './screens/content/Content';
import Close from './components/Close';
import Subscription from './screens/content/Subscription';
import Login from './screens/Login/Login';
import Quiz from './quiz/Quiz';
import WelcomeUser from './components/WelcomeUser';
// import SearchBar from './components/SearchBar';
// import Search from './components/Search';

function Main() {
  const [date, setDate] = useState<any>();
  const [showPageTwo, setShowPageTwo] = useState(false);

  useEffect(() => {
    window.electron.ipcRenderer.sendMessage('date-data');

    window.electron.ipcRenderer.once('date-data', async (arg: any) => {
      // eslint-disable-next-line no-console
      const data = await arg;
      // console.log(data);
      setDate(data);

      const certainDateObj = new Date(data);

      const currentDate = new Date();
      // console.log(currentDate);
      if (currentDate > certainDateObj) {
        setShowPageTwo(true);
      }
      // consloe.log(certainDateObj);
      // setDate(certainDateObj);
    });
  }, []);
  console.log(showPageTwo);

  return (
    <div className="container ">
      <div style={{ position: 'absolute', right: '2%', top: '-2%' }}>
        <Close />
      </div>
      <div style={{ position: 'absolute', left: '5%', top: '-1%' }}>
        <WelcomeUser />
      </div>

      <div className="text-center my-5">
        <img
          src={require('../../assets/images/logo.png')}
          alt="Logo"
          width="50%"
        />
      </div>

      <div> {showPageTwo ? <Subscription /> : <Home />}</div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<Main />} /> */}
        <Route path="/" element={<Login />} />
        <Route path="/main" element={<Main />} />
        <Route path="/subject/:subID" element={<Subject />} />
        <Route path="/subject/:subID/:contentID" element={<Content />} />
        <Route path="/startquiz/:quizlink" element={<Quiz />} />
      </Routes>
    </Router>
  );
}
