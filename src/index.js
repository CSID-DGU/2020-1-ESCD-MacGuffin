import React from 'react';
import ReactDOM from 'react-dom';
<<<<<<< HEAD
import Root from './Root';
import * as serviceWorker from './serviceWorker';
import './index.css';
import configureStore from 'redux/configureStore';

const store = configureStore();


const port = process.env.PORT || 4000; // PORT 값이 설정되어있지 않다면 4000 을 사용합니다.

ReactDOM.render(<Root store={store}/>, document.getElementById('root'));
=======
import App from './App';
import * as serviceWorker from './serviceWorker';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
>>>>>>> fd587dd06db4c37c83e0c7c204522cba3bb019de

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
<<<<<<< HEAD
serviceWorker.register();
=======
serviceWorker.unregister();
>>>>>>> fd587dd06db4c37c83e0c7c204522cba3bb019de
