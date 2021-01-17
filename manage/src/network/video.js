import {request} from './reaquest'

//1.添加小节
export function addVideo(video) {
  return request({
    url: 'api/video',
    method: 'post',
    data: video
  })
}
//2.删除小节
export function deleteVideo(id) {
  return request({
    url: 'api/video/'+id,
    method: 'delete'
  })
}
//3.修改小节
export function updateVideo(video) {
  return request({
    url: 'api/video',
    method: 'put',
    data: video
  })
}
//4.查找小节
export function selectVideo(id) {
  return request({
    url: 'api/video/'+id,
    method: 'get'
  })
}
//5.移除视频
export function deleteUpload(videoIds) {
  return request({
    url: 'third/vod/video/'+videoIds,
    method: 'delete'
  })
}


