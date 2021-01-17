import {request} from './reaquest'

//1.查询所有讲师
// export function getTeacherList(currPage,limit,name,level,createTime,endTime) {
//     return request({
//       url: 'api/teacher',
//       method: 'get',
//       params:{
//         currPage,
//         limit,
//         name,
//         level,
//         createTime,
//         endTime
//       }
//     })
// }
export function getTeacherList(data) {
  return request({
    url: 'api/teacher',
    method: 'get',
    params: data
  })
}
//2.删除讲师
export function deleteTeacher(ids) {
  return request({
    url: `api/teacher/${ids}`,
    method: 'delete'
  })
}
//3.添加讲师
// export function addTeacher(avatar,name,sort,level,career,intro) {
//    return request({
//      url: 'api/teacher',
//      method: 'post',
//      data:{
//         avatar,
//         name,
//         sort,
//         level,
//         career,
//         intro
//      }
//    })
// }
export function addTeacher(data) {
   return request({
     url: 'api/teacher',
     method: 'post',
     data: data
   })
}
//4.修改讲师
// export function changeTeacher(id,name,sort,level,career,intro,avatar) {
//   return request({
//     url: 'api/teacher',
//     method: 'put',
//     data:{
//       id,
//       name,
//       sort,
//       level,
//       career,
//       intro,
//       avatar
//     }
//   })
// }
export function changeTeacher(data) {
  return request({
    url: 'api/teacher',
    method: 'put',
    data: data
  })
}