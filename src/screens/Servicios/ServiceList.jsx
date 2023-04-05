import { View, Text, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import ServiceCart from "./ServiceCart";

const ServiceList = () => {
  const [publicaciones, setPublicaciones] = useState([]);
  //Petición get a http://localhost:4000/api/publicaciones
  useEffect(() => {
    fetch("http://192.168.0.6:4000/api/publicaciones/tipo/Servicio")
      .then((res) => res.json())
      .then((data) => {
        setPublicaciones(data);
      });
  }, []);
  return (
    <FlatList
      data={publicaciones}
      keyExtractor={(publicaciones) => publicaciones._id}
      renderItem={({ item }) => <ServiceCart {...item} />}
    />
  );
};

export default ServiceList;
