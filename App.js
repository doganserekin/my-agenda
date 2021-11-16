import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from 'react-navigation';
import MainScreen from './screens/MainScreen';
import DetailScreen from './screens/DetailScreen';
import FormScreen from "./screens/FormScreen";

const MainNavigator = createStackNavigator(
  {
    MainScreen: {
      screen: MainScreen,
      navigationOptions: {
        headerShown: false,
      },
    },
    DetailScreen: {
      screen: DetailScreen,
      navigationOptions: {
        headerShown: false,
      },
    },
    FormScreen: {
      screen: FormScreen,
      navigationOptions: {
        headerShown: false,
      },
    },
  },

  {
  initialRouteName: 'MainScreen',
  },

);

const App = createAppContainer(MainNavigator);

export default App;
