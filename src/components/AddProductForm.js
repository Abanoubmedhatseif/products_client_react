import React, { useState } from "react";

const Base_URL = process.env.REACT_APP_BASE_URL;

const ProductForm = ({ formRef }) => {
  const [formData, setFormData] = useState({
    sku: "",
    name: "",
    price: "",
    type: "",
    size: "",
    weight: "",
    length: "",
    width: "",
    height: "",
  });

  const [errors, setErrors] = useState({
    sku: "",
    name: "",
    price: "",
    productType: "",
    size: "",
    weight: "",
    length: "",
    width: "",
    height: "",
  });

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [id]: type === "checkbox" ? checked : value,
    });
  };

  const validate = () => {
    let valid = true;
    let newErrors = {
      sku: "",
      name: "",
      price: "",
      productType: "",
      size: "",
      weight: "",
      length: "",
      width: "",
      height: "",
    };

    if (!formData.sku) {
      newErrors.sku = "SKU is required";
      valid = false;
    }

    if (!formData.name) {
      newErrors.name = "Name is required";
      valid = false;
    }

    if (!formData.price) {
      newErrors.price = "Price is required";
      valid = false;
    } else if (isNaN(formData.price) || formData.price <= 0) {
      newErrors.price = "Price must be a positive number";
      valid = false;
    }

    if (formData.productType === "DVD" && !formData.size) {
      newErrors.size = "Size is required for DVD";
      valid = false;
    }

    if (formData.productType === "Book" && !formData.weight) {
      newErrors.weight = "Weight is required for Book";
      valid = false;
    }

    if (formData.productType === "Furniture") {
      if (!formData.length) {
        newErrors.length = "Length is required for Furniture";
        valid = false;
      }
      if (!formData.width) {
        newErrors.width = "Width is required for Furniture";
        valid = false;
      }
      if (!formData.height) {
        newErrors.height = "Height is required for Furniture";
        valid = false;
      }
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const res = await fetch(`${Base_URL}/addProduct.php`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const data = await res.json();
        console.log(formData);
        if (data.status === "error") {
          console.log("Error submitting form data:", data);
          return;
        }

        console.log("Form data submitted successfully:", data);
        setFormData({
          sku: "",
          name: "",
          price: "",
          type: "",
          size: "",
          weight: "",
          length: "",
          width: "",
          height: "",
        });
        window.location.href = "/";
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  return (
    <div>
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="p-4 max-w-md mx-auto"
      >
        <div className="mb-4">
          <label
            htmlFor="sku"
            className="block text-sm font-medium text-gray-700"
          >
            SKU
          </label>
          <input
            id="sku"
            type="text"
            value={formData.sku}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            required
          />
          {errors.sku && (
            <p className="text-red-500 text-sm mt-1">{errors.sku}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            id="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            required
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700"
          >
            Price
          </label>
          <input
            id="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            required
          />
          {errors.price && (
            <p className="text-red-500 text-sm mt-1">{errors.price}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="type"
            className="block text-sm font-medium text-gray-700"
          >
            type
          </label>
          <select
            id="type"
            value={formData.type}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            required
          >
            <option value="">Select type</option>
            <option id="Book" value="Book">
              Book
            </option>
            <option id="DVD" value="DVD">
              DVD
            </option>
            <option id="Furniture" value="Furniture">
              Furniture
            </option>
          </select>
          {errors.type && (
            <p className="text-red-500 text-sm mt-1">{errors.type}</p>
          )}
        </div>

        {formData.type === "DVD" && (
          <div>
            <p className="block text-center text-base font-semibold text-gray-800 my-6">
              Please provide the sixe in MB
            </p>
            <div className="mb-4">
              <label
                htmlFor="size"
                className="block text-sm font-medium text-gray-700"
              >
                Size (MB)
              </label>
              <input
                id="size"
                type="number"
                value={formData.size}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            {errors.size && (
              <p className="text-red-500 text-sm mt-1">{errors.size}</p>
            )}
          </div>
        )}

        {formData.type === "Book" && (
          <div>
            <p className="block text-center text-base font-semibold text-gray-800 my-6">
              Please provide the book weight in kg
            </p>
            <div className="mb-4">
              <label
                htmlFor="weight"
                className="block text-sm font-medium text-gray-700"
              >
                Weight (kg)
              </label>
              <input
                id="weight"
                type="number"
                value={formData.weight}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            {errors.weight && (
              <p className="text-red-500 text-sm mt-1">{errors.weight}</p>
            )}
          </div>
        )}

        {formData.type === "Furniture" && (
          <div>
            <p className="block text-center text-base font-semibold text-gray-800 my-6">
              Please provide the dimensions in cm
            </p>
            <div className="mb-4">
              <label
                htmlFor="length"
                className="block text-sm font-medium text-gray-700"
              >
                Length (cm)
              </label>
              <input
                id="length"
                type="number"
                value={formData.length}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded"
                required
              />
              {errors.length && (
                <p className="text-red-500 text-sm mt-1">{errors.length}</p>
              )}
            </div>
          </div>
        )}

        {formData.type === "Furniture" && (
          <div className="mb-4">
            <label
              htmlFor="width"
              className="block text-sm font-medium text-gray-700"
            >
              Width (cm)
            </label>
            <input
              id="width"
              type="number"
              value={formData.width}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
              required
            />
            {errors.width && (
              <p className="text-red-500 text-sm mt-1">{errors.width}</p>
            )}
          </div>
        )}

        {formData.type === "Furniture" && (
          <div className="mb-4">
            <label
              htmlFor="height"
              className="block text-sm font-medium text-gray-700"
            >
              Height (cm)
            </label>
            <input
              id="height"
              type="number"
              value={formData.height}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
              required
            />
            {errors.height && (
              <p className="text-red-500 text-sm mt-1">{errors.height}</p>
            )}
          </div>
        )}
      </form>
    </div>
  );
};

export default ProductForm;
