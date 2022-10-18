import UserModel from "../Models/UserModel.js";
import bcrypt from 'bcrypt'

// Get a User
export const getUser = async (req, res) => {
    const id = req.params.id

    try {
        const user = await UserModel.findById(id)

        if(user) {
            const {password, ...userDetails} = user._doc
            res.status(200).json(userDetails)
        } else {
            res.status(404).json({message: "No such user exists"})
        }
    } catch(err) {
        res.status(500).json({message: err.message})
    }
    
}


// Update a User
export const updateUser = async (req, res) => {
    const id = req.params.id
    const {currentUserId, currentUserAdminStatus, password} = req.body

    if(id === currentUserId || currentUserAdminStatus) {
        try {

            if(password){
                const salt = await bcrypt.genSalt(10)
                req.body.password = await bcrypt.hash(password, salt)
            }

            const user = await UserModel.findByIdAndUpdate(id, req.body, {new: true})

            res.status(200).json(user)
        } catch (err) {
            res.status(500).json({message: err.message})
        }
    } else {
        res.status(403).json({message: 'Access denied! You can only update your own profile'})
    }

}



// Delete a User
export const deleteUser = async (req, res) => {

    const id = req.params.id

    const {currentUserId, currentUserAdminStatus} = req.body

    if(currentUserId === id || currentUserAdminStatus) {
        try {
            await UserModel.findByIdAndDelete(id)
            res.status(200).json({message: 'User deleted successfully'})
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    } else {
        res.status(403).json({message: 'Access denied! You can only delete your own profile'})
    }
}

// Follow a User
export const followUser = async (req, res) => {
    const id = req.params.id

    const {currentUserId} = req.body

    if(currentUserId === id) {
        res.status(403).json({message: 'Action forbidden'})
    } else {
        try {
            const followUser = await UserModel.findById(id)
            const followingUser = await UserModel.findById(currentUserId)
            if(!followUser.followers.includes(currentUserId)) {
                await followUser.updateOne({$push: {followers: currentUserId}})
                await followingUser.updateOne({$push: {following: id}})
                res.status(200).json({messgae: 'User followed!'})
            } else {
                res.status(403).json({message: 'You have been already following this user'})
            }
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    }

}

// Unfollow a User
export const unfollowUser = async (req, res) => {
    const id = req.params.id

    const {currentUserId} = req.body

    if(currentUserId === id) {
        res.status(403).json({message: 'Action forbidden'})
    } else {
        try {
            const followUser = await UserModel.findById(id)
            const followingUser = await UserModel.findById(currentUserId)
            if(followUser.followers.includes(currentUserId)) {
                await followUser.updateOne({$pull: {followers: currentUserId}})
                await followingUser.updateOne({$pull: {following: id}})
                res.status(200).json({messgae: 'User unfollowed!'})
            } else {
                res.status(403).json({message: 'You are not following this user'})
            }
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    }

}


