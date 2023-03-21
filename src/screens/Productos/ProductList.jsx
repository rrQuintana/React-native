import { View, Text, FlatList } from 'react-native'
import * as React from 'react'
import { products } from './Productos'
import ProductCart from './ProductCart'

const ProductList = () => {
  return (
    <FlatList data={products} keyExtractor={(product) => product.id} 
      renderItem={({item}) => <ProductCart {...item} />}
    />
  )
}

export default ProductList