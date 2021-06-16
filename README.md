# simple-push-server
A simple web server that sends push notification to apps/web etc, using the [node-pushnotification](https://github.com/appfeel/node-pushnotifications) library.


## So can send pushes by posting to the server like this:
```bash
curl -v http://localhost:8000/send-message -d '{"sender":"testing", "registrationIds":["b2d0e95bfce054a3d220da12280cfdbb15274a1a9e5a02e5618c72b6ee32d0e2b"], "data":{"topic":"com.whatever.test","custom":{"mydata":"12341234","anotherdata":"abcd"},"aps":{"alert":"hello"}}}' -H "Content-Type: application/json"
```
## Install
```bash
npm install
npm run start
```

## Configuration
Configure the push accounts in the [Settings.js](https://github.com/xuan9/nodepushserver/blob/main/Settings.js) and [.dev](https://github.com/xuan9/nodepushserver/blob/main/.env) file.

## See the [node-pushnotification](https://github.com/appfeel/node-pushnotifications) library page for the data/settings options.

