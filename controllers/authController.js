import userModel from '../models/userModel.js'
import validator from 'validator'
import {hashPassword, comparePassword} from '../helpers/authHelper.js'
import JWT from 'jsonwebtoken'

export const registerController = async(req, res) => {
    try{
        const {name, email, password, phone, address} = req.body;

        // validations:
        if (validator.isEmpty(name)
        ) return res.send({
            message: 'Name is required'
        })
        if (validator.isEmpty(email) || !validator.isEmail(email)) return res.send({
            message: 'e-mail is faulty'
        })
        if (validator.isEmpty(password)
        ) return res.send({
            message: 'Password is required'
        })
        if (validator.isEmpty(phone) || !validator.isNumeric(phone)) return res.send({
            message: 'Phone is faulty'
        })
        if (validator.isEmpty(address)
        ) return res.send({
            message: 'Address is required'
        })
        // existing user?
        const existingUser = await userModel.findOne({email}) // email: email can also be done
        if (existingUser){
            return res.status(202).send({
                success: false,
                message: 'Already registered please login'
            })
        }
        // Register User:
        const hashedPassword = await hashPassword(password);
        // Save:
        const user = await new userModel({
            name, email, phone, address, password:hashedPassword
        }).save();
        return res.status(201).send({
            success: true,
            message: 'User Registered Successfully',
            user
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Error in Registration',
            error // or error: error as they are same in spelling
        })
    }
}

export const loginUser = async(req, res) => {
    const {email, password} = req.body;
    const existingUser = await userModel.findOne({email});
    if (!existingUser) return res.status(404).send({
        success: false,
        message: 'No user found'
    })
    const match = await comparePassword(password, existingUser.password);
    if (!match){
        return res.status(200).send({
            success: false,
            message: 'Incorrect email or password'
        })
    }
    const token = JWT.sign({_id: existingUser._id}, process.env.JWT_SECRET, {expiresIn: '3d'});
    return res.status(200).send({
        success: true,
        message: 'Logged in Successfully!',
        user: existingUser,
        token
    })
}

export const testController = (req, res) => {
    return res.send("This is a protected Route!");
}