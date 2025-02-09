import { Button } from "@/components/ui/button";
import useCartStore from "@/store/cart";
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

export function Header() {
  const { getTotalItems } = useCartStore();

  return (
    <div className="border-b h-14 w-full bg-background sticky top-0 z-20">
      <div className="container px-4 mx-auto flex justify-between pt-2.5 items-center">
        <Link to="/" className="text-2xl sm:text-3xl font-semibold">
          <span className="text-red-500">The</span> Band
        </Link>
        <div className="flex items-center gap-5">
          <div className="relative">
            <Link to="/cart">
              <ShoppingCart />
              <div className="absolute right-0 top-0 -mr-2 -mt-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-white">
                {getTotalItems()}
              </div>
            </Link>
          </div>
          <Button asChild size="sm" className="px-4">
            <Link to="/login">Login</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
