import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById } from '../../api/productApi.js';
import useAuthStore from '../../store/useAuthStore.js';
import Button from '../../components/ui/Button.jsx';
import Loader from '../../components/ui/Loader.jsx';

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = useAuthStore((state) => state.token);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await getProductById(token, id);
        setProduct(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [token, id]);

  if (loading) {
    return <Loader fullPage />;
  }

  if (error || !product) {
    return (
      <div className="space-y-6">
        <Button variant="secondary" onClick={() => navigate(-1)}>
          Back
        </Button>
        <div className="text-center text-red-600">
          {error ? `Error: ${error}` : 'Product not found'}
        </div>
      </div>
    );
  }

  const imageUrl = product.thumbnail || product.images?.[0];
  const formattedPrice = `$${product.price.toFixed(2)}`;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="secondary" onClick={() => navigate(-1)}>
          Back
        </Button>
        <h1 className="text-xl font-bold">{product.title}</h1>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
        <div className="flex">
          {imageUrl && (
            <div className="w-72 shrink-0">
              <img
                src={imageUrl}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="p-6 flex-1">
            <h2 className="text-2xl font-bold mb-1">{product.title}</h2>
            <p className="text-2xl font-bold text-blue-600 mb-4">{formattedPrice}</p>

            <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm mb-4">
              <div>
                <span className="text-gray-500">Brand</span>
                <p className="font-medium text-gray-900">{product.brand || '—'}</p>
              </div>
              <div>
                <span className="text-gray-500">Category</span>
                <p className="font-medium text-gray-900">{product.category || '—'}</p>
              </div>
              <div>
                <span className="text-gray-500">Stock</span>
                <p className="font-medium text-gray-900">{product.stock}</p>
              </div>
              <div>
                <span className="text-gray-500">Rating</span>
                <p className="font-medium text-gray-900">{product.rating}</p>
              </div>
            </div>

            <p className="text-gray-600 text-sm mb-6">{product.description}</p>

            <div className="flex gap-3">
              <Button variant="secondary" onClick={() => navigate('/products')}>
                Back to List
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
