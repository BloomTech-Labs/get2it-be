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
    const { id } = req.params;
    const task = {name: name, status: status, date: date, start_time: start_time, end_time: end_time, task_icon: task_icon, user_id:id}
    console.log(id)

    Tasks.add(task)
    .then(task => {
        res.status(201).json('task created successfully');
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
  const { id } = req.params;
  const changes = {name: name, status: status, date: date, start_time: start_time, end_time: end_time, task_icon: task_icon, user_id: user_id}

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
  .catch (err => {
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



module.exports = router;