"use client";

import * as React from "react";

type UserCountryContextValue = {
  countryCode: string | null;
  isLoading: boolean;
};

const UserCountryContext = React.createContext<UserCountryContextValue>({
  countryCode: null,
  isLoading: true,
});

const GEO_API = "https://ipapi.co/json/";

export function UserCountryProvider({ children }: { children: React.ReactNode }) {
  const [countryCode, setCountryCode] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

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

  const value = React.useMemo(
    () => ({ countryCode, isLoading }),
    [countryCode, isLoading]
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
