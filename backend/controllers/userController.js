import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'

//Auth user that set token
//route POST /api/users/auth
const authUser = asyncHandler(async (request, response) => {
    const { email, password } = request.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        generateToken(response, user._id);
        response.json({
            _id: user._id,
            name: user.name,
            email: user.email,
        })
    } else {
        response.status(401);
        throw new Error("Invalid email or password")
    }
})

//Register new user
//route POST /api/users
const registerUser = asyncHandler(async (request, response) => {
    const { name, email, password } = request.body;

    const userExists = await User.findOne({ email })

    if (userExists) {
        response.status(400);
        throw new Error("User already exist!")
    }

    const user = await User.create(
        {
            name,
            email,
            password
        }
    );

    if (user) {
        generateToken(response, user._id)
        response.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
        })
    } else {
        response.status(400);
        throw new Error("Invalid User Data")
    }
})

//Logout user
//route POST /api/users/logout
const logoutUser = asyncHandler(async (request, response) => {
    response.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
    })

    response.status(200).json({ message: 'Logout User' })
})

//Get user profile
//route GET /api/users/profile
//needs token private
const getUserProfile = asyncHandler(async (request, response) => {
    const user = {
        _id: request.user._id,
        name: request.user.name,
        email: request.user.email
    }

    response.status(200).json(user)
})

//Update user profile
//route PUT /api/users/profile
//needs token private
const updateUserProfile = asyncHandler(async (request, response) => {
    const user = await User.findById(request.user._id);

    if (user) {
        user.name = request.body.name || user.name;
        user.email = request.body.email || user.email;
        if(request.body.password) {
            user.password = request.body.password
        }

        const updatedUser = await user.save();
        
        response.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
        })
    } else {
        response.status(404);
        throw new Error('User not found!')
    }

})

export { 
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile
}