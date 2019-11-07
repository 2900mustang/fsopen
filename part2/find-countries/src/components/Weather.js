import React from 'react';

const Weather = ({weather}) => {
	if (!weather) {
		return null
	}

	return (
		<div>
			<strong>temperature:</strong> {weather.temperature} Celcius
			<div>
				<p>{weather.weather_descriptions[0]}</p>
				Last observed at {weather.observation_time}
			</div>
			<div>
				<img src={weather.weather_icons} alt={weather.weather_code} />
			</div>
			<div>
				<strong>wind:</strong> {weather.wind_speed} kph, direction: {weather.wind_dir}
			</div>
		</div>
	);
};

export default Weather