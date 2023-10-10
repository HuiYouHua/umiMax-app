import { produce } from 'immer';

export default {
  state: {
    list: [
      {
        title: 'Ant Design Title 1',
        desc: 'Ant Design, a design language for background applications, is refined by Ant UED Team',
        read: false,
      },
      {
        title: 'Ant Design Title 2',
        desc: 'Ant Design, a design language for background applications, is refined by Ant UED Team',
        read: true,
      },
      {
        title: 'Ant Design Title 3',
        desc: 'Ant Design, a design language for background applications, is refined by Ant UED Team',
        read: false,
      },
    ],
  },
  reducers: {
    readed(state, { payload }) {
      let obj = produce(state, (draft) => {
        draft.list[payload].read = true;
      });
      return obj;
    },
  },
};
