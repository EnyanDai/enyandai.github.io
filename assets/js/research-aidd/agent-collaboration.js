/* Scientific agents exchange task, molecular, trajectory and experimental
 * artifacts. This is a research workflow illustration, not model output. */
(function () {
  'use strict';
  const scenes=window.ResearchScenes=window.ResearchScenes||{};
  const TAU=Math.PI*2, FONT='"PingFang SC", "Microsoft YaHei", Arial, sans-serif';
  const clamp=v=>Math.max(0,Math.min(1,v));
  const smooth=v=>{v=clamp(v);return v*v*(3-2*v);};
  const rgba=(c,a)=>c+Math.round(clamp(a)*255).toString(16).padStart(2,'0');
  function text(c,s,x,y,p,size=13,col=p.ink){c.font=`500 ${size*(p.typeScale||1)}px ${FONT}`;c.fillStyle=col;c.textAlign='center';c.fillText(s,x,y);}
  function line(c,x,y,X,Y,col,w=1){c.beginPath();c.moveTo(x,y);c.lineTo(X,Y);c.strokeStyle=col;c.lineWidth=w;c.stroke();}
  function dot(c,x,y,r,col){c.fillStyle=col;c.beginPath();c.arc(x,y,r,0,TAU);c.fill();}
  function paper(c,x,y,w,h,col){c.fillStyle='#ffffff';c.strokeStyle=col;c.lineWidth=1.1;c.beginPath();c.roundRect(x-w/2,y-h/2,w,h,2);c.fill();c.stroke();}
  function payload(c,kind,x,y,size,p){
    c.save();c.translate(x,y);c.scale(size/24,size/24);
    if(kind==='molecule'){
      const pts=Array.from({length:6},(_,i)=>({x:Math.cos(i*TAU/6)*10,y:Math.sin(i*TAU/6)*10}));
      pts.forEach((q,i)=>{const b=pts[(i+1)%6];line(c,q.x,q.y,b.x,b.y,p.blue,1.6);dot(c,q.x,q.y,2.3,i===2?p.red:p.blue);});
      line(c,10,0,17,-6,p.blue,1.6);dot(c,17,-6,2.6,p.red);
    }else if(kind==='trace'||kind==='evidence'){
      paper(c,0,0,25,28,p.teal);line(c,-8,8,-8,-8,p.line);line(c,-8,8,9,8,p.line);
      c.beginPath();c.moveTo(-7,4);c.bezierCurveTo(-3,-13,1,12,7,-5);c.strokeStyle=p.teal;c.lineWidth=1.4;c.stroke();
      if(kind==='evidence'){dot(c,-4,1,1.8,p.red);dot(c,2,3,1.8,p.red);dot(c,7,-5,1.8,p.red);}
    }else{
      paper(c,0,0,25,28,kind==='strategy'?p.violet:p.blue);
      for(let i=0;i<3;i++){dot(c,-7,-7+i*7,1.2,kind==='strategy'?p.violet:p.blue);line(c,-3,-7+i*7,8-i*2,-7+i*7,p.muted,1.1);}
    }
    c.restore();
  }
  function roleArt(c,kind,x,y,p,scale=1){
    c.save();c.translate(x,y);c.scale(scale,scale);c.lineCap='round';c.lineJoin='round';
    if(kind==='plan'){
      c.strokeStyle=p.blue;c.lineWidth=1.3;c.strokeRect(-6,-15,12,9);line(c,0,-6,0,1,p.blue);line(c,-14,1,14,1,p.blue);
      [-14,0,14].forEach(X=>{line(c,X,1,X,7,p.blue);c.fillStyle=rgba(p.blue,.10);c.fillRect(X-5,7,10,8);c.strokeRect(X-5,7,10,8);});
    }else{
      // One agent evaluates evidence and revises the next research strategy.
      payload(c,'trace',-3,-2,27,p);
      line(c,3,11,15,-5,p.violet,3.6);line(c,2,14,3,9,p.violet,1);
      c.strokeStyle=p.violet;c.lineWidth=1.2;c.beginPath();c.arc(0,-1,20,-2.7,-.45);c.stroke();
    }
    c.restore();
  }
  function qpoint(a,b,u,bend){const dx=b.x-a.x,dy=b.y-a.y,d=Math.hypot(dx,dy)||1;return {x:a.x+dx*u-dy/d*Math.sin(Math.PI*u)*bend,y:a.y+dy*u+dx/d*Math.sin(Math.PI*u)*bend};}
  function connect(c,a,b,kind,active,t,index,p,bend=0,base=false){
    c.save();c.strokeStyle=base?rgba(p.muted,.40):rgba(kind==='strategy'?p.violet:p.teal,.10+active*.48);c.lineWidth=base?1:1.2;c.beginPath();
    for(let i=0;i<=30;i++){const q=qpoint(a,b,i/30,bend);i?c.lineTo(q.x,q.y):c.moveTo(q.x,q.y);}c.stroke();
    const end=qpoint(a,b,.97,bend),angle=Math.atan2(b.y-end.y,b.x-end.x);
    c.beginPath();c.moveTo(b.x,b.y);c.lineTo(b.x-4*Math.cos(angle-.5),b.y-4*Math.sin(angle-.5));c.moveTo(b.x,b.y);c.lineTo(b.x-4*Math.cos(angle+.5),b.y-4*Math.sin(angle+.5));c.stroke();
    if(active>.05){
      const u=((t/3+index*.21)%1+1)%1,q=qpoint(a,b,u,bend);c.globalAlpha*=active;
      payload(c,kind,q.x,q.y,base?17:12,p);
    }
    c.restore();
  }
  const stageLabels=['任务约束 → 任务规划','候选分子 → 世界模型预测','实验方案 → 具身执行 → 实验证据','评估结果 → 更新策略 → 下一轮规划'];
  scenes.agentCollaboration=function(c,seconds,width,height,p){
    const narrow=width/height<1.5,W=narrow?330:660,H=narrow?600:190;
    c.save();c.scale(width/W,height/H);c.lineJoin='round';c.lineCap='round';
    const t=((seconds%12)+12)%12,theta=t/12*TAU,phase=Math.floor(t/3);
    const weights=[0,1,2,3].map(i=>{let d=Math.abs(t-(i*3+1.5));d=Math.min(d,12-d);return 1-smooth((d-.8)/1.1);});
    text(c,'多智能体协作',W/2,17,p,16);
    const mains=narrow?[
      {id:'design',x:96,y:150,title:'分子设计',art:'agentDesignArt'},
      {id:'world',x:96,y:301,title:'世界模型验证',art:'agentWorldArt'},
      {id:'physical',x:96,y:451,title:'具身实验',art:'agentPhysicalArt'}
    ]:[
      {id:'design',x:151,y:76,title:'分子设计',art:'agentDesignArt'},
      {id:'world',x:337,y:76,title:'世界模型验证',art:'agentWorldArt'},
      {id:'physical',x:521,y:76,title:'具身实验',art:'agentPhysicalArt'}
    ];
    mains.forEach((m,i)=>{m.x+=Math.sin(theta*2+i*1.8)*3.4;m.y+=Math.cos(theta*2+i*1.8)*2;});
    const roles=narrow?[
      {id:'plan',name:'规划',x:247,y:177,ph:[0,3]},
      {id:'evaluate',name:'评估更新',x:247,y:397,ph:[1,2,3]}
    ]:[
      {id:'plan',name:'规划',x:200,y:136,ph:[0,3]},
      {id:'evaluate',name:'评估更新',x:470,y:136,ph:[1,2,3]}
    ];
    roles.forEach((r,i)=>{r.active=Math.min(1,r.ph.reduce((s,j)=>s+weights[j],0));r.x+=Math.sin(theta*2+i)*4+(narrow?-9:8)*r.active;r.y+=Math.cos(theta*2+i)*2.5-r.active*(narrow?0:7);});
    const [design,world,physical]=mains,[plan,evaluate]=roles;
    const input=narrow?{x:96,y:62}:{x:31,y:76},output=narrow?{x:96,y:554}:{x:628,y:76};
    const primary=(a,b)=>narrow?[{x:a.x,y:a.y+42},{x:b.x,y:b.y-42}]:[{x:a.x+57,y:a.y},{x:b.x-57,y:b.y}];
    const e0=narrow?[{x:96,y:86},{x:design.x,y:design.y-42}]:[{x:57,y:76},{x:design.x-54,y:design.y}];
    connect(c,...e0,'task',weights[0],t,0,p,0,true);
    connect(c,...primary(design,world),'molecule',Math.max(weights[0]*.25,weights[1]),t,1,p,0,true);
    connect(c,...primary(world,physical),'protocol',weights[2],t,2,p,0,true);
    const e3=narrow?[{x:physical.x,y:physical.y+43},{x:96,y:531}]:[{x:physical.x+54,y:physical.y},{x:605,y:76}];
    connect(c,...e3,'evidence',weights[2],t,3,p,0,true);

    const secondary=(a,b,kind,active,index,bend=0,main=false)=>{
      const dx=b.x-a.x,dy=b.y-a.y,d=Math.hypot(dx,dy)||1;
      connect(c,{x:a.x+dx/d*21,y:a.y+dy/d*21},{x:b.x-dx/d*(main?44:21),y:b.y-dy/d*(main?44:21)},kind,active,t,index,p,bend);
    };
    secondary(input,plan,'task',weights[0],11,narrow?-18:12);
    secondary(plan,design,'task',weights[0],5,8,true);
    secondary(world,evaluate,'trace',Math.max(weights[1],weights[2]*.4),6,narrow?-12:3);
    secondary(output,evaluate,'evidence',weights[2],7,narrow?16:28);
    secondary(evaluate,plan,'strategy',weights[3],10,narrow?30:18);

    // Named input/output artifacts remain visible even between hand-offs.
    paper(c,input.x,input.y,narrow?53:44,narrow?39:41,p.blue);
    text(c,'靶标',input.x,input.y-5,p,11.5,p.blue);text(c,'约束',input.x,input.y+11,p,11.5,p.blue);
    text(c,'输入',input.x,narrow?40:39,p,13);
    payload(c,'evidence',output.x,output.y,narrow?32:34,p);
    text(c,'输出',output.x,narrow?585:39,p,13);
    if(!narrow)text(c,'实验证据',output.x,119,p,12,p.muted);
    if(narrow){text(c,'候选分子',96,232,p,12.5,p.muted);text(c,'实验方案',96,383,p,12.5,p.muted);}
    else {text(c,'候选分子',245,119,p,12.5,p.muted);text(c,'实验方案',429,119,p,12.5,p.muted);text(c,'预测结果',367,142,p,11.5,p.muted);}

    mains.forEach((m,i)=>{
      const active=i===0?Math.max(weights[0],weights[1]):i===1?Math.max(weights[1],weights[2]):weights[2];
      c.save();c.globalAlpha=.75+active*.25;
      scenes[m.art](c,t,m.x-52,m.y-(narrow?37:29),104,narrow?75:58,p);c.restore();
      text(c,m.title,m.x,m.y-(narrow?49:36),p,14.5);
    });
    roles.forEach(r=>{
      if(r.active>.05){c.save();c.globalAlpha=r.active*.07;c.fillStyle=r.id==='evaluate'?p.violet:p.blue;c.beginPath();c.ellipse(r.x,r.y,27,25,0,0,TAU);c.fill();c.restore();}
      roleArt(c,r.id,r.x,r.y,p,narrow?1:.86);text(c,r.name,r.x,r.y+(narrow?34:31),p,13.5);
    });
    if(!narrow)text(c,'RSI：'+stageLabels[phase],W/2,188,p,12.5,p.muted);
    c.restore();
  };
})();
