var version = 'v1';
var c_name = 'cache_' + version;
var files = [
'aa.html',
'style.css',
'scr.js',
'c_style.css',
'custom_time.html',
'scr2.js'];

self.addEventListener("install",(e)=>{
	console.log("Installing Service Worker.");
	e.waitUntil(
		caches.open(c_name)
		.then((c)=>{
			console.log("Adding Files to cache...");
			return c.addAll(files);
		})
		.catch((err)=>{
			console.log("Can't Cache. " + err);
		})
		);

});

self.addEventListener("activate",(e)=>{
	console.log("Service Worker Activated");
	e.waitUntil(
		caches.keys().then((keys)=>{
			return Promise.all(keys.map((key)=>{
				if(key !== c_name){
					console.log("Removing Obsolete data");
					return caches.delete(key);
				}
			}))
		})
		)
	return self.clients.claim();
});

self.addEventListener("fetch",(e)=>{
	console.log("Fetch request for : " + e.request.url);
	e.respondWith(caches.match(e.request).then((res)=>{
		return res || fetch(e.request);
	}))
});

