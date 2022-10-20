import UserModel from "../Models/UserModel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

// Registering a new User
export const registerUser = async (req, res) => {
    
    const salt = await bcrypt.genSalt(10)
    const hashedPass = await bcrypt.hash(req.body.password, salt)
    req.body.password = hashedPass
    const newUser = new UserModel(req.body);
    const {username} = req.body

    try {
        const oldUser = await UserModel.findOne({username})

        if(oldUser)
            return res.status(400).json({message: 'Username is already taken'})

        const user = await newUser.save()

        const token = jwt.sign({
            username: user.username, id: user._id
        }, process.env.JWT_KEY, {expiresIn: '1hr'})
        res.status(200).json({user, token})
    } catch (err) {
        res.status(500).json({message: err.message})
    }

}

// Login User

export const loginUser = async (req, res) => {
    const {username, password} = req.body

    try {
        const user = await UserModel.findOne({username: username})

        if(user) {
            const validity = await bcrypt.compare(password, user.password)
            
            if(!validity) {
                res.status(400).json({message: 'Wrong password!'})
            } else {
                const token = jwt.sign({
                    username: user.username, id: user._id
                }, process.env.JWT_KEY, {expiresIn: '1hr'})
                res.status(200).json({user, token})
            }
        } else {
            res.status(400).json({message: 'User doesnot exist'})
        }

    } catch(err) {
        res.status(500).json({message: err.message})
    }


}



