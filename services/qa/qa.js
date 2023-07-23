import {
  config
} from '../../config/index';

function mockFetchQaList(pageIndex = 1, pageSize = 20) {
  const {
    delay
  } = require('../_utils/delay');
  return delay().then(() => {
    return {
      qaList: [{
          title: '我有一个问题',
          tag: '电子信息',
          name: 'mireux',
          avatar: 'https://profile-avatar.csdnimg.cn/b7653f5f21484085a1185b23ca570351_weixin_42794881.jpg!1',
          view: 30,
          like: 20,
          comment: 10
        },
        {
          title: '我有两个个问题',
          tag: '电子信息',
          name: 'mireux',
          avatar: 'https://profile-avatar.csdnimg.cn/b7653f5f21484085a1185b23ca570351_weixin_42794881.jpg!1',
          view: 0,
          like: 0,
          comment: 0
        }
      ]
    };
  });
}

/** 获取商品列表 */
export function fetchQaList(pageIndex = 1, pageSize = 20) {
  if (config.useMock) {
    return mockFetchQaList(pageIndex, pageSize);
  }
  return new Promise((resolve) => {
    resolve('real api');
  });
}