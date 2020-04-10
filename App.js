import React from 'react';
import {
  StyleSheet, Text, View,
} from 'react-native';
import { Input, Button } from 'react-native-elements';
import { API_KEY } from './utils/WeatherAPIKey';

import Weather from './components/Weather';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      temperature: 0,
      weatherCondition: null,
      city: null,
      cityName: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // componentDidMount() {
  //   navigator.geolocation.getCurrentPosition(
  //     position => {
  //       this.fetchWeather(position.coords.latitude, position.coords.longitude);
  //     },
  //     error => {
  //       this.setState({
  //         error: 'Error Getting Weather Condtions'
  //       });
  //     }
  //   );
  // }

  displayWeather(cityName) {
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=${API_KEY}&units=metric`,
    )
      .then((res) => res.json())
      .then((json) => {
        // console.log(json);
        this.setState({
          temperature: json.main.temp,
          weatherCondition: json.weather[0].main,
        });
      });
  }

  // fetchWeather(lat, lon) {
  //   fetch(
  //     `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${API_KEY}&units=metric`
  //   )
  //     .then(res => res.json())
  //     .then(json => {
  //       //console.log(json);
  //       this.setState({
  //         temperature: json.main.temp,
  //         weatherCondition: json.weather[0].main,
  //         isLoading: false
  //       });
  //     });
  // }

  handleChange(event) {
    this.setState({
      city: event.target.value,
    });
  }

  handleSubmit(event) {
    const cityState = (this.state.city).toUpperCase();
    this.state.cityName = cityState;
    event.preventDefault();
    this.displayWeather(this.state.cityName);
  }

  render() {
    const {
      weatherCondition, temperature, city, cityName,
    } = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.label}>
          <Text>Check the weather in:</Text>
          <Input inputStyle={styles.input} type="text" placeholder="Enter city" onChange={this.handleChange} required />
          <Button raised title="Go" onPress={this.handleSubmit} />
        </Text>
        <Text>
          {!!this.state.cityName && <Weather cityName={cityName} weather={weatherCondition} temperature={temperature} /> }
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#001f3f',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
    fontSize: 30,
    color: '#fff',
  },
  input: {
    color: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
