/* Illustrative wet-lab workflow. No measured values or experimental outcomes.
 * The smaller handover panel is actual footage from the user-supplied PPT. */
(function(){
'use strict';
const P={ink:'#183249',muted:'#4c6476',blue:'#3378bf',teal:'#267e76',red:'#c65b5c',amber:'#b98435',rule:'#dfe8ed'};
const clamp=v=>Math.max(0,Math.min(1,v)),smooth=v=>{v=clamp(v);return v*v*(3-2*v);},mix=(a,b,u)=>a+(b-a)*u;
const FONT='"PingFang SC","Microsoft YaHei",Arial,sans-serif';
function txt(c,s,x,y,size=20,color=P.ink,align='center',weight=500){c.fillStyle=color;c.textAlign=align;c.font=`${weight} ${size}px ${FONT}`;c.fillText(s,x,y);}
function line(c,ps,col,w=2,dash=[]){c.strokeStyle=col;c.lineWidth=w;c.setLineDash(dash);c.beginPath();ps.forEach((p,i)=>i?c.lineTo(...p):c.moveTo(...p));c.stroke();c.setLineDash([]);}
function box(c,x,y,w,h,r,fill,stroke){c.beginPath();c.roundRect(x,y,w,h,r);if(fill){c.fillStyle=fill;c.fill();}if(stroke){c.strokeStyle=stroke;c.lineWidth=1.5;c.stroke();}}
function ball(c,x,y,r=10){const g=c.createRadialGradient(x-3,y-4,1,x,y,r);g.addColorStop(0,'#eaf0f2');g.addColorStop(.5,'#8c9ea7');g.addColorStop(1,'#576d78');c.fillStyle=g;c.beginPath();c.arc(x,y,r,0,Math.PI*2);c.fill();c.fillStyle=P.teal;c.beginPath();c.arc(x,y,r*.43,0,Math.PI*2);c.fill();}
function arm(c,wrist){
 const b={x:200,y:190},l1=116,l2=172,dx=wrist.x-b.x,dy=wrist.y-b.y,d=Math.hypot(dx,dy);
 const a=Math.atan2(dy,dx)-Math.acos(Math.max(-1,Math.min(1,(d*d+l1*l1-l2*l2)/(2*d*l1))));
 const e={x:b.x+l1*Math.cos(a),y:b.y+l1*Math.sin(a)};
 c.fillStyle='#e6edef';c.beginPath();c.ellipse(b.x,214,43,7,0,0,Math.PI*2);c.fill();box(c,b.x-35,202,70,12,5,'#728995');box(c,b.x-15,182,30,24,5,'#90a4ae');
 for(const[q,r]of[[b,e],[e,wrist]]){line(c,[[q.x,q.y],[r.x,r.y]],'#728692',19);line(c,[[q.x-3,q.y-3],[r.x-3,r.y-3]],'#d4e1e5',12);line(c,[[q.x-4,q.y-5],[r.x-4,r.y-5]],'#f8fbfc',2);}
 ball(c,b.x,b.y,14);ball(c,e.x,e.y,13);ball(c,wrist.x,wrist.y,11);
}
function tube(c,x,y,col,level,cap=false){
 const g=c.createLinearGradient(x-11,y,x+11,y);g.addColorStop(0,'#d6e9e6');g.addColorStop(.22,'#ffffff');g.addColorStop(.8,'#eef6f5');g.addColorStop(1,'#a8c8c1');
 box(c,x-11,y,22,56,6,g,'#8db4a9');box(c,x-8,y+56-level,16,level-2,4,col);line(c,[[x-5,y+7],[x-5,y+42]],'#fff',2);
 if(cap)box(c,x-13,y-4,26,8,2,col);else line(c,[[x-12,y],[x+12,y]],'#6e9f93',2);
}
function pipette(c,w,level,press){
 const x=w.x,y=w.y,button=y+press*10;
 // A handheld instrument is visibly separate from the robotic wrist and palm.
 line(c,[[x,button+1],[x,y+20]],'#8ca2ad',5);
 box(c,x-15,button-4,30,7,3,'#488d87','#397b76');
 box(c,x-14,y+16,28,49,8,'#eef4f5','#75919c');box(c,x-8,y+23,16,32,3,'#ffffff','#a4c2c8');
 const hh=25*level;box(c,x-5,y+52-hh,10,hh,2,'#54a996');
 line(c,[[x-10,y+61],[x-7,y+70],[x+7,y+70],[x+10,y+61]],'#819fa9',2);
 c.beginPath();c.moveTo(x-7,y+69);c.lineTo(x-2,y+103);c.lineTo(x+2,y+103);c.lineTo(x+7,y+69);c.closePath();c.fillStyle='#def0ec';c.fill();c.strokeStyle='#82b1a5';c.lineWidth=1.4;c.stroke();
 line(c,[[x,y+77],[x,y+100]],'#7dbdac',2);
}
function dexterousGrip(c,w,press){
 const x=w.x,y=w.y;
 // The wrist ends to the left of an exposed palm, not at the pipette itself.
 line(c,[[x-102,y+46],[x-72,y+43]],'#879ca7',22);
 line(c,[[x-98,y+42],[x-72,y+39]],'#d7e2e7',12);
 box(c,x-85,y+11,49,64,12,'#dce5e9','#8197a3');
 box(c,x-76,y+23,26,39,8,'#f1f5f7','#b2c3cd');
 line(c,[[x-71,y+28],[x-71,y+57]],'#a7bcc6',2);
 // Four separately articulated fingers wrap around the instrument barrel.
 for(let i=0;i<4;i++){
  const yy=y+23+i*12.8,off=i===0?-2:i===3?2:0;
  const joints=[[x-40,yy],[x-17,yy+2+off],[x+9,yy+2+off],[x+19,yy-3+off],[x+10,yy-6+off]];
  line(c,joints,'#667f8d',8.2);
  line(c,joints.map(q=>[q[0],q[1]-1.8]),'#d9e3e8',4.7);
  for(const q of joints.slice(0,3)){c.fillStyle='#7895a2';c.beginPath();c.arc(q[0],q[1],3.7,0,Math.PI*2);c.fill();c.fillStyle='#dbe7ea';c.beginPath();c.arc(q[0],q[1],1.5,0,Math.PI*2);c.fill();}
 }
 // The fifth digit is the thumb; its tip stays in contact with the top plunger.
 const thumb=[[x-70,y+17],[x-52,y-10+press*3],[x-24,y-16+press*7],[x-2,y-8+press*10]];
 line(c,thumb,'#617d8b',10);line(c,thumb.map(q=>[q[0]-1,q[1]-2]),'#d9e4e9',6.1);
 for(const q of thumb.slice(0,3)){c.fillStyle='#668b9c';c.beginPath();c.arc(q[0],q[1],4.5,0,Math.PI*2);c.fill();c.fillStyle='#dce9ee';c.beginPath();c.arc(q[0],q[1],2,0,Math.PI*2);c.fill();}
 box(c,x-10,y-11+press*10,17,7,3,'#8eabb8','#617f8f');
}
function hand(c,x,y,a){c.save();c.globalAlpha=a;line(c,[[875,y+30],[x+70,y+15],[x+30,y]],'#d8bfa9',31);line(c,[[875,y+24],[x+70,y+8],[x+30,y-5]],'#efd9c7',21);c.fillStyle='#efd9c7';c.beginPath();c.ellipse(x+16,y,26,15,0,0,Math.PI*2);c.fill();for(let i=0;i<4;i++)line(c,[[x+12,y-12+i*7],[x-22-(i===1?5:0),y-12+i*7]],'#e7cab2',7);line(c,[[x+25,y+7],[x+8,y+24],[x-4,y+21]],'#e7cab2',8);c.restore();}
function plate(c,x,y,fill,alpha=1){
 c.save();c.globalAlpha=alpha;c.beginPath();c.moveTo(x,y);c.lineTo(x+173,y);c.lineTo(x+182,y+38);c.lineTo(x+9,y+38);c.closePath();c.fillStyle='#eef6f5';c.fill();c.strokeStyle='#8eb9ac';c.lineWidth=1.7;c.stroke();
 for(let row=0;row<8;row++)for(let col=0;col<12;col++){
  const xx=x+10+col*13.8+row*.8,yy=y+4+row*4.2,active=(col===2||col===5||col===8)&&row<5&&fill>(col===2?.15:col===5?.4:.68);
  c.beginPath();c.ellipse(xx,yy,4.2,1.7,0,0,Math.PI*2);c.fillStyle=active?'#4ba992':'#d2e7e0';c.fill();
 }
 c.restore();
}
function drop(c,x,y,a=1){c.save();c.globalAlpha=a;c.fillStyle='#3b9a81';c.beginPath();c.moveTo(x,y-7);c.bezierCurveTo(x-8,y+1,x-5,y+7,x,y+7);c.bezierCurveTo(x+5,y+7,x+8,y+1,x,y-7);c.fill();c.restore();}
function state(t){if(t<2.4)return['取样吸液',P.blue];if(t<4.8)return['定量分配至微孔板',P.teal];if(t<6.4)return['人员靠近，暂停移液',P.red];if(t<8.2)return['确认安全，继续分配',P.teal];if(t<9.8)return['反应完成，送入检测',P.teal];return['检测读出，结果回传',P.teal];}
function experiment(c,t){
 const risk=t>=4.8&&t<6.4, S=state(t);
 c.save();c.beginPath();c.rect(0,0,900,226);c.clip();c.lineCap='round';c.lineJoin='round';
 // Compact wet-lab composition: short robot reach, full pipette and plate workflow.
 txt(c,'灵巧手操控移液器',445,23,22,P.ink);
 txt(c,'实验智能体',80,38,20,P.ink);box(c,22,53,119,68,5,'#f4f8fa','#bad0d8');txt(c,'取样与分配',81,79,18);line(c,[[40,96],[125,96]],'#bed0d6',3);line(c,[[40,110],[104,110]],'#cedbdf',3);
 line(c,[[148,92],[178,92]],'#b6d1d7',1.6,[3,5]);const px=148+30*((t/2)%1);c.fillStyle=P.teal;c.beginPath();c.arc(px,92,3,0,Math.PI*2);c.fill();
 line(c,[[161,215],[878,215]],'#a5b9c2',2.1);
 box(c,305,189,98,26,4,'#e5efed','#a0bfb5');tube(c,321,132,'#99c5dd',31,true);tube(c,350,121,'#64b09a',40,false);tube(c,380,132,'#b7a1ce',31,true);
 box(c,441,202,417,8,4,'#dee8e9');
 box(c,700,60,178,138,10,'#e8eff2','#93acb7');box(c,709,70,159,96,7,'#f4f8fa');
 txt(c,'微孔板检测',789,44,21,P.ink);
 box(c,727,80,127,65,4,'#ffffff','#aac0c9');txt(c,'检测读出',790,99,16,P.muted);
 box(c,705,171,169,20,3,'#738995');line(c,[[712,193],[868,193]],'#abc1ca',3);
 let filled=t<3.5?0:t<4.8?.43:t<6.4?.43:t<8.2?mix(.43,1,(t-6.4)/1.8):1;
 let slide=smooth((t-8.2)/1.6),plateAlpha=1-smooth((t-9.25)/.55);
 plate(c,mix(443,702,slide),160,filled,plateAlpha);
 if(t>=9.8){
  const u=clamp((t-9.8)/1.35);c.save();c.beginPath();c.rect(734,104,112*u,33);c.clip();
  for(let k=0;k<3;k++){const cols=['#318e7a','#5790bb','#9178ad'];const ps=[];for(let i=0;i<32;i++)ps.push([735+i*3.55,132-k*6-(10-k*2)*Math.exp(-Math.pow((i-(12+k*4))/5.5,2))]);line(c,ps,cols[k],1.6);}
  c.restore();c.fillStyle=P.teal;c.beginPath();c.arc(858,182,3,0,Math.PI*2);c.fill();
 }
 let w={x:350,y:109};
 if(t<1)w.y=mix(109,133,smooth(t));
 else if(t<1.8)w.y=133;
 else if(t<2.4)w.y=mix(133,88,smooth((t-1.8)/.6));
 else if(t<3.4){let u=smooth((t-2.4));w={x:mix(350,483,u),y:mix(88,127,u)};}
 else if(t<4.8)w={x:mix(483,525,smooth((t-3.4)/1.4)),y:127};
 else if(t<6.4)w={x:525,y:127};
 else if(t<8.2)w={x:mix(525,566,smooth((t-6.4)/1.8)),y:127};
 else {let u=smooth((t-8.2)/1);w={x:mix(566,480,u),y:mix(127,76,u)};}
 // Move the instrument along a shallow reach while preserving its proportions.
 w.y=48+(w.y-76)*.3;
 let volume=t<1.8?mix(.05,.9,smooth((t-.6)/1.2)):t<3.4?.9:t<4.8?mix(.9,.55,(t-3.4)/1.4):t<6.4?.55:t<8.2?mix(.55,.07,(t-6.4)/1.8):.07;
 const dispensing=(t>=3.4&&t<4.8)||(t>=6.4&&t<8.2),u=(t*3)%1;
 const press=t<.65?1:t<1.8?1-smooth((t-.65)/1.15):dispensing?smooth(u/.26)*(1-smooth((u-.6)/.35)):0;
 arm(c,{x:w.x-102*.82,y:w.y+46*.82});
 c.save();c.translate(w.x,w.y);c.scale(.82,.82);pipette(c,{x:0,y:0},volume,press);dexterousGrip(c,{x:0,y:0},press);c.restore();
 if(dispensing&&u>.22)drop(c,w.x,w.y+88+18*(u-.22)/.78,1-u*.1);
 const enter=smooth((t-4.7)/.5)*(1-smooth((t-6)/.45));
 if(enter>.001){
  c.save();c.globalAlpha=enter;c.fillStyle='#c65b5c12';c.strokeStyle=P.red;c.lineWidth=1.5;c.setLineDash([4,5]);c.beginPath();c.ellipse(571,137,62,35,0,0,Math.PI*2);c.fill();c.stroke();c.restore();hand(c,mix(945,579,enter),136,enter);
 }
 if(risk){box(c,542,37,105,30,4,'#fbedeb');txt(c,'暂停移液',594,59,21,P.red,undefined,500);line(c,[[567,70],[550,88]],P.red,1.4,[3,5]);}
 else if(t>=6.4&&t<8.2){txt(c,'安全确认',614,59,19,P.teal);}
 c.restore();return S;
}
window.drawExperimentSafety=function(c,t,w=1320,h=280,video){
 t=((t%12)+12)%12;c.save();c.scale(w/1320,h/280);c.fillStyle='#ffffff';c.fillRect(0,0,1320,280);
 txt(c,'分子胶验证　RNA稳定性　酶活检测',450,22,21,P.ink,undefined,500);txt(c,'人机交接',1118,22,25,P.ink,undefined,500);
 c.save();c.translate(0,27);const S=experiment(c,t);c.restore();
 if(video&&video.readyState>=2)c.drawImage(video,0,24,480,246,936,40,364,186.55);
 else box(c,936,40,364,187,0,'#f1f4f4');
 txt(c,'动态跟随　交接确认',1118,265,20,P.muted);
 txt(c,S[0],450,272,23,S[1],undefined,500);
 c.restore();
};
})();

/* Live, high-DPI research illustrations with original-resolution video crops. */
(function () {
  'use strict';
  var C = { ink: '#183249', muted: '#4c6476', blue: '#3378bf', teal: '#267e76', amber: '#bf7c19' };
  var FONT = '"PingFang SC","Microsoft YaHei",Arial,sans-serif';
  var sizes = { crossHand: [1320, 240], brain: [1320, 260], safety: [1320, 280] };
  var stillTimes = { crossHand: 2, brain: 5.5, safety: 3.8 };

  function text(c, s, x, y, size, color, align, weight) {
    c.fillStyle = color || C.ink;
    c.font = (weight || 500) + ' ' + (size || 20) + 'px ' + FONT;
    c.textAlign = align || 'left';
    c.fillText(s, x, y);
  }
  function line(c, points, color, width) {
    c.beginPath();
    points.forEach(function (p, i) { if (i) c.lineTo(p[0], p[1]); else c.moveTo(p[0], p[1]); });
    c.strokeStyle = color || C.blue; c.lineWidth = width || 1.7; c.stroke();
  }
  function arrow(c, points, color, width) {
    line(c, points, color, width);
    var b = points[points.length - 1], a = points[points.length - 2];
    var angle = Math.atan2(b[1] - a[1], b[0] - a[0]);
    line(c, [[b[0] - 8 * Math.cos(angle - 0.5), b[1] - 8 * Math.sin(angle - 0.5)], b, [b[0] - 8 * Math.cos(angle + 0.5), b[1] - 8 * Math.sin(angle + 0.5)]], color, width);
  }
  function videoCrop(c, video, sx, sy, sw, sh, x, y, w, h) {
    if (video.readyState >= 2) c.drawImage(video, sx, sy, sw, sh, x, y, w, h);
    else { c.fillStyle = '#f1f5f7'; c.fillRect(x, y, w, h); }
  }

  function drawCrossHand(c, t, video) {
    var names = ['人手操作', 'Allegro', 'Leap', 'Shadow', 'Sharpa', 'Wuji'];
    var origins = [[112, 112], [752, 112], [1392, 112], [112, 592], [752, 592], [1392, 592]];
    names.forEach(function (name, i) {
      text(c, name, 110 + i * 220, 27, 24, C.ink, 'center');
      videoCrop(c, video, origins[i][0], origins[i][1], 416, 416, 22 + i * 220, 33, 176, 176);
    });
    text(c, '跨手型适配', 16, 234, 19, C.muted);
    text(c, '甜甜圈抓取', 540, 234, 22, t < 6 ? C.teal : C.muted, 'center');
    text(c, '酒杯抓取', 785, 234, 22, t >= 6 ? C.teal : C.muted, 'center');
    text(c, '多任务操作', 1304, 234, 19, C.muted, 'right');
  }

  function brainSourceTime(t) { return t < 4.5 ? 10 + t / 2.5 : t < 6.5 ? 11.84 : 11.8 + (t - 6.5) / 2.5; }
  function brainNode(c, y, title, sub, active, color) {
    c.fillStyle = active ? (color === C.amber ? '#fff5e6' : '#eef7f6') : '#f7fafb';
    c.strokeStyle = active ? color : '#b5c9d3'; c.lineWidth = active ? 2 : 1.3;
    c.beginPath(); c.roundRect(20, y, 270, 58, 5); c.fill(); c.stroke();
    text(c, title, 155, y + 25, 25, active ? color : C.ink, 'center', 500);
    text(c, sub, 155, y + 47, 19, C.muted, 'center');
  }
  function drawBrain(c, t, video) {
    var sourceTime = brainSourceTime(t), intervening = sourceTime >= 11.8 && sourceTime < 12;
    brainNode(c, 13, '大脑', '任务理解　规划纠错', intervening, C.amber);
    brainNode(c, 88, '小脑', 'VLA 操作技能', !intervening, C.teal);
    brainNode(c, 163, '执行与感知', '动作执行　状态反馈', false, C.teal);
    arrow(c, [[140, 71], [140, 88]], C.teal);
    arrow(c, [[140, 146], [140, 163]], C.teal);
    arrow(c, [[290, 192], [308, 192], [308, 42], [290, 42]], intervening ? C.amber : '#7895a4');
    var ty = 192 - (t % 1.5) / 1.5 * 150;
    c.beginPath(); c.arc(308, ty, 3.5, 0, Math.PI * 2); c.fillStyle = intervening ? C.amber : C.teal; c.fill();
    text(c, '状态观测与异常反馈', 155, 251, 19, C.muted, 'center');
    text(c, 'Astra 干预示例', 330, 25, 24, C.ink);
    text(c, '演示片段慢放', 1302, 25, 18, C.muted, 'right');
    // Contain each full camera crop, keeping the robot and tabletop proportions.
    videoCrop(c, video, 0, 0, 426, 240, 380, 37, 337.25, 190);
    videoCrop(c, video, 854, 0, 426, 240, 865, 37, 337.25, 190);
    text(c, '全局视角', 548.625, 251, 19, C.muted, 'center');
    text(c, '末端视角', 1033.625, 251, 19, C.muted, 'center');
    var status = sourceTime < 11.8 ? '小脑执行' : intervening ? 'Astra 干预' : '小脑重试';
    text(c, status, 774, 117, 23, intervening ? C.amber : C.teal, 'center');
    arrow(c, [[733, 137], [815, 137]], intervening ? C.amber : C.teal);
  }

  function initialize(canvas) {
    if (canvas.dataset.embodiedReady) return;
    var scene = canvas.dataset.researchEmbodied, dimensions = sizes[scene];
    if (!dimensions || !canvas.dataset.videoSrc) return;
    canvas.dataset.embodiedReady = 'true';
    var ctx = canvas.getContext('2d');
    var panel = canvas.closest('[data-research-panel]');
    var reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    var video = document.createElement('video');
    video.setAttribute('data-research-source', scene);
    video.muted = true; video.defaultMuted = true; video.loop = true; video.playsInline = true;
    video.setAttribute('muted', ''); video.setAttribute('playsinline', '');
    video.preload = 'auto'; video.controls = false; video.setAttribute('aria-hidden', 'true'); video.tabIndex = -1;
    video.style.display = 'none';
    canvas.parentNode.appendChild(video);
    var frame = null, visible = false, lastDraw = 0, wantsPlay = false;

    function isActive() { return !panel || panel.getAttribute('aria-hidden') !== 'true'; }
    function canPlay() { return visible && isActive() && !document.hidden && !reduced.matches; }
    function resize() {
      var rect = canvas.getBoundingClientRect(), dpr = Math.min(window.devicePixelRatio || 1, 3);
      if (!rect.width) return;
      var width = Math.round(rect.width * dpr), height = Math.round(rect.width * dimensions[1] / dimensions[0] * dpr);
      if (canvas.width !== width || canvas.height !== height) { canvas.width = width; canvas.height = height; }
      render();
    }
    function render() {
      var t = reduced.matches ? stillTimes[scene] : (video.currentTime || 0) % 12;
      ctx.setTransform(canvas.width / dimensions[0], 0, 0, canvas.height / dimensions[1], 0, 0);
      ctx.imageSmoothingEnabled = true; ctx.imageSmoothingQuality = 'high';
      ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, dimensions[0], dimensions[1]);
      ctx.lineCap = 'round'; ctx.lineJoin = 'round';
      if (scene === 'crossHand') drawCrossHand(ctx, t, video);
      else if (scene === 'brain') drawBrain(ctx, t, video);
      else if (typeof window.drawExperimentSafety === 'function') window.drawExperimentSafety(ctx, t, dimensions[0], dimensions[1], video);
    }
    function tick(now) {
      frame = null;
      if (!canPlay()) { update(); return; }
      if (now - lastDraw >= 1000 / 30) { render(); lastDraw = now; }
      frame = window.requestAnimationFrame(tick);
    }
    function stillFrame() {
      if (reduced.matches && video.readyState >= 1 && Math.abs(video.currentTime - stillTimes[scene]) > 0.05) video.currentTime = stillTimes[scene];
      render();
    }
    function update() {
      wantsPlay = canPlay();
      if (wantsPlay) {
        if (video.paused) video.play().catch(function () {});
        if (frame === null) frame = window.requestAnimationFrame(tick);
      } else {
        video.pause();
        if (frame !== null) window.cancelAnimationFrame(frame);
        frame = null;
        stillFrame();
      }
    }
    video.addEventListener('loadedmetadata', stillFrame);
    video.addEventListener('loadeddata', function () { stillFrame(); update(); });
    video.addEventListener('seeked', render);
    document.addEventListener('visibilitychange', update);
    window.addEventListener('resize', resize);
    if (reduced.addEventListener) reduced.addEventListener('change', update);
    else reduced.addListener(update);
    if (panel) new MutationObserver(update).observe(panel, { attributes: true, attributeFilter: ['aria-hidden', 'class', 'hidden'] });
    new ResizeObserver(resize).observe(canvas);
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) { visible = entries[0].isIntersecting; update(); }, { rootMargin: '80px' }).observe(canvas);
    } else visible = true;
    video.src = canvas.dataset.videoSrc;
    resize(); update();
  }
  function start() { document.querySelectorAll('canvas[data-research-embodied]').forEach(initialize); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
