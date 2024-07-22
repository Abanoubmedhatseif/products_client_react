import ProductCard from "./ProductCard";

function ProductList({ products, checkedProducts, setCheckedProducts }) {
  const handleCheckboxChange = (productId) => {
    setCheckedProducts((prevCheckedProducts) => {
      if (prevCheckedProducts.includes(productId)) {
        return prevCheckedProducts.filter((id) => id !== productId);
      } else {
        return [...prevCheckedProducts, productId];
      }
    });
  };

  return (
    <div className="flex flex-row flex-wrap justify-center m-3">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          isChecked={checkedProducts.includes(product.id)}
          onCheckboxChange={() => handleCheckboxChange(product.id)}
        />
      ))}
    </div>
  );
}

export default ProductList;
