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
    "endpoint": "https://fcm.googleapis.com/fcm/send/cu_GxN-1zEY:APA91bG2_cGU2psKrsb11W9x0EJrXR1jAEYAZydhnOz8HJIIe5mKndQ_ewLmdxUrxAaEQ8e6qwB2TrNWw92ePFg6Yp8Pl67uA5ywjXpzBAJWoEq7CUdGPl4C5-bAOXX-X2bdHr6hDGhA",
    "keys": {
        "p256dh": "BCnn4vgp5xp1rjZ23puRmF7GDAj6adLH/RVcmkv+d8e6mUco4Uv8ovKBtKXVLEI5QizLThwbgnIf+t4j9fj8vgM=",
        "auth": "Sh08Yzy/OYKWBtNQbieY4w=="
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