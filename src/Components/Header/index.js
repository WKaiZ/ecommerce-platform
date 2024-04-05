import { ShoppingCartOutlined } from "@ant-design/icons";
import { Badge, Drawer, InputNumber, Table, Typography, message, Space } from "antd";
import { useEffect, useState } from "react";
import { cart, removeFromCart, updateCart } from "../../DummyAPI";

function AppHeader() {
  return (
    <div className="header">
      <Typography.Title> Emozon! </Typography.Title>
      <AppCart />
    </div>
  );
}

function AppCart() {
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [shoppingCart, setCart] = useState([]);
  useEffect(() => { cart().then((res) => {setCart(global.cartItems) }); }, []);
  return (
    <div>
      <Badge onClick={() => {setCart(global.cartItems); setCartDrawerOpen(true); }} className="cartIcon" >
        <ShoppingCartOutlined />
      </Badge>
      <Drawer
        open={cartDrawerOpen}
        onClose={() => {
          setCartDrawerOpen(false);
          global.cartItems = shoppingCart;
        }}
        title="Your Cart!"
        contentWrapperStyle={{ width: 500 }}
      >
        <Table
          pagination={false}
          columns={[
            { title: "Title", dataIndex: 'title', },
            { title: "Price", dataIndex: "price",
              render: (value) => {
                return <span>${value}</span>;
              },
            },
            { title: "Quantity", dataIndex: "quantity",
              render: (value, record) => {
                return (
                  <InputNumber
                    min={0}
                    defaultValue={value}
                    onChange={(value) => {
                      setCart((pre) => {
                        if (value === 0) {
                          removeFromCart(record.id).then(() => {message.success(`${record.title} has been removed from your cart!`);});
                          return pre.filter((cart) => cart.id !== record.id);;
                        }
                        return pre.map((cart) => {
                          if (record.id === cart.id) {
                            updateCart(record.id, value).then(() => {message.success(`${record.title} quantity has been updated!`);});
                            cart.total = cart.price * value;
                          }
                          return cart;
                        });
                      });
                    }}
                  ></InputNumber>
                );
              },
            },
            {
              title: "Total",
              dataIndex: "total",
              render: (value) => {
                return <span>${value}</span>;
              },
            },
          ]}
          dataSource={[...shoppingCart]}
          summary={(data) => {
            const total = data.reduce((pre, current) => {
              return pre + current.total;
            }, 0);
            return <span>Total: ${total}</span>;
          }}
        />
      </Drawer>
    </div>
  );
}
export default AppHeader;
