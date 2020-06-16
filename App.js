// React Native
import * as React from 'react';
import { View, StyleSheet } from 'react-native';
// Iconsset: https://iconify.design/icon-sets/ion/
import { Ionicons } from '@expo/vector-icons';
// https://reactnavigation.org
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// https://react-native-elements.github.io/react-native-elements/docs/1.2.0/overview.html
import { CheckBox, Header, Text, Divider } from 'react-native-elements';


// Funktion um das Icon mit der Zahl zu erstellen
// https://reactnavigation.org/docs/tab-based-navigation
function IconWithBadge({ name, badgeCount, color, size }) {
  return (
    <View style={{ width: 24, height: 24, margin: 5 }}>
      <Ionicons name={name} size={size} color={color} />
      {badgeCount > 0 && (
        <View
          style={{
            position: 'absolute',
            right: -6,
            top: -3,
            backgroundColor: 'red',
            borderRadius: 6,
            width: 12,
            height: 12,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}>
            {badgeCount}
          </Text>
        </View>
      )}
    </View>
  );
}

// Beispiel für zwei Neuigkeiten
// die Konstante "news" ist ein Array mit zwei Neuigkeiten
// Diese Informationen würden genau in diesem Format von einer Schnittstelle her kommen (Server)
const news = [
 {
    title: 'Schulhaus Daleu wieder offen',
    text: 'Ein interessanter Text darüber, dass das Schulhaus Daleu in Chur wieder offen ist.'
 },
 {
   title: 'Keine mündlichen und schriftlichen Prüfungen mehr',
   text: 'Alle Informationen zur Prüfungsverordnung bis Sommer 2020.'
 }
]

function HomeIconWithBadge(props) {
  // Der badgeCount steuert die kleine Zahl. Diese Zahl kommt normalerweise vom Server.
  return <IconWithBadge {...props} badgeCount={news.length} />;
}

// Home-Tab
function HomeScreen() {
  return (
    <View>
      <Header
        centerComponent={{ text: 'Home', style: styles.header }}
      />
      <Text h1 style={ styles.h1 }>Neuigkeiten</Text>
      {/*
        <Text h3 style={ styles.h3 }>{news[0].title}</Text>
        <Text style={ styles.block }>{news[0].text}</Text>
      */}
      {
        /*
          https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Array/map
        */
        news.map(e => {
          return (
            <View>
              <Text h3 style={ styles.h3 }>{e.title}</Text>
              <Text style={ styles.block }>{e.text}</Text>
            </View>
          )
        })
      } 
    </View>
  );
}

// Aufgaben-Tab
class TasksScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkboxes: [{
        id: 1,
        title: 'Repetition English Wörter',
        checked: false,
      }, {
        id: 2,
        title: 'Fussballschuhe kaufen',
        checked: true,
      }],
    };
  }

  render() {
    return (
      <View>
        <Text h1>Aufgaben</Text>
        {
          this.state.checkboxes.map(e => {
            return (
              <CheckBox
                left
                title={e.title}
                checked={e.checked}
              />
            )
          })   
        }     
      </View>
    );
  }
}

const Tab = createBottomTabNavigator();

class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              if (route.name === 'Home') {
                return (
                  <HomeIconWithBadge
                    name={
                      focused
                        ? 'ios-information-circle'
                        : 'ios-information-circle-outline'
                    }
                    size={size}
                    color={color}
                  />
                );
              } else if (route.name === 'Aufgaben') {
                return (
                  <Ionicons
                    name={focused ? 'ios-list-box' : 'ios-list'}
                    size={size}
                    color={color}
                  />
                );
              }
            },
          })}
          tabBarOptions={{
            activeTintColor: 'tomato',
            inactiveTintColor: 'gray',
          }}
        >
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Aufgaben" component={TasksScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
}

// Einstiegspunkt der App
export default App

// Styling der App
// https://www.w3schools.com/css/default.asp
const styles = StyleSheet.create({
  header: {
    color: "white",
    fontSize: 20,
    textTransform: "uppercase"
  },
  h1: {
    margin: 10
  },
  h3: {
    margin: 15,
    color: "grey"
  },
  block: {
    marginLeft: 15,
    marginRight: 15,
    paddingBottom: 30
  }
});
