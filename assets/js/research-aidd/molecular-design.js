/* Conditional-generation artwork. The displayed denoising is conceptual,
 * not a trained model's samples, a kinetic process, or physical protein folding.
 * Known RNA sequence/scaffold stays fixed; only modification assignments vary.
 */
(function () {
  'use strict';
  const scenes = window.ResearchScenes = window.ResearchScenes || {};
  const TAU = Math.PI * 2, W = 280, H = 150;
  const clamp = q => Math.max(0, Math.min(1, q));
  const smooth = q => { q = clamp(q); return q * q * (3 - 2 * q); };
  const mix = (a,b,q) => a + (b-a)*q;
  const font = '"PingFang SC", "Microsoft YaHei", Arial, sans-serif';
  const rgba = (c,a) => c + Math.round(clamp(a)*255).toString(16).padStart(2,'0');
  function text(c,str,x,y,p,size=14,color=p.muted) {
    c.fillStyle=color;c.font=`500 ${size*(p.typeScale||1)}px ${font}`;c.textAlign='center';c.fillText(str,x,y);
  }
  function line(c,a,b,color,width=1,opacity=1) {
    c.save();c.globalAlpha*=opacity;c.strokeStyle=color;c.lineWidth=width;
    c.beginPath();c.moveTo(a.x,a.y);c.lineTo(b.x,b.y);c.stroke();c.restore();
  }
  function ball(c,x,y,r,color,opacity=1) {
    c.save();c.globalAlpha*=opacity;
    const g=c.createRadialGradient(x-r*.28,y-r*.35,r*.06,x,y,r);
    g.addColorStop(0,'#ffffff');g.addColorStop(.27,color);g.addColorStop(1,color);
    c.fillStyle=g;c.beginPath();c.arc(x,y,r,0,TAU);c.fill();c.restore();
  }
  function colorMix(a,b,u) {
    const out=[1,3,5].map(i=>Math.round(mix(parseInt(a.slice(i,i+2),16),parseInt(b.slice(i,i+2),16),u)).toString(16).padStart(2,'0'));
    return '#'+out.join('');
  }
  function clock(seconds) {
    const t=((seconds%12)+12)%12,phase=t/12*TAU;
    if(t<=10)return {u:smooth(t/8.5),alpha:1,phase};
    if(t<=11)return {u:1,alpha:1-smooth(t-10),phase};
    return {u:0,alpha:smooth(t-11),phase};
  }
  function fit(c,width,height) {
    const s=Math.min(width/W,height/H);c.translate((width-W*s)/2,(height-H*s)/2);c.scale(s,s);
    c.lineCap='round';c.lineJoin='round';
  }
  function base(c,title,condition,result,p) {
    text(c,title,140,17,p,17,p.ink);
    text(c,condition,140,35,p,14);
    text(c,result,140,147,p,14);
  }
  function clipArt(c,scale=.76,height=90) {
    c.beginPath();c.rect(10,39,260,height);c.clip();
    c.translate(140,85);c.scale(scale,scale);c.translate(-190,-117);
  }
  function sample(target,i,count,seed,state,variant=0) {
    const a=i*2.399963+seed+variant*.71;
    const r=Math.sqrt((i+.5)/count),n=1-state.u;
    const nx=190+Math.cos(a)*r*72+Math.sin(state.phase*2+i)*5;
    const ny=117+Math.sin(a)*r*45+Math.cos(state.phase*2+i)*4;
    return {x:mix(nx,target.x,state.u)+n*Math.sin(i*1.8+state.phase+variant)*6,
      y:mix(ny,target.y,state.u)+n*Math.cos(i*2.3+state.phase+variant)*5,z:target.z||0};
  }
  function mist(c,state,p,color,count=46) {
    const n=1-state.u;if(n<.005)return;
    const glow=c.createRadialGradient(190,117,6,190,117,86);
    glow.addColorStop(0,rgba(color,.055*n*state.alpha));glow.addColorStop(1,rgba(color,0));
    c.fillStyle=glow;c.fillRect(95,60,190,114);
    for(let i=0;i<count;i++){
      const a=i*2.399963,r=Math.sqrt((i+.5)/count),pulse=.65+.35*Math.sin(i+state.phase*2);
      const x=190+Math.cos(a)*r*84+Math.sin(state.phase+i)*3;
      const y=117+Math.sin(a)*r*48+Math.cos(state.phase+i)*3;
      ball(c,x,y,1.2+(i%3)*.4,color,n*state.alpha*(.12+.20*pulse));
    }
  }
  function surface(c,cx,cy,rx,ry,angle,color) {
    c.save();c.translate(cx,cy);c.rotate(angle);c.beginPath();
    for(let i=0;i<=64;i++){
      const a=i/64*TAU,r=1+.10*Math.sin(a*5)+.04*Math.cos(a*9),x=Math.cos(a)*rx*r,y=Math.sin(a)*ry*r;
      i?c.lineTo(x,y):c.moveTo(x,y);
    }
    c.closePath();c.fillStyle=rgba(color,.105);c.strokeStyle=rgba(color,.27);c.lineWidth=1;c.fill();c.stroke();
    c.save();c.clip();
    for(let k=-1;k<=2;k++){
      c.beginPath();c.moveTo(-rx,k*12);c.bezierCurveTo(-rx*.3,k*12-20,rx*.2,k*12+20,rx,k*12-5);
      c.strokeStyle=rgba(color,.18);c.lineWidth=3;c.stroke();
    }
    c.restore();c.restore();
  }

  // A compact fused imide, used as a generic small-molecule motif, not a named glue.
  const glueAtoms=[[21,0,'C'],[10.5,18.2,'C'],[-10.5,18.2,'C'],[-21,0,'C'],[-10.5,-18.2,'C'],[10.5,-18.2,'C'],
    [28,-34,'C'],[48,-23,'N'],[43,-1,'C'],[26,-55,'O'],[64,4,'O'],[63,-36,'C']];
  const glueBonds=[[0,1,2],[1,2,1],[2,3,2],[3,4,1],[4,5,2],[5,0,1],[5,6,1],[6,7,1],[7,8,1],[8,0,1],[6,9,2],[8,10,2],[7,11,1]];
  const glueTargets=glueAtoms.map(a=>({x:171+a[0]*.85,y:130+a[1]*.85,kind:a[2]}));
  function glue(c,seconds,width,height,p) {
    c.save();fit(c,width,height);base(c,'分子胶设计','靶蛋白　作用界面','蛋白界面小分子',p);
    const s=clock(seconds),u=s.u;
    c.save();clipArt(c);
    // Protein surfaces are fixed conditioning information throughout denoising.
    surface(c,155,91,52,29,-.22,p.blue);
    surface(c,228,144,49,27,-.35,p.violet);
    mist(c,s,p,p.blue);
    const points=glueTargets.map((q,i)=>({...sample(q,i,glueTargets.length,.7,s),kind:q.kind}));
    c.save();c.globalAlpha*=s.alpha;
    // Faint alternative coordinates collapse locally rather than crossing the frame.
    if(u<.8)for(let v=1;v<=2;v++)glueTargets.forEach((q,i)=>{
      const g=sample(q,i,glueTargets.length,.7,s,v);ball(c,g.x,g.y,2,p.blue,(1-u)*.18);
    });
    glueBonds.forEach(([a,b,order])=>{
      const opacity=.12+.68*smooth((u-.1)/.85),aa=points[a],bb=points[b];
      line(c,aa,bb,p.ink,2.6,opacity);
      if(order===2&&u>.4){const d=Math.hypot(bb.x-aa.x,bb.y-aa.y)||1,nx=-(bb.y-aa.y)/d*3.3,ny=(bb.x-aa.x)/d*3.3;
        line(c,{x:mix(aa.x,bb.x,.2)+nx,y:mix(aa.y,bb.y,.2)+ny},{x:mix(aa.x,bb.x,.8)+nx,y:mix(aa.y,bb.y,.8)+ny},p.ink,1.2,opacity*smooth((u-.4)/.5));}
    });
    points.forEach(q=>ball(c,q.x,q.y,3.1+u*.7,q.kind==='N'?p.blue:q.kind==='O'?p.red:p.ink,.60+.35*u));
    if(u>.7){c.save();c.setLineDash([2,3]);line(c,{x:177,y:96},points[6],p.blue,1,(u-.7)*2.5);line(c,{x:216,y:144},points[8],p.violet,1,(u-.7)*2.5);c.restore();}
    c.restore();c.restore();c.restore();
  }

  const rnaTargets=[];
  for(let strand=0;strand<2;strand++)for(let i=0;i<17;i++){
    const angle=i/16*TAU*1.4+strand*Math.PI;
    rnaTargets.push({x:130+i*7.5,y:116+Math.sin(angle)*24,z:Math.cos(angle),strand,i});
  }
  const modifiedIndices=[1,3,5,8,11,14,18,21,24,27,30,32];
  const mods=modifiedIndices.map((index,i)=>({...rnaTargets[index],index,type:i%3}));
  function rnaScaffold(c,p) {
    for(let i=0;i<17;i++)line(c,rnaTargets[i],rnaTargets[17+i],p.muted,1,.28);
    for(let strand=0;strand<2;strand++)for(let i=0;i<16;i++)line(c,rnaTargets[strand*17+i],rnaTargets[strand*17+i+1],strand?p.violet:p.blue,2.4,.62);
    rnaTargets.forEach(q=>ball(c,q.x,q.y,2.7,q.strand?p.violet:p.blue,.55));
  }
  function sirna(c,seconds,width,height,p) {
    c.save();fit(c,width,height);base(c,'siRNA 修饰设计','目标序列　修饰约束','修饰位点与类型',p);
    const s=clock(seconds),u=s.u,n=1-u;
    c.save();clipArt(c,1.15,85);rnaScaffold(c,p);mist(c,s,p,p.teal,40);
    c.save();c.globalAlpha*=s.alpha;
    mods.forEach((q,i)=>{
      const col=[p.teal,p.violet,p.red][q.type];
      // The site remains fixed. Competing local type assignments lose uncertainty.
      for(let variant=0;variant<3;variant++){
        const a=variant*TAU/3+i*.9+s.phase*.5,r=n*(7+(i%3)*3);
        ball(c,q.x+Math.cos(a)*r,q.y+Math.sin(a)*r,2.1,[p.teal,p.violet,p.red][variant],n*.45);
      }
      ball(c,q.x,q.y,3.1+u*.8,colorMix(p.muted,col,u),.48+.48*u);
      c.strokeStyle=rgba(col,.15+.2*u);c.lineWidth=.8;c.beginPath();c.arc(q.x,q.y,6+n*4,0,TAU);c.stroke();
    });c.restore();c.restore();
    text(c,'2′-OMe　2′-F　PS',140,129,p,12.5);
    c.restore();
  }

  function enzyme(c,seconds,width,height,p) {
    c.save();fit(c,width,height);base(c,'酶设计','催化位点　底物信息','酶骨架与活性位点',p);
    scenes.enzymeArtwork(c,seconds,18,40,244,90,p);
    c.restore();
  }
  scenes.designGlue=glue;scenes.designSirna=sirna;scenes.designEnzyme=enzyme;
  scenes.design=function(c,seconds,width,height,p){
    const s=Math.min(width/840,height/150);
    c.save();c.translate((width-840*s)/2,(height-150*s)/2);c.scale(s,s);
    [glue,sirna,enzyme].forEach((draw,i)=>{c.save();c.translate(i*280,0);draw(c,seconds,280,150,p);c.restore();});
    c.restore();
  };
})();
