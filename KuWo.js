/**************************** 
 
#!name = 酷我音乐 
#!desc = 〔 酷我音乐&酷我畅听 〕全功能破解 
#!author = 影子 
#!openUrl = https://napi.ltd 
#!homepage = https://napi.ltd 
#!icon = https://file.napi.ltd/Static/Image/KuWo.png 
#!date = 2024-05-05 
 
 
[Rule] 
USER-AGENT,KWPlayer*,DIRECT 
 
 
[Script] 
http-response ^(?!.*img).*?kuwo\.cn(/vip|/openapi)?(/enc|/audi.tion|/v[\d]/(user/vip\?(vers|apiVersion|platform|op\=ui|_t)|theme\?op=gd|sysinfo\?op=getRePayAndDoPayBoxNew|api(/pay)?/((user/personal/)?user/info|payInfo/kwplayer/payMiniBar|advert/(myPage|iListen|album))|album/(adBar|myRec/vipMusic))|/kuwopay/vip-tab/setting|/(audioApi/)?a\.p($|\?op\=getvip|.*?ptype\=vip)|/mobi\.s\?f\=kwxs|/music\.pay\?newver\=3$|/(EcomResource|(Mobile)?Ad)Serv(er|ice)) script-path=https://napi.ltd/script/BackUP/KuWo.js, requires-body=true, timeout=60, tag=酷我音乐, img-url=https://file.napi.ltd/Static/Image/KuWo.png 
 
 
[Mitm] 
hostname = *.kuwo.cn 
 
****************************/ 
 
 
 
const $ = Env("KuWo"); 
 
const req = $request; 
var url = $request.url; 
 
const KuWo_Enc = '/vip/enc'; 
const KuWo_Vip = RegExp(/(vip\/)?v2\/(api(\/pay)?\/user\/info|user\/vip)/); 
const KuWo_Book = RegExp(/(a\.p|v2\/api\/(user\/personal\/)?user\/info)/); 
const KuWo_Theme = '/vip/v2/theme?op=gd'; 
const KuWo_AD = RegExp(/(v2\/api\/advert\/(iListen|album)|openapi\/v1\/album\/adBar|(\/EcomResource|\/(Mobile)?Ad)Serv(er|ice))/); 
const KuWo_ListAD = '/vip/v2/sysinfo?op=getRePayAndDoPayBoxNew'; 
const Book_Home = '/v2/api/advert/myPage' 
const KuWo_BookAD = '/v2/api/pay/payInfo/kwplayer/payMiniBar'; 
const KuWo_TabAD = '/kuwopay/vip-tab/setting'; 
const KuWo_HomeAD = '/openapi/v1/album/myRec/vipMusic'; 
const Play_URL = '/mobi.s?f=kwxs'; 
const KuWo_Down = '/music.pay?newver=3'; 
 
/* 
const MUSIC_URL = '/audi.tion'; 
 
if (url.indexOf(MUSIC_URL) != -1) { 
 obj = $.toObj($response.body); 
 id = obj.songs[0]['id']; 
 !(async () => { 
  await $.http 
  .get({ 
   url: 'http://mobi.kuwo.cn/mobi.s?f=web&source=kwplayer_ar_1.1.9_oppo_118980_320.apk&type=convert_url_with_sign&br=2000kflac&rid=' + id 
  }) 
  .then((response) => { 
   NewObj = $.toObj(response.body); 
   MusicUrl = NewObj.data['url']; 
   obj.songs[0]['br'] = NewObj.data['bitrate']; 
   obj.songs[0]['format'] = NewObj.data['format']; 
   obj.songs[0]['url'] = MusicUrl; 
   obj.songs[0]['end'] = obj.songs[0]['duration']; 
   obj.songs[0]['https'] = MusicUrl; 
   obj.songs[0]['car_url'] = MusicUrl; 
   obj.songs[0]['car_url_https'] = MusicUrl; 
   $.done({body: $.toStr(obj)}); 
  }); 
 })().then(() => $.done()); 
} 
*/ 
 
 
if (url.indexOf(Play_URL) != -1) { 
 obj = $.toObj($response.body); 
 rid = $.getval("KuWoID") || obj.data['rid']; 
 !(async () => { 
  await $.http 
  .get({ 
   url: 'http://mobi.kuwo.cn/mobi.s?f=web&source=kwplayer_ar_1.1.9_oppo_118980_320.apk&type=convert_url_with_sign&br=2000kflac&rid=' + rid 
  }) 
  .then((response) => { 
   $.setval("", "KuWoID"); 
   $.done({body: response.body}); 
  }); 
 })().then(() => $.done()); 
} 
 
if (url.endsWith(KuWo_Down)) { 
 let obj = $.toObj($response.body); 
 obj.songs[0].audio.forEach((item) => (item.st = 0)); 
 $.setval(obj.songs[0].id, "KuWoID"); 
 let tmp = obj.songs[0].audio[0].policy; 
 obj.user[0] = { 
  pid: obj.songs[0].audio[0].pid, 
  type: tmp, 
  name: tmp + "_1", 
  categray: tmp + "_1", 
  id: obj.songs[0].id, 
  order: 375787919, 
  final: [], 
  buy: 1657425321, 
  begin: 1657425321, 
  end: 4077187200, 
  CurEnd: 0, 
  playCnt: 0, 
  playUpper: 300, 
  downCnt: 0, 
  downUpper: 300, 
  playVideoCnt: 0, 
  playVideoUpper: 3000, 
  downVideoCnt: 0, 
  downVideoUpper: 3000, 
  price: obj.songs[0].audio[0].price, 
  period: 1000, 
  feetype: 0, 
  info: obj.songs[0] 
 }; 
 $.done({body:$.toStr(obj)}); 
} 
 
if (url.indexOf(KuWo_Enc) != -1) { 
 !(async () => { 
  await $.http 
  .get({ 
   url: url.replace(/uid=\d+/g, 'uid=238581279') 
  }) 
  .then((response) => { 
   $.done({body:response.body}); 
  }); 
 })().then(() => $.done()); 
} 
 
if (url.match(KuWo_Vip)) { 
 obj = $.toObj($response.body); 
 obj.data["vipIcon"] = "https:\/\/image.kuwo.cn\/fe\/13e4f930-f8bc-4b86-8def-43cbc3c7d86c7.png"; 
 delete obj.data.iconJumpUrl; 
 delete obj.data.adActUrl; 
 obj.data["growthValue"] = "9999"; 
 obj.data["vipTag"] = "VIP7"; 
 obj.data["vipmIcon"] = "https:\/\/image.kuwo.cn\/fe\/34ad47f8-da7f-43e4-abdc-e6c995666368yyb.png"; 
 obj.data["svipIcon"] = "https:\/\/image.kuwo.cn\/fe\/13e4f930-f8bc-4b86-8def-43cbc3c7d86c7.png"; 
 obj.data["openBtnText"] = "永久会员"; 
 obj.data["vipExpire"] = "4077187200315"; 
 obj.data["vipExpires"] = 4077187200315; 
 obj.data["luxuryIcon"] = "https:\/\/image.kuwo.cn\/fe\/2fae68ff-de2d-4473-bf28-8efc29e44968vip.png"; 
 obj.data["vipmExpire"] = "4077187200315"; 
 obj.data["vipLuxuryExpire"] = "4077187200315"; 
 obj.data["svipExpire"] = "4077187200315"; 
 obj.data["isYearUser"] = "2"; 
 obj.data["biedSong"] = "1"; 
 obj.data["svipAutoPayUser"] = "1"; 
 $.done({body:$.toStr(obj)}); 
} 
 
if (url.match(KuWo_Book)) { 
 id = $response.body.replace(/.*?\"id\":(\d+).*/, '$1'); 
 $.setval(id, "KuWoID"); 
 body = $response.body.replace(/(policy|policytype)\":\d/g, '$1\":0').replace(/(playright|downright|type|bought_vip|limitfree|vipType)\":\d/g, '$1\":1').replace(/(end|endtime|vipExpires|bought_vip_end)\":\d+/g, '$1\":4077187200') 
 $.done({body:body}) 
} 
 
if (url.indexOf(KuWo_TabAD) != -1) { 
 obj = $.toObj($response.body); 
 tab = [obj.data['tab']['vipTypes'][0]['topics'][0]]; 
 obj.data['tab']['vipTypes'][0]['topics'] = tab; 
 $.done({body:$.toStr(obj)}); 
} 
 
if (url.indexOf(KuWo_Theme) != -1) { 
 obj = $.toObj($response.body); 
 obj.data.vipTheme.type = "free"; 
 delete obj.data.needBieds; 
 $.done({body:$.toStr(obj)}); 
} 
 
if(url.match(KuWo_AD)){ 
 body = 'YingZi'; 
 $.done({body:body}); 
} 
   
if (url.indexOf(KuWo_ListAD) != -1) { 
 obj = $.toObj($response.body); 
 delete obj.data.songListTopContext; 
 $.done({body:$.toStr(obj)}); 
} 
 
if (url.indexOf(Book_Home) != -1) { 
 obj = $.toObj($response.body); 
 obj.data["scheme"] = null 
 obj.data["title"] = "酷我畅听" 
 obj.data["url"] = null 
 obj.data["subTitle"] = "畅听服务由影子提供" 
 $.done({body:$.toStr(obj)}) 
} 
 
if (url.indexOf(KuWo_BookAD) != -1) { 
 obj = $.toObj($response.body); 
 delete obj.data; 
 delete obj.dataV2; 
 $.done({body:$.toStr(obj)}); 
} 
   
if (url.indexOf(KuWo_HomeAD) != -1) { 
 obj = $.toObj($response.body); 
 delete obj.data["listenSomething"]; 
 $.done({body:$.toStr(obj)}); 
} 
 
// ENV 
function Env(t,s){class e{constructor(t){this.env=t}send(t,s="GET"){t="string"==typeof t?{url:t}:t;let e=this.get;return"POST"===s&&(e=this.post),new Promise((s,i)=>{e.call(this,t,(t,e,r)=>{t?i(t):s(e)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,s){this.name=t,this.http=new e(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.encoding="utf-8",this.startTime=(new Date).getTime(),Object.assign(this,s),this.log("",`\ud83d\udd14${this.name}, \u5f00\u59cb!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $environment&&$environment["surge-version"]}isLoon(){return"undefined"!=typeof $loon}isShadowrocket(){return"undefined"!=typeof $rocket}isStash(){return"undefined"!=typeof $environment&&$environment["stash-version"]}toObj(t,s=null){try{return JSON.parse(t)}catch{return s}}toStr(t,s=null){try{return JSON.stringify(t)}catch{return s}}getjson(t,s){let e=s;const i=this.getdata(t);if(i)try{e=JSON.parse(this.getdata(t))}catch{}return e}setjson(t,s){try{return this.setdata(JSON.stringify(t),s)}catch{return!1}}getScript(t){return new Promise(s=>{this.get({url:t},(t,e,i)=>s(i))})}runScript(t,s){return new Promise(e=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=s&&s.timeout?s.timeout:r;const[o,h]=i.split("@"),a={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(a,(t,s,i)=>e(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),s=this.path.resolve(process.cwd(),this.dataFile),e=this.fs.existsSync(t),i=!e&&this.fs.existsSync(s);if(!e&&!i)return{};{const i=e?t:s;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),s=this.path.resolve(process.cwd(),this.dataFile),e=this.fs.existsSync(t),i=!e&&this.fs.existsSync(s),r=JSON.stringify(this.data);e?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(s,r):this.fs.writeFileSync(t,r)}}lodash_get(t,s,e){const i=s.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return e;return r}lodash_set(t,s,e){return Object(t)!==t?t:(Array.isArray(s)||(s=s.toString().match(/[^.[\]]+/g)||[]),s.slice(0,-1).reduce((t,e,i)=>Object(t[e])===t[e]?t[e]:t[e]=Math.abs(s[i+1])>>0==+s[i+1]?[]:{},t)[s[s.length-1]]=e,t)}getdata(t){let s=this.getval(t);if(/^@/.test(t)){const[,e,i]=/^@(.*?)\.(.*?)$/.exec(t),r=e?this.getval(e):"";if(r)try{const t=JSON.parse(r);s=t?this.lodash_get(t,i,""):s}catch(t){s=""}}return s}setdata(t,s){let e=!1;if(/^@/.test(s)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(s),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const s=JSON.parse(h);this.lodash_set(s,r,t),e=this.setval(JSON.stringify(s),i)}catch(s){const o={};this.lodash_set(o,r,t),e=this.setval(JSON.stringify(o),i)}}else e=this.setval(t,s);return e}getval(t){return this.isSurge()||this.isShadowrocket()||this.isLoon()||this.isStash()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,s){return this.isSurge()||this.isShadowrocket()||this.isLoon()||this.isStash()?$persistentStore.write(t,s):this.isQuanX()?$prefs.setValueForKey(t,s):this.isNode()?(this.data=this.loaddata(),this.data[s]=t,this.writedata(),!0):this.data&&this.data[s]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,s=(()=>{})){if(t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isShadowrocket()||this.isLoon()||this.isStash())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,e,i)=>{!t&&e&&(e.body=i,e.statusCode=e.status?e.status:e.statusCode,e.status=e.statusCode),s(t,e,i)});else if(this.isQuanX())this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:e,statusCode:i,headers:r,body:o}=t;s(null,{status:e,statusCode:i,headers:r,body:o},o)},t=>s(t&&t.error||"UndefinedError"));else if(this.isNode()){let e=require("iconv-lite");this.initGotEnv(t),this.got(t).on("redirect",(t,s)=>{try{if(t.headers["set-cookie"]){const e=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();e&&this.ckjar.setCookieSync(e,null),s.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:i,statusCode:r,headers:o,rawBody:h}=t,a=e.decode(h,this.encoding);s(null,{status:i,statusCode:r,headers:o,rawBody:h,body:a},a)},t=>{const{message:i,response:r}=t;s(i,r,r&&e.decode(r.rawBody,this.encoding))})}}post(t,s=(()=>{})){const e=t.method?t.method.toLocaleLowerCase():"post";if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isShadowrocket()||this.isLoon()||this.isStash())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient[e](t,(t,e,i)=>{!t&&e&&(e.body=i,e.statusCode=e.status?e.status:e.statusCode,e.status=e.statusCode),s(t,e,i)});else if(this.isQuanX())t.method=e,this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:e,statusCode:i,headers:r,body:o}=t;s(null,{status:e,statusCode:i,headers:r,body:o},o)},t=>s(t&&t.error||"UndefinedError"));else if(this.isNode()){let i=require("iconv-lite");this.initGotEnv(t);const{url:r,...o}=t;this.got[e](r,o).then(t=>{const{statusCode:e,statusCode:r,headers:o,rawBody:h}=t,a=i.decode(h,this.encoding);s(null,{status:e,statusCode:r,headers:o,rawBody:h,body:a},a)},t=>{const{message:e,response:r}=t;s(e,r,r&&i.decode(r.rawBody,this.encoding))})}}time(t,s=null){const e=s?new Date(s):new Date;let i={"M+":e.getMonth()+1,"d+":e.getDate(),"H+":e.getHours(),"m+":e.getMinutes(),"s+":e.getSeconds(),"q+":Math.floor((e.getMonth()+3)/3),S:e.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(e.getFullYear()+"").substr(4-RegExp.$1.length)));for(let s in i)new RegExp("("+s+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[s]:("00"+i[s]).substr((""+i[s]).length)));return t}queryStr(t){let s="";for(const e in t){let i=t[e];null!=i&&""!==i&&("object"==typeof i&&(i=JSON.stringify(i)),s+=`${e}=${i}&`)}return s=s.substring(0,s.length-1),s}msg(s=t,e="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()||this.isShadowrocket()||this.isStash()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let s=t.openUrl||t.url||t["open-url"],e=t.mediaUrl||t["media-url"];return{openUrl:s,mediaUrl:e}}if(this.isQuanX()){let s=t["open-url"]||t.url||t.openUrl,e=t["media-url"]||t.mediaUrl,i=t["update-pasteboard"]||t.updatePasteboard;return{"open-url":s,"media-url":e,"update-pasteboard":i}}if(this.isSurge()||this.isShadowrocket()||this.isStash()){let s=t.url||t.openUrl||t["open-url"];return{url:s}}}};if(this.isMute||(this.isSurge()||this.isShadowrocket()||this.isLoon()||this.isStash()?$notification.post(s,e,i,o(r)):this.isQuanX()&&$notify(s,e,i,o(r))),!this.isMuteLog){let t=["","==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];t.push(s),e&&t.push(e),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,s){const e=!this.isSurge()||this.isShadowrocket()&&!this.isQuanX()&&!this.isLoon()&&!this.isStash();e?this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t.stack):this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t)}wait(t){return new Promise(s=>setTimeout(s,t))}done(t={}){const s=(new Date).getTime(),e=(s-this.startTime)/1e3;this.log("",`\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${e} \u79d2`),this.log(),this.isSurge()||this.isShadowrocket()||this.isQuanX()||this.isLoon()||this.isStash()?$done(t):this.isNode()&&process.exit(1)}}(t,s)}
