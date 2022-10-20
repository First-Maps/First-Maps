// this will route to :     /api/locationsOfInterest

import dbConnect from "../../../utils/dbConnect";
import dev_LocationOfInterest from '../../../models/dev_LocationOfInterest';

// import findMiddle()
import findMiddle from '../../../utils/findMiddle.js';

dbConnect();


export default async (req, res) => {   
    const { method } = req;    

    switch (method) {
        case 'GET':
            try {

                const locationsOfInterest = await dev_LocationOfInterest.find({})
                res.status(200).json({ success: true, data: locationsOfInterest })
            } catch(error){
                res.status(400).json({ "error message" : error })
            }
            break;

        case 'POST':
            try {
                const locationOfInterest = await dev_LocationOfInterest.create(req.body)
                res.status(201).json({ success: true, data: locationOfInterest })
            } catch(error){
                res.status(400).json({ "error message": error })
            }
            break;
        default:
            res.status(400).json({ success: false, message: "This route does not exist" })
    }
}