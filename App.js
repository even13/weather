import React from 'react';
import { StyleSheet, Text, View, Animated } from 'react-native';

import { API_KEY } from './utils/WeatherAPIKey';

import Weather from './components/Weather';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      temperature: 0,
      weatherCondition: null,
      city: null,
      cityName: '',
      error: null
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  };

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

  displayWeather(city) {
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${API_KEY}&units=metric`
    )
      .then(res => res.json())
      .then(json => {
        console.log(json)
        this.setState({
          city: true,
          cityName: city,
          temperature: json.main.temp,
          weatherCondition: json.weather[0].main,
          isLoading: false
        })
      })
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
      cityName: event.target.value
    });
    console.log(this.state)
  }

  handleSubmit(event) {
    this.setState({
      city: event.target.value,
      cityName: event.target.value
    });
    console.log(this.state)
    event.preventDefault();
    var city = this.state.city;
    this.displayWeather(city)
  }

  render() {
    const { isLoading, weatherCondition, temperature, city, cityName } = this.state;
    return (
      <View style={styles.container}>
        {city ? (
          <div>
            <div>
              <form onSubmit={this.handleSubmit}>
                <label>
                  City:
                  <input type="text" placeholder='Enter city' onChange={this.handleChange} />
                </label>
                <input type="submit" value="Submit" />
              </form>
            </div>
            <div>
              <Weather city={cityName} weather={weatherCondition} temperature={temperature} />
            </div>
          </div>
        ) : (
          <div>
            <form onSubmit={this.handleSubmit}>
              <label>
                City:
                <input type="text" placeholder='Enter city' onChange={this.handleChange} />
              </label>
              <input type="submit" value="Submit" />
            </form>
          </div>
        )}
      </View>

      );
    }
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFDE4'
  },
  loadingText: {
    fontSize: 30
  }
});
