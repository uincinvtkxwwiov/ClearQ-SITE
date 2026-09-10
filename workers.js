const SUBSCRIPTION_SECRET = 'secretclear';
const MAX_REQUESTS_PER_LINK = 1;
const MAX_USERS = 30;

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;

    if (path === '/admin') {
      if (request.method === 'GET') {
        const list = await env.DB.list();
        let userList = '<h3>Активные пользователи:</h3><ul>';
        let activeCount = 0;
        const now = Date.now();
        for (const key of list.keys) {
          const data = await env.DB.get(key.name, 'json');
          if (!data) continue;
          if (now < data.expires) {
            const daysLeft = Math.ceil((data.expires - now) / (1000 * 60 * 60 * 24));
            userList += '<li>' + key.name + ' — осталось ' + daysLeft + ' дн. (' + (data.used || 0) + '/' + (data.maxUses || MAX_REQUESTS_PER_LINK) + ')</li>';
            activeCount++;
          }
        }
        userList += '</ul><p>Всего: ' + activeCount + ' из ' + MAX_USERS + '</p>';

        return new Response(`
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>VPN Admin</title>
          </head>
          <body style="font-family:Arial;padding:15px;max-width:500px;margin:0 auto;">
            <h2>Управление подписками</h2>
            ${userList}
            <hr>
            <h3>Выдать подписку</h3>
            <form method="POST">
              <label>ID пользователя:</label>
              <input name="user_id" value="user1" required style="width:100%;padding:10px;font-size:16px;margin:5px 0;">
              <label>Дней подписки:</label>
              <input name="days" value="30" type="number" required style="width:100%;padding:10px;font-size:16px;margin:5px 0;">
              <label>Лимит запросов:</label>
              <input name="max_uses" value="5" type="number" required style="width:100%;padding:10px;font-size:16px;margin:5px 0;">
              <button type="submit" style="width:100%;padding:15px;font-size:18px;background:#4CAF50;color:white;border:none;margin:10px 0;">Выдать</button>
            </form>
            <hr>
            <p><b>Ссылка для клиента:</b></p>
            <code style="background:#f4f4f4;padding:10px;display:block;word-break:break-all;">${url.origin}/sub/${SUBSCRIPTION_SECRET}?id=ИМЯ</code>
          </body>
          </html>
        `, { headers: { 'Content-Type': 'text/html; charset=UTF-8' } });
      }

      if (request.method === 'POST') {
        const form = await request.formData();
        const userId = form.get('user_id');
        const days = parseInt(form.get('days'));
        const maxUses = parseInt(form.get('max_uses')) || MAX_REQUESTS_PER_LINK;

        if (!userId || !days) {
          return new Response('Заполните все поля!', { status: 400 });
        }

        const existing = await env.DB.get(userId, 'json');
        if (!existing) {
          const list = await env.DB.list();
          let activeCount = 0;
          const now = Date.now();
          for (const key of list.keys) {
            const d = await env.DB.get(key.name, 'json');
            if (d && now < d.expires) activeCount++;
          }
          if (activeCount >= MAX_USERS) {
            return new Response('Лимит ' + MAX_USERS + ' пользователей', { status: 403 });
          }
        }

        const expires = Date.now() + (days * 24 * 60 * 60 * 1000);
        const data = {
          expires: expires,
          maxUses: maxUses,
          used: existing ? (existing.used || 0) : 0
        };

        await env.DB.put(userId, JSON.stringify(data));

        return new Response(`
          <!DOCTYPE html>
          <html>
          <head><meta charset="UTF-8"><title>Готово</title></head>
          <body style="font-family:Arial;padding:20px;text-align:center;">
            <h2>Подписка выдана!</h2>
            <p>${userId} до ${new Date(expires).toLocaleDateString('ru-RU')}</p>
            <p>Лимит запросов: ${maxUses}</p>
            <a href="/admin">Назад</a>
          </body>
          </html>
        `, { headers: { 'Content-Type': 'text/html; charset=UTF-8' } });
      }
    }

    if (path === '/sub/' + SUBSCRIPTION_SECRET) {
      const userId = url.searchParams.get('id');
      if (!userId) return new Response('Not Found', { status: 404 });

      const data = await env.DB.get(userId, 'json');
      if (!data) return new Response('Not Found', { status: 404 });

      if (Date.now() > data.expires) return new Response('Not Found', { status: 404 });
      if (data.used >= data.maxUses) return new Response('Not Found', { status: 404 });

      data.used = (data.used || 0) + 1;
      await env.DB.put(userId, JSON.stringify(data));

      const vlessConfigs = [
        'vless://UUID@server1.com:443?encryption=none&security=tls&sni=server1.com&type=ws&host=server1.com&path=%2Fws#Server1',
        'vless://UUID@server2.com:443?encryption=none&security=tls&sni=server2.com&type=ws&host=server2.com&path=%2Fws#Server2'
      ];

      const configText = vlessConfigs.join('\n');
      const encoded = btoa(unescape(encodeURIComponent(configText)));

      return new Response(encoded, {
        headers: { 'Content-Type': 'text/plain; charset=UTF-8', 'Cache-Control': 'no-cache' }
      });
    }

    return new Response(`
      <!DOCTYPE html>
      <html>
      <head><meta charset="UTF-8"><title>404</title></head>
      <body style="font-family:Arial;text-align:center;padding:80px 20px;">
        <h1 style="font-size:72px;color:#ccc;margin:0;">404</h1>
        <p style="color:#999;">Page Not Found</p>
      </body>
      </html>
    `, { status: 404, headers: { 'Content-Type': 'text/html; charset=UTF-8' } });
  }
};
