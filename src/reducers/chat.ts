import { createSlice } from '@reduxjs/toolkit';

export interface ChatReducerType {
  select: string;
  input: {
    text: string;
    files: File[];
    reply: string | null;
  }
}

const initialState: ChatReducerType = {
  select: '0',
  input: {
    text: '',
    files: [],
    reply: null,
  },
};

const slice = createSlice({
  name: '@chat',
  initialState,
  reducers: {
    selectChannel: (state, action) => {
      state.select = action.payload;

      state.input.reply = null;
    },

    setInput: (state, action) => {
      const { text, files, reply } = action.payload;

      if (text) state.input.text = text;
      if (files) state.input.files = files;
      if (reply) state.input.reply = reply;
    },

    clearInput: (state) => {
      state.input = {
        text: '',
        files: [],
        reply: null,
      };
    },

    setText: (state, action) => {
      state.input.text = action.payload;
    },

    addFile: (state, action) => {
      state.input.files.push(action.payload);
    },

    clearFile: (state) => {
      state.input.files = [];
    },

    setReply: (state, action) => {
      state.input.reply = action.payload;
    },
  },
});

export const {
  selectChannel,
  setInput,
  clearInput,
  setText,
  addFile,
  clearFile,
  setReply,
} = slice.actions;

export default slice.reducer;
