class cityService {

    ucFirst(cityName) {
        return cityName.charAt(0).toUpperCase() + cityName.slice(1);
    }
}

module.exports = cityService;