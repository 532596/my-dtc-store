import { redirect } from "next/navigation";

type PayPageProps = {
  searchParams?: Record<string, string | string[] | undefined>;
};

function toQuery(searchParams?: Record<string, string | string[] | undefined>) {
  if (!searchParams) return "";
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(searchParams)) {
    if (Array.isArray(value)) {
      for (const item of value) {
        if (item) params.append(key, item);
      }
      continue;
    }
    if (value) params.set(key, value);
  }
  const query = params.toString();
  return query ? `?${query}` : "";
}

export default function CartPayPage({ searchParams }: PayPageProps) {
  // Keep legacy /cart/pay links working by forwarding to the actual pay-info page.
  redirect(`/pay/info${toQuery(searchParams)}`);
}
