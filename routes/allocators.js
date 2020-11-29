const express = require('express');
const router = express.Router();
const ZCRMRestClient = require('zcrmsdk');
const utils = require('../utils.js');
const url = require('url');
const _ = require('lodash');
const eventController = require('../controllers/events-log');
router.post('/search', (req, res) => {
    
    var formData = req.body;
    var requestParams = formData.keyword.toString().split(" ");
    console.log("hhhheeee", requestParams);
    input = {};
    input.module = "Allocators";
    var params = {};
    params.page = 0;
    params.per_page = 50;
    var searchStr = "(";
    var dataToSend = [];
    var slicedParams = [];

    slicedParams = requestParams.slice(0, 3);


    slicedParams.forEach((item, index) => {

        var newItem = item.replace("(", "\\(").replace(")", "\\)");
        searchStr += "(Keyword_1:equals:" + newItem + ") or (Keyword_2:equals:" + newItem + ") or (Keyword_3:equals:" + newItem + ")";

        if (index !== slicedParams.length - 1)
            searchStr += " or ";
        else
            searchStr += ")";
    });

    params.criteria = searchStr.replace(/\/\/+/g, '/');
    console.log(searchStr)

    input.params = params;
    var keywords = [];

    ZCRMRestClient.API.MODULES.search(input).then(function (response) {
        const result = response.body;
        //console.log(response.body)
        var resultsToFilter = JSON.parse(response.body).data;


        resultsToFilter.forEach(data => {
            var entireSearchStr = formData.keyword.toString().toLowerCase();
       // console.log("if: " + entireSearchStr + " includes '" + data.Keyword_1 + "' or '" + data.Keyword_2 + "' or '" + data.Keyword_3 + "'")
            if ((data.Keyword_1 && entireSearchStr.includes(data.Keyword_1.toLowerCase()) || (data.Keyword_2 && entireSearchStr.includes(data.Keyword_2.toLowerCase())) || (data.Keyword_3 && entireSearchStr.includes(data.Keyword_3.toLowerCase())))) {
                dataToSend.push(data)
            }
        });
        //console.log(dataToSend)
    }).catch(error => console.log(error)).then(function (response) {
        console.log(requestParams.length)
        var newSearchStr = "(";
        if (requestParams.length > 2) {
            params.page = 0;
            params.per_page = 50;
            var nextSlice = [];

            nextSlice = requestParams.slice(2);

            nextSlice.forEach((item, index) => {

                var newItem = item.replace("(", "\\(").replace(")", "\\)");
                newSearchStr += "(Keyword_1:equals:" + newItem + ") or (Keyword_2:equals:" + newItem + ") or (Keyword_3:equals:" + newItem + ")";

                if (index !== nextSlice.length - 1)
                    newSearchStr += " or ";
                else
                    newSearchStr += ")";
            });

            params.criteria = newSearchStr.replace(/\/\/+/g, '/');

            console.log(params.criteria)
            input.params = params;
            var keywords = [];

            ZCRMRestClient.API.MODULES.search(input).then(function (response) {
                const result = response.body;

                var resultsToFilter = JSON.parse(response.body).data;

                response_info = JSON.parse(response.body).info;
               // console.log(response_info.more_records);

                resultsToFilter.forEach(data => {
                    var entireSearchStr = formData.keyword.toString().toLowerCase();
                  // console.log("if " +entireSearchStr+" includes ", data.Keyword_1.toLowerCase());
                   // console.log(data.Keyword_1, data.Keyword_2);
                 //  console.log(data.Keyword_1);
                   if ((data.Keyword_1 && entireSearchStr.includes(data.Keyword_1.toLowerCase()) || (data.Keyword_2 && entireSearchStr.includes(data.Keyword_2.toLowerCase())) || (data.Keyword_3 && entireSearchStr.includes(data.Keyword_3.toLowerCase())))) {
                    dataToSend.push(data)
                    }
                });
                
            }).catch(error => console.log(error))
        }
    })
    .then(function() { eventController.logEvent("search", requestParams, formData.userId) })
    .then(function (response) {
        res.send({ data: dataToSend });
    });

});


// CONCLUSION - THE ZOHO API RULE OF RETURNING ALL MATCHES CONTAINING A WORD DOES NOT APPLY WHEN THE WORD HAS A '(' 


router.post('/', (req, res) => {
    input = {};
    input.module = "Allocators";
    var params = {};

    params.phone = '888-555-2145';
    input.body = req.body;

    ZCRMRestClient.API.MODULES.post(input).then(function (response) {
        res.send(response.body);
    });

});
router.get('/:id', (req, res) => {
    input = {};
    input.module = "Allocators";
    var params = {};
    console.log("requested", req.params.id)
    input.id = req.params.id;

    var dataToSend = [];

    ZCRMRestClient.API.MODULES.get(input).then(function (response) {
        var dataSet = JSON.parse(response.body).data;
        dataSet.forEach((item, index) => {
            dataToSend.push(item);
        });


    }).then(function (response) {
        input = {};
        input.module = "Client_Segmentation";
        var params = {};
        params.page = 0;
        params.per_page = 5;
        input.params = params;

        ZCRMRestClient.API.MODULES.get(input).then(function (response) {

            var CSegdata = JSON.parse(response.body).data;

            CSegdata.forEach(csdata => {

                if (csdata.Name == dataToSend[0].CS_Classification) {
                    dataToSend.splice(1, 0, { 'CSDATA': csdata })

                }
            });

        }).catch(error => console.log(error)).then(function (response) {
            res.send({ data: dataToSend });
        });

    });

});

module.exports = router