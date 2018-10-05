const config = require('./wiki.config.json');
const fs = require('fs');
const request = require('request');

const ctx = require('readline').createInterface({input: fs.createReadStream('./characters.txt')});
ctx.on('line', line => {
    request.post(config.pageID + line.toString(), (err, response, data) => {
        if (err) {
            console.log('Fail at: ' + line)
            throw err;
        }

        let obj = {
            name: JSON.parse(data)['parse']['title'],
            pageid: JSON.parse(data)['parse']['pageid']
        }

        console.log(JSON.stringify(obj));
        // fs.appendFile('./dump_data/' + obj.name + '.json', JSON.stringify(obj), err => {
        //     if (err) throw err;
        // });
    });    
});

// request.post(config.pageID + "Silva", (err, response, data) => {
//     if (err) {
//         throw err;
//     }

//     let obj = {
//         name: JSON.parse(data)['parse']['title'],
//         pageid: JSON.parse(data)['parse']['pageid']
//     }

//     fs.appendFile('./dump_data/' + obj.name + '.json', JSON.stringify(obj), err => {
//         if (err) throw err;
//     });
// });

// request.post(config.wikiURL + "Silva", (err, response, data) => {
//     if (err) {
//         throw err;
//     }
//     let testing = JSON.parse(data);
//     let info = JSON.parse(fs.readFileSync('./dump_data/Silva.json', 'utf8'));
//     let param = testing['query']['pages'][info.pageid.toString()]['revisions'];
//     // let textdata = JSON.stringify(param[0]['*']);
//     fs.appendFile('./components/' + info.name + '.txt', param[0]['*'], err => {
//         if (err) {
//             throw err;
//         }
//     });
// });

/**------------------------------------------------------------------------------------------------------------------------------------
 * Function below is not applicable to the program. I only used it to pull data from the wiki's Character page!
 * ------------------------------------------------------------------------------------------------------------------------------------

    var table = $('.wikitable.tierlist-details');

    handle(table);


    function handle(table){
        table.find('tr').each(function(){
            //var text = $(this).find('td:first').text();
            var href = $(this).find('td:first a:first').attr('href');
            console.log(href);
            //var qty = $(this).find('td:last input:first').val();
            //$('#test').append('<li> text:' + text + '   href: ' + href + '  qty: ' + qty+ '</li>');
        } ); 
    }
*/