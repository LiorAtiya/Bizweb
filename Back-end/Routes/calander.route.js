const router = require("express").Router();
const {
  createNewEvent,
  deleteEvent,
  deleteExpiredEvents,
  getAllEvents,
} = require("../Controllers/calander.controller");

router.post("/create-event", createNewEvent);
router.delete("/delete-event", deleteEvent);
router.delete("/delete-expired-events", deleteExpiredEvents);
router.post("/get-events", getAllEvents);

module.exports = router;
