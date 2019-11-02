const Koa = require("koa");
const Router = require("koa-router");
const serve = require('koa-static');
const compress = require('koa-compress')
const path = require('path')
const bodyParser = require("koa-bodyparser");
const model = require("./mongodb/model");
const util = require('util');
const execFile = util.promisify(require('child_process').execFile);

const app = new Koa();
const router = new Router();

async function deploy(file,param){
  try{
    const { stdout,stderr } = await execFile(file, param);
    console.log('标准输出',stdout);
    console.log('错误输出',stderr);
  }catch(e){
    console.log('error',e)
  }
}

app.use(compress({threshold:2048}));
app.use(bodyParser());
app.use(serve(
	path.join(__dirname, './pubilc')
))

router.post("/api/addSchedule", async (ctx, next) => {
  // 添加定时任务
  let body = ctx.request.body;
  console.log("接收参数", body);
  let res = await model.insert(body);
  ctx.body = { code: 200, msg: "ok", data: res };
  next();
});

router.get("/api/getScheduleList", async (ctx, next) => {
  // 获取定时任务列表
  const condition = { hasExpired: false };
  let res = await model.find(condition);
  ctx.response.status = 200;
  ctx.body = { code: 200, msg: "ok", data: res };
  next();
});
router.post("/api/updateSchedule", async (ctx, next) => {
  // 更新定时任务
  const condition = { _id: ctx.request.body.id };
  let res = await model.update(condition);
  ctx.response.status = 200;
  ctx.body = { code: 200, msg: "ok", data: res };
  next();
});

router.get("/api/getConfig", async (ctx, next) => {
  // 获取配置信息
  let res = await model.Config.find();
  if(res){
    ctx.response.status = 200;
    ctx.body = { code: 200, msg: "ok", data: res };
  }else{
    ctx.response.status = 200;
    ctx.body = { code: 400, msg: "fail", data: {} };
  }
  
  next();
});
router.post("/api/updateConfig", async (ctx, next) => {
  // 更新配置信息
  const condition = ctx.request.body.data;
  let res = await model.Config.update(condition);
  if(res){
    ctx.response.status = 200;
    ctx.body = { code: 200, msg: "ok", data: {}};
  }else{
    ctx.response.status = 200;
    ctx.body = { code: 400, msg: "fail", data: {}};
  }
  next();
});

router.get("/api/restart", async (ctx,next) =>{
  try{
      deploy(path.resolve(__dirname, './bash/restart.sh'),[])
      console.log('success');
    ctx.body = { code: 200, msg: "ok", data: {}};
  }catch(e){
    console.log('error'+e);
    ctx.body = { code: 400, msg: "fail", data: {}};
  }
})

const handler = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.response.status = err.statusCode || err.status || 500;
    ctx.response.type = "html";
    ctx.response.body = "<p>出错啦</p>";
    ctx.app.emit("error", err, ctx);
  }
};

app.use(handler);
app.on("error", err => {
  console.error("server error:", err);
});

app.use(router.routes());
app.use(router.allowedMethods());
module.exports = app;
