// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import { GoogleOAuthProvider } from '@react-oauth/google';

// ReactDOM.render(
//   <GoogleOAuthProvider clientId='433164282464-hlp597o0pe9hvgqsiognj6gn75omn168.apps.googleusercontent.com'>
//     <React.StrictMode>
//       <App />
//     </React.StrictMode>
//   </GoogleOAuthProvider>,
//   document.getElementById('root')
// );

import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <GoogleOAuthProvider clientId='433164282464-hlp597o0pe9hvgqsiognj6gn75omn168.apps.googleusercontent.com'>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </GoogleOAuthProvider>
);







