import { Link } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";
import AddProductForm from "../components/AddProductForm";
import { useRef } from "react";

function AddProduct() {
  const formRef = useRef(null);

  const handleSubmit = () => {
    formRef.current.requestSubmit();
  };

  return (
    <div>
      <Header
        title="Product Add"
        button1={<button onClick={handleSubmit}>Save</button>}
        button2={
          <Link to={"/"}>
            <button>cancel</button>
          </Link>
        }
      />
      <div style={{ minHeight: "74vh" }}>
        <AddProductForm formRef={formRef} />
      </div>
      <Footer />
    </div>
  );
}

export default AddProduct;
