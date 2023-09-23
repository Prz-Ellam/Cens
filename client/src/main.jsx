import ReactDOM from 'react-dom/client';
import App from './App.jsx';
//import 'boxicons';
import 'boxicons/css/boxicons.min.css';
import './index.css';
import { BrowserRouter } from 'react-router-dom';

const $root = document.getElementById('root');
ReactDOM.createRoot($root).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
