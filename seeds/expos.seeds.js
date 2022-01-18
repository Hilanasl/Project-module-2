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
  const URL = "https://opendata.paris.fr/api/records/1.0/search/?dataset=que-faire-a-paris-&q=date_start%3A%5B2021-11-30T23%3A00%3A00Z+TO+2022-02-28T22%3A59%3A59Z%5D&q=date_end%3A%5B2022-01-24T23%3A00%3A00Z+TO+2022-07-31T21%3A59%3A59Z%5D&sort=title&facet=date_start&facet=date_end&facet=tags&facet=address_name&facet=address_zipcode&facet=address&rows=1000";
  return axios.get(URL)
}


function filterStuffOut({ data }) {
  const temp = data.records.map(infos => {
    const expo = infos.fields;
    //console.log(expo)
    return {
      title: expo.title,
      image: expo.cover_url,
      address: expo.address_street,
      location: expo.address_name || "unknown",
      arrond: expo.address_zipcode || "unknown",
      category: expo.tags ? expo.tags.split(";") : [],
      comments: null,
      websiteUrl: expo.url,
    }
  })
  // maybe you can check the temp array here and remove unwanted docs
  return temp;
}

(async function () {


  try {
    await CardModel.deleteMany();
    const foo = await fetchParisAPI();
    //console.log(foo)
    const expos = filterStuffOut(foo);
    const createdCards = await CardModel.create(expos);

    console.log(`Just created ${createdCards.length}`);
    process.exit();
  } catch (err) {
    console.log(err);
    process.exit();
  }
}
)();