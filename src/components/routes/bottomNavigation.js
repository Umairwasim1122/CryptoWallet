import * as React from 'react';
import { View, Text } from 'react-native'; 
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { House,Plus,List, } from 'lucide-react-native';


// Import your screens
import Home from '../../screens/dashboard/Home/Home';
import TransactionHistory from '../../screens/List/TransactionHistory';
import Profile from '../../screens/Profile/Profile';
const Tab = createBottomTabNavigator();


function MainTabNavigator() {
  return (
    <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          tabBarHideOnKeyboard: true,
          headerShown: false,
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#FFFF",
          tabBarInactiveTintColor: "#B9B9B9",
          tabBarStyle: {
            backgroundColor: "#D66B00",
            height: 70,
            width: "100%",
          },
        }}
      >
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: ({ color, size, focused }) => (
              <View style={styles.iconContainer}>
                <House  width={size} height={size} color={color} />
                <Text style={{ ...styles.label, color: focused ? "#FFFF" : "#B9B9B9" }}>
                  Home
                </Text>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="TransactionHistory"
          component={TransactionHistory}
          options={{
            tabBarIcon: ({ color, size, focused }) => (
              <View style={styles.iconContainer}>
                <List width={size} height={size} color={color} />
                <Text style={{ ...styles.label, color: focused ? "#FFFF" : "#B9B9B9" }}>
                  list
                </Text>
              </View>
            ),
          }}
        />
          <Tab.Screen
            name="Profile"
            component={Profile}
            options={{
              tabBarIcon: ({ color, size, focused }) => (
                <View style={styles.iconContainer}>
                  <Plus width={size} height={size} color={color} />
                  <Text style={{ ...styles.label, color: focused ? "#FFFF" : "#B9B9B9" }}>
                  Profile
                  </Text>
                </View>
              ),
            }}
          />    
      </Tab.Navigator>
  );
}
const styles = {
  iconContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    height: "80%",
  },
  label: {
    fontFamily: "NotoSans-Regular",
  },
};


export default MainTabNavigator;