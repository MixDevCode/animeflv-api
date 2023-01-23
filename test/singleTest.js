const { searchAnime } = require('../dist')
searchAnime().then(result => {
    console.log(result);

}).catch(err => {
    console.log(err);

})