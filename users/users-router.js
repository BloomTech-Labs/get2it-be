const router = require('express').Router();

const Users = require('../users/users-model.js'); //will be needed for updating password
const Tasks = require('../tasks/tasks-model.js');

const restricted = require('../auth/restricted-middleware.js');

// for endpoints beginning with /api/users

router.post('/:id/tasks', (req, res) => {
    const taskData = req.body;
    const { id } = req.params;
    const task = {taskData, user_id:id}
    console.log(id)

    Tasks.add(task)
    .then(task => {
        res.status(201).json('task created successfully');
    })
    .catch(err => {
        res.status(500).json({ message: 'Failed to create new task' });
    })
})

router.get('/:id/tasks', (req, res) => {
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

router.put('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;

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

router.delete('/tasks/:id', (req, res) => {
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