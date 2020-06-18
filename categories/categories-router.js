const router = require('express').Router();

const Users = require('../users/users-model.js'); //will be needed for updating password
const Categories = require('../categories/categories-model.js');
const CatTask = require('../categories/cat-task-model.js');

const restricted = require('../auth/restricted-middleware.js');

// for endpoints beginning with /api/categories

router.post('/:id/categories', restricted, (req, res) => {
  const {id} = req.params;
  const issue = {...req.body, user_id: id}

  Categories.add(issue)
    .then(cat => {
      res.status(201).json({
        message: 'Category created successfully',
        id: cat.id
      });
    })
    .catch(cat => {
      res.status(500).json({ message: "failed to create new category"});
    })
});

router.get('/:id/categories', restricted, (req, res) => {
  const {id} = req.params;

  Categories.findCategories(id)
    .then(categories => {
      if(categories.length) {
        res.status(200).json(categories);
      } else {
        res.status(404).json({message: 'Could not find categories for given user'})
      }
    })
    .catch(err => {
      res.status(500).json({message: 'Failed to get categories'});
    });
});

router.get('/categories/:id', restricted, (req, res) => {
  const {id} = req.params;

  Categories.findById(id)
    .then(category => {
      if(category) {
        res.status(200).json(category);
      } else {
        res.status(404).json({message: 'Could not find category for given task.'})
      }
    })
    .catch(err => {
      res.status(500).json({message: 'Failed to get category'})
    })
});

router.put('/categories/:id', restricted, (req, res) => {
  const {id} = req.params;
  const changes = {...req.body};
  Categories.findById(id)
    .then(category => {
      if(category) {
        Categories.update(changes, id)
          .then(updatedCategory => {
            res.json(updatedCategory)
          });
      } else {
        res.status(404).json({message: 'Could not find category with given id'});
      }
    })
    .catch(err => {
      res.status(500).json({message: 'Failed to update category'});
    });
});

router.delete('/categories/:id', restricted, (req, res) => {
  const {id} = req.params;

  Categories.remove(id)
    .then(deleted => {
      if(deleted) {
        res.json({removed: deleted});
      } else {
        res.status(404).json({message: 'Could not find category with given id'});
      }
    })
    .catch(err => {
      res.status(500).json({message: 'Failed to delete category'});
    });
});

router.get('/tasks/:id', restricted, (req, res) => {
  const {id} = req.params;

  CatTask.findById(id)
    .then(task => {
      if(task) {
        res.status(200).json(task);
      } else {
        res.status(404).json({message: 'Could not find category for given task.'})
      }
    })
    .catch(err => {
      res.status(500).json({message: 'Failed to get category'})
    })
})

router.post('/:id/tasks', restricted, (req, res) => {
  const {id} = req.params;
  const info = req.body;
  const taskID = info.task_id;
  const taskCat = {task_id: taskID, category_id: id}

  CatTask.assignCategory(taskCat)
    .then(category => {
      res.status(201).json('Category assigned successfully');
    })
    .catch(err => {
      res.status(500).json({ message: "failed to assign category"});
    })
});

router.put('/tasks/:id', restricted, (req, res) => {
  const {id} = req.params;
  const info = req.body;
  const categoryID = info.category_id;
  const taskCat = {task_id: id, category_id: categoryID}

  CatTask.update(taskCat, id)
    .then(task => {
      res.status(201).json('Task category updated successfully.');
    })
    .catch(err => {
      res.status(500).json({message: 'Failed to update tasks category'});
    })
});

router.get('/:id/tasks', restricted, (req, res) => {
  const {id} = req.params;

  CatTask.findTasks(id)
    .then(tasks => {
      if(tasks.length) {
        res.status(200).json(tasks);
      } else {
        res.status(404).json({message: 'Could not find tasks for given category'})
      }
    })
    .catch(err => {
      res.status(500).json({message: 'Failed to get tasks'});
    });
});

// Validate Middleware

async function validateUser(req, res, next) {
  // validates all POST request for new category(not new user)
  const {id} = req.params;
  const issue = {...req.body, user_id: id};
  console.log(`validate issue: ${issue}`)

  const userCheck = await Users.findById(id)

  !userCheck
    ? res.status(404).json({ message: "User does not exist!"})
    : !issue ?
      res.status(404).json({ message: "Category does not exist!"}) : !issue.name ? res.status(406).json({ message: "Please make sure the required fields are completed."})
      : next();
}

async function validateCategory(req, res, next) {
  const {id} = req.params;
  const tasks = req.body;
  console.log(`validate task: ${tasks}`);

  const issueCheck = await Categories.findById(id);

  !issueCheck
    ? res.status(404).json({ message: "Category does not exist!"})
    : next();
}

module.exports = router;
