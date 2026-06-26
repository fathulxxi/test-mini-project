import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById, updateProduct } from '../../api/productApi';
import useAuthStore from '../../store/useAuthStore';
import useProductStore from '../../store/useProductStore';
import useToastStore from '../../store/useToastStore';
import ProductForm from '../../components/product/ProductForm';
import Button from '../../components/ui/Button';
import Loader from '../../components/ui/Loader';

export default function EditProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = useAuthStore((state) => state.token);
  const updateStoreProduct = useProductStore((state) => state.updateProduct);

  const addToast = useToastStore((state) => state.addToast);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await getProductById(token, id);
        setProduct(res.data);
      } catch (err) {
        addToast(err.message || 'Failed to load product');
      }
    };

    fetchProduct();
  }, [token, id]);

  if (product === null) {
    return <Loader fullPage />;
  }

  const handleSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await updateProduct(token, id, data);
      updateStoreProduct(Number(id), res.data);
      navigate('/products');
    } catch (err) {
      addToast(err.message || 'Failed to save product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="secondary" onClick={() => navigate(-1)}>
          Back
        </Button>
        <h1 className="text-xl font-bold">Edit Product</h1>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <ProductForm
          initialData={product}
          onSubmit={handleSubmit}
          onCancel={() => navigate(-1)}
          loading={loading}
          submitLabel="Save Changes"
        />
      </div>
    </div>
  );
}
