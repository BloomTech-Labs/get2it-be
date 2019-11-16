
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('tasks').del()
    .then(function () {
      // Inserts seed entries
      return knex('tasks').insert([
        {user_id: 1, 
         name: 'complete homework', 
         status: true, 
         date: 'November 11, 2019', 
         start_time: '10:00 pm', 
         end_time: '11:00 pm', 
         task_icon: 'book icon' },
        {user_id: 2,
         name: 'read two chapters of book', 
         status: true,
         date: 'December 15, 2019',
         start_time: '5:20pm',
         end_time: '7:00 pm',
         task_icon: 'book icon' },
        {user_id: 3,
         name: 'study 3 hours of code', 
         status: false,
         date: 'December 21, 2019',
         start_time: '2:00 pm',
         end_time: '5:00 pm',
         task_icon: 'computer icon'  }
      ]);
    });
};
