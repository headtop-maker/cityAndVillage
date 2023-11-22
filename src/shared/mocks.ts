import {Status, TServiceItem} from './types';

export const importantDataMocks = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
    text: 'В некоторых случаях компоненты заголовка должны взаимодействовать с компонентом экрана',
    status: Status.important,
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
    text: 'В некоторых случаях компоненты заголовка должны взаимодействовать с компонентом экрана',
    status: Status.inforamation,
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
    text: 'В некоторых случаях компоненты заголовка должны взаимодействовать с компонентом экрана',
    status: Status.inforamation,
  },
];

export const newsDataMocks = [
  {
    id: 1,
    newsDate: '03.09.2023',
    title:
      'В некоторых случаях компоненты заголовка должны взаимодействовать с компонентом экрана',
    imgSrc:
      'https://d-ved.ru/wp-content/uploads/2020/10/%D1%84%D0%BE%D1%82%D0%BE-%D0%B1%D1%8B%D0%B2%D1%88%D0%B0%D1%8F-%D1%88%D0%BA%D0%BE%D0%BB%D0%B0_IMG_2431-840x480.jpg',
  },
  {
    id: 2,
    newsDate: '03.09.2023',
    title:
      'В некоторых случаях компоненты заголовка должны взаимодействовать с компонентом экрана',
    imgSrc:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Zhyolnino-2.JPG/800px-Zhyolnino-2.JPG',
  },
  {
    id: 3,
    newsDate: '03.09.2023',
    title:
      'В некоторых случаях компоненты заголовка должны взаимодействовать с компонентом экрана',
    imgSrc:
      'https://upload.wikimedia.org/wikipedia/commons/1/1a/Zhyolnino-3.JPG',
  },
];

export const servicesMock: TServiceItem[] = [
  {
    id: 1,
    imgSrc: 'builder',
    nameService: 'строительство',
  },
  {
    id: 2,
    imgSrc: 'electrician',
    nameService: 'электрики',
  },
  {
    id: 3,
    imgSrc: 'gardener',
    nameService: 'садоводство',
  },
  {
    id: 4,
    imgSrc: 'worker',
    nameService: 'разнорабочий',
  },
];

// import {useNavigation} from '@react-navigation/native';
// import {NativeStackNavigationProp} from '@react-navigation/native-stack';

// import SCREENS from '../../../Navigation/screens';
// import {IRouteParamList} from '../../../Navigation/types';
// const navigation =
//   useNavigation<NativeStackNavigationProp<IRouteParamList>>();
