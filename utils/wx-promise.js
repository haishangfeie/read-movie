// 将异步方法封装为promise
let wxp = {};
creatWxp('navigateTo');
// creatWxp('login');
// creatWxp('showActionSheet');
// creatWxp('navigateTo');
// creatWxp('setStorage');
// creatWxp('getStorage');
// creatWxp('removeStorage');
function creatWxp(key) {
  wxp[key] = (data = {}) => {
    return new Promise((resolve, reject) => {
      wx[key]({
        ...data,
        success(res) {
          return resolve(res);
        },
        fail(err) {
          return reject(err);
        }
      });
    });
  };
}
export default wxp;
