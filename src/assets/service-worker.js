const cacheName = "WEBSITE_NAME-1.0.0";

self.addEventListener("install", function (e) {
  e.waitUntil(
    caches.open(cacheName).then(function (cache) {
      return cache.addAll([
        "./",
        "./index.html"
      ]).then(function () { self.skipWaiting(); });
    })
  );
});

self.addEventListener("activate", function (e) {
  e.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", function (e) {
  e.respondWith(
    caches.open(cacheName)
      .then(function (cache) { return cache.match(e.request, { ignoreSearch: true }); })
      .then(function (response) { return response || fetch(e.request); })
  );
});
