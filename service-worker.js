// var dataCacheName = 'pwa-olx-webapp';
// var cacheName = 'pwa-olx-webapp-final-1';
// var filesToCache = [
//   '/',
//   '/index.html',
//   '/ads-details.html',
//   '/ads.html',
//   '/chat.html',
//   '/notifications.html',
//   '/Register.html',
//   '/SignIn.html',
//   '/stylesheets/bootstrap.css',
//   '/stylesheets/chat.css',
//   '/stylesheets/fontawesome.css',
//   '/stylesheets/forms.css',
//   '/stylesheets/navbar.css',
//   '/stylesheets/posts.css',
//   '/javascript/adsdata.js',
//   '/javascript/app.js',
//   '/javascript/getAds.js',
//   '/javascript/logsession.js',
//   '/javascript/logsession1.js',
//   '/javascript/chat.js',
//   '/javascript/notify.js'
// ];

// after a service worker is installed and the user navigates to a different page or 
// refreshes,the service worker will begin to receive fetch events

self.addEventListener('fetch', function (event) {
  event.respondWith(caches.open('cache').then(function (cache) {
    return cache.match(event.request).then(function (response) {
      console.log("cache request: " + event.request.url);
      var fetchPromise = fetch(event.request).then(function (networkResponse) {
        // if we got a response from the cache, update the cache                   
        console.log("fetch completed: " + event.request.url, networkResponse);
        if (networkResponse) {
          console.debug("updated cached page: " + event.request.url, networkResponse);
          cache.put(event.request, networkResponse.clone());
        }
        return networkResponse;
      }, function (event) {
        // rejected promise - just ignore it, we're offline!   
        console.log("Error in fetch()", event);
        event.waitUntil(
          caches.open('cache').then(function (cache) {
            // our cache is named *cache* in the caches.open() above
            return cache.addAll
              ([
                //cache.addAll(), takes a list of URLs, then fetches them from the server
                // and adds the response to the cache.           
                // add your entire site to the cache- as in the code below; for offline access
                // If you have some build process for your site, perhaps that could 
                // generate the list of possible URLs that a user might load.               
                '/',
                '/index.html',
                '/ads-details.html',
                '/ads.html',
                '/chat.html',
                '/notifications.html',
                '/Register.html',
                '/SignIn.html',
                '/my-favorite.html',
                '/stylesheets/bootstrap.css',
                '/stylesheets/chat.css',
                '/stylesheets/fontawesome.css',
                '/stylesheets/forms.css',
                '/stylesheets/navbar.css',
                '/stylesheets/posts.css',
                '/javascript/adsdata.js',
                '/javascript/app.js',
                '/javascript/getAds.js',
                '/javascript/logsession.js',
                '/javascript/logsession1.js',
                '/javascript/chat.js',
                '/javascript/notify.js',
                '/javascript/favorite.js',
                // Do not replace/delete/edit the service-worker.js/ and manifest.js paths below
                '/service-worker.js',
                '/manifest.js',
                //These are links to the extenal social media buttons that should be cached;
                // we have used twitter's as an example     
              ]);
          })
        );
      });
      // respond from the cache, or the network
      return response || fetchPromise;
    });
  }));
});

// window.addEventListener('beforeinstallprompt', (e) => {
//   // Prevent Chrome 67 and earlier from automatically showing the prompt
//   e.preventDefault();
//   // Stash the event so it can be triggered later.
//   deferredPrompt = e;
//   // Update UI notify the user they can add to home screen
//   btnAdd.style.display = 'block';
// });