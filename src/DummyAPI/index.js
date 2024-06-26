export const getProducts = async () => {
  const res = await fetch("https://dummyjson.com/products");
  return await res.json();
};

export const cart = async () => {
  const res = await fetch("https://dummyjson.com/carts/1");
  return await res.json();
};

export const addToCart = async (id) => {
  const res = await fetch("https://dummyjson.com/carts/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId: 1, products: [{ id: id, quantity: 1 },],}),
  });
  return await res.json();
};

export const updateCart = async (id, quantity) => {
  const res = await fetch("https://dummyjson.com/carts/update", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ merge: true, userId: 1, products: [{ id: id, quantity: quantity },],}),
  });
  return await res.json();
}

export const removeFromCart = async (id) => {
  const res = await fetch("https://dummyjson.com/carts/remove", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId: 1, products: [{ id: id, quantity: 0 },],}),
  });
  return await res.json();
};

