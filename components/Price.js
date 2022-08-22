import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export const Price = ({label, bookPrice}) => {
  const titles = {
    WHOAMI: 'Who Am I',
    INDACLUB: 'In Da Club',
    PEACHS: 'Peaches',
  };

  return (
    <View style={styles.itemContainer}>
      <View style={styles.itemTitle}>
        <Text>{titles[label] ? titles[label] : label}</Text>
      </View>
      <View style={styles.itemValue}>
        <Text>Bid: {bookPrice.bid}</Text>
        <Text>Ask: {bookPrice.ask}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#B8B8B8',
  },
  itemTitle: {
    display: 'flex',
    width: '40%',
    justifyContent: 'center',
  },
  itemValue: {
    display: 'flex',
    width: '60%',
    flexDirection: 'column',
  },
});
