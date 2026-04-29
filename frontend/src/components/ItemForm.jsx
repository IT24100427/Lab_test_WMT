import { useState } from "react";

function ItemForm({ initialValues, onSubmit, submitText }) {
  const [formData, setFormData] = useState(
    initialValues || {
      name: "",
      category: "",
      price: "",
      description: "",
      imageUrl: "",
      discountPercentage: "",
    }
  );
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const validateForm = () => {
    if (!formData.name.trim()) return "Name is required";
    if (!formData.category.trim()) return "Category is required";
    if (!formData.description.trim()) return "Description is required";
    const price = Number(formData.price);
    if (isNaN(price) || price <= 0) return "Valid price > 0 is required";
    const discount = Number(formData.discountPercentage) || 0;
    if (discount < 0 || discount > 100) return "Discount must be 0-100";
    return "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }
    onSubmit({
      ...formData,
      price,
      discountPercentage: discount,
    });
  };

  return (
    <form className="form-card" onSubmit={handleSubmit}>
      <h2>{submitText}</h2>

      {error && <div className="error-message" style={{color: 'red', marginBottom: '1rem'}}>{error}</div>}

      <label>Item Name</label>
      <input name="name" value={formData.name} onChange={handleChange} required />

      <label>Category</label>
      <input name="category" value={formData.category} onChange={handleChange} required />

      <label>Price</label>
      <input
        type="number"
        name="price"
        value={formData.price}
        onChange={handleChange}
        required
        min="0"
      />

      <label>Discount Percentage</label>
      <input
        type="number"
        name="discountPercentage"
        value={formData.discountPercentage}
        onChange={handleChange}
        min="0"
        max="100"
        step="0.01"
      />

      <label>Description</label>
      <textarea
        name="description"
        rows="4"
        value={formData.description}
        onChange={handleChange}
        required
      />

      <label>Image URL</label>
      <input name="imageUrl" value={formData.imageUrl} onChange={handleChange} />

      <button className="btn primary" type="submit">{submitText}</button>
    </form>
  );
}

export default ItemForm;