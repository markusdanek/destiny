var destiny = require('./index')('03ea2d2ece034719a73f5324eed1e070');
// var destiny = require('destiny-client')('03ea2d2ece034719a73f5324eed1e070');

destiny
  .Search({
    membershipType: 2,
    name: 'mazor85'
  })
  .then(users => {
    console.log('users', users);
  });


destiny
  .Account({
    membershipType: 2,
    membershipId: '4611686018429193248'
  })
  .then(res => {
    console.log("res:", res);
  })
  .catch(err => {
    console.log("err:", err);
  });
