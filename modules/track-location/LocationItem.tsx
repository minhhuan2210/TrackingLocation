import {
  Image,
  Linking,
  Pressable,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {LocationInfo} from 'types';
import {IconMap} from '../../assets';

type LocationItemProps = {
  item: LocationInfo;
  deleteCallback: () => void;
};

export default function LocationItem(props: LocationItemProps) {
  const {item, deleteCallback} = props;

  const openGoogleMap = (item: LocationInfo) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${item.latitude},${item.longitude}`;
    Linking.openURL(url);
  };

  const editItem = (item: LocationInfo) => {};

  const shareItem = async (item: LocationInfo) => {
    try {
      await Share.share({
        title: 'Sharing location',
        message: `latitude: ${item.latitude},longitude: ${item.longitude}`,
      });
    } catch (error: any) {
      console.log(error);
    }
  };

  const deleteItem = () => {
    deleteCallback();
  };

  return (
    <View style={styles.itemContainer} key={'item.id'}>
      <View style={styles.info}>
        <View>
          <Text style={styles.itemText}>latitude: {item.latitude}</Text>
          <Text style={styles.itemText}>longitude: {item.longitude}</Text>
        </View>
        <Pressable hitSlop={40} onPress={() => openGoogleMap(item)}>
          <Image style={styles.image} source={IconMap}></Image>
        </Pressable>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.actionItem}
          hitSlop={40}
          onPress={() => editItem(item)}>
          <Text style={styles.actionText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionItem}
          hitSlop={40}
          onPress={() => shareItem(item)}>
          <Text style={styles.actionText}>Share</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionItem}
          hitSlop={40}
          onPress={deleteItem}>
          <Text style={[styles.actionText, {color: 'red'}]}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    borderWidth: 2,
    borderColor: '#fa8825',
    borderRadius: 8,
    marginVertical: 5,
    paddingVertical: 10,
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    backgroundColor: '#4d5461',
  },
  itemText: {
    fontSize: 20,
    color: '#ffffff',
  },
  info: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  image: {
    height: 40,
    width: 40,
    marginRight: 20,
  },
  actions: {
    flexDirection: 'row',
    marginTop: 30,
  },
  actionItem: {
    flex: 1,
    height: 30,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  actionText: {
    fontWeight: 'bold',
    color: '#fa8825',
  },
});
