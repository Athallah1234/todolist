"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";

export default function NotificationManager() {
  const { data: session } = useSession();

  useEffect(() => {
    if (!session || !("serviceWorker" in navigator) || !("PushManager" in window)) {
      return;
    }

    const registerServiceWorker = async () => {
      try {
        const registration = await navigator.serviceWorker.register("/sw.js");
        
        let subscription = await registration.pushManager.getSubscription();

        if (!subscription) {
          const response = await fetch("/api/auth/subscribe/vapid-public-key");
          // Fallback if VAPID key is hardcoded or from env
          const vapidPublicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
          
          if (!vapidPublicKey) return;

          subscription = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: vapidPublicKey,
          });
        }

        await fetch("/api/auth/subscribe", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ subscription }),
        });
      } catch (error) {
        console.error("Service Worker registration or subscription failed:", error);
      }
    };

    if (Notification.permission === "granted") {
      registerServiceWorker();
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          registerServiceWorker();
        }
      });
    }
  }, [session]);

  return null;
}
