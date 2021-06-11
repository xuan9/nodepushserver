//see the settings doc from https://github.com/appfeel/node-pushnotifications
//to support more destinations like Android / Web etc.
module.exports =  {
    apn: {
      token: {
        key: process.env.APN_KEY, 
        keyId: process.env.APN_KEY_ID, 
        teamId: process.env.APN_TERM_ID 
      },
      production: false // true for APN production environment, false for APN sandbox environment,
    },
    isAlwaysUseFCM: false // true all messages will be sent through node-gcm (which actually uses FCM)
  };