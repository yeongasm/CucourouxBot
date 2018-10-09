const config = require('./wiki.config.json');
const fs = require('fs');
const request = require('request');

const ctx = require('readline').createInterface({input: fs.createReadStream('./characters5.txt')});
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

        request.post(config.wikiURL + obj.name, (err, response, data) => {
            if (err) {
                throw err;
            }

            let characterObj = {
                name: getParamValue('name', data),
                title: getParamValue('title', data),
                gender: (getParamValue('gender', data) == "f") ? "female" : "male",
                obtain: getParamValue('obtain', data),
                five_star: getParamValue('5star', data),
                rarity: getParamValue('rarity', data),
                element: getParamValue('element', data),
                type: getParamValue('type', data),
                race: getParamValue('race', data),
                join_weapon: getParamValue('join_weapon', data),
                weapon: getParamValue('weapon', data),
                attack: {
                    min_atk: getParamValue('min_atk', data),
                    max_atk: getParamValue('max_atk', data),
                    flb_atk: getParamValue('flb_atk', data),
                    bonus_atk: getParamValue('bonus_atk', data),
                },
                hp: {
                    min_hp: getParamValue('min_hp', data),
                    max_hp: getParamValue('max_hp', data),
                    flb_hp: getParamValue('flb_hp', data),
                    bonus_hp: getParamValue('bonus_hp', data),
                },
                ougi: {
                    ougi1_name: getParamValue('ougi_name', data),
                    ougi1_desc: getParamValue('ougi_desc', data),
                    ougi2_name: getParamValue('ougi2_name', data),
                    ougi2_desc: getParamValue('ougi2_desc', data),
                    ougi3_name: getParamValue('ougi3_name', data),
                    ougi3_desc: getParamValue('ougi3_desc', data),
                    ougi4_name: getParamValue('ougi4_name', data),
                    ougi4_desc: getParamValue('ougi4_desc', data),
                },
                skill: {
                    a1_name: getParamValue('a1_name', data),
                    a2_name: getParamValue('a2_name', data),
                    a3_name: getParamValue('a3_name', data),
                    a4_name: getParamValue('a4_name', data),
                },
                ability: {
                    sa_name: getParamValue('sa_name', data),
                    sa_desc: getParamValue('sa_desc', data),
                    sa2_name: getParamValue('sa2_name', data),
                    sa2_desc: getParamValue('sa2_desc', data),
                    sa_emp_desc: getParamValue('sa_emp_desc', data),

                },
                wiki_link: `https:/gbf.wiki/${obj.name}`
            };

            fs.appendFile('../dump_data/characters/' + obj.name + '.json', JSON.stringify(characterObj), err => {if (err) throw err;});

        });
    });    
});

/**
 * Might want to expand this function in the future to make it more robust.
 * Probably add regex variants to pull more information.
 */
function getParamValue(param, string) {
    let regex; 

    if (param === 'gender') {
        regex = new RegExp(`(${param}=)([A-Za-z0-9\\s]*)`);
    } else {
        regex = new RegExp(`(${param}=\\s)([A-Za-z0-9.,%!'\\s]*)`);
    }

    let res = regex.exec(string);

    return (regex.test(string)) ? res[2] : "";
}

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