const SUBSCRIPTION_SECRET = 'clearqsite';
const MAX_USERS = 30;
const ADMIN_PASSWORD = 'bybachkyl';

const DEFAULT_NAME = '✨ClearQ VPN PRO';
const DEFAULT_ANNOUNCE = 'PRO Подписка активна. Приятного использования!';
const DEFAULT_SUPPORT = 'https://t.me/ClearQ';

const STYLE = `
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body {
    font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background: #0a0a0f;
    background-image:
      radial-gradient(ellipse 80% 50% at 50% -20%, rgba(120, 0, 255, 0.3), transparent),
      radial-gradient(ellipse 60% 40% at 100% 100%, rgba(0, 200, 255, 0.15), transparent),
      radial-gradient(ellipse 60% 40% at 0% 100%, rgba(255, 0, 150, 0.15), transparent);
    background-attachment: fixed;
    min-height: 100vh;
    color: #e5e5e5;
    padding: 24px 16px 60px;
    -webkit-font-smoothing: antialiased;
  }
  .container { max-width: 560px; margin: 0 auto; }

  .header {
    text-align: center;
    margin-bottom: 28px;
    padding: 32px 24px;
    background: linear-gradient(145deg, rgba(20, 20, 35, 0.9), rgba(10, 10, 20, 0.9));
    border-radius: 24px;
    border: 1px solid rgba(168, 85, 247, 0.2);
    backdrop-filter: blur(20px);
    position: relative;
    overflow: hidden;
    box-shadow: 0 0 40px rgba(168, 85, 247, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.05);
  }
  .header::before {
    content: '';
    position: absolute;
    top: -50%; left: -50%;
    width: 200%; height: 200%;
    background: conic-gradient(from 0deg, transparent, rgba(168, 85, 247, 0.1), transparent);
    animation: rotate 8s linear infinite;
  }
  @keyframes rotate { to { transform: rotate(360deg); } }
  .header .logo {
    font-size: 48px;
    margin-bottom: 12px;
    position: relative; z-index: 1;
    filter: drop-shadow(0 0 20px rgba(168, 85, 247, 0.6));
  }
  .header h1 {
    font-size: 28px;
    font-weight: 800;
    background: linear-gradient(90deg, #a855f7, #6366f1, #06b6d4, #a855f7);
    background-size: 300% 100%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: shimmer 4s ease-in-out infinite;
    position: relative; z-index: 1;
    letter-spacing: -0.5px;
  }
  @keyframes shimmer {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }
  .header p {
    color: #888;
    font-size: 13px;
    position: relative; z-index: 1;
    margin-top: 6px;
    letter-spacing: 1px;
    text-transform: uppercase;
  }

  .card {
    background: linear-gradient(145deg, rgba(20, 20, 35, 0.8), rgba(10, 10, 20, 0.8));
    border-radius: 20px;
    padding: 22px;
    margin-bottom: 18px;
    border: 1px solid rgba(99, 102, 241, 0.15);
    backdrop-filter: blur(20px);
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.04);
    transition: border-color 0.3s, box-shadow 0.3s;
  }
  .card:hover {
    border-color: rgba(168, 85, 247, 0.3);
    box-shadow: 0 4px 32px rgba(168, 85, 247, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.06);
  }
  .card h3 {
    font-size: 13px;
    color: #a855f7;
    margin-bottom: 18px;
    display: flex;
    align-items: center;
    gap: 10px;
    text-transform: uppercase;
    letter-spacing: 2px;
    font-weight: 700;
    text-shadow: 0 0 12px rgba(168, 85, 247, 0.5);
  }
  .card h3::after {
    content: '';
    flex: 1;
    height: 1px;
    background: linear-gradient(90deg, rgba(168, 85, 247, 0.3), transparent);
    margin-left: 10px;
  }

  .user-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 14px 16px;
    background: linear-gradient(90deg, rgba(99, 102, 241, 0.08), rgba(99, 102, 241, 0.02));
    border-radius: 12px;
    margin-bottom: 8px;
    border-left: 3px solid;
    border-image: linear-gradient(180deg, #a855f7, #6366f1, #06b6d4) 1;
    font-size: 14px;
    transition: all 0.2s;
  }
  .user-item:active { background: rgba(99, 102, 241, 0.15); transform: scale(0.98); }
  .user-item .name { font-weight: 700; color: #fff; text-shadow: 0 0 10px rgba(168, 85, 247, 0.3); }
  .user-item .days {
    color: #a5b4fc;
    font-size: 12px;
    margin-left: 10px;
    padding: 3px 8px;
    background: rgba(99, 102, 241, 0.15);
    border-radius: 6px;
  }
  .delete-btn {
    color: #ff6b6b;
    text-decoration: none;
    padding: 6px 12px;
    border-radius: 8px;
    background: rgba(255, 107, 107, 0.1);
    border: 1px solid rgba(255, 107, 107, 0.2);
    font-size: 15px;
    transition: all 0.2s;
  }
  .delete-btn:active { background: rgba(255, 107, 107, 0.3); box-shadow: 0 0 20px rgba(255, 107, 107, 0.4); }

  .stats {
    text-align: center;
    padding: 14px;
    background: linear-gradient(90deg, rgba(168, 85, 247, 0.1), rgba(99, 102, 241, 0.1), rgba(6, 182, 212, 0.1));
    border-radius: 12px;
    margin-top: 12px;
    font-size: 14px;
    color: #c4b5fd;
    font-weight: 600;
    border: 1px solid rgba(168, 85, 247, 0.15);
    text-shadow: 0 0 10px rgba(168, 85, 247, 0.3);
  }

  label {
    display: block;
    font-size: 12px;
    color: #a855f7;
    margin: 16px 0 8px;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    font-weight: 600;
    text-shadow: 0 0 8px rgba(168, 85, 247, 0.3);
  }

  input, textarea {
    width: 100%;
    padding: 14px 16px;
    font-size: 15px;
    background: rgba(0, 0, 0, 0.4);
    border: 1px solid rgba(99, 102, 241, 0.2);
    border-radius: 12px;
    color: #fff;
    font-family: inherit;
    outline: none;
    transition: all 0.3s;
    box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.3);
  }
  input:focus, textarea:focus {
    border-color: #a855f7;
    box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.3), 0 0 0 4px rgba(168, 85, 247, 0.15), 0 0 20px rgba(168, 85, 247, 0.3);
  }

  .configs-textarea {
    white-space: pre;
    overflow-x: auto;
    overflow-y: auto;
    word-wrap: normal;
    word-break: normal;
    min-height: 400px;
    max-height: 600px;
    font-family: 'Courier New', monospace;
    font-size: 13px;
    line-height: 1.6;
    -webkit-overflow-scrolling: touch;
    resize: vertical;
  }
  .configs-textarea::-webkit-scrollbar { height: 10px; width: 10px; }
  .configs-textarea::-webkit-scrollbar-track { background: rgba(0,0,0,0.3); border-radius: 5px; }
  .configs-textarea::-webkit-scrollbar-thumb {
    background: linear-gradient(90deg, #a855f7, #6366f1);
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(168, 85, 247, 0.5);
  }

  button {
    width: 100%;
    padding: 16px;
    font-size: 15px;
    font-weight: 700;
    border: none;
    border-radius: 12px;
    cursor: pointer;
    margin-top: 18px;
    transition: all 0.2s;
    color: #fff;
    text-transform: uppercase;
    letter-spacing: 1px;
    position: relative;
    overflow: hidden;
  }
  button::before {
    content: '';
    position: absolute;
    top: 0; left: -100%;
    width: 100%; height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    transition: left 0.5s;
  }
  button:active { transform: scale(0.97); }
  button:active::before { left: 100%; }

  .btn-purple { background: linear-gradient(135deg, #a855f7, #6366f1); box-shadow: 0 0 20px rgba(168, 85, 247, 0.4), inset 0 1px 0 rgba(255,255,255,0.2); }
  .btn-blue { background: linear-gradient(135deg, #3b82f6, #06b6d4); box-shadow: 0 0 20px rgba(59, 130, 246, 0.4), inset 0 1px 0 rgba(255,255,255,0.2); }
  .btn-green { background: linear-gradient(135deg, #10b981, #22c55e); box-shadow: 0 0 20px rgba(16, 185, 129, 0.4), inset 0 1px 0 rgba(255,255,255,0.2); }
  .btn-red { background: linear-gradient(135deg, #ef4444, #f43f5e); box-shadow: 0 0 20px rgba(239, 68, 68, 0.4), inset 0 1px 0 rgba(255,255,255,0.2); }

  .link-box {
    background: rgba(0, 0, 0, 0.4);
    padding: 14px;
    border-radius: 12px;
    font-family: 'Courier New', monospace;
    font-size: 12px;
    word-break: break-all;
    color: #67e8f9;
    border: 1px dashed rgba(6, 182, 212, 0.4);
    box-shadow: inset 0 0 20px rgba(6, 182, 212, 0.1);
    text-shadow: 0 0 8px rgba(6, 182, 212, 0.5);
  }

  .info-row {
    display: flex;
    justify-content: space-between;
    padding: 14px 0;
    border-bottom: 1px solid rgba(168, 85, 247, 0.1);
    font-size: 14px;
  }
  .info-row:last-child { border-bottom: none; }
  .info-row .label { color: #888; }
  .info-row .value { color: #fff; font-weight: 700; text-shadow: 0 0 10px rgba(168, 85, 247, 0.3); }

  .progress-bar {
    height: 10px;
    background: rgba(0, 0, 0, 0.4);
    border-radius: 5px;
    overflow: hidden;
    margin-top: 14px;
    box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.5);
  }
  .progress-fill {
    height: 100%;
    background: linear-gradient(90deg, #a855f7, #6366f1, #06b6d4);
    background-size: 200% 100%;
    animation: shimmer 2s linear infinite;
    box-shadow: 0 0 20px rgba(168, 85, 247, 0.6);
    transition: width 0.5s;
  }

  .status-active { color: #22c55e; text-shadow: 0 0 12px rgba(34, 197, 94, 0.6); }
  .status-expired { color: #ef4444; text-shadow: 0 0 12px rgba(239, 68, 68, 0.6); }

  .connect-btn {
    display: block;
    text-align: center;
    padding: 18px;
    margin-top: 18px;
    background: linear-gradient(135deg, #a855f7, #6366f1, #06b6d4);
    background-size: 200% 200%;
    animation: gradientMove 3s ease infinite;
    color: #fff;
    text-decoration: none;
    border-radius: 14px;
    font-weight: 800;
    font-size: 16px;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    box-shadow: 0 0 40px rgba(168, 85, 247, 0.6), inset 0 1px 0 rgba(255,255,255,0.3);
    border: none;
    cursor: pointer;
    width: 100%;
  }
  @keyframes gradientMove {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }

  .support-btn {
    display: block;
    text-align: center;
    padding: 16px;
    margin-top: 12px;
    background: rgba(99, 102, 241, 0.15);
    border: 1px solid rgba(99, 102, 241, 0.3);
    color: #a5b4fc;
    text-decoration: none;
    border-radius: 12px;
    font-weight: 700;
    font-size: 14px;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .hint {
    color: #666;
    font-size: 11px;
    margin-top: 6px;
    text-align: right;
    letter-spacing: 0.5px;
  }

  .login-box {
    max-width: 400px;
    margin: 80px auto;
  }

  .toast {
    position: fixed;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%) translateY(100px);
    background: linear-gradient(135deg, #10b981, #22c55e);
    color: #fff;
    padding: 14px 24px;
    border-radius: 12px;
    font-size: 14px;
    font-weight: 600;
    box-shadow: 0 10px 40px rgba(16,185,129,0.6);
    opacity: 0;
    transition: all 0.3s;
    z-index: 9999;
  }
  .toast.show { opacity: 1; transform: translateX(-50%) translateY(0); }
`;

const TOAST_SCRIPT = `
  function showToast(text) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = text;
    toast.classList.add('show');
    setTimeout(function() { toast.classList.remove('show'); }, 2200);
  }
  function copyText(text, label) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(function() {
        showToast('📋 ' + (label || 'Скопировано'));
      }).catch(function() {
        fallbackCopy(text, label);
      });
    } else {
      fallbackCopy(text, label);
    }
  }
  function fallbackCopy(text, label) {
    const el = document.createElement('textarea');
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    showToast('📋 ' + (label || 'Скопировано'));
  }
  function copyUserLink(userId) {
    const link = window.location.origin + '/sub/' + '${SUBSCRIPTION_SECRET}' + '?id=' + userId;
    copyText(link, 'Ссылка для ' + userId);
  }
`;

function isVpnClient(request) {
  const ua = (request.headers.get('User-Agent') || '').toLowerCase();
  const accept = (request.headers.get('Accept') || '').toLowerCase();
  if (accept.includes('text/html')) return false;
  const clients = ['happ', 'v2rayng', 'incy', 'streisand', 'nekobox', 'shadowrocket', 'clash', 'sing-box', 'v2box', 'foxtray', 'outline', 'v2ray', 'xray'];
  for (const c of clients) {
    if (ua.includes(c)) return true;
  }
  return true;
}

function getCookie(request, name) {
  const cookie = request.headers.get('Cookie') || '';
  const match = cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? match[2] : null;
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;

    if (path === '/admin') {
      const auth = getCookie(request, 'admin_auth');

      if (request.method === 'POST' && url.searchParams.get('login') === '1') {
        const form = await request.formData();
        const pass = form.get('password');
        if (pass === ADMIN_PASSWORD) {
          return new Response('', {
            status: 302,
            headers: {
              'Location': '/admin',
              'Set-Cookie': 'admin_auth=' + ADMIN_PASSWORD + '; Path=/; HttpOnly; Max-Age=2592000; SameSite=Lax'
            }
          });
        } else {
          return new Response('', {
            status: 302,
            headers: { 'Location': '/admin?error=1' }
          });
        }
      }

      if (auth !== ADMIN_PASSWORD) {
        const errorMsg = url.searchParams.get('error') ? '<p style="color:#ef4444;text-align:center;margin-bottom:15px;font-size:14px;">❌ Неверный пароль</p>' : '';
        return new Response(`
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>Login</title>
            <style>${STYLE}</style>
          </head>
          <body>
            <div class="container">
              <div class="login-box">
                <div class="header">
                  <div class="logo">🔐</div>
                  <h1>ClearQ VPN</h1>
                  <p>Вход в панель</p>
                </div>
                <div class="card">
                  ${errorMsg}
                  <form method="POST" action="/admin?login=1">
                    <label>Пароль</label>
                    <input name="password" type="password" required autofocus>
                    <button type="submit" class="btn-purple">🔓 Войти</button>
                  </form>
                </div>
              </div>
            </div>
          </body>
          </html>
        `, { status: 401, headers: { 'Content-Type': 'text/html; charset=UTF-8' } });
      }

      if (request.method === 'GET' && url.searchParams.get('logout') === '1') {
        return new Response('', {
          status: 302,
          headers: {
            'Location': '/admin',
            'Set-Cookie': 'admin_auth=; Path=/; Max-Age=0'
          }
        });
      }

      if (request.method === 'GET') {
        const deleteUser = url.searchParams.get('delete');
        if (deleteUser) {
          await env.DB.delete(deleteUser);
          return new Response('', { status: 302, headers: { 'Location': '/admin' } });
        }

        const list = await env.DB.list();
        let userList = '';
        let activeCount = 0;
        const now = Date.now();
        for (const key of list.keys) {
          if (key.name === 'CONFIGS' || key.name === 'SETTINGS') continue;
          const data = await env.DB.get(key.name, 'json');
          if (!data) continue;
          if (now < data.expires) {
            const daysLeft = Math.ceil((data.expires - now) / (1000 * 60 * 60 * 24));
            userList += '<div class="user-item" onclick="copyUserLink(\\'' + key.name + '\\')"><div><span class="name">' + key.name + '</span><span class="days">' + daysLeft + ' дн.</span></div><a href="/admin?delete=' + key.name + '" class="delete-btn" onclick="event.stopPropagation()">🗑</a></div>';
            activeCount++;
          }
        }

        const configsRaw = await env.DB.get('CONFIGS');
        const configsText = configsRaw ? configsRaw : '';

        const settingsRaw = await env.DB.get('SETTINGS');
        const settings = settingsRaw ? JSON.parse(settingsRaw) : { name: DEFAULT_NAME, announce: DEFAULT_ANNOUNCE, support: DEFAULT_SUPPORT };

        return new Response(`
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>ClearQ Admin</title>
            <style>${STYLE}</style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <div class="logo">🔐</div>
                <h1>ClearQ VPN</h1>
                <p>Premium Control Panel</p>
              </div>

              <div class="card">
                <h3>👥 Пользователи</h3>
                ${userList || '<p style="color:#666;text-align:center;padding:10px;">Пока нет активных</p>'}
                <div class="stats">Всего: ${activeCount} из ${MAX_USERS}</div>
                <p style="color:#666;font-size:11px;text-align:center;margin-top:8px;">Нажми на пользователя, чтобы скопировать ссылку</p>
              </div>

              <div class="card">
                <h3>🎨 Оформление</h3>
                <form method="POST" action="/admin?save=settings">
                  <label>Название</label>
                  <input name="name" value="${settings.name}">
                  <label>Описание</label>
                  <textarea name="announce" rows="3">${settings.announce}</textarea>
                  <label>Support URL</label>
                  <input name="support" value="${settings.support}">
                  <button type="submit" class="btn-purple">💾 Сохранить</button>
                </form>
              </div>

              <div class="card">
                <h3>🔗 VLESS-конфиги</h3>
                <form method="POST" action="/admin?save=configs">
                  <textarea name="configs" class="configs-textarea" placeholder="vless://...">${configsText}</textarea>
                  <div class="hint">↔ Листай вправо, чтобы увидеть всю строку</div>
                  <button type="submit" class="btn-blue">💾 Сохранить конфиги</button>
                </form>
              </div>

              <div class="card">
                <h3>➕ Выдать подписку</h3>
                <form method="POST">
                  <label>ID пользователя</label>
                  <input name="user_id" value="user1" required>
                  <label>Дней подписки</label>
                  <input name="days" value="30" type="number" required>
                  <button type="submit" class="btn-green">✅ Выдать</button>
                </form>
              </div>

              <div class="card">
                <h3>🚪 Сессия</h3>
                <a href="/admin?logout=1" style="display:block;text-align:center;padding:14px;background:rgba(239,68,68,0.15);border:1px solid rgba(239,68,68,0.3);color:#f87171;text-decoration:none;border-radius:12px;font-weight:700;text-transform:uppercase;letter-spacing:1px;font-size:14px;">Выйти</a>
              </div>
            </div>
            <div id="toast" class="toast"></div>
            <script>${TOAST_SCRIPT}</script>
          </body>
          </html>
        `, { headers: { 'Content-Type': 'text/html; charset=UTF-8' } });
      }

      if (request.method === 'POST') {
        const form = await request.formData();

        if (url.searchParams.get('save') === 'configs') {
          const configs = form.get('configs');
          await env.DB.put('CONFIGS', configs);
          return new Response('', { status: 302, headers: { 'Location': '/admin' } });
        }

        if (url.searchParams.get('save') === 'settings') {
          const settings = {
            name: form.get('name') || DEFAULT_NAME,
            announce: form.get('announce') || DEFAULT_ANNOUNCE,
            support: form.get('support') || DEFAULT_SUPPORT
          };
          await env.DB.put('SETTINGS', JSON.stringify(settings));
          return new Response('', { status: 302, headers: { 'Location': '/admin' } });
        }

        const userId = form.get('user_id');
        const days = parseInt(form.get('days'));

        if (!userId || !days) {
          return new Response('Заполните все поля!', { status: 400 });
        }

        const existing = await env.DB.get(userId, 'json');
        if (!existing) {
          const list = await env.DB.list();
          let activeCount = 0;
          const now = Date.now();
          for (const key of list.keys) {
            if (key.name === 'CONFIGS' || key.name === 'SETTINGS') continue;
            const d = await env.DB.get(key.name, 'json');
            if (d && now < d.expires) activeCount++;
          }
          if (activeCount >= MAX_USERS) {
            return new Response('Лимит ' + MAX_USERS + ' пользователей', { status: 403 });
          }
        }

        const expires = Date.now() + (days * 24 * 60 * 60 * 1000);
        await env.DB.put(userId, JSON.stringify({ expires: expires }));

        return new Response('', { status: 302, headers: { 'Location': '/admin' } });
      }
    }

    if (path === '/sub/' + SUBSCRIPTION_SECRET) {
      const userId = url.searchParams.get('id');
      if (!userId) return new Response('Not Found', { status: 404 });

      const data = await env.DB.get(userId, 'json');
      if (!data) return new Response('Not Found', { status: 404 });

      const settingsRaw = await env.DB.get('SETTINGS');
      const settings = settingsRaw ? JSON.parse(settingsRaw) : { name: DEFAULT_NAME, announce: DEFAULT_ANNOUNCE, support: DEFAULT_SUPPORT };

      const isClient = isVpnClient(request);

      if (!isClient) {
        const now = Date.now();
        const isExpired = now > data.expires;
        const daysLeft = isExpired ? 0 : Math.ceil((data.expires - now) / (1000 * 60 * 60 * 24));
        const totalDays = 30;
        const progress = isExpired ? 0 : Math.min(100, Math.max(0, (daysLeft / totalDays) * 100));
        const subLink = url.origin + '/sub/' + SUBSCRIPTION_SECRET + '?id=' + userId;

        return new Response(`
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>${settings.name}</title>
            <style>${STYLE}</style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <div class="logo">🚀</div>
                <h1>${settings.name}</h1>
                <p>Информация о подписке</p>
              </div>

              <div class="card">
                <h3>📊 Статус</h3>
                <div class="info-row">
                  <span class="label">Пользователь</span>
                  <span class="value">${userId}</span>
                </div>
                <div class="info-row">
                  <span class="label">Статус</span>
                  <span class="value ${isExpired ? 'status-expired' : 'status-active'}">${isExpired ? '❌ Истекла' : '✅ Активна'}</span>
                </div>
                <div class="info-row">
                  <span class="label">Осталось дней</span>
                  <span class="value">${daysLeft}</span>
                </div>
                <div class="info-row">
                  <span class="label">Действует до</span>
                  <span class="value">${new Date(data.expires).toLocaleDateString('ru-RU')}</span>
                </div>
                <div class="progress-bar">
                  <div class="progress-fill" style="width: ${progress}%"></div>
                </div>
              </div>

              <div class="card">
                <h3>📢 Объявление</h3>
                <p style="color:#ccc;font-size:14px;line-height:1.7;">${settings.announce}</p>
              </div>

              <div class="card">
                <h3>📱 Подключение</h3>
                <p style="color:#ccc;font-size:14px;line-height:1.7;">
                  Нажми кнопку ниже, чтобы скопировать ссылку и добавить её в клиент:
                </p>
                <button class="connect-btn" onclick="copyText('${subLink}', 'Ссылка скопирована!')">📲 Вставить в клиент</button>
              </div>

              ${settings.support ? '<a href="' + settings.support + '" class="support-btn">💬 Поддержка</a>' : ''}
            </div>
            <div id="toast" class="toast"></div>
            <script>${TOAST_SCRIPT}</script>
          </body>
          </html>
        `, { headers: { 'Content-Type': 'text/html; charset=UTF-8' } });
      }

      if (Date.now() > data.expires) return new Response('Not Found', { status: 404 });

      const configsRaw = await env.DB.get('CONFIGS');
      if (!configsRaw) return new Response('Not Found', { status: 404 });

      const vlessConfigs = configsRaw.split('\n').map(s => s.trim()).filter(s => s.length > 0);

      const profileTitleBase64 = btoa(unescape(encodeURIComponent(settings.name)));
      const announceBase64 = btoa(unescape(encodeURIComponent(settings.announce)));
      const expireTimestamp = Math.floor(data.expires / 1000);

      const metaHeaders = [
        '#profile-title: base64:' + profileTitleBase64,
        '#announce: base64:' + announceBase64,
        '#profile-update-interval: 1',
        '#subscription-userinfo: upload=0; download=0; total=0; expire=' + expireTimestamp,
        '#support-url: ' + settings.support
      ];

      const configText = metaHeaders.join('\n') + '\n' + vlessConfigs.join('\n');
      const encoded = btoa(unescape(encodeURIComponent(configText)));

      return new Response(encoded, {
        headers: {
          'Content-Type': 'text/plain; charset=UTF-8',
          'Cache-Control': 'no-cache',
          'profile-title': 'base64:' + profileTitleBase64,
          'announce': 'base64:' + announceBase64,
          'subscription-userinfo': 'upload=0; download=0; total=0; expire=' + expireTimestamp,
          'support-url': settings.support
        }
      });
    }

    return new Response(`
      <!DOCTYPE html>
      <html>
      <head><meta charset="UTF-8"><title>404</title></head>
      <body style="background:#0a0a0f;color:#333;font-family:Arial;text-align:center;padding:80px 20px;">
        <h1 style="font-size:96px;color:#1
