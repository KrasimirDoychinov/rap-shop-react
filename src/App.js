import Backendless from 'backendless';
import Register from './pages/Register';

const APP_ID = '95DD6575-7321-470D-9574-05E6A27ADA04';
const API_KEY = '2AB164E3-2144-46CF-A945-46D3532B602A';
Backendless.serverURL = 'https://eu-api.backendless.com';
Backendless.initApp(APP_ID, API_KEY);



function App() {
  (async () => {
    let currUser = await Backendless.UserService.getCurrentUser();
    console.log(currUser);
    console.log('LOGGED IN USER');
  })();

  return (
    <div>
      <Register />
    </div>
  );
}

export default App;
