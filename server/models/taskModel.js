const mongoose = require("mongoose");
const validator = require("validator");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required."],
      maxlength: [100, "Title must not exceed 100 characters"],
    },
    description: String,
    status: {
      type: String,
      enum: ["TODO", "IN_PROGRESS", "COMPLETED"],
      default: "TODO",
    },
    priority: {
      type: String,
      enum: ["LOW", "MEDIUM", "HIGH"],
      default:"MEDIUM"
    },
    dueDate: Date,
  },
  { timestamps: true }
);

const Tasks = mongoose.model("Tasks",taskSchema);

module.exports = Tasks;