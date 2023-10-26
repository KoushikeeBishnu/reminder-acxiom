// import './App.css';
// import Home from './TaskManager'

// function App() {

//   return (
//     <div className='app'>
//       <Home />
//     </div>
//   );
// }

// export default App;

import { useState } from 'react';
import Login from './Login';

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const[value,setValue]=useState('')
  const handleLogin = (userId) => {
    setLoggedInUser(userId);
  };

  const handleLogout = () => {
    setLoggedInUser(null);
  };

  return (
    
    
    <><Login/></>

    


  );
}

export default App;
