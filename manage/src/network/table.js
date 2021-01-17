import  { request } from "./reaquest";

//1.获取图表数据
export function getTable(data) {
  return request({
    url: 'api/statistics',
    method: 'get',
    params: data
  })
}
//2.统计日数据
export function getTableDay(data) {
  return request({
    url: 'api/statistics/'+data,
    method: 'get'
  })
}