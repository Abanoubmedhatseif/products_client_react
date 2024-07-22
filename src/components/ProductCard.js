function ProductCard({ product, isChecked, onCheckboxChange }) {
  return (
    <div className="relative flex flex-col min-w-56 h-44 text-center justify-center bg-gray-100 border-b-2 m-3">
      <input
        style={{ transform: "scale(1.2)", transformOrigin: "top left" }}
        className="delete-chechbox absolute left-4 top-4 "
        type="checkbox"
        checked={isChecked}
        onChange={onCheckboxChange}
      />
      <p>{product.sku}</p>
      <p>{product.name}</p>
      <p>{product.price} $</p>
      {product.type === "Book" && <p>Weight : {product.weight} KGs</p>}
      {product.type === "DVD" && <p>Size : {product.size} MBs</p>}
      {product.type === "Furniture" && (
        <p>
          Dimensions : {product.length}X{product.width}X{product.height}
        </p>
      )}
    </div>
  );
}

export default ProductCard;
