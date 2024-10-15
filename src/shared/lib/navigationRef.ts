import {
  StackActions,
  createNavigationContainerRef,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {KeyScreen} from '../Navigation/types';

export const navigationRef = createNavigationContainerRef();
export const Stack = createNativeStackNavigator();

export const navigate = (name: KeyScreen, params?) => {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
};

export function push(...args) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(StackActions.push(...args));
  }
}
