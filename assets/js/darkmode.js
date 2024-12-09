// Utility function to get a cookie value
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

// Initialize theme
const savedTheme = getCookie('theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);
