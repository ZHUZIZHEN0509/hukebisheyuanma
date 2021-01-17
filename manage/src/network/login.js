import { request } from "./reaquest";

export function getLogin(data) {
  return request({
    url: 'api/admin/user/login',
    method: 'post',
    data: data
  })
}