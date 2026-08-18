const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Username, email and password are required",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "An account with this email already exists",
      });
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const user = await User.create({
      username,
      email,
      passwordHash,
    });

    const token = jwt.sign(
      {
        userId: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    return res.status(201).json({
      success: true,
      message: "Account created successfully",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        shopName: user.shopName,
        phoneNumber: user.phoneNumber,
        businessType: user.businessType,
        location: user.location,
        preferredUnit: user.preferredUnit,
        onboardingComplete: user.onboardingComplete,
      },
    });
  } catch (error) {
    console.error("Register error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong while creating your account",
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const user = await User.findOne({ email }).select("+passwordHash");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const passwordMatch = await bcrypt.compare(
      password,
      user.passwordHash
    );

    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      {
        userId: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        shopName: user.shopName,
        phoneNumber: user.phoneNumber,
        businessType: user.businessType,
        location: user.location,
        preferredUnit: user.preferredUnit,
        onboardingComplete: user.onboardingComplete,
      },
    });
  } catch (error) {
    console.error("Login error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong while logging in",
    });
  }
};

const setupShop = async (req, res) => {
  try {
    const {
      shopName,
      phoneNumber,
      businessType,
      location,
      preferredUnit,
    } = req.body;

    if (
      !shopName ||
      !phoneNumber ||
      !businessType ||
      !location ||
      !preferredUnit
    ) {
      return res.status(400).json({
        success: false,
        message: "All shop details are required",
      });
    }

    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.shopName = shopName;
    user.phoneNumber = phoneNumber;
    user.businessType = businessType;
    user.location = location;
    user.preferredUnit = preferredUnit;
    user.onboardingComplete = true;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Shop setup completed successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        shopName: user.shopName,
        phoneNumber: user.phoneNumber,
        businessType: user.businessType,
        location: user.location,
        preferredUnit: user.preferredUnit,
        onboardingComplete: user.onboardingComplete,
      },
    });
  } catch (error) {
    console.error("Shop setup error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong while setting up your shop",
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  setupShop,
};