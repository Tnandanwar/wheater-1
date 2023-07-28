const fs = require('fs');
const readlineSync = require('readline-sync');

function loadWeatherData() {
  try {
    const jsonData = fs.readFileSync('weather_data.json', 'utf8');
    return JSON.parse(jsonData);
  } catch (error) {
    console.error('Error loading weather data:', error.message);
    return null;
  }
}

function getWeatherDataByDate(data, date) {
  if (!data || !data.forecast) {
    return [];
  }

  return data.forecast.filter(item => {
    const itemDate = new Date(item. dt_txt);
    return itemDate.toISOString().substring(0, 16) === date;
  });
}

function displayOptions() {
  console.log('Choose an option:');
  console.log('1. Get weather');
  console.log('2. Get Wind Speed');
  console.log('3. Get Pressure');
  console.log('0. Exit');
}

function printWeatherData(data, type) {
  if (data.length === 0) {
    console.log('No data available for the selected date.');
    return;
  }

  switch (type) {
    case 'temperature':
      console.log(`Temperature on ${data[0].dt_txt}: ${data[0].main.temp}°C`);
      break;
    case 'wind':
      console.log(`Wind Speed on ${data[0].dt_txt}: ${data[0].wind.speed} m/s`);
      break;
    case 'pressure':
      console.log(`Pressure on ${data[0].dt_txt}: ${data[0].main.pressure} hPa`);
      break;
    default:
      console.log('Invalid option.');
  }
}


function getUserInput() {
  const data = loadWeatherData();
  if (!data) return;

  while (true) {
    displayOptions();
    const option = readlineSync.question('Enter your choice: ');

    switch (option) {
      case '1':
        const date1 = readlineSync.question('Enter the date (YYYY-MM-DD HH:mm): ');
        const weatherData1 = getWeatherDataByDate(data, date1);
        printWeatherData(weatherData1, 'temperature');
        break;
      case '2':
        const date2 = readlineSync.question('Enter the date (YYYY-MM-DD HH:mm): ');
        const weatherData2 = getWeatherDataByDate(data, date2);
        printWeatherData(weatherData2, 'wind');
        break;
      case '3':
        const date3 = readlineSync.question('Enter the date (YYYY-MM-DD HH:mm): ');
        const weatherData3 = getWeatherDataByDate(data, date3);
        printWeatherData(weatherData3, 'pressure');
        break;
      case '0':
        console.log('Exiting the program.');
        return;
      default:
        console.log('Invalid option. Please choose a valid option.');
    }
  }
}

getUserInput();
