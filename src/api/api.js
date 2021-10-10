// @ts-check
import axios from 'axios';

const { REACT_APP_SERVER_URL } = process.env;

/**
 * Так реализовали универсальный служебный метод
 * для запросов на сервер.
 * 
 * Благодаря @ts-check см. верх файла
 * те типы, которые прописаны в аннотациях
 * будут отслеживать поведение связаных объектов
 * а также IDE начнет чекать типы библиотек, в том числе
 * пространства @types/package-name 
 * @param {{
 *   url: string;
 *   method: 'POST' | 'PUT' | 'DELETE';
 *   data?: any;
 *   headers?: {
 *     [name: string]: string;
 *   };
 * }} args
 * 
 * @returns {Promise<any>}
    
 */
async function request(args) {
  const { url, method, data, headers } = args;
  new Promise((resolve, reject) => {
    axios
      .request({
        url,
        method,
        data,
        headers: headers
          ? headers
          : {
              'Content-Type': 'application/json',
            },
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((e) => {
        if (e.response) {
          console.error();
          resolve(e.response.data);
        } else {
          reject(e.message);
        }
      });
  });
}

/**
 * Это ассинхронный метод запроса пользователя по параметрам
 * переданым при вызове.
 *
 *  Ставим any потому что без TS мы тут все равно не сможем передать
 * генерик из типов печатаемых параметров в функцию, чтобы IDE  в живую их чекала
 * как в api/api.ts
 * @param {any} args
 * @returns {Promise<any>}
 */
export async function userFindFirst(args) {
  return await request({
    url: `${REACT_APP_SERVER_URL}/api/v1/user/findfirst`,
    method: 'POST',
    data: args,
  });
}
