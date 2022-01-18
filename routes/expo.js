// const { default: axios } = require('axios');
const express = require('express');
const router = express.Router();
const axios = require('axios');
const Card = require('./../models/CardModel');
const User = require('./../models/UserModel');

router.get("/expos", (req, res) => {
    console.log("just testing");

    axios.get("https://opendata.paris.fr/api/records/1.0/search/?dataset=que-faire-a-paris-&q=date_start%3A%5B2021-11-30T23%3A00%3A00Z+TO+2022-02-28T22%3A59%3A59Z%5D&q=date_end%3A%5B2022-01-24T23%3A00%3A00Z+TO+2022-07-31T21%3A59%3A59Z%5D&sort=title&facet=date_start&facet=date_end&facet=tags&facet=address_name&facet=address_zipcode&facet=address&rows=1000")
        .then(({ data }) => {
            //console.log("response", data.records)
            res.render('expo', { expos: data.records })
        })
        .catch((err) => console.error(err))
})

const oneCard = ({

})



module.exports = router;