var fs = require('fs')
let slugify = require('./slugify.js')
var fs = require('fs')
let locations = require('./locations.json')

let locations_refactor = []
let locations_city = {}
let locations_district = {}
for (let i = 0; i < locations.length; i++) {
  let slug_districts = []
  let name_districts = []
  for (let i2 = 0; i2 < locations[i].districts.length; i2++) {
    slug_districts = [
      ...slug_districts,
      ...locations[i].districts[i2].names.map((name) => {
        if (name.length > 3) {
          return slugify(name)
        } else {
          return slugify(locations[i].districts[i2].type.name + name)
        }
      }),
    ]
  }

  let slug_names = locations[i].names.map((name) => slugify(name))

  slug_districts.forEach((name) => {
    locations_district[name] = locations[i].names[0]
  })

  slug_names.forEach((name) => {
    locations_city[name] = locations[i].names[0]
  })
}

fs.writeFile('cities.json', JSON.stringify(locations_city), function (err) {
  if (err) throw err
  console.log('complete')
})

fs.writeFile(
  'district_city.json',
  JSON.stringify(locations_district),
  function (err) {
    if (err) throw err
    console.log('complete')
  }
)
