var destiny2 = require('./index')('03ea2d2ece034719a73f5324eed1e070');

destiny2
    .Search({
        membershipType: 2,
        name: 'mazor85'})
    .then(users => {
        console.log('Search:', users);
    }).catch(err => {
        console.log("err:", err);
    });

destiny2
    .Profile({
        membershipType: 2,
        membershipId: '4611686018429193248'})
    .then(res => {
        console.log('Profile:', res.profile);
    }).catch(err => {
        console.log("err:", err);
    });

destiny2
    .Character({
        membershipType: 2,
        membershipId: '4611686018429193248',
        characterId: '2305843009262175269'})
    .then(res => {
        console.log('Character:', res);
    }).catch(err => {
        console.log("err:", err);
    });
