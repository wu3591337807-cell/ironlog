const CACHE='ironlog-v1';
self.addEventListener('install',function(e){self.skipWaiting()});
self.addEventListener('activate',function(e){e.waitUntil(self.clients.claim())});
self.addEventListener('fetch',function(e){
  if(e.request.method!=='GET')return;
  e.respondWith(
    fetch(e.request).then(function(resp){
      if(resp&&resp.status===200){var clone=resp.clone();caches.open(CACHE).then(function(c){c.put(e.request,clone)})}
      return resp;
    }).catch(function(){return caches.match(e.request).then(function(c){return c||caches.match('./')})})
  );
});
