import { View, Text, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import ProductCart from "./ProductCart";
import { REACT_APP_SERVER_HOST } from '@env';

const ProductList = () => {
  const SERVER_HOST = process.env.SERVER_HOST

  const [publicaciones, setPublicaciones] = useState([]);
  useEffect(() => {
    fetch(`http://${REACT_APP_SERVER_HOST}/api/publicaciones/tipo/Producto`)
      .then((res) => res.json())
      .then((data) => {
        setPublicaciones(data);
      });
  }, []);

  return (
    <FlatList
      data={publicaciones}
      keyExtractor={(publicaciones) => publicaciones._id}
      renderItem={({ item }) => <ProductCart {...item} />}
    />
  );
};

export default ProductList;
