const faker = require('faker');
const fs = require('fs');
const wstream = fs.createWriteStream('./fakeData.json');

var startDate = new Date();

for(var i = 1; i < 1000000; i++){
  var restaurant = {
    _id: i,
    name: faker.company.companyName(),
    tagline: faker.company.catchPhrase(),
    type: faker.lorem.word(),
    vicinity: faker.address.streetName(),
    priceLevel: Math.floor((Math.random() * 4) + 1),
    zagatFood: Number((Math.random() * 5).toFixed(1)),
    zagatDecor: Number((Math.random() * 5).toFixed(1)),
    zagatService: Number((Math.random() * 5).toFixed(1)),
    longDescription: faker.lorem.paragraph()
  }
  wstream.write(JSON.stringify(restaurant) + "," + "\n");
  // fs.appendFileSync('fakeData.json', JSON.stringify(restaurant) + "," + "\n", (err) =>{
  //   if(err){
  //     console.log("Error: ", err);
  //   }
  // });

  if(i % 100000 === 0){
    console.log(i + ' records written');
  }
}

wstream.end();
var endDate   = new Date();
var seconds = (endDate.getTime() - startDate.getTime()) / 1000;
console.log('Successfully wrote file in ' + seconds + ' seconds.');
