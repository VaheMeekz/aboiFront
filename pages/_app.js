import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { useRouter } from "next/router";
import "../styles/globals.css";
import thunk from "redux-thunk";
import { createStore, compose, applyMiddleware } from "redux";
import { rootReducer } from "../src/redux/rootReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import "bootstrap/dist/css/bootstrap.min.css";
import { CartProvider } from "react-use-cart";
import { appWithTranslation } from "next-i18next";
import {BrowserRouter} from "react-router-dom";

const store = createStore(
  rootReducer,

  composeWithDevTools(
    applyMiddleware(thunk)
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  return (
    <Provider store={store}>
      <CartProvider>
            <Component {...pageProps} />
      </CartProvider>
    </Provider>
  );
}

export default appWithTranslation(MyApp);
