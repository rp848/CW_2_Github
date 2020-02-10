var cacheName = 'cacheFiles-v1'; 

var appShellFiles = [
    '/CW_2_Github/',
    '/CW_2_Github/data/images/business.png',
    '/CW_2_Github/data/images/CS.png',
    '/CW_2_Github/data/images/dance.png',
    '/CW_2_Github/data/images/drama.png',
    '/CW_2_Github/data/images/english.png',
    '/CW_2_Github/data/images/maths.png',
    '/CW_2_Github/data/images/music.png',
    '/CW_2_Github/data/images/PE.png',
    '/CW_2_Github/data/images/pshe.png',
    '/CW_2_Github/data/images/science.png',
    '/CW_2_Github/index.html',
    '/CW_2_Github/server.js',
    '/CW_2_Github/sw.js',
    '/CW_2_Github/app.js',

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
    caches.open('cacheFiles-v1').then((cache) => {
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


  




