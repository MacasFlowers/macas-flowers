// Año dinámico
document.getElementById('year').textContent = new Date().getFullYear();

// Service Worker (opcional, pero recomendado)
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/macas-flowers/docs/assets/sw.js', { scope: '/macas-flowers/' });
}