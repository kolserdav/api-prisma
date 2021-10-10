import { useEffect } from 'react';
import './App.css';
import * as api from './api/api';

function App(args) {
  useEffect(() => {
    (async () => {
      console.log(1)
      const createRes = await api.create({
        data: {
          name: 'User 8',
          role: 'admin',
          email: 'test8@test.test'
        }
      });
      /**
       * Учитывая что это не tsx файл то чтобы проверить типы
       * нужно вызвать исходник userFindFirst в низу api/api.ts
       */
      const result = await api.userFindFirst({
        where: {
          role: 'admin',
        },
        select: {
          name: true,
          id: true
        }
      });
      console.log('userFindFirst-result', result);
      console.log('createUser-result', createRes);
    })()
  }, []);
  return (
    <div className="App">
      <header className="App-header"></header>
    </div>
  );
}

export default App;
