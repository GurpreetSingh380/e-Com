import ratingModel from '../models/ratingModel.js'

export const createRatingController = async(req, res) => {
    try{
        const {p_id, u_id, rating} = req.body;
        if (!(rating>=0 && rating<=5)) return res.status(200).send({
            success: false,
            message: 'Rating Out of Bound'
        });
        const rated = await ratingModel.findOne({ user: u_id, product: p_id });
        if (rated) return res.status(200).send({
            success: false,
            message: 'Already Rated!'
        });
        await ratingModel({user: u_id, product: p_id, rating}).save();
        return res.status(200).send({
            success: true,
            message: "Rating Stored Successfully!"
        });
    }
    catch(error){ 
        return res.status(500).send({
            success: false,
            message: 'Internal Server Error',
            error
        });
    }
}


export const getRatingController = async(req, res) => {
    try{
        const {p_id} = req.params;
        console.log(p_id);
        const avg = await ratingModel.aggregate([
            {
                $group: {
                    _id: "$product", // Group by product ID
                    averageRating: { $avg: "$rating" }, // Calculate the average rating for each group
                    count: { $sum: 1 }
                }
            }
          ]); 
        for(let i=0; i<avg.length; i++) {
            if (avg[i]._id == p_id){ 
                return res.status(200).send({
                success: true,
                message: 'Average is calculated',
                average: avg[i].averageRating,
                totalRatings: avg[i].count
                }); 
            }
        }
    }
    catch(error){
        return res.status(500).send({
            success: false,
            message: 'Internal Server Error'
        });
    }
}

export const ratedController = async(req, res) => { // Has user rated :: Input is list
    try{
        const {list, u_id} = req.body;
        const ratings = await ratingModel.find({$and: [{user: u_id}, {product: {$in: list}}]}).select('product rating');
        return res.status(200).send({
            success: true,
            message: "Your Ratings",
            ratings
        });
    }
    catch(error){
        return res.status(500).send({
            success: false,
            message: 'Internal Server Error'        
        });
    }
}
