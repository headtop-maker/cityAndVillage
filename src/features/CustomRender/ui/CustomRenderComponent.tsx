import React from 'react';
import {Button, Text, View} from 'react-native';
import {layoutConfig} from './layoutConfig';
import JsonText from './JsonText';

// Определение типов для JSON структуры
type JSONComponent = {
  type: string;
  props?: any;
  children?: JSONComponent[] | string;
};

// Функция для отрисовки компонентов на основе JSON
const renderComponent = (node: JSONComponent): JSX.Element | null => {
  if (typeof node === 'string') {
    return <>{node}</>;
  }

  const {type, props, children} = node;
  const Component = getComponent(type);

  return (
    <View>
      <Component {...props} key={Math.random().toString()}>
        {Array.isArray(children)
          ? children.map(child => renderComponent(child))
          : children}
      </Component>
    </View>
  );
};

// Функция для сопоставления типов компонентов с React Native компонентами
const getComponent = (type: string): React.ComponentType<any> => {
  switch (type) {
    case 'View':
      return View;
    case 'Text':
      return Text;
    case 'JsonText':
      return JsonText;
    case 'Button':
      return Button;
    default:
      return View; // По умолчанию возвращаем View, если тип не известен
  }
};

// Основной компонент
const CustomRenderComponent: React.FC = () => {
  return renderComponent(layoutConfig);
};

export default CustomRenderComponent;
