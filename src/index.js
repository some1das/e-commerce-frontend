import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './Routes'
import App from './App';
import routes from './Routes';
import { CartContextProvider } from "./context/CartContext"

ReactDOM.render(
  <CartContextProvider>
    <Routes />
  </CartContextProvider>

  ,
  document.getElementById('root')
);


