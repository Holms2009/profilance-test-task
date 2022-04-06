import block from 'bem-cn';
import { useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.scss';

import { getActiveUser, getAuthStatus } from './App.slice';
import Header from '../Header/Header';
import NewsBlock from '../NewsBlock/NewsBlock';

const b = block('App');

function App() {
  const authStatus = useSelector(getAuthStatus);
  const activeUser = useSelector(getActiveUser);

  return (
    <div className={b()}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/*' element={
            <div className={b('main-content')}>
              <p className={b('greeting')}>
                {authStatus !== 'guest' ? `Привет, ${activeUser.name}!` : 'Привет, Гость!'}
              </p>
            </div>
          } />
          <Route path='/news' element={<NewsBlock />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
