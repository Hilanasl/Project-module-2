require('../db/index.js');
const axios = require("axios")
const CardModel = require('../models/CardModel');

const allMuseums = [
    {
        "entityUuid": "c66c0c2c-0b42-4441-aa06-7f87ea807c6b",
        "entityLabel": "Maison de Balzac",
        "entityType": "taxonomy_term",
        "fieldLrefAdlib": 1,
        "fieldMuseeCode": "BAL",
        "description": "Particulièrement dynamique, le musée accueille de nombreuses expositions temporaires et propose quantité d'activités liées à Balzac (conférences, visites thématiques). Une conteuse fera découvrir l’univers balzacien aux plus jeunes, et une plasticienne propose des ateliers et animations (payants) ludiques et éducatifs",
        "fieldMuseeLogo": {
            "url": "https://www.parismusees.paris.fr/sites/default/files/2019-07/Maison%20de%20Balzac%20009%20_%2030-05-2018%20%20%C2%A9%20Paris%20Mus%C3%A9es%20_%20Rapha%C3%ABl%20Fournier.jpg"
        },
        "fieldMuseeTitreCourt": "Maison de Balzac",
        "fieldAdresse": {
            "countryCode": "FR",
            "locality": "Paris",
            "postalCode": "75016",
            "addressLine1": "47, rue Raynouard",
            "addressLine2": "",
        }
    },
    {
        "entityUuid": "615c07a3-5070-424d-adc6-bc6176db9e31",
        "entityLabel": "Musée Bourdelle",
        "entityType": "taxonomy_term",
        "fieldLrefAdlib": 2,
        "fieldMuseeCode": "BOU",
        "description": "Le Musée Bourdelle est situé dans les ateliers et les jardins où le sculpteur Antoine Bourdelle (1861-1929) a vécu et travaillé. Il a été agrandi à plusieurs reprises, en 1961 par Henri Gautruche et 1992 par Christian de Portzamparc.",
        "fieldMuseeLogo": {
            "url": "https://www.sortiraparis.com/images/80/90650/540222-le-musee-bourdelle-et-ses-jardins.jpg"
        },
        "fieldMuseeTitreCourt": "Musée Bourdelle",
        "fieldAdresse": {
            "countryCode": "FR",
            "locality": "Paris",
            "postalCode": "75015",
            "addressLine1": "18, rue Antoine Bourdelle",
            "addressLine2": "",
        }
    },
    {
        "entityUuid": "bdbbc809-c790-415f-9da5-2af1ee105074",
        "entityLabel": "Musée Carnavalet, Histoire de Paris",
        "entityType": "taxonomy_term",
        "fieldLrefAdlib": 3,
        "fieldMuseeCode": "CAR",
        "description": "Aujourd’hui, le musée Carnavalet – Histoire de Paris rassemble plus de 625 000 œuvres, de la préhistoire à nos jours. Peintures, sculptures, maquettes, enseignes, dessins, gravures, affiches, médailles et monnaies, objets d’histoire et de mémoire, photographies, boiseries, décors et pièces de mobilier… se complètent pour former une histoire et une mémoire de la capitale, au caractère unique. L’esprit du lieu favorise en effet une visite riche en expériences et en émotions.",
        "fieldMuseeLogo": {
            "url": "https://www.sortiraparis.com/images/80/94014/646250-.jpg"
        },
        "fieldMuseeTitreCourt": "Musée Carnavalet",
        "fieldAdresse": {
            "countryCode": "FR",
            "locality": "Paris",
            "postalCode": "75003",
            "addressLine1": "23 rue de Sévigné",
            "addressLine2": ""
        }
    },
    {
        "entityUuid": "312dda3c-9d19-4ae3-9a63-3267c1b4eddb",
        "entityLabel": "Musée Cernuschi, musée des Arts de l’Asie de la Ville de Paris",
        "entityType": "taxonomy_term",
        "fieldLrefAdlib": 4,
        "fieldMuseeCode": "CER",
        "description": "Le musée Cernuschi est un musée parisien consacré aux arts asiatiques, et plus spécifiquement à ceux de l'Extrême-Orient : Chine, Japon, Corée et Vietnam. C'est le deuxième musée consacré aux arts asiatiques en France et le cinquième consacré à l’art chinois en Europe.",
        "fieldMuseeLogo": {
            "url": "https://www.cernuschi.paris.fr/sites/default/files/styles/1440x900_scale_crop/public/cernuschi_dsc9161_0.jpg?itok=jEqRyS03"
        },
        "fieldMuseeTitreCourt": "Musée Cernuschi",
        "fieldAdresse": {
            "countryCode": "FR",
            "locality": "Paris",
            "postalCode": "75008",
            "addressLine1": "7 avenue Vélasquez",
            "addressLine2": ""
        }
    },
    {
        "entityUuid": "a77343ec-94f3-4b22-8c12-995edf4b2e7f",
        "entityLabel": "Musée Cognacq-Jay, le goût du XVIIIe",
        "entityType": "taxonomy_term",
        "fieldLrefAdlib": 5,
        "fieldMuseeCode": "COG",
        "description": "Le musée Cognacq-Jay, au cœur du Marais, recrée l’atmosphère d’une demeure parisienne au Siècle des Lumières. Installé dans un bel hôtel particulier du XVIe siècle, entre cour et jardin, le musée abrite un exceptionnel ensemble d'œuvres d'art du XVIIIe siècle : peintures de Boucher, Chardin et Fragonard, dessins de Watteau, sculptures, meubles estampillés et objets précieux (bijoux, tabatières, porcelaines de Saxe...). Ernest Cognacq et son épouse Louise Jay, fondateurs du grand magasin La Samaritaine, ont légué les collections à la Ville de Paris en 1928.",
        "fieldMuseeLogo": {
            "url": "https://www.parisinfo.com/var/otcp/sites/images/media/1.-photos/02.-sites-culturels-630-x-405/musee-cognacq-jay-facade-exterieure-jardin-630x405-c-otcp-didier-messina/142009-1-fre-FR/Musee-Cognacq-Jay-facade-exterieure-jardin-630x405-C-OTCP-Didier-Messina.jpg"
        },
        "fieldMuseeTitreCourt": "Musée Cognacq-Jay",
        "fieldAdresse": {
            "countryCode": "FR",
            "locality": "Paris",
            "postalCode": "75003",
            "addressLine1": "8, rue Elzévir",
            "addressLine2": ""
        }
    },
    {
        "entityUuid": "476757e1-44a3-4097-9582-6dfbe4011c9e",
        "entityLabel": "Palais Galliera, musée de la Mode de la Ville de Paris",
        "entityType": "taxonomy_term",
        "fieldLrefAdlib": 9,
        "fieldMuseeCode": "GAL",
        "description": "Édifié au XIXe siècle, le palais Galliera abrite aujourd’hui le musée de la Mode de la Ville de Paris. Ses collections, plus de 100 000 pièces de vêtements et accessoires, sont parmi les plus riches au monde et reflètent les codes de l’habillement et des habitudes vestimentaires de la France du XVIIIe siècle à nos jours. Le musée Galliera vit au rythme d’expositions exclusivement temporaires, deux à trois par an. Le site dispose d’une bibliothèque et un centre de documentation, accessibles uniquement sur rendez-vous.",
        "fieldMuseeLogo": {
            "url": "https://fac.img.pmdstatic.net/fit/https.3A.2F.2Fi.2Epmdstatic.2Enet.2Ffac.2F2021.2F03.2F26.2Fbf5844ba-7a55-4b3f-b54f-5fc2dac4d61c.2Ejpeg/1200x1200/quality/80/crop-from/center/musee-visiter-le-palais-galliera-le-musee-de-la-mode-a-paris.jpeg"
        },
        "fieldMuseeTitreCourt": "Palais Galliera",
        "fieldAdresse": {
            "countryCode": "FR",
            "locality": "Paris",
            "postalCode": "75116",
            "addressLine1": "10, Avenue Pierre-1er-de-Serbie",
            "addressLine2": null
        }
    },
    {
        "entityUuid": "1bca0525-4039-42d1-ab81-352a9c2f5d5a",
        "entityLabel": "Musée d’Art moderne de Paris",
        "entityType": "taxonomy_term",
        "fieldLrefAdlib": 10,
        "fieldMuseeCode": "MAM",
        "description": "Situé entre les Champs-Elysées et la Tour Eiffel, le Musée d’Art Moderne de Paris, palais emblématique exceptionnel de l’architecture des années 30, est sans conteste l’un des établissements phares du champ culturel parisien. Il est aussi par sa collection, riche de plus de 15 000 œuvres, l’un des plus grands musées d’art moderne et contemporain de France.",
        "fieldMuseeLogo": {
            "url": "https://media.admagazine.fr/photos/60c765017f6f5c74ef8d0c82/16:9/w_2580,c_limit/la_visite_virtuelle_du_jour___le_mus__e_d___art_moderne_og_1459.jpeg"
        },
        "fieldMuseeTitreCourt": "Musée d’Art moderne",
        "fieldAdresse": {
            "countryCode": "FR",
            "locality": "Paris",
            "postalCode": "75116",
            "addressLine1": "11, avenue du Président Wilson",
            "addressLine2": ""
        }
    },
    {
        "entityUuid": "ed9874ba-a5fb-4497-9b48-8b9fcbc5e766",
        "entityLabel": "Musée de la Libération de Paris - musée du Général Leclerc - musée Jean Moulin",
        "entityType": "taxonomy_term",
        "fieldLrefAdlib": 11,
        "fieldMuseeCode": "LEC",
        "description": "The Musée de la Libération de Paris - Musée du Général Leclerc - Musée Jean Moulin was inaugurated on 25 August 2019, the 75th anniversary of the Liberation of Paris. Housed in an 18th century heritage site, the entirely restored and redesigned Pavillons Ledoux on Place Denfert-Rochereau, as well as in the neighbouring 19th century building, this new history museum has been created to teach the public about a shared history: that of two historic figures from the Second World War, Philippe Leclerc de Hauteclocque and Jean Moulin, and that of the Liberation of Paris.",
        "fieldMuseeLogo": {
            "url": "https://www.sortiraparis.com/images/80/87752/478859-.jpg"
        },
        "fieldMuseeTitreCourt": "Musée Jean Moulin",
        "fieldAdresse": {
            "countryCode": "FR",
            "locality": "Paris",
            "postalCode": "75014",
            "addressLine1": "Place Denfert-Rochereau",
            "addressLine2": "4 Avenue du Colonel Henri Rol-Tanguy"
        }
    },
    {
        "entityUuid": "ede16978-1741-47ed-bf81-6f2e9d9bbc04",
        "entityLabel": "Maison de Victor Hugo - Hauteville House",
        "entityType": "taxonomy_term",
        "fieldLrefAdlib": 12,
        "fieldMuseeCode": "MVH",
        "description": "Située sur la prestigieuse place de Vosges, au cœur du quartier du Marais, la maison de Victor Hugo invite le visiteur à entrer dans l’intimité du célèbre écrivain français. Il a vécu au deuxième étage de cet hôtel particulier de 1832 à 1848, et il y a écrit quelques unes de ses œuvres majeures et une grande partie des « Misérables ». La visite de l'appartement suit les trois grandes étapes de sa vie : avant, pendant et après l'exil à Guernesey, à travers la présentation de son mobilier, de divers souvenirs et des ses étonnantes décorations d'intérieur. Le premier étage est réservé aux expositions temporaires et présente ses dessins ainsi qu'une iconographie de son œuvre littéraire.",
        "fieldMuseeLogo": {
            "url": "https://static.actu.fr/uploads/2020/11/paris-place-des-vosges-06.jpg"
        },
        "fieldMuseeTitreCourt": "Maison de Victor Hugo",
        "fieldAdresse": {
            "countryCode": "FR",
            "locality": "Paris",
            "postalCode": "75004",
            "addressLine1": "6 place des Vosges",
            "addressLine2": null
        }
    },
    {
        "entityUuid": "58c00891-d14f-46e3-8ee1-4b665c69755f",
        "entityLabel": "Musée de la Vie romantique",
        "entityType": "taxonomy_term",
        "fieldLrefAdlib": 13,
        "fieldMuseeCode": "MVR",
        "description": "Le musée de la Vie romantique est installé dans la maison du peintre Ary Scheffer, construite en 1830. Situé à Pigalle, dans le quartier de La Nouvelle Athènes, le musée reconstitue un cadre historique harmonieux évoquant l’époque romantique. Le rez-de-chaussée est consacré à George Sand : portraits, meubles, et bijoux des XVIIIe et XIXe siècles. Au premier étage, les toiles du peintre Ary Scheffer sont entourées d’œuvres de ses contemporains. Une exposition actuelle est organisée ainsi que des concerts, des lectures et animations pour enfants. Dans le jardin du musée, le salon de thé Rose Bakery, véritable havre de paix, permet de faire une pause gourmande.",
        "fieldMuseeLogo": {
            "url": "https://www.relaisdulouvre.com/images/actualites/Museedelavieroman,tique_2.jpg"
        },
        "fieldMuseeTitreCourt": "Musée de la Vie romantique",
        "fieldAdresse": {
            "countryCode": "FR",
            "locality": "Paris",
            "postalCode": "75009",
            "addressLine1": "16, rue Chaptal",
            "addressLine2": ""
        }
    },
    {
        "entityUuid": "99bb2c1c-7a8d-45ac-9b08-cb29fef24f4e",
        "entityLabel": "Petit Palais, musée des Beaux-arts de la Ville de Paris",
        "entityType": "taxonomy_term",
        "fieldLrefAdlib": 14,
        "fieldMuseeCode": "PPA",
        "description": "Located between the Seine and the Champs-Élysées, the Petit Palais is part of an exceptional monumental environment. Architectural jewel built by Charles Girault for the 1900 Paris Exposition with the Grand Palais and the Pont Alexandre III, the Petit Palais became in 1902 the museum of fine arts to house the rich collections of the City of Paris. The collections offer a wide artistic panorama, from Antiquity to the beginning of the 20th century. A true haven of peace, its interior garden welcomes visitors and allows them to take a pleasant break.",
        "fieldMuseeLogo": {
            "url": "https://www.sortiraparis.com/images/80/83517/556465-.jpg"
        },
        "fieldMuseeTitreCourt": "Petit Palais",
        "fieldAdresse": {
            "countryCode": "FR",
            "locality": "Paris",
            "postalCode": "75008",
            "addressLine1": "Avenue Winston Churchill",
            "addressLine2": null
        }
    },
    {
        "entityUuid": "b4c4116d-1355-45dc-9ef7-ec536263dcf6",
        "entityLabel": "Musée Zadkine",
        "entityType": "taxonomy_term",
        "fieldLrefAdlib": 15,
        "fieldMuseeCode": "ZDK",
        "description": "A proximité du jardin du Luxembourg, le musée Zadkine, niché dans la verdure de son jardin peuplé de sculptures, abrite la maison et les ateliers où Ossip Zadkine (1890-1967), sculpteur d'origine russe et figure majeure de l’École de Paris, vécut et travailla de 1928 à 1967. Le musée présente un parcours d’œuvres représentatif de la richesse et de l’évolution artistique du sculpteur. Du 'primitivisme' des premières sculptures taillées avec sensibilité dans le bois ou la pierre, à la géométrie rigoureuse du cubisme, des lignes fluides d'un néoclassicisme revisité, au lyrisme des dernières années, l’œuvre de Zadkine témoigne d'une liberté et d'une vitalité inépuisables.",
        "fieldMuseeLogo": {
            "url": "https://www.parisinfo.com/var/otcp/sites/images/node_43/node_51/node_77884/node_77888/mus%C3%A9e-zadkine-vue-du-grand-atelier-%7C-630x405-%7C-%C2%A9-b.-fougeirol-adagp-mus%C3%A9e-zadkine/13154600-1-fre-FR/Mus%C3%A9e-Zadkine-Vue-du-grand-atelier-%7C-630x405-%7C-%C2%A9-B.-Fougeirol-ADAGP-Mus%C3%A9e-Zadkine.jpg"
        },
        "fieldMuseeTitreCourt": "Musée Zadkine",
        "fieldAdresse": {
            "countryCode": "FR",
            "locality": "Paris",
            "postalCode": "75006",
            "addressLine1": "100 bis, rue d'Assas",
            "addressLine2": ""
        }
    },
    {
        "entityUuid": "f73658ce-d001-49d3-b3c2-d05ec302b533",
        "entityLabel": "Crypte archéologique de l'Ile de la Cité",
        "entityType": "taxonomy_term",
        "fieldLrefAdlib": 24722,
        "fieldMuseeCode": null,
        "description": "Beneath the Notre-Dame de Paris cathedral square is the most important archaeological crypt in Europe, offering a unique look at the urban and architectural evolution of the Île de la Cité. Visitors can discover the foundations and vestiges of buildings which were constructed between the Gallo-Roman era and the 18th century. Slide shows, models, and guided tours for adults and children complete the visit.",
        "fieldMuseeLogo": {
            "url": "https://www.sortiraparis.com/images/80/91798/580282-.jpg"
        },
        "fieldMuseeTitreCourt": "Crypte archéologique Notre-Dame",
        "fieldAdresse": {
            "countryCode": "FR",
            "locality": "Paris",
            "postalCode": "75004",
            "addressLine1": "7, Place Jean-Paul II, parvis Notre-Dame",
            "addressLine2": ""
        }
    },
    {
        "entityUuid": "163b0af3-8778-4dd5-9803-b73893a5e1ec",
        "entityLabel": "Catacombes de Paris",
        "entityType": "taxonomy_term",
        "fieldLrefAdlib": 0,
        "fieldMuseeCode": null,
        "description": "On appelle 'catacombes' cet ossuaire parisien, recouvrant une superficie de 11 000 m² de souterrains, en référence aux Catacombes de Rome. Le visiteur accède aux catacombes sur la place Denfert-Rochereau. Six millions d’ossements, provenant de différents cimetières parisiens, reposent dans les galeries labyrinthiques d’une longueur de 1,7 kilomètre. La hauteur sous les voûtes est de 1, 80 mètre et la température ambiante est de 14 degrés. La visite est déconseillée aux personnes souffrant l’insuffisance cardiaque ou respiratoire, aux personnes sensibles et aux enfants non accompagnés. Une visite insolite et fascinante ! A noter que la sortie s'effectue au 36 rue Rémy Dumoncel.",
        "fieldMuseeLogo": {
            "url": "http://www.catacombes.paris.fr/sites/default/files/styles/1920x1080/public/2018-10/cat-footer-faq.jpg?itok=_QDHeHmX"
        },
        "fieldMuseeTitreCourt": "Catacombes de Paris",
        "fieldAdresse": {
            "countryCode": "FR",
            "locality": "Paris",
            "postalCode": "75014",
            "addressLine1": "1 avenue du Colonel Henri Rol-Tanguy",
            "addressLine2": ""
        }
    }
]


function filterStuffOut(data) {

    const museums = data.map(infos => {

        //   const museums = infos;
        return {
            title: infos.entityLabel,
            image: infos.fieldMuseeLogo.url,
            address: infos.fieldAdresse.addressLine1,
            //  location: infos.address_name || "unknown",
            arrond: infos.fieldAdresse.postalCode || "unknown",
            //  category: infos.tags ? infos.tags.split(";") : [],
            description: infos.description,
            //  websiteUrl: infos.url,
        }
    })

    // maybe you can check the temp array here and remove unwanted docs
    //  console.log("this is temp", temp)
    return museums;

}

(async function () {


    try {
        // await CardModel.deleteMany();
        // const foo = await fetchParisAPI();
        //console.log(foo)
        const museum = filterStuffOut(allMuseums);
        console.log("-----", allMuseums);
        // console.log("or this one?", expos)
        const createdCards = await CardModel.create(museum);
        console.log("this one?", createdCards)
        console.log(`Just created ${createdCards.length} allMuseums`);
        process.exit();
    } catch (err) {
        console.log(err);
        process.exit();
    }
}
)();