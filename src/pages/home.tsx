import { Button } from "@/components/ui/button";
import useCartStore from "@/store/cart";
import useProductStore, { Product } from "@/store/products";
import { useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
};

const flashSales = [
  {
    title: "Limited Time Deals on Featured Products!",
    description: "Get up to 50% off on select items. Shop now!",
  },
  {
    title: "Flash Sale: Tech Gadgets",
    description: "Amazing discounts on the latest tech. Don't miss out!",
  },
  {
    title: "Super Sale: Fashion Finds",
    description: "Upgrade your wardrobe for less. Limited time offers!",
  },
];

const Home = () => {
  const { addToCart } = useCartStore();
  const { products, setProducts, lastFetched } = useProductStore();

  useEffect(() => {
    const FETCH_INTERVAL = 1000 * 60 * 60; // 1 hour in milliseconds
    const shouldFetch =
      !lastFetched || Date.now() - lastFetched > FETCH_INTERVAL;

    if (shouldFetch) {
      fetch("https://fakestoreapi.com/products")
        .then((res) => res.json())
        .then((data) => setProducts(data));
    }
  }, [setProducts, lastFetched]);

  const addProductToCart = (product: Product) => {
    addToCart(product.id, product.title, product.image);
  };

  return (
    <div className="container mx-auto p-6 mb-36">
      <Slider {...sliderSettings} className="mb-6">
        {flashSales.map((sale, index) => (
          <div
            key={index}
            className="bg-black text-white p-6 rounded-lg text-center"
          >
            <h2 className="text-2xl font-bold text-red-500">
              🔥 {sale.title} 🔥
            </h2>
            <p>{sale.description}</p>
          </div>
        ))}
      </Slider>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-20">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex flex-col h-[350px] overflow-hidden group"
          >
            <div className="h-48 p-4 flex items-center justify-center bg-gray-50">
              <img
                src={product.image}
                alt={product.title}
                className="h-full object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            <div className="p-4 flex flex-col flex-1">
              <h3 className="text-lg font-medium text-gray-800 line-clamp-2 mb-4">
                {product.title}
              </h3>

              <div className="mt-auto">
                <Button
                  size="lg"
                  className="w-full cursor-pointer"
                  onClick={() => addProductToCart(product)}
                >
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
