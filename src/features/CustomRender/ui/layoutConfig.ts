type JSONComponent = {
  type: string;
  props?: any;
  children?: JSONComponent[] | string;
};

//   const handlePress = () => {
//     Alert.alert('Button pressed!');
//   };

// JSON структура
export const layoutConfig: JSONComponent = {
  type: 'View',
  props: {
    style: {
      flex: 1,
      backgroundColor: '#f5fcff',
    },
  },
  children: [
    {
      type: 'Text',
      props: {
        style: {
          fontSize: 20,
          textAlign: 'center',
          margin: 10,
        },
        children: 'Hello, World!',
      },
    },
    {
      type: 'View',
      props: {
        style: {width: 50, height: 50, borderWidth: 1},
      },
    },
    {
      type: 'Button',
      props: {
        title: 'Click Me',
      },
    },
    {
      type: 'JsonText',
      props: {
        title: 'Click Me 2',
        style: {alignSelf: 'center', fontSize: 20, color: 'green'},
      },
    },
  ],
};
