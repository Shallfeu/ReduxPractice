import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider, useSelector, useDispatch } from 'react-redux';

import {
  titleChanged,
  taskDeleted,
  completeTask,
  loadTasks,
  getTasks,
  getTasksLoading,
  createTask,
} from './store/task';
import createStore from './store/store';
import { getErrors } from './store/error';

const store = createStore();

const App = () => {
  const state = useSelector(getTasks());
  const loading = useSelector(getTasksLoading());
  const error = useSelector(getErrors());
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadTasks());
  }, []);

  const changeTitle = (taskId) => {
    dispatch(titleChanged(taskId));
  };

  const deleteTask = (taskId) => {
    dispatch(taskDeleted(taskId));
  };

  if (!loading) return <h1>loading...</h1>;

  if (error) return <h1>{error}</h1>;

  return (
    <>
      <h1>App</h1>
      <button onClick={() => dispatch(createTask())}>Create Task</button>
      {state.map((el, index) => (
        <li key={el.id}>
          <p>
            {index + 1} {el.title}
          </p>
          <p>{`Completed: ${el.completed}`}</p>
          <button onClick={() => dispatch(completeTask(el.id))}>Complete Task</button>
          <button onClick={() => changeTitle(el.id)}>Change Title</button>
          <button onClick={() => deleteTask(el.id)}>Delete Task</button>
          <hr />
        </li>
      ))}
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);
