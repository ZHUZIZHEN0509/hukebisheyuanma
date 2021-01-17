import {request} from './reaquest'

//1.添加课程基本信息
export function addCourse(courseInfo) {
  return request({
    url: 'api/course',
    method: 'post',
    data: courseInfo
  })
}
//2.查询单个课程基本信息
export function getCourseById(id) {
  return request({
    url: 'api/course/'+id,
    method: 'get'
  })
}
//3.修改课程基本信息
export function updataCourse(updataCourse) {
  return request({
    url: 'api/course',
    method: 'put',
    data: updataCourse
  })
}
//4.添加章节
export function addChapter(chapter) {
  return request({
    url: 'api/chapter',
    method: 'post',
    data:chapter
  })
}
//5.修改章节
export function updateChapter(updateData) {
  return request({
    url: 'api/chapter',
    method: 'put',
    data: updateData
  })
}
//6.删除章节
export function deleteChapter(id) {
  return request({
    url: 'api/chapter/'+id,
    method: 'delete'
  })
}
//7.查询所有章节小节
export function selectAllChapter(id) {
  return request({
    url: 'api/chapter/video/'+id,
    method: 'get'
  })
}
//8.查询单个章节
export function selectById(id) {
  return request({
    url: 'api/chapter/'+id,
    method: 'get'
  })
}

