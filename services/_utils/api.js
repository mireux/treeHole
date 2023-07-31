const GET = 'GET';
const POST = 'POST';

const baseURL = 'http://localhost:8989'; //配置的域名

function request(method, url, data) {
  return new Promise(function (resolve, reject) {
    let header = {
      'content-type': 'application/json',
    };
    wx.request({
      url: baseURL + url,
      method: method,
      data: method === POST ? JSON.stringify(data) : data,
      header: header,
      success(res) {
        //请求成功
        //判断code是否为0表示成功
        if (res.data.code == 200) {
          resolve(res);
        } else {
          //其他错误
          reject('运行出错,请稍后再试');
        }
      },
      fail(err) {
        //请求失败
        reject(err)
      }
    })
  })
}


//接口可以集合到一块，集中管理
const API = {
  // getList: (data) => request(GET, `/index.php/index/index/getImgList`),
  // getLogin: (data) => request(POST, '/index.php/index/index/login', data)
  addPost: (data) => request(POST, '/post/create', data),
  getPostList: (data) => request(GET, `/post/getAll`)
};
module.exports = {
  API: API
}