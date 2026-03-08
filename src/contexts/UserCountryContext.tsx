"use client";

import * as React from "react";

const REGION_STORAGE_KEY = "dtc-user-region";

type UserCountryContextValue = {
  countryCode: string | null;
  userRegion: string | null;
  displayCode: string | null;
  setUserRegion: (code: string) => void;
  isLoading: boolean;
};

const UserCountryContext = React.createContext<UserCountryContextValue>({
  countryCode: null,
  userRegion: null,
  displayCode: null,
  setUserRegion: () => {},
  isLoading: true,
});

const GEO_API = "https://ipapi.co/json/";

function loadStoredRegion(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return localStorage.getItem(REGION_STORAGE_KEY);
  } catch {
    return null;
  }
}

export function UserCountryProvider({ children }: { children: React.ReactNode }) {
  const [countryCode, setCountryCode] = React.useState<string | null>(null);
  const [userRegion, setUserRegionState] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    setUserRegionState(loadStoredRegion());
  }, []);

  React.useEffect(() => {
    let cancelled = false;
    fetch(GEO_API)
      .then((res) => res.json())
      .then((data: { country_code?: string }) => {
        if (!cancelled && data?.country_code) setCountryCode(data.country_code);
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const setUserRegion = React.useCallback((code: string) => {
    try {
      localStorage.setItem(REGION_STORAGE_KEY, code);
    } catch {}
    setUserRegionState(code);
  }, []);

  const displayCode = userRegion ?? countryCode;

  const value = React.useMemo(
    () => ({ countryCode, userRegion, displayCode, setUserRegion, isLoading }),
    [countryCode, userRegion, displayCode, setUserRegion, isLoading]
  );

  return (
    <UserCountryContext.Provider value={value}>
      {children}
    </UserCountryContext.Provider>
  );
}

export function useUserCountry() {
  return React.useContext(UserCountryContext);
}

/** 将国家代码转为国旗 emoji，如 "US" -> 🇺🇸 */
export function countryCodeToFlag(code: string): string {
  if (!code || code.length !== 2) return "";
  return code
    .toUpperCase()
    .split("")
    .map((c) => String.fromCodePoint(0x1f1e6 - 65 + c.charCodeAt(0)))
    .join("");
}
