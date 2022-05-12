let axios = require('axios');
let prompt = require('prompt-sync')();
let location;
let latitude;
let longitude;
let units;
let maxTemps;
let minTemps;
let maxPrecip;
let maxWind;
let minTempsHigh;
let maxTempsLow;
function setLocation() {
    location = prompt('Enter a City, State or Country:');
    units = prompt(`Enter your preferred unit measurement(metric,imperial or scientific): `, "imperial");

    let locationConfig = {
        method: 'get',
        url: 'https://google-maps-geocoding.p.rapidapi.com/geocode/json',
        params: { address: location, language: "en" },
        headers: {
            'X-RapidAPI-Host': 'google-maps-geocoding.p.rapidapi.com',
            'X-RapidAPI-Key': process.env.API_KEY,
        }
    };

    axios(locationConfig)
        .then(function (response) {
            latitude = response.data.results[0].geometry.location.lat
            longitude = response.data.results[0].geometry.location.lng
            console.log(latitude)
            getData()
        })
        .catch(function (error) {
            console.log(error);
        });
}
function maxTemperature(responseData) { // Max Temperature High
    //console.log(JSON.stringify(responseData))
    //  console.log(responseData.data[0].start)
    let maxTemps = {}

    for (const row in responseData.data) {
        let startYear = responseData.data[row].start
        let endYear = responseData.data[row].end
        let month = responseData.data[row].month
        let tmax = responseData.data[row].tmax

        if (maxTemps[month] == null) {
            maxTemps[month] = {};
            maxTemps[month]['TempHigh'] = tmax;
            maxTemps[month]['startYear'] = startYear;
            maxTemps[month]['endYear'] = endYear
        }

        if (tmax > maxTemps[month].TempHigh) {
            maxTemps[month]['TempHigh'] = tmax;
            maxTemps[month]['startYear'] = startYear;
            maxTemps[month]['endYear'] = endYear
        }

    }
    return maxTemps
}
function maxTemperatureLow(responseData) {
    //console.log(JSON.stringify(responseData))
    //  console.log(responseData.data[0].start)
    maxTempsLow = {}

    for (const row in responseData.data) {
        let startYear = responseData.data[row].start
        let endYear = responseData.data[row].end
        let month = responseData.data[row].month
        let tmax = responseData.data[row].tmax

        if (maxTempsLow[month] == null) {
            maxTempsLow[month] = {};
            maxTempsLow[month]['TempHighLow'] = tmax;
            maxTempsLow[month]['startYear'] = startYear;
            maxTempsLow[month]['endYear'] = endYear
        }

        if (tmax < maxTempsLow[month].TempHighLow) {
            maxTempsLow[month]['TempHighLow'] = tmax;
            maxTempsLow[month]['startYear'] = startYear;
            maxTempsLow[month]['endYear'] = endYear
        }

    }
    return maxTempsLow
}
function minTemperature(responseData) {
    //console.log(JSON.stringify(responseData))
    //  console.log(responseData.data[0].start)
    let minTemps = {}

    for (const row in responseData.data) {
        let startYear = responseData.data[row].start
        let endYear = responseData.data[row].end
        let month = responseData.data[row].month
        let minTem = responseData.data[row].tmin

        // console.log(startYear + '-' + endYear + '-' + month + ':' + tMax)

        if (minTemps[month] == null) {
            minTemps[month] = {}
            minTemps[month]['minTemp'] = minTem
            minTemps[month]['startYear'] = startYear
            minTemps[month]['endYear'] = endYear
        }

        if (minTem > minTemps[month].minTemp) {
            minTemps[month]['minTemp'] = minTem
            minTemps[month]['startYear'] = startYear
            minTemps[month]['endYear'] = endYear

        }

    }
    return minTemps
}
function minTemperatureHigh(responseData) {
    //console.log(JSON.stringify(responseData))
    //  console.log(responseData.data[0].start)
    minTempsHigh = {}

    for (const row in responseData.data) {
        let startYear = responseData.data[row].start
        let endYear = responseData.data[row].end
        let month = responseData.data[row].month
        let minTem = responseData.data[row].tmin

        // console.log(startYear + '-' + endYear + '-' + month + ':' + tMax)

        if (minTempsHigh[month] == null) {
            minTempsHigh[month] = {}
            minTempsHigh[month]['minTempHigh'] = minTem
            minTempsHigh[month]['startYear'] = startYear
            minTempsHigh[month]['endYear'] = endYear
        }

        if (minTempsHigh < minTempsHigh[month].minTempHigh) {
            minTempsHigh[month]['minTempHigh'] = minTem
            minTempsHigh[month]['startYear'] = startYear
            minTempsHigh[month]['endYear'] = endYear

        }

    }
    return minTempsHigh
}
function maxPrecipitation(responseData) {
    //console.log(JSON.stringify(responseData))
    //  console.log(responseData.data[0].start)
    let maxPrecip = {}

    for (const row in responseData.data) {
        let startYear = responseData.data[row].start
        let endYear = responseData.data[row].end
        let month = responseData.data[row].month
        let prcpMax = responseData.data[row].prcp

        // console.log(startYear + '-' + endYear + '-' + month + ':' + tMax)

        if (maxPrecip[month] == null) {
            maxPrecip[month] = {}
            maxPrecip[month]['prcpHigh'] = prcpMax
            maxPrecip[month]['startYear'] = startYear
            maxPrecip[month]['endYear'] = endYear
        }

        if (prcpMax > maxPrecip[month].prcpHigh) {
            maxPrecip[month]['prcpHigh'] = prcpMax
            maxPrecip[month]['startYear'] = startYear
            maxPrecip[month]['endYear'] = endYear

        }

    }
    return maxPrecip
}
function maxWindSpeed(responseData) {
    //console.log(JSON.stringify(responseData))
    //  console.log(responseData.data[0].start)
    let maxWind = {}

    for (const row in responseData.data) {
        let startYear = responseData.data[row].start
        let endYear = responseData.data[row].end
        let month = responseData.data[row].month
        let wndMax = responseData.data[row].wspd

        // console.log(startYear + '-' + endYear + '-' + month + ':' + tMax)

        if (maxWind[month] == null) {
            maxWind[month] = {}
            maxWind[month]['windSpeed'] = wndMax
            maxWind[month]['startYear'] = startYear
            maxWind[month]['endYear'] = endYear
        }

        if (wndMax > maxWind[month].windSpeed) {
            maxWind[month]['windSpeed'] = wndMax
            maxWind[month]['startYear'] = startYear
            maxWind[month]['endYear'] = endYear

        }

    }
    return maxWind
}
function dataMenu() {
    let menuResponse;
    while (menuResponse != 'q') {
        console.log('--Availible Data--')
        console.log('1 - Highest Temperature Highs')
        console.log('2 - Highest Temperature Lows')
        console.log('3 - Avg Precipitation')
        console.log('4 - Max Wind Speeds')
        console.log('5- All Data Sets')
        console.log('q- Quit')
        menuResponse = prompt(`What type of data do you want to see? `,)
        console.log(menuResponse)
        switch (menuResponse) {
            case '1':
                console.log(maxTemps)
                break;
            case '2':
                console.log(minTemps)
                break;
            case '3':
                console.log(maxPrecip)
                break;
            case '4':
                console.log(maxWind)
                break;
            case '5':
                console.log(maxTemps)
                console.log(maxTempsLow)
                // console.log(minTemps)
                // // console.log(maxPrecip)
                // // console.log(maxWind)
                // console.log(minTempsHigh)
                break;
            case 'q':
                console.log('bye')
                break;
            default: console.log('Choose a correct response:')
        }
    }
}
function getData() {
    let dataConfig = {
        method: 'get',
        url: 'https://meteostat.p.rapidapi.com/point/normals?lat=' + latitude + '&lon=' + longitude + '&units=' + units,

        headers: {
            'x-rapidapi-host': 'meteostat.p.rapidapi.com',
            'x-rapidapi-key': process.env.API_KEY,
        }
    };

    axios(dataConfig)
        .then(function (response) {
            maxTemps = maxTemperature(response.data)
            maxTempsLow = maxTemperatureLow(response.data)
            maxPrecip = maxPrecipitation(response.data)
            minTemps = minTemperature(response.data)
            minTempsHigh = minTemperatureHigh(response.data)
            maxWind = maxWindSpeed(response.data)
            dataMenu()
        })
        .catch(function (error) {
            console.log(error);
        });
}

setLocation()

