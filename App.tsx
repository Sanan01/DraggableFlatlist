import React, {useState} from 'react';
import DraggableList from './src/components/DraggableFlatlist';

const NUM_ITEMS = 10;

function getColor(i: number) {
  const multiplier = 255 / (NUM_ITEMS - 1);
  const colorVal = i * multiplier;
  return `rgb(${colorVal}, ${Math.abs(128 - colorVal)}, ${255 - colorVal})`;
}

const initialData = Array.from({length: NUM_ITEMS}, (_, index) => ({
  key: `item-${index}`,
  label: String(index),
  backgroundColor: getColor(index),
}));

function App() {
  const [data, setData] = useState(initialData);

  const handleDragEnd = (
    newData: React.SetStateAction<
      {key: string; label: string; backgroundColor: string}[]
    >,
  ) => {
    setData(newData);
  };

  return (
    <DraggableList items={data} onDragEnd={handleDragEnd} focusColor="red" />
  );
}

export default App;
