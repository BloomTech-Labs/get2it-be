exports.seed = function(knex) {
  return knex('tasks').del()
    .then(function () {
      return knex('tasks').insert([
        {
          user_id: 1,
          name: 'Task 1',
          status: null,
          date: '2020-06-08T00:00:00.000Z',
          start_time: '7:19 pm',
          end_time: '7:19 pm',
          task_icon: '',
          timeLeft: null, notificationId: 1,
          initialNotify: null,
          notifyOn: false
        },
        {
          user_id: 1,
          name: 'Task 2',
          status: null,
          date: '2020-06-09T00:00:00.000Z',
          start_time: '7:19 pm',
          end_time: '7:19 pm',
          task_icon: '',
          timeLeft: null, notificationId: 1,
          initialNotify: null,
          notifyOn: false
        },
        {
          user_id: 2,
          name: 'Task 3',
          status: null,
          date: '2020-06-08T00:00:00.000Z',
          start_time: '7:19 pm',
          end_time: '7:19 pm',
          task_icon: '',
          timeLeft: null, notificationId: 1,
          initialNotify: null,
          notifyOn: false
        },
        {
          user_id: 2,
          name: 'Task 4',
          status: null,
          date: '2020-06-09T00:00:00.000Z',
          start_time: '7:19 pm',
          end_time: '7:19 pm',
          task_icon: '',
          timeLeft: null, notificationId: 1,
          initialNotify: null,
          notifyOn: false
        },
        {
          user_id: 3,
          name: 'Task 5',
          status: null,
          date: '2020-06-08T00:00:00.000Z',
          start_time: '7:19 pm',
          end_time: '7:19 pm',
          task_icon: '',
          timeLeft: null, notificationId: 1,
          initialNotify: null,
          notifyOn: false
        },
        {
          user_id: 3,
          name: 'Task 6',
          status: null,
          date: '2020-06-09T00:00:00.000Z',
          start_time: '7:19 pm',
          end_time: '7:19 pm',
          task_icon: '',
          timeLeft: null, notificationId: 1,
          initialNotify: null,
          notifyOn: false
        }
      ]);
    });
};
