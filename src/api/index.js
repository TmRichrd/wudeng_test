import request from '@/utils/axios'
import qs from 'qs'
// 登录
export function login(params) {
  return request({
    url: '/admin/public/dologin.html',
    method: 'post',
    data: params,
  })
}

// 获取路由信息
export function getRouter(params) {
  return request({
    url: '/tuopu/system/menus.html',
    method: 'post',
    data: params,
  })
}

// 获取技术支持公司名
export function getTechSupport(params) {
  return request({
    //url: '/admin/public/techsupport.html',
    url: '/admin/public/techsupport.html',
    method: 'post',
    data: params,
  })
}

// 修改密码
export function editPwd(params) {
  return request({
    url: '/admin/setting/modifypassword.html',
    method: 'post',
    data: params,
  })
}

// 获取首页数据
export function getIndexInfo(params) {
  return request({
    url: '/admin/index/index.html',
    method: 'post',
    data: params,
  })
}

// 获取用户列表
export function getUserList(params) {
  return request({
    url: '/admin/user/index.html',
    method: 'post',
    data: params,
  })
}

// 删除用户
export function delUser(params) {
  return request({
    url: '/admin/user/delete.html',
    method: 'post',
    data: params,
  })
}

// 禁用用户
export function forbidUser(params) {
  return request({
    url: '/admin/user/ban.html',
    method: 'post',
    data: params,
  })
}

// 获取用户角色组
export function getGroupOpt(params) {
  return request({
    url: '/admin/user/add.html',
    method: 'post',
    data: params,
  })
}

// 添加用户
export function addUser(params) {
  return request({
    url: '/admin/user/addPost.html',
    method: 'post',
    data: params,
  })
}

// 获取用户信息
export function getUserInfoById(params) {
  return request({
    url: '/admin/user/edit.html',
    method: 'post',
    data: params,
  })
}

// 编辑保存用户信息
export function editUserInfo(params) {
  return request({
    url: '/admin/user/editPost.html',
    method: 'post',
    data: params,
  })
}

// 获取角色列表
export function getRoleList(params) {
  return request({
    url: '/admin/rbac/index.html',
    method: 'post',
    data: params,
  })
}

// 删除角色
export function delRole(params) {
  return request({
    url: '/admin/rbac/roleDelete.html',
    method: 'post',
    data: params,
  })
}

// 获取角色的权限
export function getRoleAuth(params) {
  return request({
    url: '/admin/rbac/authorize.html',
    method: 'post',
    data: params,
  })
}

// 修改角色的权限
export function updateRoleAuth(params) {
  return request({
    url: '/admin/rbac/authorizePost.html',
    method: 'post',
    data: params,
  })
}

// 添加角色
export function addRole(params) {
  return request({
    url: '/admin/rbac/roleaddpost.html',
    method: 'post',
    data: params,
  })
}

// 获取单个角色信息
export function getRoleById(params) {
  return request({
    url: '/admin/rbac/roleedit.html',
    method: 'post',
    data: params,
  })
}

// 编辑角色
export function updateRole(params) {
  return request({
    url: '/admin/rbac/roleeditpost.html',
    method: 'post',
    data: params,
  })
}

// 获取Tcp设置数据
export function getTcpInfo(params) {
  return request({
    url: '/tuopu/site/index.html',
    method: 'post',
    data: params,
  })
}
// 设置新Tcp数据
export function setTcpInfo(params) {
  return request({
    url: '/tuopu/site/sitepost.html',
    method: 'post',
    data: params,
  })
}

// 获取集中器列表
export function getConcentratorList(params) {
  return request({
    url: '/tuopu/jizhongqi/getjizhongqibyuser.html',
    method: 'post',
    data: params,
  })
}
// 获取集中器列表
export function getConcentratorPageList(params) {
  return request({
    url: '/tuopu/jizhongqi/index.html',
    method: 'post',
    data: params,
  })
}

// 删除集中器
export function delConcentrator(params) {
  return request({
    url: '/tuopu/jizhongqi/delete.html',
    method: 'post',
    data: params,
  })
}

// 获取时间段列列表
export function getTimeControl(params) {
  return request({
    url: '/tuopu/system/time.html',
    method: 'post',
    data: params,
  })
}

// 删除某个时间段运行规则
export function delTimeControl(params) {
  return request({
    url: '/tuopu/system/deletetime.html',
    method: 'post',
    data: params,
  })
}
// 获取某个时间段运行规则
export function getTimeControlById(params) {
  return request({
    url: '/tuopu/system/edittime.html',
    method: 'post',
    data: params,
  })
}

// 恢复或下发某个时间段运行规则
export function resetTimeRule(params) {
  return request({
    url: '/tuopu/item/downtimerule.html',
    method: 'post',
    data: params,
  })
}

// 编辑某个时间段运行规则
export function editTimeControl(params) {
  return request({
    url: '/tuopu/system/edittimepost.html',
    method: 'post',
    data: params,
  })
}

// 获取能见度列表
export function getVsibilityList(params) {
  return request({
    url: '/tuopu/system/index.html',
    method: 'post',
    data: params,
  })
}

// 删除某个能见度规则
export function delVsibility(params) {
  return request({
    url: '/tuopu/system/delete.html',
    method: 'post',
    data: params,
  })
}
// 获取某个能见度规则
export function getVisibilityById(params) {
  return request({
    url: '/tuopu/system/editnjd.html',
    method: 'post',
    data: params,
  })
}

// 编辑某个能见度规则
export function editCisibility(params) {
  return request({
    url: '/tuopu/system/editnjdpost.html',
    method: 'post',
    data: params,
  })
}
// 恢复或下发某个能见度规则
export function resetVisibiRule(params) {
  return request({
    url: '/tuopu/item/downnjdrule.html',
    method: 'post',
    data: params,
  })
}

// 获取路段分组列表
export function getRoadGroupList(params) {
  return request({
    url: '/tuopu/cat/index.html',
    method: 'post',
    data: params,
  })
}

// 获取路段分组详情
export function getGroupById(params) {
  return request({
    url: '/tuopu/cat/edit.html',
    method: 'post',
    data: params,
  })
}

// 删除路段分组
export function DelRoadGroup(params) {
  return request({
    url: '/tuopu/cat/delete.html',
    method: 'post',
    data: params,
  })
}

// 获取所有未分组路段
export function getAllGroupRoad(params) {
  return request({
    url: '/tuopu/cat/add.html',
    method: 'post',
    data: params,
  })
}

// 编辑路段分组保存
export function updateGrounp(params) {
  return request({
    url: '/tuopu/cat/editPost.html',
    method: 'post',
    data: params,
  })
}

// 添加分组保存
export function addGrounp(params) {
  return request({
    url: '/tuopu/cat/addPost.html',
    method: 'post',
    data: params,
  })
}

// 添加路段
export function addRoad(params) {
  return request({
    url: '/tuopu/luduan/addpost.html',
    method: 'post',
    data: params,
  })
}

// 获取事故列表
export function getAccidentList(params) {
  return request({
    url: '/tuopu/luduan/shigulist.html',
    method: 'post',
    data: params,
  })
}

// 删除事故
export function delAccident(params) {
  return request({
    url: '/tuopu/luduan/deleteshigu.html',
    method: 'post',
    data: params,
  })
}

// 获取单个事故详情
export function getAccidentById(params) {
  return request({
    url: '/tuopu/luduan/edit.html',
    method: 'post',
    data: params,
  })
}

// 编辑事故
export function editAccident(params) {
  return request({
    url: '/tuopu/luduan/editpost.html',
    method: 'post',
    data: params,
  })
}

// 添加事故
export function addAccident(params) {
  return request({
    url: '/tuopu/luduan/addshigu.html',
    method: 'post',
    data: params,
  })
}

// 获取路段列表
export function getRoadList(params) {
  return request({
    url: '/tuopu/luduan/luduanlist.html',
    method: 'post',
    data: params,
  })
}

// 获取路段总况
export function getRoadSurvey(params) {
  return request({
    url: '/tuopu/luduan/luduanzongkuang.html',
    method: 'post',
    data: params,
  })
}

// 删除路段
export function delRoadById(params) {
  return request({
    url: '/tuopu/luduan/deleteLuduan.html',
    method: 'post',
    data: params,
  })
}

// 路段详情-集中器
export function getRoadConcentrator(params) {
  return request({
    url: '/tuopu/luduan/luduanjizhongqi.html',
    method: 'post',
    data: params,
  })
}

// 报表-能见度
export function getReportVisibility(params) {
  return request({
    url: '/tuopu/report/njdlog.html',
    method: 'post',
    data: params,
  })
}

// 报表-导出能见度
export function downLoadReportVisibility(params) {
  return request({
    url: '/tuopu/report/njdlogexport.html',
    method: 'get',
    params: params,
  })
}

// 报表-操作日志
export function getReportOpera(params) {
  return request({
    url: '/tuopu/report/operatelog.html',
    method: 'post',
    data: params,
  })
}

// 报表-导出操作日志
export function downLoadReportOpera(params) {
  return request({
    url: '/tuopu/report/operatelogexport.html',
    method: 'get',
    params: params,
  })
}

// 路段详情-获取集中器列表
export function getJizhognQiList(params) {
  return request({
    url: '/tuopu/jizhongqi/listall.html',
    method: 'post',
    params: params,
  })
}

// 报表-技术运维数据
export function getTechnologyData(params) {
  return request({
    url: '/tuopu/report/techpeople.html',
    method: 'post',
    params: params,
  })
}

// 路段列表-保存集中器基本信息
export function saveJzqBaseInfo(params) {
  return request({
    url: '/tuopu/luduan/savebase.html',
    method: 'post',
    params: params,
  })
}

// 路段详情-绑定机箱
export function bindRoadBox(params) {
  return request({
    url: '/tuopu/luduan/savesmartbox.html',
    method: 'post',
    params: params,
  })
}

// 路段详情-声音广播
export function getAudioInfo(params) {
  return request({
    url: '/tuopu/yinzhu/yinzhu.html',
    method: 'post',
    params: params,
  })
}

// 路段详情-声音广播-保存
export function saveAudioInfo(params) {
  return request({
    url: '/tuopu/yinzhu/saveyinzhu.html',
    method: 'post',
    params: params,
  })
}

// 路段详情-集中器-运行方案调整
export function roadRunModify(params) {
  return request({
    url: '/tuopu/client/sendpost.html',
    method: 'post',
    params: params,
  })
}

// 路段详情-集中器-事故施工发光标志开启
export function roadShiguLight(params) {
  return request({
    url: '/tuopu/luduan/startzhiling.html',
    method: 'post',
    params: params,
  })
}

// 路段详情-集中器-事故施工发光标志取消
export function roadShiguLightCancel(params) {
  return request({
    url: '/tuopu/luduan/cancelZhiling.html',
    method: 'post',
    params: params,
  })
}

// 路段详情-集中器-查询运行方案调整结果
export function roadRunModifyResult(params) {
  return request({
    url: '/tuopu/client/queryState.html',
    method: 'post',
    params: params,
  })
}
// 路段详情-集中器-读取参数
export function getParamsData(params) {
  return request({
    url: '/tuopu/item/readParameters.html',
    method: 'post',
    params: params,
  })
}
// 路段详情-集中器-gps定位
export function getGpsLocation(params) {
  return request({
    url: '/tuopu/item/getGps.html',
    method: 'post',
    params: params,
  })
}

// 路段详情-集中器-手动定位
export function setJzqGps(params) {
  return request({
    url: '/tuopu/item/set_location.html',
    method: 'post',
    params: params,
  })
}

// 路段详情-获取气象仪信息
export function getMeteorological(params) {
  return request({
    url: '/tuopu/luduan/qixiangyi.html',
    method: 'post',
    params: params,
  })
}

// 路段详情-获取发光标志信息
export function getFogLamp(params) {
  return request({
    url: '/tuopu/item/setquantity.html',
    method: 'post',
    params: params,
  })
}

// 路段详情-获取发光标志详细信息
export function getFogLampDetail(params) {
  return request({
    url: '/tuopu/item/wudengstatus.html',
    method: 'post',
    params: params,
  })
}

// 路段详情-保存发光标志信息
export function saveFogLamp(params) {
  return request({
    url: '/tuopu/item/quantitypost.html',
    method: 'post',
    params: params,
  })
}

// 路段详情-获取最近屏幕信息信息
export function getScreenInfo(params) {
  return request({
    url: '/tuopu/led/led.html',
    method: 'post',
    params: params,
  })
}

// 路段详情-保存最近屏幕信息信息
export function saveScreenInfo(params) {
  return request({
    url: '/tuopu/led/savebase.html',
    method: 'post',
    params: params,
  })
}

// 路段详情-向LED屏下发要显示的文本内容
export function putScreenInfo(params) {
  return request({
    // url: '/tuopu/led/xiafatext.html', G.Z 20211209
    url: '/tuopu/item/sendtext.html',
    method: 'post',
    params: params,
  })
}

// 路段详情-获取摄像头信息
export function getCameraInfo(params) {
  return request({
    url: '/tuopu/monitor/monitorset.html',
    method: 'post',
    params: params,
  })
}

// 路段详情-获取摄像头信息
export function saveCameraInfo(params) {
  return request({
    url: '/tuopu/monitor/monitorsetpost.html',
    method: 'post',
    params: params,
  })
}

// 路段详情-获取摄像头直播地址
export function getPlayUrl(params) {
  return request({
    url: '/tuopu/monitor/monitorlive.html',
    method: 'post',
    params: params,
  })
}

// 路段详情-获取摄像头图片信息
export function getCreameImageUrl(params) {
  return request({
    url: '/tuopu/monitor/imagelist.html',
    method: 'post',
    params: params,
  })
}

// 路段详情-摄像头拍照
export function takeCreamePhoto(params) {
  return request({
    url: '/tuopu/monitor/takephoto.html',
    method: 'post',
    params: params,
  })
}
// 路段详情-摄像头位置调整
export function creameSetAddr(params) {
  return request({
    url: '/tuopu/monitor/yuntaioperate.html',
    method: 'post',
    params: params,
  })
}

// 路段详情-添加预置点
export function addPreDot(params) {
  return request({
    url: '/tuopu/monitor/addpreset.html',
    method: 'post',
    params: params,
  })
}
// 路段详情-恢复预置点
export function resetPreDot(params) {
  return request({
    url: '/tuopu/monitor/huifuPreset.html',
    method: 'post',
    params: params,
  })
}

// 路段详情-获取智能箱信息
export function getBoxParam(params) {
  return request({
    url: '/tuopu/box/deviceParameters.html',
    method: 'post',
    params: params,
  })
}

// 路段详情-智能箱-电压打开关闭
export function operaBoxElc(params) {
  return request({
    url: '/tuopu/box/circuitcontrol.html',
    method: 'post',
    params: params,
  })
}

// 路段详情-智能箱-电压打开结果获取
export function getElcResult(params) {
  return request({
    url: '/tuopu/box/querystate.html',
    method: 'post',
    params: params,
  })
}

// 报表-事故统计
export function getAccidentCount(params) {
  return request({
    url: '/tuopu/report/shigu.html',
    method: 'post',
    params: params,
  })
}

// 路段-添加路段日志
export function addLoadLog(params) {
  return request({
    url: '/tuopu/luduanlog/addoperatelog.html',
    method: 'post',
    params: params,
  })
}

// 路段-删除路段日志
export function delLoadLog(params) {
  return request({
    url: '/tuopu/luduanlog/deletelog.html',
    method: 'post',
    params: params,
  })
}
// 路段-获取路段日志详情
export function getLoadLogDet(params) {
  return request({
    url: '/tuopu/luduanlog/getonelog.html',
    method: 'post',
    params: params,
  })
}

// 路段-获取路段日志列表
export function getLoadLogList(params) {
  return request({
    url: '/tuopu/luduanlog/getloglist.html',
    method: 'post',
    params: params,
  })
}

// 路段-编辑路段日志列表
export function editLoadLogList(params) {
  return request({
    url: '/tuopu/luduanlog/modifylog.html',
    method: 'post',
    params: params,
  })
}
