import ReactDOM from 'react-dom';

import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './store/store';
import { BrowserRouter } from 'react-router-dom';


// TODO:
// Add an error page
// FIX !!! USE ONLY ASYNC/AWAIT FIX !!!
// FIX !!! WRAP ALL THE BACKEDNLESS CALLS IN TRY CATCH MAKE THE CODE THE SAME FIX !!!
ReactDOM.render(<BrowserRouter><Provider store={store}><App /></Provider></BrowserRouter>, document.getElementById('root'));
