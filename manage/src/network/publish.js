import {request} from './reaquest';

//1.查询课程发布前信息
export function selectPublish(courseId) {
  return request({
    url: 'api/course/publish/'+courseId,
    method: 'get'
  })
}
//2.课程发布  修改课程发布状态
export function updateStatus(id) {
  return request({
    url: 'api/course/'+id,
    method: 'put'
  })
}