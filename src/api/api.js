/******************************************************************************************
 * Repository: https://github.com/kolserdav/api-prisma
 * Author: Sergey Kolmiller
 * Email: <uyem.ru@gmail.com>
 * License: Proprietary and confidential
 * License Text: Unauthorized copying of this file, via any medium is strictly prohibited
 * Copyright: kolserdav (c), All rights reserved
 * Create date: Wed Oct 13 2021 08:53:38 GMT+0700 (Krasnoyarsk Standard Time)
******************************************************************************************/
// @ts-check
import axios from 'axios';

// Из файла .env
const { REACT_APP_SERVER_URL, REACT_APP_SERVER_LOCAL_URL } = process.env;

// process.env.NODE_ENV - из консоли при запуске yarn dev:start

// const apiUrl = process.env.NODE_ENV === 'development' ? REACT_APP_SERVER_LOCAL_URL : REACT_APP_SERVER_URL;
const apiUrl = REACT_APP_SERVER_URL;

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
  return new Promise((resolve, reject) => {
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
    url: `${apiUrl}/api/v1/user/findfirst`,
    method: 'POST',
    data: { args },
  });
}


/**
 * Добавить пользователя
 * @param {any} args
 * @returns {Promise<any>}
 */
 export async function create(args) {
  return await request({
    url: `${apiUrl}/api/v1/user/create`,
    method: 'POST',
    data: { args },
  });
}