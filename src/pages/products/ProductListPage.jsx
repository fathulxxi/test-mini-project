import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProducts, deleteProduct } from '../../api/productApi';
import useAuthStore from '../../store/useAuthStore';
import useProductStore from '../../store/useProductStore';
import { useDebounce } from '../../hooks/useDebounce';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Modal from '../../components/ui/Modal';
import Loader from '../../components/ui/Loader';
import useToastStore from '../../store/useToastStore';

const LIMIT = 10;

export default function ProductListPage() {
  const navigate = useNavigate();
  const token = useAuthStore((state) => state.token);
  const {
    products,
    total,
    loading,
    error,
    searchQuery,
    setProducts,
    setLoading,
    setError,
    setSearchQuery,
    removeProduct,
  } = useProductStore();

  const [skip, setSkip] = useState(0);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const addToast = useToastStore((state) => state.addToast);

  const debouncedSearch = useDebounce(searchQuery, 400);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getProducts(token, {
        limit: LIMIT,
        skip,
        q: debouncedSearch,
      });
      setProducts(response.data.products, response.data.total);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [token, skip, debouncedSearch, setLoading, setError, setProducts]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    setSkip(0);
  }, [debouncedSearch]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await deleteProduct(token, deleteTarget.id);
      removeProduct(deleteTarget.id);
      addToast(`Product ${deleteTarget?.title} successfully deleted`, 'success');
      setDeleteTarget(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setDeleting(false);
    }
  };

  const start = skip + 1;
  const end = Math.min(skip + LIMIT, total);

  return (
    <div className="space-y-6">
      <div className="w-full flex items-center justify-between gap-4">
        <div className="w-108">
          <Input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
        <Button className="w-44" onClick={() => navigate('/products/add')}>
          Add Product
        </Button>
      </div>

      {loading && <Loader />}

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
      )}

      {!loading && products.length > 0 && (
        <div className="overflow-x-auto border border-gray-200 rounded-xl shadow-sm bg-white">
          <table className="w-full text-sm divide-y divide-gray-200">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">No</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Image</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Title</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Brand</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Price</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Stock</th>
                <th className="px-4 py-3 text-center font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {products.map((product, idx) => (
                <tr key={product.id} className=" hover:bg-gray-50">
                  <td className="px-4 py-3 text-gray-700">{skip + idx + 1}</td>
                  <td className="px-4 py-3">
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="w-10 h-10 rounded-lg object-cover"
                    />
                  </td>
                  <td className="px-4 py-3 text-gray-900">{product.title}</td>
                  <td className="px-4 py-3 text-gray-600">{product.brand}</td>
                  <td className="px-4 py-3 text-gray-900">${product.price.toFixed(2)}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                        product.stock > 10
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {product.stock}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2 justify-center">
                      <Button
                        variant="secondary"
                        onClick={() => navigate(`/products/${product.id}`)}
                        className="text-xs"
                      >
                        View
                      </Button>
                      <Button
                        variant="secondary"
                        onClick={() => navigate(`/products/${product.id}/edit`)}
                        className="text-xs"
                      >
                        Edit
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => setDeleteTarget(product)}
                        className="text-xs"
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!loading && products.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No products found
        </div>
      )}

      {total > 0 && (
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <div className="text-sm text-gray-600">
            Showing {start}–{end} of {total} products
          </div>
          <div className="flex gap-2">
            <Button
              variant="secondary"
              onClick={() => setSkip(skip - LIMIT)}
              disabled={skip === 0 || loading}
            >
              Prev
            </Button>
            <Button
              variant="secondary"
              onClick={() => setSkip(skip + LIMIT)}
              disabled={skip + LIMIT >= total || loading}
            >
              Next
            </Button>
          </div>
        </div>
      )}

      <Modal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        title="Delete Product"
      >
        <p className="text-gray-700 mb-6">
          Are you sure you want to delete <strong>{deleteTarget?.title}</strong>?
        </p>
        <div className="flex gap-3 justify-end">
          <Button
            variant="secondary"
            onClick={() => setDeleteTarget(null)}
            disabled={deleting}
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={handleDelete}
            loading={deleting}
          >
            Delete
          </Button>
        </div>
      </Modal>
    </div>
  );
}
