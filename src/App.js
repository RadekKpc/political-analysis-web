import React from "react";
import './App.css';
import AppHeader from './components/AppHeader/AppHeader';
import MainPage from './views/MainPage/MainPage';

function App() {

  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  return (
    <div>
      <AppHeader />
      <MainPage />
      <p>
        {!data ? "Loading..." : data}
      </p>
    </div>
  );
}

export default App;
