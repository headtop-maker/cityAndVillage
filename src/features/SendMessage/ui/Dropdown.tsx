import React, {FC, useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {Text} from 'react-native-paper';
import {dp} from '../../../shared/lib/getDP';

type TDropdown = {
  options: string[];
  onSelect: (data: string) => void;
  selectedOption: string;
};

const Dropdown: FC<TDropdown> = ({options, selectedOption, onSelect}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleChange = (item: string) => {
    onSelect(item), toggleDropdown();
  };

  const renderItem = ({item}: {item: string}) => {
    return (
      <TouchableOpacity
        style={{alignItems: 'center', margin: 10}}
        onPress={() => handleChange(item)}>
        <Text variant='titleLarge'>{item}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={toggleDropdown}>
          <View style={styles.dropdownButton}>
            <Text variant='titleLarge'>{selectedOption}</Text>
          </View>
        </TouchableWithoutFeedback>

        {isOpen && (
          <View
            style={{
              position: 'absolute',
              backgroundColor: '#FFFFFF',
              zIndex: 3,
              borderWidth: 0.5,
              top: dp(30),
              maxWidth: dp(200),
              maxHeight: dp(170),
            }}>
            <FlatList
              data={options}
              keyExtractor={(item, index) => item + index.toString()}
              renderItem={renderItem}
            />
          </View>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    zIndex: 1,
  },
  dropdownButton: {
    backgroundColor: '#fff',
  },
});

export default Dropdown;
