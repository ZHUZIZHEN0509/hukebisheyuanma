import {request} from './reaquest'

//1.添加课程
export function classAdd(file) {
  return request({
    url: 'api/subject',
    method: 'post',
    data: file
  })
}
//2.查询所有课程
export function classList() {
  return request({
    url: 'api/subject',
    method: 'get'
  })
}
//3.修改课程
export function updataClassList(data) {
  return request({
    url: 'api/subject',
    method: 'put',
    data: data
  })
}
//4.查询当个课程
export function selectById(id) {
  return request({
    url: 'api/subject/'+id,
    method: 'get'
  })
}
//5.删除单个课程
export function deleteClassList(ids) {
  return request({
    url: 'api/subject',
    method: 'delete',
    data: ids
  })
}
