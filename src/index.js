import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { store } from './app/store';
import { Provider as ReduxProvider } from 'react-redux';
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { ChatProvider } from './Context/ChatProvider';
const theme = extendTheme({
    styles: { 
      global: () => ({
        body: {
          bg: ""
        }
      })
    }
  });

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ChakraProvider theme={theme} resetCSS={false}>
      <ReduxProvider store={store}>
        <ChatProvider>
            <App />
        </ChatProvider>
      </ReduxProvider> 
    </ChakraProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
