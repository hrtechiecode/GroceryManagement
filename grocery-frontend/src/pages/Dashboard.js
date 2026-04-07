import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {

  const role = localStorage.getItem("role") || "user";

  // COMMON
  const [items, setItems] = useState([]);

  // USER
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");
  const [showCart, setShowCart] = useState(false); // ✅ NEW

  // ADMIN
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");

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

  // ================= USER =================

  const addToCart = (item) => {
    setCart(prev => {
      const exist = prev.find(i => i.id === item.id);
      if (exist) {
        return prev.map(i =>
          i.id === item.id ? { ...i, qty: i.qty + 1 } : i
        );
      } else {
        return [...prev, { ...item, qty: 1 }];
      }
    });
  };

  const increase = (id) => {
    setCart(prev =>
      prev.map(i => i.id === id ? { ...i, qty: i.qty + 1 } : i)
    );
  };

  const decrease = (id) => {
    setCart(prev =>
      prev
        .map(i => i.id === id ? { ...i, qty: i.qty - 1 } : i)
        .filter(i => i.qty > 0)
    );
  };

  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  // ✅ CATEGORY GROUPING
  const groupedItems = filteredItems.reduce((acc, item) => {
    const cat = item.category || "Other";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(item);
    return acc;
  }, {});

  // ================= ADMIN =================

  const addProduct = async () => {
    if (!name || !price) {
      alert("Enter name & price");
      return;
    }

    try {
      await axios.post("http://localhost:8080/items", {
        name,
        category,
        price,
        imageUrl
      });

      alert("Product Added ✅");

      setName("");
      setCategory("");
      setPrice("");
      setImageUrl("");

      fetchItems();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/items/${id}`);
      fetchItems();
    } catch (err) {
      console.error(err);
    }
  };

  // ================= ADMIN UI =================

  if (role === "admin") {
    return (
      <div style={{ fontFamily: "Arial", background: "#f4f6f8", minHeight: "100vh" }}>

        {/* NAVBAR */}
        <div style={{
          background: "#1f2937",
          color: "white",
          padding: "15px 20px",
          display: "flex",
          justifyContent: "space-between"
        }}>
          <h2>Admin Dashboard 🧑‍💼</h2>

          <button
            onClick={() => {
              localStorage.removeItem("role");
              window.location.href = "/";
            }}
            style={{
              background: "red",
              color: "white",
              border: "none",
              padding: "8px"
            }}
          >
            Logout
          </button>
        </div>

        <div style={{ display: "flex", gap: "20px", padding: "20px" }}>

          {/* ADD PRODUCT */}
          <div style={{
            flex: 1,
            background: "white",
            padding: "20px",
            borderRadius: "10px"
          }}>
            <h3>Add Product</h3>

            <input placeholder="Product Name" value={name} onChange={(e) => setName(e.target.value)} /><br/><br/>

            <input placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} /><br/><br/>

            <input placeholder="Price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} /><br/><br/>

            <input placeholder="Image URL" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} /><br/><br/>

            <button onClick={addProduct}>Add Product</button>
          </div>

          {/* PRODUCTS */}
          <div style={{ flex: 2 }}>
            <h3>All Products</h3>

            {items.map(item => (
              <div key={item.id} style={{
                background: "white",
                padding: "10px",
                marginBottom: "10px",
                borderRadius: "8px"
              }}>
                <img
                  src={item.imageUrl || "https://via.placeholder.com/100"}
                  alt={item.name}
                  style={{ width: "80px", height: "80px", objectFit: "cover" }}
                />

                <p>{item.name} - ₹{item.price}</p>

                <button onClick={() => deleteProduct(item.id)}>
                  Delete ❌
                </button>
              </div>
            ))}
          </div>

        </div>
      </div>
    );
  }

  // ================= USER UI =================

  return (
    <div style={{ fontFamily: "Arial", background: "#f5f5f5" }}>

      {/* NAVBAR */}
      <div style={{
        background: "#2874f0",
        padding: "10px",
        color: "white",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <h2>🛒 Grocery App</h2>

        <input
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ width: "40%", padding: "5px" }}
        />

        {/* ✅ CLICK TO OPEN CART */}
        <h3 style={{ cursor: "pointer" }} onClick={() => setShowCart(!showCart)}>
          🛒 Cart ({cart.length})
        </h3>
      </div>

      <div style={{ display: "flex" }}>

        {/* PRODUCTS */}
        <div style={{ flex: 3, padding: "15px" }}>
          {Object.keys(groupedItems).map(cat => (
            <div key={cat}>
              <h2>👉 {cat}</h2>

              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                gap: "15px"
              }}>
                {groupedItems[cat].map(item => (
                  <div key={item.id} style={{
                    background: "white",
                    padding: "10px",
                    borderRadius: "8px"
                  }}>
                    <img
                      src={item.imageUrl || "https://via.placeholder.com/150"}
                      alt={item.name}
                      style={{
                        width: "100%",
                        height: "140px",
                        objectFit: "cover",
                        borderRadius: "8px"
                      }}
                    />

                    <h4>{item.name}</h4>
                    <p>₹{item.price}</p>

                    <button onClick={() => addToCart(item)}>
                      Add to Cart
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CART */}
        {showCart && (
          <div style={{
            flex: 1,
            background: "white",
            padding: "10px"
          }}>
            <h3>Cart</h3>

            {cart.length === 0 ? (
              <p>Empty</p>
            ) : (
              <>
                {cart.map(item => (
                  <div key={item.id}>
                    <p>{item.name}</p>

                    <button onClick={() => decrease(item.id)}>-</button>
                    {item.qty}
                    <button onClick={() => increase(item.id)}>+</button>

                    <span> ₹{item.price * item.qty}</span>
                  </div>
                ))}

                <h3>Total: ₹{total}</h3>

                <button
                  onClick={() => {
                    alert("Order Placed ✅");
                    setCart([]);
                  }}
                  style={{
                    background: "green",
                    color: "white",
                    padding: "10px",
                    border: "none",
                    marginTop: "10px"
                  }}
                >
                  Place Order
                </button>
              </>
            )}
          </div>
        )}

      </div>
    </div>
  );
}

export default Dashboard;