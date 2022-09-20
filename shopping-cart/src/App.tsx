import { useEffect, useState } from 'react';
import './App.css';

function App({ time, onFinish }: { time: number[]; onFinish?: () => void }) {
  const [preMinute, setPreMinute] = useState(time[0]);
  const [sufMinute, setSufMinute] = useState(time[1]);
  const [preSecond, setPreSecond] = useState(time[2]);
  const [sufSecond, setSufSecond] = useState(time[3]);
  const [timerId, setTimerId] = useState<any>();

  useEffect(() => {
    counter();
  }, []);
  const counter = () => {
    const timer = setInterval(() => {
      setSufSecond((prev) => prev - 1);
      console.log('loading...');
    }, 1000);
    setTimerId(timer);
  };
  if (sufSecond < 0) {
    setPreSecond((prev) => prev - 1);
    setSufSecond(9);
  }
  if (sufSecond < 0 && !preSecond) {
    setSufMinute((prev) => prev - 1);
    setPreSecond(5);
  }
  if (sufSecond < 0 && !preSecond && !sufMinute) {
    setPreMinute((prev) => prev - 1);
    setSufMinute(9);
  }
  let timer = preMinute + '.' + sufMinute + ' : ' + preSecond + '.' + sufSecond;
  const done = !sufSecond && !preSecond && !sufMinute && !preMinute;
  if (done) {
    timer = 'Well done';
    clearInterval(timerId);
    if (onFinish) {
      onFinish();
    }
  }

  return (
    <div className="app">
      <h1>NEW PROJECT</h1>
      <h1 style={{ fontSize: '50px' }}>{timer}</h1>
    </div>
  );
}

export default App;
