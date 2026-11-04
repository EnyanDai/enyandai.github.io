/* Compact framework shared by the canvas preview and editable SVG export. */
(function () {
  'use strict';
  const scenes = window.ResearchScenes = window.ResearchScenes || {};
  const FONT = 'PingFang SC, Microsoft YaHei, Arial, sans-serif';
  function diagram(p) {
    const a=[];
    const text=(s,x,y,size=14,color=p.ink,align='center')=>a.push({kind:'text',s,x,y,size,color,align});
    const box=(s,x,y,w,h,color=p.blue,size=14)=>{
      a.push({kind:'rect',x,y,w,h,r:4,fill:color+'10',stroke:color+'60'});
      text(s,x+w/2,y+h/2+5,size);
    };
    const path=(points,color=p.muted,arrow=false,dash=false)=>a.push({kind:'path',points,color,arrow,dash});
    text('推理与调度',88,17,16);
    box('领域推理',26,32,124,30,p.violet,15);
    box('任务调度',26,76,124,30,p.blue,15);
    box('反思更新',26,120,124,30,p.violet,15);
    path([[88,62],[88,75]],p.muted,true);
    path([[88,106],[88,119]],p.muted,true);
    path([[150,135],[165,135],[165,47],[151,47]],p.violet,true);
    text('RSI',88,169,14,p.violet);
    text('策略　工具　记忆',88,188,12.5,p.muted);
    return a;
  }
  function arrowPoints(points) {
    const b=points[points.length-1],a=points[points.length-2];
    const angle=Math.atan2(b[1]-a[1],b[0]-a[0]);
    return [b,[b[0]-5*Math.cos(angle-.45),b[1]-5*Math.sin(angle-.45)],
      [b[0]-5*Math.cos(angle+.45),b[1]-5*Math.sin(angle+.45)]];
  }
  scenes.agentFramework = function(c,seconds,width,height,p) {
    c.save();c.scale(width/180,height/190);c.lineJoin='round';c.lineCap='round';
    diagram(p).forEach(a=>{
      if(a.kind==='text'){
        c.font=`500 ${a.size*(p.typeScale||1)}px ${FONT}`;c.fillStyle=a.color;c.textAlign=a.align;c.fillText(a.s,a.x,a.y);
      } else if(a.kind==='rect') {
        c.beginPath();c.roundRect(a.x,a.y,a.w,a.h,a.r);c.fillStyle=a.fill;c.fill();c.strokeStyle=a.stroke;c.lineWidth=1;c.stroke();
      } else {
        c.beginPath();a.points.forEach((q,i)=>i?c.lineTo(...q):c.moveTo(...q));c.strokeStyle=a.color;c.lineWidth=1.15;c.stroke();
        if(a.arrow){c.beginPath();arrowPoints(a.points).forEach((q,i)=>i?c.lineTo(...q):c.moveTo(...q));c.closePath();c.fillStyle=a.color;c.fill();}
      }
    });
    c.restore();
  };
  const escape=s=>String(s).replace(/[&<>\"]/g,q=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;'}[q]));
  const colorAttr=(name,value)=>value.length===9?`${name}="${value.slice(0,7)}" ${name}-opacity="${(parseInt(value.slice(7),16)/255).toFixed(4)}"`:`${name}="${value}"`;
  scenes.agentFrameworkSvg = function(p) {
    const parts=[`<svg xmlns="http://www.w3.org/2000/svg" width="360" height="380" viewBox="0 0 180 190" role="img" aria-labelledby="title"><title id="title">科学智能体推理、调度与反思更新核心</title><rect width="180" height="190" fill="${p.paper}"/>`];
    diagram(p).forEach(a=>{
      if(a.kind==='text')parts.push(`<text x="${a.x}" y="${a.y}" fill="${a.color}" text-anchor="${a.align==='center'?'middle':a.align==='right'?'end':'start'}" font-family="${FONT}" font-size="${a.size}">${escape(a.s)}</text>`);
      else if(a.kind==='rect')parts.push(`<rect x="${a.x}" y="${a.y}" width="${a.w}" height="${a.h}" rx="${a.r}" ${colorAttr('fill',a.fill)} ${colorAttr('stroke',a.stroke)} stroke-width="1"/>`);
      else {
        parts.push(`<polyline points="${a.points.map(q=>q.join(',')).join(' ')}" fill="none" ${colorAttr('stroke',a.color)} stroke-width="1.15" stroke-linejoin="round" stroke-linecap="round"/>`);
        if(a.arrow)parts.push(`<polygon points="${arrowPoints(a.points).map(q=>q.join(',')).join(' ')}" ${colorAttr('fill',a.color)}/>`);
      }
    });
    return parts.join('\n')+'\n</svg>\n';
  };
  scenes.agentCoreCompact=function(c,seconds,width,height,p){
    c.save();c.scale(width/330,height/105);c.lineJoin='round';
    c.fillStyle=p.ink;c.textAlign='center';c.font=`500 ${15*(p.typeScale||1)}px ${FONT}`;c.fillText('推理　调度　反思更新',165,20);
    ['领域推理','任务调度','反思更新'].forEach((s,i)=>{
      const x=12+i*106;c.fillStyle=p.violet+'0c';c.strokeStyle=p.violet+'50';c.lineWidth=1;
      c.beginPath();c.roundRect(x,36,94,29,4);c.fill();c.stroke();c.fillStyle=p.ink;c.font=`500 ${13*(p.typeScale||1)}px ${FONT}`;c.fillText(s,x+47,55);
      if(i<2){c.strokeStyle=p.muted;c.beginPath();c.moveTo(x+94,50);c.lineTo(x+105,50);c.stroke();}
    });
    c.strokeStyle=p.violet;c.beginPath();c.moveTo(271,66);c.lineTo(271,82);c.lineTo(59,82);c.lineTo(59,66);c.stroke();
    c.fillStyle=p.paper;c.fillRect(147,74,36,15);c.fillStyle=p.violet;c.font=`500 ${12*(p.typeScale||1)}px ${FONT}`;c.fillText('RSI',165,86);c.restore();
  };
})();
