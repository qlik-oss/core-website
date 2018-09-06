const cacheName = 'core-pwa';
const filesAndAssetsToCache = [];

self.addEventListener('install', (event) => {
  console.log('[Service worker] install');
});

self.addEventListener('activate', (event) => {
  console.log('[Service worker] activate');
});

self.addEventListener('fetch', (event) => {

});
