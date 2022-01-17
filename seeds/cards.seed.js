require('../db/index.js');

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

  (async function () {
      try {
          await CardModel.deleteMany();
          const createdCards = await CardModel.create(cards);
          console.log(`Just created ${createdCards.length}`);
          process.exit();
      } catch (err) {
          console.log(err);
          process.exit();
      }
    }
  )();