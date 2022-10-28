import { createSlice } from '@reduxjs/toolkit';
import todosService from './../services/todos.service';
import { setError } from './error';

const initialState = { items: [], loading: false };

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    update(state, action) {
      const elementIndex = state.items.findIndex((el) => el.id === action.payload.id);
      state.items[elementIndex] = { ...state.items[elementIndex], ...action.payload };
      return state;
    },

    remove(state, action) {
      state.items = state.items.filter((el) => el.id !== action.payload.id);
    },

    recieved(state, action) {
      state.items = action.payload;
      state.loading = true;
    },

    taskRequested(state) {
      state.loading = false;
    },

    taskRequestFailed(state) {
      state.loading = true;
    },

    create(state, action) {
      state.items.push(action.payload);
    },
  },
});

const { actions, reducer: taskReducer } = taskSlice;

const { update, remove, recieved, taskRequested, taskRequestFailed, create } = actions;

export const loadTasks = () => async (dispatch) => {
  dispatch(taskRequested());
  try {
    const data = await todosService.fetch();
    dispatch(recieved(data));
  } catch (error) {
    dispatch(taskRequestFailed(error.message));
    dispatch(setError(error.message));
  }
};

export const completeTask = (id) => (dispatch) => {
  console.log(dispatch, 'task');
  dispatch(update({ id, completed: true }));
};

export function titleChanged(id) {
  return update({ id, title: `New title for ${id}` });
}

export function taskDeleted(id) {
  return remove({ id });
}

export const createTask = () => async (dispatch) => {
  const data = await todosService.create();
  dispatch(create({ ...data }));
};

export const getTasks = () => (state) => state.task.items;
export const getTasksLoading = () => (state) => state.task.loading;

export default taskReducer;
