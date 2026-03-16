window.APP_AUTH = (function () {
  const KEY = "wms_login_user";

  function getUser() {
    try {
      return JSON.parse(sessionStorage.getItem(KEY) || "null");
    } catch (e) {
      return null;
    }
  }

  function login(username, password) {
    const users = (window.APP_CONFIG && window.APP_CONFIG.USERS) || {};
    const normalized = String(username || "").trim();
    if (!normalized || !Object.prototype.hasOwnProperty.call(users, normalized)) {
      return { ok: false, error: "ไม่พบชื่อผู้ใช้งาน" };
    }
    if (String(users[normalized]) !== String(password || "")) {
      return { ok: false, error: "รหัสผ่านไม่ถูกต้อง" };
    }
    const payload = {
      username: normalized,
      loginAt: new Date().toISOString()
    };
    sessionStorage.setItem(KEY, JSON.stringify(payload));
    return { ok: true, user: payload };
  }

  function logout() {
    sessionStorage.removeItem(KEY);
    window.location.href = "login.html";
  }

  function requireAuth() {
    const file = (location.pathname.split("/").pop() || "").toLowerCase();
    const publicPages = ["login.html", ""];
    if (publicPages.includes(file)) return true;
    const user = getUser();
    if (!user) {
      window.location.href = "login.html";
      return false;
    }
    return true;
  }

  return { login, logout, getUser, requireAuth };
})();
