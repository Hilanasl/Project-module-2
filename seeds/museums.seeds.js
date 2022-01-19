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
        "fieldMuseeLogo": {
            "url": "https://parismuseescollections.paris.fr/sites/default/files/filefield_paths/logo_musee_balzac.png"
        },
        "fieldMuseeTitreCourt": "Maison de Balzac",
        "fieldAdresse": {
            "countryCode": "FR",
            "locality": "Paris",
            "postalCode": "75016",
            "addressLine1": "47, rue Raynouard",
            "addressLine2": ""
        }
    },
    {
        "entityUuid": "615c07a3-5070-424d-adc6-bc6176db9e31",
        "entityLabel": "Musée Bourdelle",
        "entityType": "taxonomy_term",
        "fieldLrefAdlib": 2,
        "fieldMuseeCode": "BOU",
        "fieldMuseeLogo": {
            "url": "https://parismuseescollections.paris.fr/sites/default/files/images/musee/cj-court_bourdelle.png"
        },
        "fieldMuseeTitreCourt": "Musée Bourdelle",
        "fieldAdresse": {
            "countryCode": "FR",
            "locality": "Paris",
            "postalCode": "75015",
            "addressLine1": "18, rue Antoine Bourdelle",
            "addressLine2": ""
        }
    },
    {
        "entityUuid": "bdbbc809-c790-415f-9da5-2af1ee105074",
        "entityLabel": "Musée Carnavalet, Histoire de Paris",
        "entityType": "taxonomy_term",
        "fieldLrefAdlib": 3,
        "fieldMuseeCode": "CAR",
        "fieldMuseeLogo": {
            "url": "https://parismuseescollections.paris.fr/sites/default/files/images/musee/carnavalet_noir_cmjn.png"
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
        "fieldMuseeLogo": {
            "url": "https://parismuseescollections.paris.fr/sites/default/files/images/musee/logo_cernuschi-court_pngv2.png"
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
        "fieldMuseeLogo": {
            "url": "https://parismuseescollections.paris.fr/sites/default/files/images/musee/cj-court_png_v2.png"
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
        "fieldMuseeLogo": {
            "url": "https://parismuseescollections.paris.fr/sites/default/files/images/musee/cj-court_galliera.png"
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
        "fieldMuseeLogo": {
            "url": "https://parismuseescollections.paris.fr/sites/default/files/images/musee/logo_mam_rs_rvb.png"
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
        "fieldMuseeLogo": {
            "url": "https://parismuseescollections.paris.fr/sites/default/files/images/musee/logotype_liberation_paris_reseaux_plan_de_travail_18.jpg"
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
        "fieldMuseeLogo": {
            "url": "https://parismuseescollections.paris.fr/sites/default/files/images/musee/cj-court_mvh.jpg"
        },
        "fieldMuseeTitreCourt": "Maison de Victor Hugo",
        "fieldAdresse": {
            "countryCode": "FR",
            "locality": "Paris",
            "postalCode": "75014",
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
        "fieldMuseeLogo": {
            "url": "https://parismuseescollections.paris.fr/sites/default/files/images/musee/cj-court_mvr.png"
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
        "fieldMuseeLogo": {
            "url": "https://parismuseescollections.paris.fr/sites/default/files/images/musee/cj-court_pp.png"
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
        "fieldMuseeLogo": {
            "url": "https://parismuseescollections.paris.fr/sites/default/files/images/musee/cj-court_zadkine.png"
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
        "fieldMuseeLogo": {
            "url": "https://parismuseescollections.paris.fr/sites/default/files/images/musee/carrevide.png"
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
        "fieldMuseeLogo": {
            "url": "https://parismuseescollections.paris.fr/sites/default/files/filefield_paths/logotype_catacombes_plan_de_travail.jpg"
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
            comments: null,
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