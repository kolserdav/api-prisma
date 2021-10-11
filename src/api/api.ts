/**
 * Этот файл поставляется разработчиком бекенда
 * его менять на фронте нужно только после добавления 
 * новых api методов
 */
import { Prisma, PrismaPromise, User, PrismaClient } from './prisma';
import axios from 'axios';

const { REACT_APP_SERVER_URL } = process.env;

const prisma = new PrismaClient();

export type Status = 'error' | 'warning' | 'success';

export interface Result<T> {
  status: Status;
  message: string;
  data: null | T;
  stdErrMessage?: string;
  code?: number;
  token?: string;
}

interface Request {
  url: string;
  method: 'POST' | 'PUT' | 'DELETE'; // Метод GET будем использовать только там где будет открываться из браузера по прямому урл
  data?: any;
  headers?: {
    [name: string]: string;
  };
}

/**
 * @param {Request} args
 * 
 * @returns {Promise<any>}
    
 */
async function request(args: Request): Promise<any> {
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
 * Получить одного пользователя
 * @param args
 * @returns
 */
export async function userFindFirst<T extends Prisma.UserFindFirstArgs>(
  args: Prisma.SelectSubset<T, Prisma.UserFindFirstArgs>
): Promise<
  Prisma.CheckSelect<T, Result<User | null>, PrismaPromise<Result<Prisma.UserGetPayload<T>>>>
> {
  let result;
  result = await request({
    url: `${REACT_APP_SERVER_URL}/api/v1/user/findfirst`,
    method: 'POST',
    data: args,
  });
  return result;
}

/**
 * Добавить одного пользователя
 * @param args
 * @returns
 */
 export async function create<T extends Prisma.UserCreateArgs>(
  args: Prisma.SelectSubset<T, Prisma.UserCreateArgs>
): Promise<
  Prisma.CheckSelect<T, Result<User | null>, PrismaPromise<Result<Prisma.UserGetPayload<T>>>>
> {
  let result;
  result = await request({
    url: `${REACT_APP_SERVER_URL}/api/v1/user/create`,
    method: 'POST',
    data: args,
  });
  return result;
}

// ПЕСОЧНИЦА здесь работает так, как должно было бы работать 
(async () => {
  const user = await userFindFirst({
    where: {
      name: {
        endsWith: '2'
      },
    },
    select: {
      name: true,
      id: true
    }
  });
  const createRes = await create({
    data: {
      name: 'User 1',
      role: 'admin',
      email: 'test@test.test'
    }
  });
  console.log(user, createRes)
})();
