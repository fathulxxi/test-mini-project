import { useState } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { productSchema } from '../../validation/productSchema';

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
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const parsed = productSchema.safeParse({
      ...form,
      price: form.price === '' ? undefined : Number(form.price),
      stock: form.stock === '' ? undefined : Number(form.stock),
    });

    if (!parsed.success) {
      const fieldErrors = {};
      for (const issue of parsed.error.issues) {
        const field = issue.path[0];
        if (field && !fieldErrors[field]) {
          fieldErrors[field] = issue.message;
        }
      }
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
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
          error={errors.brand}
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Input
          label="Category"
          name="category"
          value={form.category}
          onChange={handleChange}
          placeholder="Product category"
          error={errors.category}
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
          className={`px-3 py-2 border rounded-lg text-sm outline-none transition-colors resize-none ${
            errors.description
              ? 'border-red-400 focus:ring-2 focus:ring-red-200'
              : 'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100'
          }`}
        />
        {errors.description && (
          <p className="text-xs text-red-500">{errors.description}</p>
        )}
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
