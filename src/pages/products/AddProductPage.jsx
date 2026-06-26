import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/useAuthStore';
import useProductStore from '../../store/useProductStore';
import useToastStore from '../../store/useToastStore';
import { addProduct } from '../../api/productApi';
import ProductForm from '../../components/product/ProductForm';

export default function AddProductPage() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const token = useAuthStore((state) => state.token);
  const addProductToStore = useProductStore((state) => state.addProduct);
  const addToast = useToastStore((state) => state.addToast);

  const handleSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await addProduct(token, data);
      addProductToStore(response.data);
      navigate('/products');
    } catch (err) {
      addToast(err.message || 'Failed to add product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold">Add Product</h1>
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <ProductForm onSubmit={handleSubmit} loading={loading} submitLabel="Add Product" />
      </div>
    </div>
  );
}
