/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  ImageBackground,
  ActivityIndicator,
  TextInput,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import Searchinput from './components/Searchinput';
 
import getImageForWeather from './utils/getImageForWeather';

import {fetchLocationId,fetchWeather} from './utils/api';




class App extends React.Component{
  constructor(props){
    super(props);
    this.state={
      loading:false,
      error:false,
      location:'',
      temperature:0,
      weather:'',};
  }

  handleUpdateLocation= async city=>{
    console.log("aaaa",city)
    if(!city) return;
    this.setState({loading:true},async ()=>{
      try{
        const locationID=await fetchLocationId(city);
        const {location,weather,temperature}=await fetchWeather(locationID,);

        this.setState({
          loading:false,
          error:false,
          location,
          weather,
          temperature,
        });
      }
      catch(e){
        this.setState({
          loading:false,
          error:true,
        });
      }
    });
 };
 componentDidMount(){
   this.handleUpdateLocation('Mancherial');
 }

  render(){
    const {location,weather,temperature,loading,error}=this.state;
    console.log("weather",this.state);
    return(
      <View style={{flex:1}}>
      <StatusBar barStyle="light-content" />
        <ImageBackground
        source={getImageForWeather(weather)}
        style={styles.imagecontainer}
        imageStyle={styles.image}>
      <View style={StyleSheet.container}>
        <ActivityIndicator animating={loading} color="white" size="large" />
          {!loading&&(
            <View>
              {error &&(
                <Text style={[styles.smallText,styles.textStyle]}>
                  could not load weather,please try a different city.
                </Text>
              )}
              
                   <Searchinput 
                      placeholder="search any city"
                      onSubmit={this.handleUpdateLocation} />
                      {!error &&(
                <View>
                   <Text style={[styles.largeText,styles.textStyle]}>{location}</Text>
                   <Text style={[styles.largeText,styles.textStyle]}>{`${Math.round(temperature)}°`}</Text>
                   <Text style={[styles.smallText,styles.textStyle]}>{weather}</Text>
                </View>
              )}
            </View>

          )}
      </View>
     
      </ImageBackground>
      </View>
    );
  }
}
const styles=StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#fff',
    alignItems:'center',
    justifyContent:'center',

  },
  textStyle:{
    textAlign:'center',
    fontFamily:'AvenirNext-Regular'
  },
  largeText:{
    fontSize:44,
  },
  smallText:{
    fontSize:22,
  },
  imagecontainer:{
    flex:1,
  },
  image:{
    flex:1,
    width:null,
    height:null,
    resizeMode:'cover',
  },
})
//   return (
//     <Fragment>
//       <StatusBar barStyle="dark-content" />
//       <SafeAreaView>
//         <ScrollView
//           contentInsetAdjustmentBehavior="automatic"
//           style={styles.scrollView}>
//           <Header />
//           {global.HermesInternal == null ? null : (
//             <View style={styles.engine}>
//               <Text style={styles.footer}>Engine: Hermes</Text>
//             </View>
//           )}
//           <View style={styles.body}>
//             <View style={styles.sectionContainer}>
//               <Text style={styles.sectionTitle}>Step One</Text>
//               <Text style={styles.sectionDescription}>
//                 Edit <Text style={styles.highlight}>App.js</Text> to change this
//                 screen and then come back to see your edits.
//               </Text>
//             </View>
//             <View style={styles.sectionContainer}>
//               <Text style={styles.sectionTitle}>See Your Changes</Text>
//               <Text style={styles.sectionDescription}>
//                 <ReloadInstructions />
//               </Text>
//             </View>
//             <View style={styles.sectionContainer}>
//               <Text style={styles.sectionTitle}>Debug</Text>
//               <Text style={styles.sectionDescription}>
//                 <DebugInstructions />
//               </Text>
//             </View>
//             <View style={styles.sectionContainer}>
//               <Text style={styles.sectionTitle}>Learn More</Text>
//               <Text style={styles.sectionDescription}>
//                 Read the docs to discover what to do next:
//               </Text>
//             </View>
//             <LearnMoreLinks />
//           </View>
//         </ScrollView>
//       </SafeAreaView>
//     </Fragment>
//   );
// };

// const styles = StyleSheet.create({
//   scrollView: {
//     backgroundColor: Colors.lighter,
//   },
//   engine: {
//     position: 'absolute',
//     right: 0,
//   },
//   body: {
//     backgroundColor: Colors.white,
//   },
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//     color: Colors.black,
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//     color: Colors.dark,
//   },
//   highlight: {
//     fontWeight: '700',
//   },
//   footer: {
//     color: Colors.dark,
//     fontSize: 12,
//     fontWeight: '600',
//     padding: 4,
//     paddingRight: 12,
//     textAlign: 'right',
//   },
// });

export default App ;
