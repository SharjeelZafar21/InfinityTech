import React, {useEffect, useState} from 'react';
import {FlatList, Text, View, StyleSheet} from 'react-native';
import AppListing from '../../../components/listing-component/AppListing';
import colors from '../../../config/colors';
import firestore from '@react-native-firebase/firestore';

function LaptopProducts(props) {
  const [laptops, setLaptops] = useState();

  useEffect(() => {
    const myData = async () => {
      const snapshot = await firestore().collection('Laptops').get();
      setLaptops(snapshot.docs.map((doc) => doc.data()));
    };

    myData();
  }, []);

  return (
    <View style={style.container}>
      <FlatList
        data={laptops}
        keyExtractor={(laptops) => laptops.id}
        renderItem={({item}) => (
          <AppListing title={item.title} icon="laptop-mac" />
        )}
        ItemSeparatorComponent={() => (
          <View
            style={{
              width: '100%',
              height: 5,
              backgroundColor: colors.body,
            }}
          />
        )}
      />
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    marginTop: 20,
  },
});

export default LaptopProducts;
