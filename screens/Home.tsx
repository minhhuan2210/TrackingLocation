import {
  FlatList,
  Image,
  ListRenderItem,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useState } from 'react';
import {IconMap} from '../assets';

type LocationInfo = {
  id: number;
  name: string;
};

const HomeScreen = () => {
  const mockData: LocationInfo[] = [
    {id: 1, name: 'A'},
    {id: 2, name: 'B'},
    {id: 3, name: 'C'},
    {id: 4, name: 'D'},
  ];

  const [data, setData] = useState<LocationInfo[]>([]);

  const renderItem = ({item}: {item: LocationInfo}) => {
    return (
      <View style={styles.itemContainer} key={item.id}>
        <View style={styles.info}>
          <Text style={styles.itemText}>{item.name}</Text>
          <Image style={styles.image} source={IconMap}></Image>
        </View>
        <View style={styles.actions}>
          <Pressable style={styles.actionItem}>
            <Text>A</Text>
          </Pressable>
          <Pressable style={styles.actionItem}>
            <Text>B</Text>
          </Pressable>
          <Pressable style={styles.actionItem}>
            <Text>C</Text>
          </Pressable>
        </View>
      </View>
    );
  };

  const activeTrackingLocation = () => {
    setData(mockData);
  };

  const renderEmptyComponent = () => {
    return (
      <View style={styles.emptyCompContainer}>
        <Pressable style={styles.emptyActionButton} onPress={activeTrackingLocation}>
          <Text style={styles.emptyTextAction}>Start tracking location</Text>
        </Pressable>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        ListEmptyComponent={renderEmptyComponent}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemContainer: {
    borderWidth: 1,
    borderColor: 'red',
    borderRadius: 16,
    marginVertical: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    justifyContent: 'space-between',
  },
  itemText: {
    fontSize: 30,
  },
  info: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  image: {
    height: 40,
    width: 40,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 30,
  },
  actionItem: {
    borderRadius: 8,
    height: 30,
    width: 50,
    borderWidth: 1,
    borderColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyCompContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyActionButton: {
    borderRadius: 16,
    height: 40,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  emptyTextAction: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
});
