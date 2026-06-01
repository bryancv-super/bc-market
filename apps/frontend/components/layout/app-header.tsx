"use client";

import { useEffect, useState } from "react";
import { Header } from "@/components/layout/header";
import { fetchProfile } from "@/lib/api/market";
import { getStoredToken, getStoredUser, StoredUser, updateStoredUser } from "@/lib/auth/session";

export function AppHeader() {
  const [profileImage, setProfileImage] = useState<string | null>(() => getStoredUser()?.profileImage ?? null);

  useEffect(() => {
    const token = getStoredToken();

    if (!token) {
      return;
    }

    fetchProfile(token)
      .then((user: StoredUser) => {
        setProfileImage(user.profileImage);
        updateStoredUser(user);
      })
      .catch(() => undefined);

    function handleSessionUpdated() {
      setProfileImage(getStoredUser()?.profileImage ?? null);
    }

    window.addEventListener("bc-market-session-updated", handleSessionUpdated);
    return () => window.removeEventListener("bc-market-session-updated", handleSessionUpdated);
  }, []);

  return <Header showAvatar showBrand profileImage={profileImage} />;
}
