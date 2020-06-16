const router = require('express').Router();

const Users = require('../users/users-model.js'); //will be needed for updating password
const Tasks = require('../tasks/tasks-model.js');

const restricted = require('../auth/restricted-middleware.js');

// for endpoints beginning with /api/users

router.post('/:id/tasks', restricted, (req, res) => {
  const taskData = req.body;
  const name = taskData.name;
  const status = taskData.status;
  const date = taskData.date;
  const start_time = taskData.start_time;
  const end_time = taskData.end_time;
  const task_icon = taskData.task_icon
  const timeLeft = taskData.timeLeft
  const notificationId = taskData.notificationId
  const initialNotify = taskData.initialNotify
  const notifyOn = taskData.notifyOn
  const { id } = req.params;
  const task = { name: name, status: status, date: date, start_time: start_time, end_time: end_time, task_icon: task_icon, timeLeft: timeLeft, notificationId: notificationId, initialNotify: initialNotify, notifyOn: notifyOn, user_id: id,}
  console.log(id)

  Tasks.add(task)
    .then(newTask => {
      res.status(201).json({
        message: 'Task created successfully',
        id: newTask.id        
      });
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to create new task' });
    })
})

router.get('/:id/tasks', restricted, (req, res) => {
  const { id } = req.params;

  Tasks.findTasks(id)
    .then(tasks => {
      if (tasks.length) {
        res.json(tasks);
      } else {
        res.status(404).json({ message: 'Could not find tasks for given user' })
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to get tasks' });
    });
});

router.put('/tasks/:id', restricted, (req, res) => {
  const taskData = req.body;
  const user_id = taskData.user_id;
  const name = taskData.name;
  const status = taskData.status
  const date = taskData.date;
  const start_time = taskData.start_time;
  const end_time = taskData.end_time;
  const task_icon = taskData.task_icon
  const timeLeft = taskData.timeLeft;
  const notificationId = taskData.notificationId;
  const initialNotify = taskData.initialNotify
  const notifyOn = taskData.notifyOn
  const catId = taskData.catId
  const { id } = req.params;
  const changes = { name: name, status: status, date: date, start_time: start_time, end_time: end_time, task_icon: task_icon, timeLeft: timeLeft, notificationId: notificationId, initialNotify: initialNotify, notifyOn: notifyOn, user_id: user_id, category_id: catId }

  Tasks.findById(id)
    .then(task => {
      if (task) {
        Tasks.update(changes, id)
          .then(updatedTask => {
            res.json(updatedTask);
          });
      } else {
        res.status(404).json({ message: 'Could not find task with given id' });
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to update task' });
    });
});

router.delete('/tasks/:id', restricted, (req, res) => {
  const { id } = req.params;

  Tasks.remove(id)
    .then(deleted => {
      if (deleted) {
        res.json({ removed: deleted });
      } else {
        res.status(404).json({ message: 'Could not find task with given id' });
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to delete task' });
    });
});

//Validate Middleware

async function validateUser(req, res, next) {
  // validates all POST requests for new task(not new user)
  const { id } = req.params;
  const issue = { ...req.body, user_id: id };
  console.log(`validate issue:`, issue)

  const userCheck = await Users.findById(id)

  !userCheck
    ? res.status(404).json({ message: "User does not exist!" })
    : !issue ?
      res.status(404).json({ message: "Task does not exist!" })
      : !issue.name || !issue.date || !issue.start_time || !issue.end_time || !issue.task_icon
        ? res.status(406).json({ message: "Please make sure the required fields are completed. " })
        : next();
}

async function validateTask(req, res, next) {
  // validates all POST requests for new task (not new user)
  const { id } = req.params;
  const tasks = req.body;
  console.log(`validate task:`, tasks)

  const issueCheck = await Tasks.findById(id)

  !issueCheck
    ? res.status(404).json({ message: "Task does not exist!" })
    : next();
}


module.exports = router;
