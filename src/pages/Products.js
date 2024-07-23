import Header from "../components/Header";
import Footer from "../components/Footer";
import ProductList from "../components/ProductList";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Base_URL = process.env.REACT_APP_BASE_URL;

function Products() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [checkedProducts, setCheckedProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  async function getProducts() {
    try {
      setIsLoading(true);
      const response = await fetch(`${Base_URL}/getAllProducts.php`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      const products = data[0].data;
      setProducts(products);
      setIsLoading(false);
      console.log(data[0].data);
    } catch (error) {
      console.error("Error fetching products:", error);
      setError(true);
      setIsLoading(false);
    }
  }

  async function massDelete(products) {
    try {
      const response = await fetch(`${Base_URL}/deleteProducts.php`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ids: products }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Error deleting products: ${response.status} ${errorText}`
        );
      }

      setProducts((prevProducts) =>
        prevProducts.filter((product) => !products.includes(product.id))
      );
      console.log("Successfully deleted products:", JSON.stringify(products));
    } catch (error) {
      console.error("Failed to delete products:", error);
    }
  }

  return (
    <div>
      <Header
        title="Product List"
        button1={
          <Link to={"/AddProduct"}>
            <button>ADD</button>
          </Link>
        }
        button2={
          <button
            id="delete-product-button"
            onClick={() => massDelete(checkedProducts)}
          >
            MASS DELETE
          </button>
        }
      />
      {isLoading && <div>Loading...</div>}
      {error && <div>Error fetching products</div>}
      {!isLoading && !error && (
        <div style={{ minHeight: "74vh" }}>
          <ProductList
            products={products}
            checkedProducts={checkedProducts}
            setCheckedProducts={setCheckedProducts}
          />
        </div>
      )}
      <Footer />
    </div>
  );
}

export default Products;
