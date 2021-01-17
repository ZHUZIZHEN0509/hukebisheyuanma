import {request} from "./reaquest";

//1.查询所有
export function getAllCourse(courseData) {
  return request({
    url: 'api/course',
    method: 'get',
    params: courseData
  })
}
//2.删除信息
export function deleteCourse(id) {
  return request({
    url: 'api/course/'+id,
    method: 'delete'
  })
}
