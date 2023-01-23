const { searchAnimesBySpecificURL } = require('../dist')
searchAnimesBySpecificURL().then(result => {
    console.log(result);

}).catch(err => {
    console.log(err);

})