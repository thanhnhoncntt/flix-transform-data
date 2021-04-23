let slugify = require('./slugify.js')
let cities = require('./cities.json')
let district_city = require('./district_city.json')
let keys_city = Object.keys(cities)
let keys_district = Object.keys(district_city)

module.exports = function (location_name) {
  let slugText = slugify(location_name)
  let city = keys_city.find((city) => {
    return slugText.indexOf(city) !== -1
  })
  if (city) {
    return cities[city]
  }
  let district = keys_district.find((city) => {
    return slugText.indexOf(city) !== -1
  })
  if (district) {
    return district_city[district]
  }
  return location_name
}
