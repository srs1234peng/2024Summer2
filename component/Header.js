import { View, Text, Dimensions, useWindowDimensions } from 'react-native'
import React from 'react'

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const Header = ({children, name}) => {
  const {height, width} = useWindowDimensions();
  return (
    <View>
      <Text>Welcome to {name}</Text>
      {children}
    </View>
  )
}

export default Header;
