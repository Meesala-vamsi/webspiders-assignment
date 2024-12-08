const User = require("../models/userModel");
const { asyncHandler } = require("../utils/asyncHandler");
const CustomError = require("../utils/customError");
const jwt = require("jsonwebtoken");

//Verifying the token...........
exports.resourceAccess = asyncHandler(async (req, res, next) => {
   const authHeader = req.headers["authorization"];
   const token = authHeader && authHeader.split(" ")[1];
   if (!token) {
     const error = new CustomError("Invalid token", 400);
     return next(error);
   }

   jwt.verify(token, process.env.JWT_SECRET, async (error, data) => {
     if (error) {
       const error = new CustomError("Invalid token", 400);
       return next(error);
     } else {
       const user = await User.findById(data.id);
       req.user = user;
       next();
     }
   });
});

//GENERATING THE TOKEN..........
const generateToken = (id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET);
  return token;
};


//REGISTER THE USER.............
exports.signUp = asyncHandler(async (req, res, next) => {
  const {username,email,password} = req.body;
  const user = await User.findOne({email});
  if(user){
    const error = new CustomError("User already exists.Please login",400);
    return next(error);
  }

  await User.create({ username, email, password });
  res.status(201).json({
    status: "success",
    message: "Account Created Successfully"
  });
});


//LOGIN USER...................
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    const error = new CustomError("User not found with provided email", 404);
    return next(error);
  }

  if (!(await user.comparePasswords(password, user.password))) {
    const error = new CustomError("Invalid Password", 401);
    return next(error);
  }

  const token = generateToken(user._id);

  res.status(200).json({
    status: "success",
    jwtToken: token,
    message: "User Logged In Successfully",
    data: {
      username:user.username,
      email:user.email,
      id:user._id
    },
  });
});
