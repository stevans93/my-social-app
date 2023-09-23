const { httpStatus } = require("../../config/constants");
const AdsModel = require("../../models/adsModel");
const moment = require('moment');

const addAds = async (req, res) => {
    const {_id: userId} = req.locals;
    let {startDate, endDate, ...reqBody} = req.body;
    startDate = new Date(moment(startDate).format("YYYY-MM-DD"));
    endDate = new Date(moment(endDate).format("YYYY-MM-DD"));

    try {
        const newAds = new AdsModel({...reqBody, startDate, endDate, userId});
        const saveAds = await newAds.save();

        if(saveAds) {
            res.send(saveAds);
        } else {
            res.status(httpStatus.SERVICE_ERROR.status).send({error: "Ad is not saved to DateBase."});
        }

    } catch (error) {
        console.log(error);
        res.status(httpStatus.SERVICE_ERROR.status).send({error: error.message});
    }
    
}

module.exports = addAds;