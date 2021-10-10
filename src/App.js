import { useEffect } from 'react';
import './App.css';
import * as utils from './api/api';

function App(args) {
  useEffect(() => {
    /**
     * Учитывая что это не tsx файл то чтобы проверить типы
     * нужно вызвать исходник userFindFirst в низу api/api.ts
     */
    utils.userFindFirst();
  }, []);
  return (
    <div className="App">
      <header className="App-header"></header>
    </div>
  );
}

export default App;
