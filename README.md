# Создать .env
Он находится по пути ```config/.env```. 

Пример: ```config/.env.example```
<table border='2'>
    <thread>
        <tr>
            <th>Значение</th>
            <th>Описание</th>
        </tr>
    <thread>
    <tbody>
        <tr>
            <td>DATABASE_URL (Использована postgresql supabase)</td>
            <td>Путь к бд</td>
        </tr>
        <tr>
            <td>PORT</td>
            <td>На каком порту будет запущен express</td>
        </tr>
        <tr>
            <td>JWT_KEY</td>
            <td>Любой ключ. Нужен для генерации токена, аутентификации</td>
        </tr>
    </tbody>
</table>


# Запуск
* ``` bash  
    npm i
    ```
* ```bash
    npm start
    ```

# Endpoints 

<table border="1">
  <thead>
    <tr>
      <th>Метод</th>
      <th>Эндпоинт</th>
      <th>Тело / Параметры</th>
      <th>Описание</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>POST</td>
      <td><code>/auth/registration</code></td>
      <td>
        <pre>
            <code>{"fio": "fio",
"email": "test@yandex.ru", 
"birthday": "2025.08.15",
"password": "password", 
"role" : "user"/"admin"}</code>
        </pre>
      </td>
      <td>Регистрация пользователя</td>
    </tr>
    <tr>
      <td>POST</td>
      <td><code>/auth/login</code></td>
      <td>
        <code>{"email": "tes1t@yandex.ru", "password": "1234"}</code>
      </td>
      <td>Получение JWT-токена</td>
    </tr>
    <tr>
      <td>POST</td>
      <td><code>/auth/ban</code></td>
      <td>
        Для админа: передать в тело <code>{"user_id": user_id}</code> 
      </td>
      <td>Блокировка пользователя</td>
    </tr>
    <tr>
      <td>POST</td>
      <td><code>/auth/unban</code></td>
      <td>
        Для админа: передать в тело <code>{"user_id": user_id}</code> 
      </td>
      <td>Разблокировка пользователя</td>
    </tr>
    <tr>
      <td>GET</td>
      <td><code>/auth/users</code></td>
      <td>
        <code>Authorization: Bearer JWT-токен</code><br><br>
        Для админа: передать в тело <code>{"user_id": user_id}</code> 
      </td>
      <td>Список пользователей</td>
    </tr>
    <tr>
      <td>GET</td>
      <td><code>/auth/user</code></td>
      <td>
        <code>Authorization: Bearer JWT-токен</code><br><br>
        Для админа: передать в тело <code>{"user_id": user_id}</code> 
      </td>
      <td>Получить пользователя по id</td>
    </tr>
  </tbody>
</table>
