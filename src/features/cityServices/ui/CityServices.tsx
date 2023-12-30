import React, {useState} from 'react';
import {Linking} from 'react-native';

import {List} from 'react-native-paper';

const CityServices = () => {
  const [expanded, setExpanded] = useState(false);
  const handlePress = () => setExpanded(!expanded);

  return (
    <List.Section>
      <List.Accordion
        title="Аварийные службы"
        left={props => <List.Icon {...props} icon="folder" />}
        expanded={expanded}
        onPress={handlePress}>
        <List.Item
          title="Газовая служба"
          onPress={() => Linking.openURL(`tel:+79527111111`)}
          left={props => <List.Icon {...props} icon="call-made" />}
        />
        <List.Item
          title="МЧС"
          onPress={() => Linking.openURL(`tel:+79527111111`)}
          left={props => <List.Icon {...props} icon="call-made" />}
        />
      </List.Accordion>
    </List.Section>
  );
};

export default CityServices;
