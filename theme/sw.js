const cacheName = 'core-pwa';

const PRECACHE_URLS = [
  '404.html',
  './',
  'https://fonts.googleapis.com/css?family=Roboto:300,400,400i,700|Roboto+Mono',
  '//cdnjs.cloudflare.com/ajax/libs/cookieconsent2/3.0.3/cookieconsent.min.css',
  '//cdnjs.cloudflare.com/ajax/libs/cookieconsent2/3.0.3/cookieconsent.min.js',
  'stylesheets/custom-style.css',
  'stylesheets/downloads.css',
  'javascripts/extra.js',
  'https://unpkg.com/enigma.js@2.2.1/enigma.min.js',
  'javascripts/downloads.js',
];

function prepareCacheArray() {
  return fetch('./files.txt').then(res =>{
    const filesTxt = res.text();
    console.log(filesTxt)
  }).catch(err=>{
    console.log('err', err)
  })
  return fetch('./sitemap.xml').then(res => {
    const xmlTxt = res.text();
    return xmlTxt.then(x => {
      const extractedLoc = x.match(/<loc>[^<]*<\/loc>/gi).map(loc => {
        return loc.replace(/(<loc>|<\/loc>)/g, '').replace(/(http[s]?:\/\/)?([^\/\s]+\/)/, '');
      }).filter(item => item !== '');
      return [...PRECACHE_URLS, ...extractedLoc];
      // doesn't work in serviceWorker
      // const parser = new DOMParser();
      // xmlDoc = parser.parseFromString(xmlText,"text/xml");
      // console.log(xmlDoc)
    })
  });
}

prepareCacheArray().then(cache_url => {
  console.table(cache_url)
});



const filesAndAssetsToCache = [];

self.addEventListener('install', (event) => {
  console.log('[Service worker] install');
  event.waitUntil(
    prepareCacheArray().then(cachedArray => {
      return caches.open(cacheName)
        .then(cache => cache.addAll(cachedArray))
        .then(self.skipWaiting())
    })
  );
});

self.addEventListener('activate', (event) => {
  console.log('[Service worker] activate');
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.open(cacheName)
      .then(cache => cache.match(event.request, { ignoreSearch: true }))
      .then(response => {
        return response || fetch(event.request);
      })
  );
});
