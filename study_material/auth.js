// Simple client-side auth (not secure).
// Configure credentials below (change before publishing)
const NGDF_CREDENTIALS = { id: 'intern', pwd: 'intern2026' };

function isAuthed() {
  try { return sessionStorage.getItem('ngdf_auth') === '1'; } catch (e) { return false; }
}

function requireAuth() {
  if (!isAuthed()) {
    const redirect = encodeURIComponent(location.pathname + location.search + location.hash);
    location.replace('/study_material/login.html?redirect=' + redirect);
  }
}

function handleLoginForm(formId) {
  const f = document.getElementById(formId);
  if (!f) return;
  f.addEventListener('submit', function (ev) {
    ev.preventDefault();
    const id = (f.querySelector('[name="userid"]') || {}).value || '';
    const pwd = (f.querySelector('[name="password"]') || {}).value || '';
    if (id === NGDF_CREDENTIALS.id && pwd === NGDF_CREDENTIALS.pwd) {
      try { sessionStorage.setItem('ngdf_auth', '1'); } catch (e) {}
      const urlParams = new URLSearchParams(location.search);
      const redirect = urlParams.get('redirect') || '/study_material/index.html';
      location.replace(redirect);
    } else {
      const err = document.getElementById('login-error');
      if (err) err.textContent = 'Invalid ID or password.';
    }
  });
}

function doLogout(returnTo) {
  try { sessionStorage.removeItem('ngdf_auth'); } catch (e) {}
  location.replace(returnTo || '/');
}

// Expose to global for login page
window.NGDF = { requireAuth, handleLoginForm, doLogout, isAuthed };
