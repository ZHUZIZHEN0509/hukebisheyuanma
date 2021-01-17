import { request } from "./reaquest";

//1.查询所有
export function getAllMenu() {
  return request({
    url: 'api/menu',
    method: 'get'
  })
}
//2.添加菜单
export function addMenu(data) {
  return request({
    url: 'api/menu',
    method: 'post',
    data: data
  })
}
//3.查找单个菜单
export function getByMenu(id) {
  return request({
    url: 'api/menu/'+id,
    method: 'get'
  })
}
//4.修改菜单
export function updateMenu(data) {
  return request({
    url: 'api/menu',
    method: 'put',
    data: data
  })
}
//5.删除菜单
export function deleteMenu(menuId) {
  return request({
    url: 'api/menu/'+menuId,
    method: 'delete'
  })
}