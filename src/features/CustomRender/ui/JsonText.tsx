import React, {FC} from 'react';
import {Text, TextStyle} from 'react-native';

const JsonText: FC<{title: string; style?: TextStyle}> = ({title, style}) => {
  return (
    <>
      <Text style={style || undefined}>{title || 'empty'}</Text>
    </>
  );
};

export default JsonText;
