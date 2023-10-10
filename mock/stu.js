// 学员相关逻辑 mock 接口
import mockjs from 'mockjs';

const dataList = mockjs.mock({
  code: 200,
  msg: '学员列表加载成功',
  'results|100': [
    {
      'objectId|+1': 1,
      name: '@cname',
      score: '@integer(5, 100)',
      city: '@city',
      time: '@date',
    },
  ],
});

export default {
  'GET /classes/test': {
    username: 'huayoyu',
    score: 100,
  },
  'GET /classes/stu': dataList,
  'DELETE /classes/stu': (req, res) => {
    let { id } = req.query;

    dataList.results.forEach((item, index) => {
      if (item.objectId === parseInt(id, 10)) {
        dataList.results.splice(index, 1);
        res.send({
          code: 200,
          msg: '删除成功',
        });
        return;
      }
    });

    res.send({
      code: 100,
      msg: '数据不存在',
    });
  },
};
