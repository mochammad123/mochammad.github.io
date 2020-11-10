var webPush = require("web-push");

const vapidKeys = {
    "publicKey": "BAsaNl4vIrjW-s3bbuBhQ3yaotOJ4Dg2OZQhBGt6pWXbLYyrAGTIDTrUgQF3FHIqyIf60Y5fth5wyOeOfBqVqW0",
    "privateKey": "z2UtSIREW3LGff57qv7inOhoGYFY5DCPsAH8zeplIK8"
};

webPush.setVapidDetails(
    "mailto:sihotangg@gmail.com",
    vapidKeys.publicKey,
    vapidKeys.privateKey
)

var pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/d5lNiv-ktYs:APA91bFo0GliZ3T19hRZ96CjYA5F8toGpankEiK_hNby1K0H8wi_pdOG2zRHkFrTJAEx4EKpNhrRsOvnMNp-9YWl1m7TuPt7a3LoAv1ctq6LHBFwY_jnIHixtEgIhjLCZrMkc-Z5Bp0y",
    "keys": {
        "p256dh": "BHk/HtbVSMVyQCmnQCuZlDWQX/r6l+3J5vXReh0pHrYou6qHLJDCPnDcin1pu4YQxxtqZovp+2T2Iw13xdexti0=",
        "auth": "4i1Ot1iyYbFuf0ZYPtFnvw=="
    }
};

var payload = "Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!";

var options = {
    gcmAPIKey: "779094513158",
    TTL: 60
};

webPush.sendNotification(
    pushSubscription,
    payload,
    options
);