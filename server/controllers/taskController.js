const Tasks = require("../models/taskModel");
const { asyncHandler } = require("../utils/asyncHandler");
const CustomError = require("../utils/customError");


//CREATING THE TASK.........
exports.createTasks = asyncHandler(async(req,res,next)=>{
  const task = await Tasks.create(req.body);
  res.status(201).json({
    status:"success",
    message:"Task created successfully",
    data:{
      task
    }
  })
});

//GETTING ALL THE TASKS........
exports.getAllTasks = asyncHandler(async(req,res,next)=>{
  const {status,priority,sort="createdAt",order="asc",limit=7,skip=0} = req.query;
  let filter={};
  if(status) filter.status = status;
  if(priority) filter.priority = priority;

  const sortOrder = order === "asc" ? 1 : -1;
  const sortBy = {[sort]:sortOrder};

  const tasks = await Tasks.find(filter).sort(sortBy).limit(Number(limit)).skip(Number(skip));
  if(!tasks || tasks.length===0){
    const error = new CustomError("Tasks Not Found.",404);
    return next(error);
  }
  res.status(200).json({
    status:"success",
    count:tasks.length,
    data:{
      tasks
    }
  });
});

//GET TASK BY ID........
exports.getTasksById = asyncHandler(async(req,res,next)=>{
  const {id} = req.params;
  const task = await Tasks.findById(id);
  if(!task){
    const error = new CustomError("Task not found.",404);
    return next(error);
  }
  res.status(200).json({
    status:"success",
    data:{
      task
    }
  });
});

//UPDATE TASK BY ID......
exports.updateTaskById = asyncHandler(async(req,res,next)=>{
  const {id} = req.params;
  const checkTask = await Tasks.findById(id);
  if(!checkTask){
    const error = new CustomError("Task not found.",404);
    return next(error);
  } 

  const task = await Tasks.findByIdAndUpdate(id,req.body,{new:true})
  res.status(200).json({
    status:"success",
    message:"Task updated successfully.",
    data:{
      task
    }
  });
});

//DELETE TASK BY ID......
exports.deleteTaskById = asyncHandler(async(req,res,next)=>{
  const { id } = req.params;
  const checkTask = await Tasks.findById(id);
  if (!checkTask) {
    const error = new CustomError("Task not found.", 404);
    return next(error);
  } 

  await Tasks.findByIdAndDelete(id);
  res.status(204).json({
    status: "success",
    message: "Task deleted successfully."
  });
});