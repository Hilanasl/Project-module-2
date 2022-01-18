// const { default: axios } = require('axios');
const express = require('express');
const router = express.Router();
const axios = require('axios');
const Card = require('./../models/CardModel');
const User = require('./../models/UserModel');

router.get("/expos", (req, res) => {
    console.log("just testing");

    axios.get("https://opendata.paris.fr/api/records/1.0/search/?dataset=que-faire-a-paris-&q=&rows=100&facet=date_start&facet=date_end&facet=tags&facet=address_name&facet=address_zipcode&facet=address_city&facet=programs&refine.tags=Expo&refine.tags=Art+contemporain&exclude.tags=conf%C3%A9rence")
        .then(({ data }) => {
            //console.log("response", data.records)
            res.render('expo', { expos: data.records })
        })
        .catch((err) => console.error(err))
})

const oneCard = ({

})



module.exports = router;