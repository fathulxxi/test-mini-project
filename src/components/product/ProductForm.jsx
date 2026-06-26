import { useState } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';

export default function ProductForm({
  initialData = {},
  onSubmit,
  onCancel,
  loading = false,
  submitLabel = 'Save',
}) {
  const defaultForm = {
    title: '',
    description: '',
    price: '',
    stock: '',
    brand: '',
    category: '',
  };

  const [form, setForm] = useState(() => ({
    ...defaultForm,
    ...initialData,
  }));

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!form.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!form.price) {
      newErrors.price = 'Price is required';
    } else if (isNaN(Number(form.price))) {
      newErrors.price = 'Price must be a valid number';
    }

    if (!form.stock) {
      newErrors.stock = 'Stock is required';
    } else if (isNaN(Number(form.stock))) {
      newErrors.stock = 'Stock must be a valid number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    onSubmit({
      ...form,
      price: Number(form.price),
      stock: Number(form.stock),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Title"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Product title"
          error={errors.title}
        />

        <Input
          label="Brand"
          name="brand"
          value={form.brand}
          onChange={handleChange}
          placeholder="Product brand"
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Input
          label="Category"
          name="category"
          value={form.category}
          onChange={handleChange}
          placeholder="Product category"
        />

        <Input
          label="Price"
          name="price"
          value={form.price}
          onChange={handleChange}
          placeholder="0.00"
          type="number"
          step="0.01"
          error={errors.price}
        />

        <Input
          label="Stock"
          name="stock"
          value={form.stock}
          onChange={handleChange}
          placeholder="0"
          type="number"
          error={errors.stock}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Product description"
          rows="4"
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-100 resize-none"
        />
      </div>

      {onCancel ? (
        <div className="flex gap-3">
          <Button variant="secondary" type="button" onClick={onCancel} disabled={loading}>
            Cancel
          </Button>
          <Button type="submit" loading={loading}>
            {submitLabel}
          </Button>
        </div>
      ) : (
        <Button type="submit" loading={loading} className="w-full">
          {submitLabel}
        </Button>
      )}
    </form>
  );
}
