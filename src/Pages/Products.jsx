import { FcSearch } from "react-icons/fc"; 
import axios from "axios";
import React, { useEffect, useState } from "react";
import useStore from "../store/CartStore.js";
import { toast } from "react-toastify";
import notificationsound from "/sound/addedSound.wav";
import "react-toastify/dist/ReactToastify.css";

const Products = () => {
  const { increase, addToCart } = useStore();

  const notify = () => {
    toast("Added To Cart Successfully", {
      position: "top-center",
      autoClose: 2000,
      style: { background: "green", color: "white" },
    });
    playSound();
  };

  function playSound() {
    const audio = new Audio(notificationsound);
    audio.play();
  } 
  

  const [items, setItems] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const fetchdata = async () => {
    const response = await axios.get("https://fakestoreapi.com/products");
    setItems(response.data);
  };

  useEffect(() => {
    fetchdata();
  }, []);

  const handleSearch = (e) => {
    const text = e.target.value.toLowerCase();
    const filteredResult = items.filter(
      (item) =>
        item.title.toLowerCase().includes(text) ||
        item.description.toLowerCase().includes(text) ||
        item.category.toLowerCase().includes(text)
    );
    setFiltered(filteredResult);
  };

  return (
    <section className="bg-white min-h-screen py-10 px-4">
      <div className="flex items-center justify-center gap-2 m-3 p-4   ">
        <FcSearch  className="text-2xl text-blue-500" />
        <input
          type="search"
          className="border-2 border-blue-400 w-[300px] pl-4 rounded-2xl"
          onChange={handleSearch}
          placeholder="Search products..."
        />
      </div>

      {/* Category Buttons */}
      <div className="flex gap-3 text-xl mb-2 justify-center">
        <button
          onClick={() =>
            setFiltered(items.filter((i) => i.category === "men's clothing"))
          }
          className="bg-green-400 text-white px-2  py-1 rounded"
        >
          Men's
        </button>
        <button
          onClick={() =>
            setFiltered(items.filter((i) => i.category === "jewelery"))
          }
          className="bg-green-400 text-white px-2 py-1  rounded"
        >
          Jewellery
        </button>
        <button
          onClick={() =>
            setFiltered(items.filter((i) => i.category === "electronics"))
          }
          className="bg-green-400 text-white px-2  py-1 rounded"
        >
          Electronics
        </button>
        <button
          onClick={() =>
            setFiltered(items.filter((i) => i.category === "women's clothing"))
          }
          className="bg-green-400 text-white px-2  py-1 rounded"
        >
          Women's
        </button>
        <button
          onClick={() => setFiltered([])}
          className="bg-green-400 text-white px-2 py-1  rounded"
        >
          Show All
        </button>
      </div>

      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
         Our Products
        </h2>

        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {(filtered.length ? filtered : items).map((data) => (
            <li
              key={data.id}
              className="bg-white text-gray-800 border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col"
            >
              <div className="p-4 flex-grow flex flex-col">
                <img
                  src={data.image}
                  alt={data.title}
                  className="h-40 w-full object-contain mb-4 rounded"
                  loading="lazy"
                />
                <h1 className="text-lg font-semibold mb-1">{data.title}</h1>
                <h3 className="text-blue-600 font-bold text-md mb-2">
                  ${data.price}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-3 mb-4">
                  {data.description}
                </p>
                <button
                  onClick={() => {
                    increase();
                    addToCart(data);
                    notify();
                  }}
                  className="mt-auto bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition-colors duration-200"
                >
                  Add to Cart
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Products;
