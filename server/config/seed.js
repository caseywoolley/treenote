/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import faker from 'faker';

import Customer from '../api/customer/customer.model';

import Thing from '../api/thing/thing.model';
import User from '../api/user/user.model';

function randRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

Customer.find({}).remove()
  .then(() => {
    var customers = [];
    var customerCount = 2;
    for(var i = 0; i < customerCount; i++) {
      
    //generate rooms
    var floorCount = randRange(1, 3);
    var roomCount = randRange(1, 6);
    var bathCount = randRange(1, Math.min(4, roomCount));

    var rooms = [];
    for(var j = 0; j < (roomCount + bathCount); j++) {
      rooms.push({
        size: randRange(10, 300),
        windows: randRange(1, 8),
        floor: randRange(1, floorCount),
        isBathroom: false
      })
    }

    //generate home
    var home = {
      name: 'my house',
      size: randRange(800, 3500),
      floors: floorCount,
      rooms: rooms,
      hvac: {
        heat: ['Furnace', 'Boiler', 'Heat Pump', 'Other'][randRange(1,4)],
        ac: ['Central Air', 'Window Unit', 'Mini Split', 'Other'][randRange(1,4)],
        installed: faker.date.past(30 * 12)
      },
      bathrooms: bathCount
    };

    //generate customers
    customers.push({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      homes: [home],
      address: {
        street: faker.address.streetAddress() + ' ' + faker.address.streetName(),
        city: faker.address.city(),
        state: faker.address.state(),
        zip: faker.address.zipCode()
      },
      email: faker.internet.email(),
      phoneNumber: faker.phone.phoneNumber()
    });
  }
  Customer.create(customers)

});



Thing.find({}).remove()
  .then(() => {
    Thing.create({
      name: 'Development Tools',
      info: 'Integration with popular tools such as Bower, Grunt, Babel, Karma, ' +
             'Mocha, JSHint, Node Inspector, Livereload, Protractor, Jade, ' +
             'Stylus, Sass, and Less.'
    }, {
      name: 'Server and Client integration',
      info: 'Built with a powerful and fun stack: MongoDB, Express, ' +
             'AngularJS, and Node.'
    }, {
      name: 'Smart Build System',
      info: 'Build system ignores `spec` files, allowing you to keep ' +
             'tests alongside code. Automatic injection of scripts and ' +
             'styles into your index.html'
    }, {
      name: 'Modular Structure',
      info: 'Best practice client and server structures allow for more ' +
             'code reusability and maximum scalability'
    }, {
      name: 'Optimized Build',
      info: 'Build process packs up your templates as a single JavaScript ' +
             'payload, minifies your scripts/css/images, and rewrites asset ' +
             'names for caching.'
    }, {
      name: 'Deployment Ready',
      info: 'Easily deploy your app to Heroku or Openshift with the heroku ' +
             'and openshift subgenerators'
    });
  });

User.find({}).remove()
  .then(() => {
    User.create({
      provider: 'local',
      name: 'Test User',
      email: 'test@example.com',
      password: 'test'
    }, {
      provider: 'local',
      role: 'admin',
      name: 'Admin',
      email: 'admin@example.com',
      password: 'admin'
    })
    .then(() => {
      console.log('finished populating users');
    });
  });
