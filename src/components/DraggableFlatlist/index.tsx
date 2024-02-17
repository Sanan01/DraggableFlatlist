import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import DraggableFlatList, {
  RenderItemParams,
  ScaleDecorator,
} from 'react-native-draggable-flatlist';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

interface Item {
  key: string;
  label: string;
  backgroundColor: string;
}

interface DraggableListProps {
  items: Item[];
  onDragEnd: (newData: Item[]) => void;
  focusColor?: string;
}

const DraggableList: React.FC<DraggableListProps> = ({
  items,
  onDragEnd,
  focusColor = 'red',
}) => {
  const renderItem = ({item, drag, isActive}: RenderItemParams<Item>) => (
    <ScaleDecorator>
      <TouchableOpacity
        onLongPress={drag}
        disabled={isActive}
        style={[
          styles.rowItem,
          {
            backgroundColor: isActive ? focusColor : item.backgroundColor,
          },
        ]}>
        <Text style={styles.text}>{item.label}</Text>
      </TouchableOpacity>
    </ScaleDecorator>
  );

  return (
    <GestureHandlerRootView>
      <DraggableFlatList
        data={items}
        onDragEnd={({data: newData}) => onDragEnd(newData)}
        keyExtractor={item => item.key}
        renderItem={renderItem}
      />
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  rowItem: {
    height: 100,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default DraggableList;
