import { request } from "./reaquest"; 

//1.查询所有权限用户
export function getUserList(data) {
  return request({
    url: 'api/acl/user/'+data.curPage+'/'+data.limit,
    method: 'get',
    params: data
  })
}
//2.添加权限用户
export function addUser(data) {
  return request({
    url: 'api/acl/user',
    method: 'post',
    data: data
  })
}
//3.批量删除用户
export function deleteUser(data) {
  return request({
    url: 'api/acl/user',
    method: 'delete',
    data: data
  })
}
// //4.根据用户分配角色
// export function getByRole(id) {
//   return request({
//     url: '/api/acl/user/role/'+id,
//
//   })
// }
//5.查询单个权限用户表
export function getOneRole(id) {
  return request({
    url: 'api/acl/user/'+id,
    method: 'get'
  })
}
//6.修改权限用户
export function updataRole(data) {
  return request({
    url: 'api/acl/user',
    method: 'put',
    data: data
  })
}
