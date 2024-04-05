import { Button, Card, Image, List, message, Typography, Select, Input, Space, Rate } from "antd";
import { useEffect, useState } from "react";
import { addToCart, getProducts } from "../../DummyAPI";
import { useParams } from "react-router-dom";

function Products() {
  const param = useParams();
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [sortOrder, setOrder] = useState("");
  const [searchQuery, setQuery] = useState("");
  const [temp, setTemp] = useState("");
  useEffect(() => { setLoading(true); (getProducts()).then((res) => { setItems(res.products); setLoading(false); });}, [param]);

  const getSortedAndFilteredItems = () => {
    const sortedItems = [...items];
    sortedItems.sort((a, b) => {
      if (sortOrder === "ascend") {
        return a.price > b.price ? 1 : a.price === b.price ? 0 : -1;
      } else if (sortOrder === "descend") {
        return a.price < b.price ? 1 : a.price === b.price ? 0 : -1;
      } else if (sortOrder === "rateAscend") {
        return a.rating > b.rating ? 1 : a.rating === b.rating ? 0 : -1;
      } else if (sortOrder === "rateDescend") {
        return a.rating < b.rating ? 1 : a.rating === b.rating ? 0 : -1;
      } else {
        return 0;
      }
    });
    if (searchQuery !== "") {
      return sortedItems.filter((item) => item.title.toLowerCase().includes(searchQuery.toLowerCase()) || item.category.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    return sortedItems;
  };

  return (
    <div className="container">
      <div className="title">
        <div>
        <Typography.Text>View Items Sorted By: </Typography.Text>
        <Select onChange={(value) => { setOrder(value); }} defaultValue={"Default (Random!)"}
          options={[
            { label: "Price: Ascending", value: "ascend", },
            { label: "Price: Descending", value: "descend", },
            { label: "Rating: Ascending", value: "rateAscend", },
            { label: "Rating: Descending", value: "rateDescend", },
            { label: "Default (Random!)", value: "", },]}
        ></Select>
        </div>
        <Space.Compact>
        <Input placeholder="Search for an Item!" onChange={(query) => setTemp(query.target.value)}/>
        <Button type="primary" onClick={() => { setQuery(temp); }} loading={loading}> Submit </Button>
        </Space.Compact>
      </div>
      <List
        loading={loading}
        grid={{column: 4}}
        renderItem={(item, index) => {
          return (
              <Card
                className="item"
                title={item.title}
                key={index}
                cover={
                  <Image className="itemImage" src={item.thumbnail} />
                }
                actions={[
                  <Rate disabled defaultValue={item.rating} />,
                  <AddToCart item={item} />,
                ]}
              >
                <Card.Meta
                  title={
                    <Typography.Paragraph>
                      Price: ${item.price}{" "}
                    </Typography.Paragraph>
                  }
                  description={
                    <Typography.Paragraph
                      ellipsis={{ rows: 2, expandable: true, symbol: "Click for More" }}
                    >
                      {item.description}
                    </Typography.Paragraph>
                  }
                ></Card.Meta>
              </Card>
          );
        }}
        dataSource={getSortedAndFilteredItems()}
      ></List>
    </div>
  );
}

function AddToCart({ item }) {
  const [loading, setLoading] = useState(false);
  const addProductToCart = () => {
    setLoading(true);
    addToCart(item.id).then(() => {
      message.success(`${item.title} has been added to your cart! You wanna buy more?`);
      let flag = false; 
      for (const i of global.cartItems) {
        if (i['id'] === item.id) {
          i['quantity'] += 1;
          flag = true;
        }
      }
      if (flag === false) {
        global.cartItems.push({id: item.id, title: item.title, price: item.price, quantity: 1, total: item.price});
      }
      setLoading(false);
    });
  };
  return (
    <Button
      type="link"
      onClick={() => {
        addProductToCart();
      }}
      loading={loading}
    >
      Add to Cart
    </Button>
  );
}
export default Products;
