import React, {FC, useState} from 'react';
import {FlatList, Linking, TouchableOpacity} from 'react-native';

import {Button, Icon, List} from 'react-native-paper';
import {ImportantContact} from '../../../shared/models/types';
import {useGetAllImportantContactsQuery} from '../../../shared/models/services';

const CityServices: FC = () => {
  const [expanded, setExpanded] = useState<string>('');
  const {data, refetch} = useGetAllImportantContactsQuery();

  const handlePress = (id: string) => {
    if (id === expanded) {
      setExpanded('');
      return;
    }
    setExpanded(id);
  };

  const getExpanded = (id: string) => {
    return id === expanded;
  };

  const ContactItem = ({item}: {item: ImportantContact}) => (
    <List.Accordion
      title={item.contactName}
      left={props => <List.Icon {...props} icon='folder' />}
      expanded={getExpanded(item.id)}
      onPress={() => handlePress(item.id)}>
      {item.contacts.map((contact, index) => (
        <List.Item
          key={'contact' + index}
          title={`Контакт ${index + 1}`}
          onPress={() => {
            Linking.openURL(`tel:${contact}`);
          }}
          left={props => <List.Icon {...props} icon='phone' />}
          description={contact}
        />
      ))}
    </List.Accordion>
  );

  return (
    <>
      <TouchableOpacity
        onPress={() => refetch()}
        style={{alignSelf: 'flex-end'}}>
        {!!data && <Icon source='refresh' color='#6e26f3' size={25} />}
      </TouchableOpacity>
      <List.Section>
        <FlatList
          data={data}
          renderItem={ContactItem}
          keyExtractor={(item, index) =>
            item.id + 'ImportantContacts' + String(index)
          }
          ListEmptyComponent={
            <Button
              mode='text'
              onPress={() => {
                refetch();
              }}>
              Обновить список служб
            </Button>
          }
        />
      </List.Section>
    </>
  );
};

export default CityServices;
