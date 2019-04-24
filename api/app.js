const cities = require('cities.json');
const express = require('express');
const app = express();
const port = 8085;
const service = require('./cityService.js');

app.use(function(req, res, next) {
    res.set('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    res.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.set('Access-Control-Allow-Credentials', true);
    next();
});

app.use(express.json());

app.options('*', function(req, res) {
    res.send('OK');
});

const city = {
	list: [],
	service: new service(),
	limit: 10,
	start: 0,
};

cities.forEach(function(cities) {
    city.list.push(cities.name);
});

app.post('/citysearch', function(req, res) {
	/* empty new api call */
    const uniqueLimitCityName = [];
    let uniqueCityName = [];
    let selectFromCityList = [];

    /* ucFirst city name search in the list */
    selectFromCityList =
        city.list.filter(word => word.substring(0, req.body.city.length).toLowerCase() === req.body.city.toLowerCase());

    selectFromCityList.forEach(function(cityName) {
        if (cityName === city.service.ucFirst(req.body.city) && cityName.length === req.body.city.length) {
            selectFromCityList.unshift(cityName);

        }
    });
    /* unique city name | if the city name is already exist in list */
    uniqueCityName = selectFromCityList.filter(function(item, index) {
        return selectFromCityList.indexOf(item) >= index;
    });

    /* limit loop */
    for (let i = city.start; i < city.limit; i++) {
        uniqueLimitCityName.push(uniqueCityName[i]);
    }

    res.json({
        city: uniqueLimitCityName,
    });
});

app.listen(port, () => console.log(`The app listening on port ${port}!`));