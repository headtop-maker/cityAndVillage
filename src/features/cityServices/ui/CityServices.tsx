import React, {FC, useState} from 'react';
import {FlatList, Linking} from 'react-native';

import {List} from 'react-native-paper';
import {ImportantContact} from '../../../shared/models/types';

type ICityServices = {
  importantContacts: ImportantContact[];
};

const CityServices: FC<ICityServices> = ({importantContacts}) => {
  const [expanded, setExpanded] = useState<string>('');
  const handlePress = (id: string) => {
    if (id === expanded) {
      setExpanded('');
      return;
    }
    setExpanded(id);
  };

  const getExpanded = (id: string) => {
    return id === expanded ? true : false;
  };

  const ContactItem = ({item}: {item: ImportantContact}) => (
    <List.Accordion
      title={item.contactName}
      left={props => <List.Icon {...props} icon="folder" />}
      expanded={getExpanded(item.id)}
      onPress={() => handlePress(item.id)}>
      {item.contacts.map((contact, index) => (
        <List.Item
          key={'contact' + index}
          title="Газовая служба"
          onPress={() => Linking.openURL(`tel:${contact}}`)}
          left={props => <List.Icon {...props} icon="phone" />}
          description={contact}
        />
      ))}
    </List.Accordion>
  );

  return (
    <List.Section>
      <FlatList
        data={importantContacts}
        renderItem={ContactItem}
        keyExtractor={item => item.id + 'ImportantContacts'}
      />
    </List.Section>
  );
};

export default CityServices;
