import React, { Component } from 'react';
import { connect } from 'react-redux';
import Chart from '../components/chart';
import GMap from '../components/google_map';

class WeatherList extends Component {
    renderWeather(cityData) {
        const name = cityData.city.name;
        const temps = cityData.list.map(weather => weather.main.temp);
        const pressures = cityData.list.map(weather => weather.main.pressure);
        const humidities = cityData.list.map(weather => weather.main.humidity);
        const {lat, lon} = cityData.city.coord;

        return (
            <tr key={name}>
                <td>
                    <GMap lat={lat} lon={lon}></GMap>
                </td>
                <td><Chart data={temps} color="orange" /></td>
                <td><Chart data={pressures} color="green" /></td>
                <td><Chart data={humidities} color="black" /></td>
            </tr>
        )
    }

    render() {
        return (
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>City</th>
                        <th>Temperature (K)</th>
                        <th>Pressure (hPa)</th>
                        <th>Humidity (%)</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.weather.map(this.renderWeather)}
                </tbody>
            </table>
        )
    }
}

WeatherList.propTypes = {
    weather: React.PropTypes.array
}

function mapStateToProps({ weather }) {
    // similar to state
    // similar to { weather: state.weather }
    return { weather };
}

export default connect(mapStateToProps)(WeatherList);
