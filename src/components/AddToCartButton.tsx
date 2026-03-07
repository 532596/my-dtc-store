"use client";

import { useRouter } from "next/navigation";
import { useCart } from "@/contexts/CartContext";

type Props = {
  slug: string;
  name: string;
  desc: string;
  price: number;
  image: string;
};

export default function AddToCartButton({ slug, name, desc, price, image }: Props) {
  const router = useRouter();
  const { addToCart } = useCart();

  return (
    <button
      type="button"
      className="btn-primary inline-block px-8 py-3.5"
      onClick={() => {
        addToCart({ id: slug, name, desc, price, image, quantity: 1 });
        router.push("/cart");
      }}
    >
      Add to Cart
    </button>
  );
}
