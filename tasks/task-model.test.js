const db = require('../database/dbConfig');
const taskCat = require('./tasks-model');

describe('Task-Model model', () => {
    beforeEach(async () => {
        await db('task-categories').truncate();
    });

    
})