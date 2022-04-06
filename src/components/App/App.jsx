import block from 'bem-cn';

import './App.scss';

import Header from '../Header/Header';

const b = block('App');

function App() {
  return (
    <div className={b()}>
      <Header />
    </div>
  );
}

export default App;
