const messaging = firebase.messaging();

messaging.requestPermission().then(function () {
	console.log('Notification permission granted.');
	return messaging.getToken()
}).then(function (currentToken) {
	console.log('currentToken', currentToken);
}).catch(function (err) {
	console.log('Unable to get permission to notify.', err);
});

messaging.onMessage((payload) => {
	console.log('payload', payload)
})


// TODO add service worker code here
if ('serviceWorker' in navigator) {
	navigator.serviceWorker
		.register('./service-worker.js')
		.then(function () { console.log('Service Worker Registered'); });
}