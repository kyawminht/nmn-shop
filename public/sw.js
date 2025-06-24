// firebase-messaging-sw.js - Improved Service Worker
// Import Firebase scripts
importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js");

// Initialize Firebase
const firebaseConfig = {
   apiKey: "AIzaSyDJIIC7xnez6lXUTICxzCn02e1Cw-9Ahm4",
  authDomain: "nmn-clothing.firebaseapp.com",
  projectId: "nmn-clothing",
  storageBucket: "nmn-clothing.firebasestorage.app",
  messagingSenderId: "384405148016",
  appId: "1:384405148016:web:3535f47276d5bc813c3fb5",
  measurementId: "G-3L3NVJ8MXZ"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// Service Worker version for cache busting
const SW_VERSION = 'v1.0.0';
const CACHE_NAME = `fcm-cache-${SW_VERSION}`;

// Install event - cache resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll([
        '/sounds/notification.mp3',
        '/icons/icon-192x192.png',
        '/icons/badge-72x72.png'
      ]).catch(err => {
        
      });
    })
  );
  
  // Force immediate activation
  self.skipWaiting();
});

// Activate event - clean old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      // Take control of all clients immediately
      return self.clients.claim();
    })
  );
});

// Add this to activate event
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      // Notify clients about version change
      self.clients.matchAll().then(clients => {
        clients.forEach(client => {
          client.postMessage({
            type: 'SW_VERSION_MISMATCH',
            version: SW_VERSION
          });
        });
      });
      return self.clients.claim();
    })
  );
});

// Enhanced background message handling
messaging.onBackgroundMessage(async (payload) => { 

    // First check if app is in foreground
  const windowClients = await clients.matchAll({type: 'window'});
  if (windowClients.length > 0) {
    // App is in foreground - skip service worker notification
    // The foreground handler (onMessage) will handle it
    return;
  }

  if (Notification.permission !== 'granted') {
    return;
  }
  try {
    // Enhanced payload handling
    const notification = payload.notification || {};
    const data = payload.data || {};
    
    const title = notification.title || data.title || 'New Message';
    const body = notification.body || data.body || 'You have a new message';
    const icon = notification.icon || data.icon || '/icons/icon-192x192.png';
    const badge = notification.badge || data.badge || '/icons/badge-72x72.png';
    const image = notification.image || data.image;
    
    const notificationOptions = {
      body,
      icon,
      badge,
      data: {
        ...data,
        timestamp: Date.now(),
        fcm_message_id: payload.fcmMessageId
      },
      vibrate: [200, 100, 200, 100, 200],
      requireInteraction: true,
      tag: `fcm-${Date.now()}`,
      timestamp: Date.now(),
      silent: false,
      dir: 'ltr',
      lang: 'en',
      renotify: true,
      // Add action buttons
      actions: [
        {
          action: 'open',
          title: 'Open',
          icon: '/icons/open-icon.png'
        },
        {
          action: 'dismiss',
          title: 'Dismiss',
          icon: '/icons/dismiss-icon.png'
        }
      ]
    };

    // Add image if provided
    if (image) {
      notificationOptions.image = image;
    }

    // Show notification
    await self.registration.showNotification(title, notificationOptions);
    
    // Play notification sound (if cached)
    try {
      const cache = await caches.open(CACHE_NAME);
      const soundResponse = await cache.match('/sounds/notification.mp3');
      if (soundResponse) {
        // Send message to clients to play sound
        self.clients.matchAll().then(clients => {
          clients.forEach(client => {
            client.postMessage({
              type: 'PLAY_NOTIFICATION_SOUND'
            });
          });
        });
      }
    } catch (err) {
      console.warn('Could not play notification sound:', err);
    }
    

  } catch (error) {
   // console.error('Error showing notification:', error);
  }
});

// Enhanced notification click handling
self.addEventListener('notificationclick', (event) => {

  event.notification.close();
  
  const notificationData = event.notification.data || {};
  const action = event.action;
  
  if (action === 'dismiss') {
    return; // Just close the notification
  }
  
  // Determine redirect URL
  let redirectUrl = '/';
  if (notificationData.deep_link) {
    redirectUrl = notificationData.deep_link;
  } else if (notificationData.url) {
    redirectUrl = notificationData.url;
  } else if (notificationData.click_action) {
    redirectUrl = notificationData.click_action;
  }
  
  event.waitUntil(
    self.clients.matchAll({ 
      type: 'window', 
      includeUncontrolled: true 
    }).then(clients => {
      // Check if there's already a window/tab open
      for (let client of clients) {
        if (client.url.includes(self.location.origin) && 'focus' in client) {
          // Navigate existing window and focus it
          client.navigate(redirectUrl);
          return client.focus();
        }
      }
      
      // If no existing window, open a new one
      if (self.clients.openWindow) {
        return self.clients.openWindow(redirectUrl);
      }
    }).catch(err => {
      // console.error('Error handling notification click:', err);
    })
  );
});

// Handle notification close
self.addEventListener('notificationclose', (event) => {
  
  // You can track notification dismissals here
  const notificationData = event.notification.data || {};
  
  // Send analytics or tracking data
  self.clients.matchAll().then(clients => {
    clients.forEach(client => {
      client.postMessage({
        type: 'NOTIFICATION_CLOSED',
        data: notificationData
      });
    });
  });
});

// Enhanced message handling for keep-alive and other messages
self.addEventListener('message', (event) => {
  const { type } = event.data;
  
  switch (type) {
    case 'SKIP_WAITING':
      self.skipWaiting();
      break;
      
    case 'KEEP_ALIVE':
      // Respond to keep-alive ping
      event.ports[0]?.postMessage({ status: 'alive', version: SW_VERSION });
      break;
      
    case 'GET_VERSION':
      event.ports[0]?.postMessage({ version: SW_VERSION });
      break;
      
    default:
     // console.log('Unknown message type:', type);
  }
});

// Periodic sync for token refresh (if supported)
self.addEventListener('sync', (event) => {
 
  if (event.tag === 'fcm-token-refresh') {
    event.waitUntil(
      self.clients.matchAll().then(clients => {
        clients.forEach(client => {
          client.postMessage({
            type: 'REFRESH_FCM_TOKEN'
          });
        });
      })
    );
  }
});

/*
// Push event (fallback if onBackgroundMessage doesn't work)
self.addEventListener('push', (event) => {

  
  if (!event.data) {
 
    return;
  }
  
  try {
    const payload = event.data.json();
    
    // This should normally be handled by messaging.onBackgroundMessage
    // but keeping as fallback
    if (Notification.permission === 'granted') {
      const title = payload.notification?.title || 'New Message';
      const options = {
        body: payload.notification?.body || 'You have a new message',
        icon: '/icons/icon-192x192.png',
        badge: '/icons/badge-72x72.png',
        data: payload.data || {},
        vibrate: [200, 100, 200],
        requireInteraction: true,
        tag: `push-${Date.now()}`
      };
      
      event.waitUntil(
        self.registration.showNotification(title, options)
      );
    }
  } catch (error) {
    //console.log(error)
  }
});

*/

// Enhanced error handling
self.addEventListener('error', (event) => {
 // console.error('Service Worker error:', event.error);
});

self.addEventListener('unhandledrejection', (event) => {
 // console.error('Service Worker unhandled rejection:', event.reason);
});