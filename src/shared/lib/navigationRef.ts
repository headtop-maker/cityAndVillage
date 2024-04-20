import {
  StackActions,
  createNavigationContainerRef,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

export const navigationRef = createNavigationContainerRef();
export const Stack = createNativeStackNavigator();

export const navigate: typeof navigationRef.navigate = (name, params?) => {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
};

export function push(...args) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(StackActions.push(...args));
  }
}
