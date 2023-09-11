const { httpStatus } = require("../../config/constants");
const AdsModel = require("../../models/adsModel");

const addAds = async (req, res) => {
    const {_id: userId} = req.locals;
    const reqBody = req.body;

    try {
        const newAds = new AdsModel({...reqBody, userId});
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