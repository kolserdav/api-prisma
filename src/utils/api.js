// @ts-check
import axios from 'axios';

import { Prisma, PrismaPromise, User, PrismaClient } from '../api/prisma';

import { Result } from '../api/api';

// Из файла .env
// eslint-disable-next-line no-unused-vars
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
 * @template T
 * @param {Prisma.UserFindFirstArgs} args Даже ести типы хорошо здесь прописаны, но мы не можем прописать сюда T extends Prisma.UserFindFirstArgs, поэтому типы не передаются ...
 * @returns {Promise<Prisma.CheckSelect<T, Result<User | null>, PrismaPromise<Result<Prisma.UserGetPayload<T>>>>>}
 */
export const userFindFirst = async (args) => {
  return await request({
    url: `${apiUrl}/api/v1/user/findfirst`,
    method: 'POST',
    data: { args },
  });
}
/**
 * ... отсюда и в рассчет типов результата, поэтому в .js тип возврата будет всегда содержать 
 * только полную схему модели (не учитывая селекторы), и в дефолтной настройке (не будет выводить типы связанных объектов модели,
 * которые были запрошены при передаче параметров)
 * Здесь при вызове мы всё равно никак не можем передать тип
 */
const res = userFindFirst({})
res.then(d => {
  console.log('Api console', d);
})

/**
 * Добавить пользователя
 * @param {any} args
 * @returns {Promise<any>}
 */
 export async function userCreate(args) {
  return await request({
    url: `${apiUrl}/api/v1/user/create`,
    method: 'POST',
    data: { args },
  });
}