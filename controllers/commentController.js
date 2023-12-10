import commentModel from '../models/commentModel.js'

export const createCommentController = async(req, res) => {
    try{
        const {p_id, u_id, comment} = req.body;
        const commented = await commentModel({user: u_id, product: p_id, comment}).save();
        if (commented) return res.status(200).send({
            success: true,
            message: "Comment Stored Successfully!",
            commented
        });
    }
    catch(error){
        return res.status(500).send({
            success: false,
            message: 'Internal Server Error'
        });
    }
}

export const updateCommentController = async(req, res) => {
    try{
        const {comment_id, comment} = req.body;
        const commented = await commentModel.findByIdAndUpdate(comment_id, {comment}, {new: true});
        if (commented) return res.status(200).send({
            success: true,
            message: "Comment Updated Successfully!",
            commented
        });
    }
    catch(error){
        return res.status(500).send({
            success: false,
            message: 'Internal Server Error'
        });
    }
}

export const deleteCommentController = async(req, res) => {
    try{
        const {comment_id} = req.params;
        await commentModel.findByIdAndDelete(comment_id);
        return res.status(200).send({
            success: true,
            message: "Comment Deleted Successfully!"
        });
    }
    catch(error){
        return res.status(500).send({
            success: false,
            message: 'Internal Server Error'
        });
    }
}

export const getCommentController = async(req, res) => {
    try{
        const {p_id} = req.params;
        const comments = await commentModel.find({product: p_id});
        return res.status(200).send({
            success: true,
            message: "All comments",
            comments
        });
    }
    catch(error){
        return res.status(500).send({
            success: false,
            message: 'Internal Server Error'
        });
    }
}
