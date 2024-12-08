const express = require("express");
const router = express.Router();
const {resourceAccess} = require("../controllers/authController");
const {createTasks,getAllTasks,getTasksById,updateTaskById,deleteTaskById} = require("../controllers/taskController");

router.route("/")
      .post(resourceAccess,createTasks)
      .get(resourceAccess,getAllTasks)
router.route("/:id")
      .get(resourceAccess,getTasksById)
      .put(resourceAccess,updateTaskById)
      .delete(resourceAccess,deleteTaskById)


module.exports = router;