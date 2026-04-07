import { useEffect, useState } from "react";
import axios from "axios";

function AdminPanel() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await axios.get("http://localhost:8080/items");
      setItems(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ Add Product
  const addProduct = async () => {
    if (!name || !price || !category) {
      alert("Enter name, price & category");
      return;
    }

    try {
      await axios.post("http://localhost:8080/items", {
        name,
        price,
        imageUrl,
        category
      });

      alert("Product Added ✅");

      setName("");
      setPrice("");
      setImageUrl("");
      setCategory("");

      fetchItems();
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ Delete Product
  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/items/${id}`);
      fetchItems();
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ Group by Category
  const groupedItems = items.reduce((acc, item) => {
    const cat = item.category || "Others";
    if (!acc[cat]) {
      acc[cat] = [];
    }
    acc[cat].push(item);
    return acc;
  }, {});

  return (
    <div style={{ padding: "20px" }}>
      <h2>Admin Panel 🧑‍💼</h2>

      {/* ➕ ADD PRODUCT */}
      <div style={{ marginBottom: "20px" }}>
        <input
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        /><br/><br/>

        <input
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        /><br/><br/>

        <input
          placeholder="Category (Fruits, Vegetables...)"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        /><br/><br/>

        <input
          placeholder="Image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        /><br/><br/>

        <button onClick={addProduct}>Add Product</button>
      </div>

      {/* 📦 CATEGORY WISE PRODUCTS */}
      {Object.keys(groupedItems).map(cat => (
        <div key={cat}>
          <h3 style={{ marginTop: "20px" }}>{cat}</h3>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: "15px"
          }}>
            {groupedItems[cat].map(item => (
              <div key={item.id} style={{
                background: "white",
                padding: "10px",
                borderRadius: "10px",
                boxShadow: "0 0 10px rgba(0,0,0,0.2)",
                textAlign: "center"
              }}>
                <img
                  src={item.imageUrl || "https://via.placeholder.com/150"}
                  alt={item.name}
                  style={{
                    width: "100%",
                    height: "120px",
                    objectFit: "cover",
                    borderRadius: "8px"
                  }}
                />

                <h4>{item.name}</h4>
                <p>₹{item.price}</p>

                <button
                  onClick={() => deleteProduct(item.id)}
                  style={{
                    background: "red",
                    color: "white",
                    border: "none",
                    padding: "5px 10px",
                    borderRadius: "5px"
                  }}
                >
                  Delete ❌
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default AdminPanel;