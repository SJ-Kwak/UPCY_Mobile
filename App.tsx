import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from './src/pages/Home';
import MyPageScreen from './src/pages/MyPage';

import HomeIcon from './src/assets/navbar/Home.svg';
import MyPageIcon from './src/assets/navbar/MyPage.svg';

const Stack = createNativeStackNavigator();

const GlobalTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'white'
  }
}

function App(): React.JSX.Element {
  return (
    <NavigationContainer theme={GlobalTheme}>
      <Stack.Navigator
        screenOptions={() => ({
          headerShown: false,
        })}>
        <Stack.Screen name="Home" component={HomeTab} />
        {/* <Stack.Screen name="Login" component={LoginScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export type TabProps = {
  홈: undefined;
  마이페이지: undefined;
};

const CustomTab = ({ state, descriptors, navigation }: BottomTabBarProps) => {
  return (
    <View
      style={{
        height: 86,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 10,
      }}
    >
      {state.routes.map((route, index) => {
        const isFocused = state.index == index;
        const onPress = () => {
          if (route.name == '홈') {
            if (isFocused)
              navigation.reset({
                routes: [{ name: route.name, params: { id: undefined } }],
              });
            else navigation.navigate(route.name, { id: undefined });
          } else if (route.name == '마이페이지') {
            if (isFocused)
              navigation.reset({
                routes: [{ name: route.name, params: { id: undefined } }],
              });
            else navigation.navigate(route.name, { id: undefined });
          }
        };
        return (
          <TouchableOpacity
            key={index}
            onPress={onPress}
            style={{
              width: '20%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {
              {
                0: <HomeIcon color='#000000' opacity={isFocused ? 1 : 0.4} />,
                1: <MyPageIcon color='#000000' opacity={isFocused ? 1 : 0.4} />,
              }[index]
            }

            <Text
              style={{
                color: '#000000',
                opacity: isFocused ? 1 : 0.4,
                marginVertical: 5,
                fontSize: 12,
              }}
            >
              {route.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  )
}

const Tab = createBottomTabNavigator<TabProps>();
const HomeTab = (): JSX.Element => {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTab {...props} />}
      initialRouteName='홈'
      screenOptions={() => ({
        headerShown: false,
      })}>
      <Tab.Screen name={'홈'} component={HomeScreen} />
      <Tab.Screen name={'마이페이지'} component={MyPageScreen} />
    </Tab.Navigator>
  );
};

export default App;
