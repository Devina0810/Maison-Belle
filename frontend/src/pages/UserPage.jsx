import React from "react";
import { toast } from "react-hot-toast";
import { useUserStore } from "../stores/useUserStore";
import { useNavigate } from "react-router-dom";
import axios from "../lib/axios";

const UserPage = () => {
  const { user, checkingAuth, checkAuth } = useUserStore();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = React.useState("details");
  const [editMode, setEditMode] = React.useState(false);
  const [form, setForm] = React.useState({
    name: user?.name || "",
    email: user?.email || "",
    contactNumber: user?.contactNumber || "",
    address: user?.address || "",
  });
  const [orders, setOrders] = React.useState([]);
  const [coupon, setCoupon] = React.useState(null);
  const [loadingOrders, setLoadingOrders] = React.useState(false);
  const [loadingCoupon, setLoadingCoupon] = React.useState(false);
  const [updating, setUpdating] = React.useState(false);

  React.useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        email: user.email || "",
        contactNumber: user.contactNumber || "",
        address: user.address || "",
      });
      fetchOrders();
      fetchCoupon();
    }
  }, [user]);

  const fetchOrders = async () => {
    setLoadingOrders(true);
    try {
      const res = await axios.get("/orders/user");
      setOrders(res.data.orders || []);
    } catch (error) {
      console.log("Error fetching orders", error.message);
      setOrders([]);
    }
    setLoadingOrders(false);
  };

  const fetchCoupon = async () => {
    setLoadingCoupon(true);
    try {
      const res = await axios.get("/coupons");
      setCoupon(res.data || null);
    } catch (error) {
      console.log("Error fetching coupon", error.message);
      setCoupon(null);
    }
    setLoadingCoupon(false);
  };

  const handleEdit = () => setEditMode(true);
  const handleCancel = () => {
    setEditMode(false);
    setForm({
      name: user.name || "",
      email: user.email || "",
      contactNumber: user.contactNumber || "",
      address: user.address || "",
    });
  };
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSave = async () => {
    if (!form.name.trim() || !form.email.trim()) {
      toast.error("Name and email are required");
      return;
    }

    setUpdating(true);
    try {
      await axios.put("/auth/profile", {
        name: form.name,
        email: form.email,
        contactNumber: form.contactNumber,
        address: form.address,
      });

      await checkAuth();
      toast.success("Profile updated successfully");
      setEditMode(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not update profile");
    }
    setUpdating(false);
  };

  if (checkingAuth) {
    return <div className="text-center py-20 text-[#5e412f]">Loading account...</div>;
  }

  if (!user) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#fdfaf5] px-4 font-[Cormorant_Garamond] text-[#5e412f]">
        <h2 className="mb-4 text-center text-4xl font-semibold">Login to view your account</h2>
        <p className="mb-6 text-center text-xl text-[#7b6650]">Track orders, manage details, and view your coupon.</p>
        <button
          className="mb-2 rounded-md bg-[#5e412f] px-8 py-2.5 text-white transition hover:bg-[#4b3426]"
          onClick={() => navigate("/login")}
        >
          Login
        </button>
        <button
          className="rounded-md bg-[#e9ded2] px-8 py-2.5 text-[#5e412f] transition hover:bg-[#dccdbb]"
          onClick={() => navigate("/signup")}
        >
          Sign Up
        </button>
      </div>
    );
  }

  const tabs = [
    { key: "details", label: "User Details" },
    { key: "orders", label: "Order History" },
    { key: "coupon", label: "Coupon" },
  ];
  const displayName = user?.name?.trim() ? user.name : "there";

  return (
    <div className="min-h-screen bg-[#fdfaf5] font-[Cormorant_Garamond] text-[#5e412f]">
      <div className="mx-auto max-w-5xl px-4 py-10">
        <div className="mb-8 rounded-2xl border border-[#e5d4c0] bg-[#fdfaf5] p-6 shadow-lg sm:p-8">
        <p className="text-2xl text-[#7b6650] sm:text-3xl">Hi {displayName},</p>
        <h1 className="text-4xl font-semibold sm:text-5xl">My Account</h1>
        <p className="mt-2 text-xl text-[#7b6650]">Manage your details, orders, and available Maison Belle benefits.</p>
        </div>

        <div className="mb-6 flex flex-wrap gap-3">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`rounded-md px-4 py-2 text-lg transition ${
                activeTab === tab.key
                  ? "bg-[#5e412f] text-white"
                  : "bg-[#e9ded2] text-[#5e412f] hover:bg-[#dccdbb]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === "details" && (
          <div className="rounded-2xl border border-[#e5d4c0] bg-[#fdfaf5] p-6 shadow sm:p-8">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-3xl font-semibold">User Details</h2>
            {!editMode && (
              <button
                className="rounded-md bg-[#5e412f] px-4 py-2 text-white transition hover:bg-[#4b3426]"
                onClick={handleEdit}
              >
                {user.contactNumber || user.address ? "Edit Details" : "Add Details"}
              </button>
            )}
          </div>

          {editMode ? (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className="rounded-md border border-[#decab1] bg-white p-2.5"
                placeholder="Name"
              />
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                className="rounded-md border border-[#decab1] bg-white p-2.5"
                placeholder="Email"
              />
              <input
                name="contactNumber"
                value={form.contactNumber}
                onChange={handleChange}
                className="rounded-md border border-[#decab1] bg-white p-2.5"
                placeholder="Contact Number"
              />
              <input
                name="address"
                value={form.address}
                onChange={handleChange}
                className="rounded-md border border-[#decab1] bg-white p-2.5"
                placeholder="Address"
              />
              <div className="mt-2 flex gap-2 sm:col-span-2">
                <button className="rounded-md bg-[#5e412f] px-4 py-2 text-white" onClick={handleSave} disabled={updating}>
                  {updating ? "Saving..." : "Save"}
                </button>
                <button className="rounded-md bg-[#e9ded2] px-4 py-2" onClick={handleCancel}>
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3 text-xl sm:grid-cols-2">
              <div className="rounded-lg border border-[#e9ded2] bg-white p-3">
                <p className="text-[#7b6650]">Name</p>
                <p className="font-semibold">{user.name || "Not set"}</p>
              </div>
              <div className="rounded-lg border border-[#e9ded2] bg-white p-3">
                <p className="text-[#7b6650]">Email</p>
                <p className="font-semibold">{user.email || "Not set"}</p>
              </div>
              <div className="rounded-lg border border-[#e9ded2] bg-white p-3">
                <p className="text-[#7b6650]">Contact Number</p>
                <p className="font-semibold">{user.contactNumber || "Not set"}</p>
              </div>
              <div className="rounded-lg border border-[#e9ded2] bg-white p-3">
                <p className="text-[#7b6650]">Address</p>
                <p className="font-semibold">{user.address || "Not set"}</p>
              </div>
            </div>
          )}
          </div>
        )}

        {activeTab === "orders" && (
          <div className="rounded-2xl border border-[#e5d4c0] bg-[#fdfaf5] p-6 shadow sm:p-8">
          <h2 className="mb-4 text-3xl font-semibold">Order History</h2>
          {loadingOrders ? (
            <div className="text-[#7b6650]">Loading orders...</div>
          ) : orders.length === 0 ? (
            <div className="rounded-lg border border-dashed border-[#d8c5ad] bg-white p-6 text-xl text-[#7b6650]">
              No orders yet. Your future purchases will show up here.
            </div>
          ) : (
            <ul className="space-y-4">
              {orders.map((order) => (
                <li key={order._id} className="rounded-xl border border-[#e9ded2] bg-white p-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="font-semibold">Order #{order._id.slice(-8).toUpperCase()}</p>
                    <p className="rounded-full bg-[#f5f0e8] px-3 py-1 text-sm">{order.status}</p>
                  </div>
                  <p className="mt-1 text-[#7b6650]">Placed: {new Date(order.createdAt).toLocaleDateString()}</p>
                  <p className="mt-1">Total: ₹{order.totalAmount}</p>

                  <div className="mt-3 space-y-1 text-[#5e412f]">
                    {order.products.map((item, idx) => (
                      <p key={idx} className="text-lg">
                        {item.product?.name || "Product"} x {item.quantity} (₹{item.price})
                      </p>
                    ))}
                  </div>

                  {(order.status === "placed" || order.status === "delivered") && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      <button
                        className="rounded-md bg-[#e9ded2] px-3 py-1.5 text-[#5e412f] hover:bg-[#dccdbb]"
                        onClick={() => handleReturn(order._id)}
                      >
                        Request Return
                      </button>
                      <button
                        className="rounded-md bg-[#e9ded2] px-3 py-1.5 text-[#5e412f] hover:bg-[#dccdbb]"
                        onClick={() => handleExchange(order._id)}
                      >
                        Request Exchange
                      </button>
                    </div>
                  )}

                  {order.status === "requested_return" && (
                    <p className="mt-2 text-[#9c7e5c]">Return requested: {order.returnReason || "Pending reason"}</p>
                  )}
                  {order.status === "requested_exchange" && (
                    <p className="mt-2 text-[#9c7e5c]">Exchange requested: {order.exchangeReason || "Pending reason"}</p>
                  )}
                </li>
              ))}
            </ul>
          )}
          </div>
        )}

        {activeTab === "coupon" && (
          <div className="rounded-2xl border border-[#e5d4c0] bg-[#fdfaf5] p-6 shadow sm:p-8">
          <h2 className="mb-4 text-3xl font-semibold">My Coupon</h2>
          {loadingCoupon ? (
            <div className="text-[#7b6650]">Loading coupon...</div>
          ) : !coupon ? (
            <div className="rounded-lg border border-dashed border-[#d8c5ad] bg-white p-6 text-xl text-[#7b6650]">
              No active coupon right now. Keep shopping to unlock your next reward.
            </div>
          ) : (
            <div className="rounded-xl border border-[#decab1] bg-white p-6">
              <p className="text-[#7b6650]">Coupon Code</p>
              <p className="text-4xl font-semibold tracking-wide">{coupon.code}</p>
              <p className="mt-3 text-xl">Discount: {coupon.discountPercentage}%</p>
              <p className="text-[#7b6650]">Valid until: {new Date(coupon.expirationDate).toLocaleDateString()}</p>
            </div>
          )}
          </div>
        )}
      </div>
    </div>
  );

  function handleReturn(orderId) {
    const reason = prompt("Reason for return?");
    if (!reason) return;
    (async () => {
      try {
        await axios.post("/orders/return", { orderId, reason });
        toast.success("Return request submitted");
        fetchOrders();
      } catch (error) {
        toast.error(error.response?.data?.message || "Could not request return");
      }
    })();
  }

  function handleExchange(orderId) {
    const reason = prompt("Reason for exchange?");
    if (!reason) return;
    (async () => {
      try {
        await axios.post("/orders/exchange", { orderId, reason });
        toast.success("Exchange request submitted");
        fetchOrders();
      } catch (error) {
        toast.error(error.response?.data?.message || "Could not request exchange");
      }
    })();
  }
}

export default UserPage;
