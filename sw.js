
var cacheName ='cacheFiles-v1'; 

var appShellFiles = [
    '/app_cw2/',
    '/app_cw2/index.html',
    '/app_cw2/app.js',
    '/app_cw2/style.css',
    '/app_cw2/data/images/image2.jpg ',
    '/app_cw2/data/images/image3.jpg ',
    '/app_cw2/data/images/image4.jpg ',
    '/app_cw2/data/images/image5.jpg ',
    '/app_cw2/data/images/image6.jpg ',
    '/app_cw2/data/images/image7.jpg ',
    '/app_cw2/data/images/image8.jpg ',
    '/app_cw2/data/images/image9.jpg ',
    '/app_cw2/data/images/image10.jpg ',
    '/app_cw2/data/images/blur.jpg ',
   
  
];


var contentToCache = [] = appShellFiles;

self.addEventListener('install',(e)=>{
    console.log('[Service Worker] Install');
    e.waitUntil(
        caches.open(cacheName).then((cache) => {
             console.log('[Service Worker] Caching all: app shell and content');
             return cache.addAll(contentToCache);
            })
            );
        }
 );

 self.addEventListener('fetch', function (e) {
     e.respondWith(
         caches.match(e.request).then(function(r){
             console.log('[Service Worker] Fetching resource: '+e.request.url);
             return r || fetch(e.request).then( function (response) {
                 return caches.open(cacheName).then(function (cache)
                 {
                console.log('[Service Worker] Caching new resource: '+e.request.url);
                cache.put(e.request, response.clone());
                return response;
            });
        });
    }));
});

self.addEventListener('install',(e) => {
    e.waitUntil(
    caches.open('cacheFiles-v2').then((cache) => {
        return cache.addAll(contentToCache);
    }));
});

self.addEventListener('activate',(e) => {

    e.waitUntil(
    caches.keys().then((keyList) => {
    return Promise.all(keyList.map((key) => { 
    if (key !== cacheName) { 
    return caches.delete(key);
    }}
    ));
    }));
    });