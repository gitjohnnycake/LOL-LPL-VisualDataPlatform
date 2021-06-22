import axios from "axios"; // 引用axios

const instance = axios.create({
  baseURL: "/api",
  timeout: 5000,
});

// 添加请求拦截器
instance.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么
    config.headers["Content-type"] = "application/json";
    return config;
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
instance.interceptors.response.use(
  (response) => {
    // 对响应数据做点什么
    // 隐藏加载图
    // 获取code
    const res = response.data;
    // 返回成功
    if (res == 200) {
      return res;
    }
    // token 异常
    if (res === 508 || res === 512 || res === 514) {
      // 登出 清除token缓存
    }
    return response;
  },
  (error) => {
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

export default instance;
//get请求
export function get(url, params = {}) {
  return new Promise((resolve, reject) => {
    instance
      .get(url, {
        params: params,
      })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
//post请求
export function post(url, data = {}) {
  return new Promise((resolve, reject) => {
    instance
      .post(url, data)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
/* 
处理合并请求
@params qs
@returns { Promise<unknown> }
 */
export function requestAll(qs) {
  return new Promise((resolve, reject) => {
    axios
      .all(qs)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
