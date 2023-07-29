const User = require("../Models/userDetails");
const CategoryEntries = require("../Models/categoryEntries");
const BigML = require("../Models/bml");
const logger = require("../Utils/logs/logger");
const bcrypt = require("bcryptjs");

//Update personal user details
const updateUserInfo = async (req, res) => {
  if (req.body.userId == req.params.id) {
    //Update password
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (err) {
        return res.status(500).json(err);
      }
    }
    try {
      //NEED TO CHECK WHY ITS REPLACE BODY INSTEAD UPDATE
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json("Account has been updated");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You can update only your account");
  }
};

const getUserInfo = async (req, res) => {
  try {
    //Not necessary
    const { _id, password, updatedAt, createdAt, ...other } = req.user;
    logger.info(`Get user info of ${other.email}`);

    return res.status(200).json(other);
  } catch (err) {
    logger.error(err);
    return res.sendStatus(500);
  }
};

//Add new record of category entry
const addRecordCategoryEntry = async (req, res) => {

  try {
  
    const oldUser = await User.findOne({ email: req.user.email });
    if (!oldUser) {
      logger.error(`Email: ${req.user.email} not exist`);
      return res.sendStatus(404)
    }

    const { firstname, lastname, username, email } = req.user;
    const { category } = req.body;
    
    //create new record
    await CategoryEntries.create({
      firstname,
      lastname,
      username,
      email,
      category,
    });
    
    logger.info(`Add new record of category entry - ${category}`);

    return res.status(200);
  } catch (error) {
    logger.error(error);
    return res.sendStatus(500);
  }
};

const trainBigML = async (req, res) => {
  try {
    await BigML.createModel();
    logger.info(`Train & Create new model in bigML`);

    res.status(200);
  } catch (error) {
    logger.error(error);
    res.sendStatus(500);
  }
};

const getPredictionOfBigML = async (req, res) => {
  try {
    var result = await BigML.predictAll(req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(err);
  }
};

//Add new business to list of user
const addNewBusinessToUser = async (req, res) => {
  const { business } = req.body;
  try {
    await User.findByIdAndUpdate(
      { _id: req.params.id },
      { $push: { business: business } }
    );
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

//Add appointment
const addNewEvent = async (req, res) => {
  const appointment = {
    businessID: req.body.businessID,
    name: req.body.businessName,
    phone: req.body.phone,
    date: req.body.date,
    time: req.body.time,
  };
  try {
    await User.findByIdAndUpdate(
      { _id: req.params.id },
      { $push: { myAppointments: appointment } }
    );
    console.log("Added new appointment");
    const user = await User.findOne({ _id: req.params.id });
    return res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

//Delete appointment
const deleteEvent = async (req, res) => {
  try {
    await User.findOneAndUpdate(
      { _id: req.params.id },
      {
        $pull: {
          myAppointments: {
            id: req.body.id,
            date: req.body.date,
            time: req.body.time,
          },
        },
      }
    );
    console.log("Removed appointment");
    const user = await User.findOne({ _id: req.params.id });

    return res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

//Add/Increase new product to cart
const increaseQuantityInCart = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    const itemIndex = user.myShoppingCart.findIndex(
      (item) => item.id === req.body.id
    );
    if (itemIndex >= 0) {
      user.myShoppingCart[itemIndex].quantity += 1;
      const afterChange = user.myShoppingCart[itemIndex].quantity;
      const query = { _id: req.params.id, "myShoppingCart.id": req.body.id };
      const updateDocument = {
        $set: { "myShoppingCart.$.quantity": afterChange },
      };
      const result = await User.updateOne(query, updateDocument);

      console.log("\u001b[35m" + "increased product to cart" + "\u001b[0m");
    } else {
      await User.findByIdAndUpdate(
        { _id: req.params.id },
        { $push: { myShoppingCart: req.body } }
      );
      console.log("\u001b[35m" + "Added new product to cart" + "\u001b[0m");
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

//Decrease product from my cart
const decreaseQuantityInCart = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    const itemIndex = user.myShoppingCart.findIndex(
      (item) => item.id === req.body.id
    );
    if (user.myShoppingCart[itemIndex].quantity > 1) {
      user.myShoppingCart[itemIndex].quantity -= 1;
      const afterChange = user.myShoppingCart[itemIndex].quantity;
      const query = { _id: req.params.id, "myShoppingCart.id": req.body.id };
      const updateDocument = {
        $set: { "myShoppingCart.$.quantity": afterChange },
      };
      const result = await User.updateOne(query, updateDocument);

      console.log("\u001b[35m" + "decreased product from cart" + "\u001b[0m");
    } else {
      await User.findByIdAndUpdate(
        { _id: req.params.id },
        { $pull: { myShoppingCart: req.body } }
      );
      console.log("\u001b[35m" + "Removed product from cart" + "\u001b[0m");
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

//Remove product from my cart
const removeProductFromCart = async (req, res) => {
  try {
    await User.findOneAndUpdate(
      { _id: req.params.id },
      { $pull: { myShoppingCart: { id: req.body.productID } } }
    );
    console.log("\u001b[35m" + "Remove product from cart" + "\u001b[0m");
    res.status(200);
  } catch (err) {
    res.status(500).json(err);
  }
};

//Clear my cart
const clearCart = async (req, res) => {
  try {
    await User.findByIdAndUpdate(
      { _id: req.params.id },
      { myShoppingCart: [] }
    );
    console.log("\u001b[35m" + "Clear cart" + "\u001b[0m");
    res.status(200);
  } catch (err) {
    res.status(500).json(err);
  }
};

// //delete user
// router.delete('/:id', async (req, res) => {
//     if (req.body.userId == req.params.id) {
//         try {
//             //NEED TO CHECK WHY ITS REPLACE BODY INSTEAD UPDATE
//             const user = await User.findByIdAndDelete(req.params.id)
//             res.status(200).json('Account has been deleted')
//         } catch (err) {
//             return res.status(500).json(err);
//         }
//     } else {
//         return res.status(403).json('You can deleted only your account');
//     }
// })


module.exports = {
  updateUserInfo,
  getUserInfo,
  addRecordCategoryEntry,
  trainBigML,
  getPredictionOfBigML,
  addNewBusinessToUser,
  addNewEvent,
  deleteEvent,
  increaseQuantityInCart,
  decreaseQuantityInCart,
  removeProductFromCart,
  clearCart,
};
