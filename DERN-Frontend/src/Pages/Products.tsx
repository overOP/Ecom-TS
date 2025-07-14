import React, { useEffect, useState } from "react";
import axios from "axios";
import { ProductCard } from "@/Components/Home/Products/ProductCard";
import { ProductModal } from "@/Components/Home/Products/ProductModal";
import { SyncLoader } from "react-spinners";

type Product = {
  title: string;
  image: string;
  brand: string;
  price: number;
};

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    setLoading(true);
    axios.get("https://fakestoreapi.com/products?limit=8")
      .then((res) => {
        type ApiProduct = {
          title: string;
          image: string;
          category: string;
          price: number;
        };

        const mapped = (res.data as ApiProduct[]).map((p) => ({
          title: p.title,
          image: p.image,
          brand: p.category,
          price: p.price,
        }));
        setProducts(mapped);
      })
      .catch(() => {
        // You could set error state here if you want
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleCreate = (newProduct: Product) => {
    setProducts([newProduct, ...products]);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <SyncLoader color="#3b82f6" size={15} />
      </div>
    );
  }

  return (
    <div className="p-6 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Products</h1>
        <button
          onClick={() => setModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Create Product
        </button>
      </div>

      {modalOpen && (
        <ProductModal onClose={() => setModalOpen(false)} onCreate={handleCreate} />
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product, idx) => (
          <ProductCard key={idx} {...product} />
        ))}
      </div>
    </div>
  );
};

export default Products;
