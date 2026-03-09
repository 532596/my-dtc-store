"use client";

import { useRouter } from "next/navigation";
import { useCart } from "@/contexts/CartContext";

type Props = {
  slug: string;
  name: string;
  desc: string;
  price: number;
  image: string;
  /** 详情页为 true 时：仅加入并跳转；列表页为 false 时：可切换加入/取消购买 */
  redirectToCart?: boolean;
  className?: string;
  label?: string;
};

export default function AddToCartButton({
  slug,
  name,
  desc,
  price,
  image,
  redirectToCart = false,
  className = "",
  label = "加入购物车",
}: Props) {
  const router = useRouter();
  const { items, addToCart, removeFromCart } = useCart();
  const inCart = items.some((x) => x.id === slug);

  if (redirectToCart) {
    return (
      <button
        type="button"
        className={`btn-primary inline-flex items-center justify-center px-8 py-3.5 ${className}`}
        onClick={() => {
          addToCart({ id: slug, name, desc, price, image, quantity: 1 });
          router.push("/cart");
        }}
      >
        {label}
      </button>
    );
  }

  return (
    <button
      type="button"
      className={`inline-flex items-center justify-center rounded-xl px-8 py-3.5 text-sm font-medium transition ${className} ${
        inCart
          ? "bg-foreground/90 text-white hover:bg-foreground"
          : "btn-primary"
      }`}
      onClick={() => {
        if (inCart) removeFromCart(slug);
        else addToCart({ id: slug, name, desc, price, image, quantity: 1 });
      }}
    >
      {inCart ? "取消购买" : label}
    </button>
  );
}
