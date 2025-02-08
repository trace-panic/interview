import React, { useState, useEffect } from "react";
import { FaShoppingCart, FaHeart } from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState("");

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const addProduct = () => {
    if (newProduct.trim() === "") return;
    setProducts([
      ...products,
      { id: Date.now(), title: newProduct, image: "placeholder_image.jpg" },
    ]);
    setNewProduct("");
  };

  const deleteProduct = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

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

  return (
    <div className="container mx-auto p-6">
      <Slider {...sliderSettings} className="mb-6">
        {flashSales.map((sale, index) => (
          <div key={index} className="bg-black text-white p-6 rounded-lg text-center">
            <h2 className="text-2xl font-bold text-red-500">
              🔥 {sale.title} 🔥
            </h2>
            <p>{sale.description}</p>
          </div>
        ))}
      </Slider>

      <div className="mb-6 flex w-1/2">
        <input
          type="text"
          placeholder="Enter product name"
          value={newProduct}
          onChange={(e) => setNewProduct(e.target.value)}
          className="p-2 border rounded-lg mr-2 flex-grow"
        />
        <button
          onClick={addProduct}
          className="bg-black text-white px-3 py-2 rounded-lg text-sm"
        >
          Add Product
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="border p-4 rounded-lg shadow relative"
          >
            <img
              src={product.image || "placeholder_image.jpg"}
              alt={product.title}
              className="w-full h-48 object-cover mb-4 rounded-md"
            />
            <h3 className="text-lg font-semibold mb-2">{product.title}</h3>
            <div className="flex items-center justify-between">
              <div className="flex space-x-2">
                <FaShoppingCart className="cursor-pointer" />
                <FaHeart className="cursor-pointer" />
              </div>
              <div></div>
            </div>
            <button
              onClick={() => deleteProduct(product.id)}
              className="bg-red-500 text-white px-3 py-1 rounded-lg absolute bottom-4 right-4 text-xs"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;