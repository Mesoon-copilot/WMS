window.APP_SHELL = (function () {
  function currentFile() {
    return (location.pathname.split("/").pop() || "").toLowerCase();
  }

  function injectStyles() {
    if (document.getElementById("app-shell-style")) return;

    const style = document.createElement("style");
    style.id = "app-shell-style";
    style.textContent = `
      html, body{
        max-width:100%;
        overflow-x:hidden;
      }

      body.app-shell-ready{
        padding-top:84px;
      }

      body.app-shell-menu-open{
        overflow:hidden;
      }

      .app-shell{
        position:fixed;
        inset:0 0 auto 0;
        height:72px;
        z-index:9999;
        display:flex;
        align-items:center;
        justify-content:space-between;
        gap:16px;
        padding:0 18px;
        background:linear-gradient(135deg,#0f172a 0%, #1d4ed8 100%);
        color:#fff;
        box-shadow:0 10px 24px rgba(15,23,42,.16);
        width:100%;
        max-width:100vw;
        overflow:hidden;
      }

      .app-shell-brand{
        display:flex;
        align-items:center;
        gap:12px;
        min-width:240px;
        flex:1 1 auto;
      }

      .app-shell-logo{
        width:40px;
        height:40px;
        min-width:40px;
        border-radius:12px;
        display:grid;
        place-items:center;
        background:rgba(255,255,255,.14);
        font-size:20px;
      }

      .app-shell-brand-text{
        min-width:0;
        overflow:hidden;
      }

      .app-shell-title{
        font:600 18px/1.1 "Kanit","Segoe UI",sans-serif;
        white-space:nowrap;
        overflow:hidden;
        text-overflow:ellipsis;
      }

      .app-shell-sub{
        font:400 12px/1.1 "Kanit","Segoe UI",sans-serif;
        opacity:.85;
        margin-top:3px;
        white-space:nowrap;
        overflow:hidden;
        text-overflow:ellipsis;
      }

      .app-shell-nav{
        display:flex;
        align-items:center;
        gap:10px;
        flex-wrap:wrap;
      }

      .app-shell-link{
        color:#fff;
        text-decoration:none;
        font:500 14px/1 "Kanit","Segoe UI",sans-serif;
        padding:10px 14px;
        border-radius:12px;
        transition:.18s ease;
        background:transparent;
        border:1px solid transparent;
      }

      .app-shell-link:hover{
        background:rgba(255,255,255,.12);
      }

      .app-shell-link.active{
        background:#fff;
        color:#0f172a;
      }

      .app-shell-user{
        display:flex;
        align-items:center;
        gap:10px;
        flex:0 0 auto;
      }

      .app-shell-badge{
        background:rgba(255,255,255,.14);
        padding:8px 12px;
        border-radius:999px;
        font:500 13px/1 "Kanit","Segoe UI",sans-serif;
        white-space:nowrap;
      }

      .app-shell-logout{
        appearance:none;
        border:0;
        cursor:pointer;
        background:#fff;
        color:#0f172a;
        border-radius:12px;
        padding:10px 14px;
        font:600 14px/1 "Kanit","Segoe UI",sans-serif;
      }

      .app-shell-toggle{
        display:none;
        appearance:none;
        border:1px solid rgba(255,255,255,.22);
        background:rgba(255,255,255,.10);
        color:#fff;
        width:44px;
        height:44px;
        min-width:44px;
        border-radius:12px;
        cursor:pointer;
        align-items:center;
        justify-content:center;
        font-size:22px;
        flex:0 0 44px;
      }

      .app-shell-overlay{
        display:none;
        position:fixed;
        inset:0;
        background:rgba(2,6,23,.48);
        backdrop-filter:blur(2px);
        z-index:9997;
      }

      @media (max-width: 980px){
        html, body{
          max-width:100%;
          overflow-x:hidden;
        }

        body.app-shell-ready{
          padding-top:84px;
        }

        .app-shell{
          height:72px;
          padding:0 12px;
          gap:10px;
          width:100%;
          max-width:100vw;
          overflow:hidden;
        }

        .app-shell-brand{
          min-width:0;
          flex:1 1 auto;
          display:flex;
          align-items:center;
          gap:10px;
          overflow:hidden;
        }

        .app-shell-logo{
          width:36px;
          height:36px;
          min-width:36px;
          border-radius:10px;
          font-size:18px;
        }

        .app-shell-brand-text{
          min-width:0;
          overflow:hidden;
        }

        .app-shell-title{
          font-size:15px;
          white-space:nowrap;
          overflow:hidden;
          text-overflow:ellipsis;
        }

        .app-shell-sub{
          font-size:10px;
          white-space:nowrap;
          overflow:hidden;
          text-overflow:ellipsis;
        }

        .app-shell-toggle{
          display:inline-flex;
          align-items:center;
          justify-content:center;
          width:40px;
          height:40px;
          min-width:40px;
          flex:0 0 40px;
          font-size:20px;
          margin-left:0;
        }

        .app-shell-nav,
        .app-shell-user{
          position:fixed;
          right:0;
          width:min(82vw, 340px);
          z-index:9998;
          transition:transform .24s ease;
        }

        .app-shell-nav{
          top:0;
          transform:translateX(100%);
          height:100dvh;
          background:#fff;
          color:#0f172a;
          box-shadow:-10px 0 30px rgba(15,23,42,.16);
          padding:88px 16px 16px;
          display:flex;
          flex-direction:column;
          align-items:stretch;
          gap:10px;
          overflow:auto;
          flex-wrap:nowrap;
        }

        .app-shell-link{
          color:#0f172a;
          background:#f8fafc;
          border:1px solid #dbe2ea;
          border-radius:14px;
          padding:13px 14px;
          font-size:15px;
        }

        .app-shell-link:hover{
          background:#eef2ff;
        }

        .app-shell-link.active{
          background:#dbeafe;
          color:#0f172a;
          border-color:#93c5fd;
        }

        .app-shell-user{
          transform:translateX(100%);
          top:auto;
          bottom:0;
          height:auto;
          background:#fff;
          color:#0f172a;
          box-shadow:-10px 0 30px rgba(15,23,42,.16);
          padding:0 16px 18px;
          display:flex;
          flex-direction:column;
          align-items:stretch;
          gap:12px;
        }

        .app-shell-badge{
          background:#f1f5f9;
          color:#0f172a;
          border-radius:14px;
          padding:12px 14px;
          text-align:center;
          white-space:normal;
        }

        .app-shell-logout{
          background:#0f172a;
          color:#fff;
          width:100%;
        }

        body.app-shell-menu-open .app-shell-nav,
        body.app-shell-menu-open .app-shell-user{
          transform:translateX(0);
        }

        body.app-shell-menu-open .app-shell-overlay{
          display:block;
        }
      }

      @media print{
        html, body{
          overflow:visible !important;
        }
        body.app-shell-ready{
          padding-top:0 !important;
        }
        .app-shell,
        .app-shell-overlay{
          display:none !important;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function closeMenu() {
    document.body.classList.remove("app-shell-menu-open");
  }

  function bindEvents() {
    const toggle = document.getElementById("appShellToggle");
    const overlay = document.getElementById("appShellOverlay");
    const logout = document.getElementById("appShellLogout");

    if (toggle) {
      toggle.addEventListener("click", function () {
        document.body.classList.toggle("app-shell-menu-open");
      });
    }

    if (overlay) {
      overlay.addEventListener("click", closeMenu);
    }

    if (logout) {
      logout.addEventListener("click", function () {
        window.APP_AUTH.logout();
      });
    }

    document.querySelectorAll(".app-shell-link").forEach(function (a) {
      a.addEventListener("click", closeMenu);
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 980) closeMenu();
    });
  }

  function render() {
    const file = currentFile();
    if (file === "login.html") return;

    const user = window.APP_AUTH && window.APP_AUTH.getUser ? window.APP_AUTH.getUser() : null;
    injectStyles();

    const shell = document.createElement("header");
    shell.className = "app-shell no-print";

    const menu = (window.APP_MENU || []).map(function (item) {
      const active = file === item.href.toLowerCase() ? "active" : "";
      return `<a class="app-shell-link ${active}" href="${item.href}">${item.icon} ${item.label}</a>`;
    }).join("");

    shell.innerHTML = `
      <div class="app-shell-brand">
        <div class="app-shell-logo">📦</div>
        <div class="app-shell-brand-text">
          <div class="app-shell-title">${(window.APP_CONFIG && window.APP_CONFIG.APP_NAME) || "WMS"}</div>
          <div class="app-shell-sub">Outbound Control System</div>
        </div>
      </div>

      <button class="app-shell-toggle no-print" type="button" id="appShellToggle" aria-label="Open menu">☰</button>

      <nav class="app-shell-nav no-print">${menu}</nav>

      <div class="app-shell-user no-print">
        <div class="app-shell-badge">ผู้ใช้งาน: ${(user && user.username) || "-"}</div>
        <button class="app-shell-logout" type="button" id="appShellLogout">Logout</button>
      </div>
    `;

    const overlay = document.createElement("div");
    overlay.id = "appShellOverlay";
    overlay.className = "app-shell-overlay no-print";

    document.body.prepend(overlay);
    document.body.prepend(shell);
    document.body.classList.add("app-shell-ready");
    bindEvents();
  }

  function init() {
    if (!window.APP_AUTH.requireAuth()) return;
    render();
  }

  return { init, closeMenu };
})();

document.addEventListener("DOMContentLoaded", function () {
  if (window.APP_SHELL) window.APP_SHELL.init();
});
