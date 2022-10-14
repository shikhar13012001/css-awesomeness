import React from 'react';
import './App.css';
import Routes from './routes';
import AuthContext from './context/AuthContext';
import { fetchUser } from './api/user';
function App() {
  const [auth, setAuth] = React.useState(null);
  React.useEffect(() => {
    const fetchData = async () => {
      // if (!!localStorage.getItem('token')) return;
      const data = await fetchUser();
      console.log(data);
      if (!data.msg) {
        return;
      }
      const { fullname: username, email } = data.msg;
      setAuth({
        username,
        email,
      });
    };
    fetchData();
  }, []);
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      <React.Fragment>
        <Routes />
      </React.Fragment>
    </AuthContext.Provider>
  );
}

export default App;
