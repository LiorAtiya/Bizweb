const router = require("express").Router();
const { authenticateToken } = require("../Middleware/Auth");

const {
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
} = require("../Controllers/users.controller");

//Update personal user details
router.put("/:id", updateUserInfo);
router.get("/", authenticateToken, getUserInfo);
router.post("/categoryEntry",authenticateToken, addRecordCategoryEntry);
router.get("/trainBigML", trainBigML);
router.post("/prediction", getPredictionOfBigML);
router.put("/:id/business", addNewBusinessToUser);
router.put("/:id/newappointment", addNewEvent);
router.delete("/:id/delete-appointment", deleteEvent);
router.put("/:id/increase-quantity", increaseQuantityInCart);
router.put("/:id/decrease-quantity", decreaseQuantityInCart);
router.delete("/:id/remove-product-from-cart", removeProductFromCart);
router.delete("/:id/clear-cart", clearCart);

module.exports = router;
