const CACHE='ironlog-20260618';
self.addEventListener('install',function(e){self.skipWaiting()});
self.addEventListener('activate',function(e){e.waitUntil(
  caches.keys().then(function(ks){return Promise.all(ks.map(function(k){if(k!==CACHE)return caches.delete(k)}))}).then(function(){return self.clients.claim()})
)});
self.addEventListener('fetch',function(e){
  if(e.request.method!=='GET')return;
  var isNav=e.request.mode==='navigate'||e.request.destination==='document';
  var opt=isNav?{cache:'no-store'}:undefined;
  e.respondWith(
    fetch(e.request,opt).then(function(resp){
      if(resp&&resp.status===200){var clone=resp.clone();caches.open(CACHE).then(function(c){c.put(e.request,clone)})}
      return resp;
    }).catch(function(){return caches.match(e.request).then(function(c){return c||caches.match('./')})})
  );
});
