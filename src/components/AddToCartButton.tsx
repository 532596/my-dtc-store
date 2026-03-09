"use client";

import { useRouter } from "next/navigation";
import { useCart } from "@/contexts/CartContext";

type Props = {
  slug: string;
  name: string;
  desc: string;
  price: number;
  image: string;
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
  const { addToCart } = useCart();

  return (
    <button
      type="button"
      className={`btn-primary inline-flex items-center justify-center px-8 py-3.5 ${className}`}
      onClick={() => {
        addToCart({ id: slug, name, desc, price, image, quantity: 1 });
        if (redirectToCart) router.push("/cart");
      }}
    >
      {label}
    </button>
  );
}
