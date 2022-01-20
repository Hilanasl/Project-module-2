require('../db/index.js');
const axios = require("axios")
const CardModel = require('../models/CardModel');

const cards = [
    {
        title: 'Cooool exhibition 1',
        category: 'exhibition',
        location: 'Louvre',
        address: 'Rue de Rivoli',
        arrond: '1st',
        websiteUrl: 'https://www.louvre.fr/en',
        comments: 'Super old & big building',
    },
    {
        title: 'Amazing street art',
        category: 'street-art',
        location: 'Mairie 11',
        address: 'Boulevard Voltaire',
        arrond: '11th',
        websiteUrl: '',
        comments: 'wowwww cool street art',
    },
    {
        title: 'Little indie gallery',
        category: 'museum',
        location: 'Sedaine',
        address: 'Rue Sedaine',
        arrond: '11th',
        websiteUrl: '',
        comments: 'wowwww you must go here',
    },
    {
        title: 'Modern museum',
        category: 'museum',
        location: 'Paris Museum of Modern Art',
        address: '11 Av. du Président Wilson',
        arrond: '16th',
        websiteUrl: 'http://www.mam.paris.fr/en',
        comments: 'brand new museum',
    }
];


async function fetchParisAPI() {
    const URL = "https://opendata.paris.fr/api/records/1.0/search/?dataset=que-faire-a-paris-&q=&facet=date_start&facet=date_end&facet=tags&facet=address_name&facet=address_zipcode&facet=address_city&facet=programs&refine.tags=Street-art";
    return axios.get(URL)
}


function filterStuffOut({ data }) {
    const temp = data.records.map(infos => {
        const streetArt = infos.fields;

        return {
            title: streetArt.title,
            image: streetArt.cover_url,
            dateStart: streetArt.date_start,
            dateEnd: streetArt.date_end,
            address: streetArt.address_street,
            location: streetArt.address_name || "unknown",
            arrond: streetArt.address_zipcode || "unknown",
            category: streetArt.tags ? streetArt.tags.split(";") : [],
            description: streetArt.description,
            websiteUrl: streetArt.url,
        }
    })

    // maybe you can check the temp array here and remove unwanted docs
    console.log("this is temp", temp)
    return temp;

}

(async function () {


    try {
        // await CardModel.deleteMany();
        const foo = await fetchParisAPI();
        //console.log(foo)
        const streetArts = filterStuffOut(foo);
        console.log("or this one?", streetArts)
        const createdCards = await CardModel.create(streetArts);
        console.log("this one?", createdCards)
        console.log(`Just created ${createdCards.length} cards`);
        process.exit();
    } catch (err) {
        console.log(err);
        process.exit();
    }
}
)();