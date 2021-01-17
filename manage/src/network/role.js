import { request } from "./reaquest";

//1.获取角色分页列表
export function getRole(data) {
  return request({
    url: 'api/role/'+data.curPage+'/'+data.limit,
    method: 'get',
    params: data
  })
}
//2.添加角色
export function addRole(data) {
  return request({
    url: 'api/role',
    method: 'post',
    data: data
  })
}
//3.批量删除
export function deleteRole(data) {
  return request({
    url: 'api/role',
    method: 'delete',
    data: data
  })
}
//4.获取所有权限
export function getAllRole() {
  return request({
    url: 'api/menu',
    method: 'get'
  })
}
//5.给角色分配权限
export function setRole(roleId,roleIds) {
  return request({
    url: 'api/menu/role/'+roleId,
    method: 'post',
    data: roleIds
  })
}
//6.修改角色分配权限
export function updataRole(data) {
  return request({
    url: 'api/role',
    method: 'put',
    data: data
  })
}
//7.查询单个角色
export function getByIdROLE(roleId) {
  return request({
    url: 'api/role/'+roleId,
    method: 'get'
  })
}
//8.查询所有角色
export function searchAllRole() {
  return request({
    url: 'api/role',
    method: 'get'
  })
}
//9.根据用户分配角色
export function gaveRole(userId,ids) {
  return request({
    url: 'api/acl/user/role/'+userId,
    method: 'post',
    data: ids
  })
}