/* Conceptual virtual-validation trajectories, not measured or simulated results.
 * The RNA risk hotspot is a hypothetical assessment target. It is not a claim
 * that a particular modification is protective or that this sequence degrades.
 */
(function () {
  'use strict';
  const scenes = window.ResearchScenes = window.ResearchScenes || {};
  const TAU = Math.PI * 2;
  const FONT = '"PingFang SC", "Microsoft YaHei", Arial, sans-serif';
  const clamp = x => Math.max(0, Math.min(1, x));
  const rgba = (color, a) => color + Math.round(clamp(a) * 255).toString(16).padStart(2, '0');
  const lerp = (a, b, u) => a + (b - a) * u;
  const smooth = v => {v=clamp(v);return v*v*(3-2*v);};
  function text(c, s, x, y, p, size = 14, color = p.muted, align = 'center') {
    c.font = `500 ${size * (p.typeScale || 1)}px ${FONT}`;
    c.fillStyle = color; c.textAlign = align; c.fillText(s, x, y);
  }
  function line(c, a, b, color, width = 1, opacity = 1) {
    c.save(); c.globalAlpha *= opacity; c.strokeStyle = color; c.lineWidth = width;
    c.beginPath(); c.moveTo(a.x, a.y); c.lineTo(b.x, b.y); c.stroke(); c.restore();
  }
  function ball(c, x, y, r, color, opacity = 1) {
    c.save(); c.globalAlpha *= opacity;
    const g = c.createRadialGradient(x - r * .28, y - r * .35, r * .07, x, y, r);
    g.addColorStop(0, '#ffffff'); g.addColorStop(.29, color); g.addColorStop(1, color);
    c.fillStyle = g; c.beginPath(); c.arc(x, y, r, 0, TAU); c.fill(); c.restore();
  }
  function setup(c, width, height, title, p) {
    const scale = Math.min(width / 280, height / 140);
    c.save(); c.translate((width - 280 * scale) / 2, (height - 140 * scale) / 2); c.scale(scale, scale);
    c.lineCap = 'round'; c.lineJoin = 'round';
    text(c, title, 140, 17, p, 17, p.ink);
  }
  function protein(c, cx, cy, rx, ry, angle, color, opacity = 1, outlineOnly = false) {
    c.save(); c.translate(cx, cy); c.rotate(angle); c.globalAlpha *= opacity;
    c.beginPath();
    for (let i = 0; i <= 72; i++) {
      const a = i / 72 * TAU, radius = 1 + .095 * Math.sin(a * 5) + .035 * Math.cos(a * 9);
      const x = Math.cos(a) * rx * radius, y = Math.sin(a) * ry * radius;
      i ? c.lineTo(x, y) : c.moveTo(x, y);
    }
    c.closePath(); c.strokeStyle = rgba(color, .34); c.lineWidth = 1;
    if (!outlineOnly) {
      const g = c.createLinearGradient(-rx, -ry, rx, ry);
      g.addColorStop(0, rgba(color, .09)); g.addColorStop(1, rgba(color, .19));
      c.fillStyle = g; c.fill();
    }
    c.stroke();
    if (!outlineOnly) {
      c.clip();
      for (let k = -1; k <= 2; k++) {
        c.beginPath(); c.moveTo(-rx, k * 13);
        c.bezierCurveTo(-rx * .34, k * 13 - 18, rx * .27, k * 13 + 17, rx, k * 13 - 5);
        c.strokeStyle = rgba(color, .24); c.lineWidth = 3; c.stroke();
      }
    }
    c.restore();
  }
  // Same compact fused imide motif as the design scene; no specific drug claim.
  const glueAtoms = [[21,0,'C'],[10.5,18.2,'C'],[-10.5,18.2,'C'],[-21,0,'C'],[-10.5,-18.2,'C'],[10.5,-18.2,'C'],
    [28,-34,'C'],[48,-23,'N'],[43,-1,'C'],[26,-55,'O'],[64,4,'O'],[63,-36,'C']];
  const glueBonds = [[0,1,2],[1,2,1],[2,3,2],[3,4,1],[4,5,2],[5,0,1],[5,6,1],[6,7,1],[7,8,1],[8,0,1],[6,9,2],[8,10,2],[7,11,1]];
  function glueState(time) {
    const docking=smooth((time-.65)/3.7),rearrange=smooth((time-4.9)/3.35);
    const settling=smooth((time-8.3)/.65),motion=Math.sin(time*2.2)*settling;
    return {docking,rearrange,
      x:lerp(59,137,docking)+9*rearrange+motion*.6,
      y:lerp(149.5,131,docking)-10*Math.sin(docking*Math.PI)-3*rearrange+Math.cos(time*1.7)*settling*.6,
      angle:lerp(.95,.05,docking)+.13*Math.sin(docking*Math.PI)-.25*rearrange+motion*.012};
  }
  function gluePose(state) {
    const {x,y,angle}=state;
    return glueAtoms.map(a => {
      const xx = (a[0] - 20) * .96, yy = (a[1] + 11) * .96;
      return {x:x+xx*Math.cos(angle)-yy*Math.sin(angle),
        y:y+xx*Math.sin(angle)+yy*Math.cos(angle),kind:a[2]};
    });
  }
  function drawGlue(c, pts, p, opacity = 1) {
    c.save(); c.globalAlpha *= opacity;
    glueBonds.forEach(([i, j, order]) => {
      const a = pts[i], b = pts[j]; line(c, a, b, p.ink, 3.0, .74);
      if (order === 2) {
        const length = Math.hypot(b.x - a.x, b.y - a.y) || 1;
        const nx = -(b.y - a.y) / length * 4.2, ny = (b.x - a.x) / length * 4.2;
        line(c, {x:lerp(a.x,b.x,.18)+nx,y:lerp(a.y,b.y,.18)+ny},
          {x:lerp(a.x,b.x,.82)+nx,y:lerp(a.y,b.y,.82)+ny}, p.ink, 1.3, .65);
      }
    });
    pts.forEach(a => ball(c, a.x, a.y, a.kind === 'C' ? 4.0 : 4.5, a.kind === 'O' ? p.red : a.kind === 'N' ? p.blue : p.ink));
    c.restore();
  }
  scenes.validationGlue = function (c, seconds, width, height, p) {
    setup(c,width,height,'分子胶',p);
    const cycle=((seconds%12)+12)%12;
    // Fade to a fresh free ligand rather than playing docking backwards.
    const t=cycle>11.35?0:cycle;
    const alpha=cycle<10.8?1:cycle<11.35?1-smooth((cycle-10.8)/.55):smooth((cycle-11.35)/.65);
    const state=glueState(t),r=state.rearrange,d=state.docking;
    c.save(); c.beginPath(); c.rect(10,25,260,99); c.clip();
    c.translate(140,75); c.scale(.68,.68); c.translate(-140,-125);
    c.globalAlpha*=alpha;
    const top={x:lerp(102,97,r),y:lerp(88,96,r),angle:lerp(-.15,-.24,r)};
    const bottom={x:lerp(202,189,r),y:lerp(163,155,r),angle:lerp(.17,-.32,r)};
    // Prior docked surfaces remain as a quiet reference during relaxation.
    if(r>.01){
      const ghost=.34*Math.sin(r*Math.PI)+.1*r;
      protein(c,102,88,68,29,-.15,p.blue,ghost,true);
      protein(c,202,163,60,27,.17,p.violet,ghost,true);
    }
    protein(c,top.x,top.y,68,29,top.angle,p.blue);
    protein(c,bottom.x,bottom.y,60,27,bottom.angle,p.violet);
    const pts=gluePose(state);
    // A short train of past poses makes translation and orientation search visible.
    if(t>.8&&t<4.65){
      drawGlue(c,gluePose(glueState(Math.max(0,t-.85))),p,.10);
      drawGlue(c,gluePose(glueState(Math.max(0,t-.40))),p,.17);
    }
    if(r>.02&&r<.98)drawGlue(c,gluePose(glueState(4.7)),p,.15*(1-r));
    const definitions=[
      {root:{x:top.x+27,y:top.y+2},target:9,old:6,turn:.9,color:p.blue},
      {root:{x:top.x+66,y:top.y+7},target:6,old:7,turn:-.9,color:p.blue},
      {root:{x:bottom.x-28,y:bottom.y+18},target:1,old:0,turn:.95,color:p.violet},
      {root:{x:bottom.x+26,y:bottom.y-4},target:10,old:8,turn:-.8,color:p.violet}
    ];
    const dockedPose=gluePose(glueState(8.7));
    definitions.forEach((a,i)=>{
      const target=dockedPose[a.target];
      const direction=Math.atan2(target.y-a.root.y,target.x-a.root.x)+a.turn*(1-r);
      const elbow={x:a.root.x+8*Math.cos(direction+.35),y:a.root.y+8*Math.sin(direction+.35)};
      const tip={x:elbow.x+9*Math.cos(direction-.25),y:elbow.y+9*Math.sin(direction-.25)};
      // Solid segments belong to the protein residue; intermolecular contacts
      // are dashed, and appear only after the ligand reaches the interface.
      line(c,a.root,elbow,a.color,1.8,.58);line(c,elbow,tip,a.color,1.8,.58);
      ball(c,a.root.x,a.root.y,2.4,a.color,.64);ball(c,elbow.x,elbow.y,2.6,a.color,.75);ball(c,tip.x,tip.y,3.2,a.color,.85);
      const joined=smooth((d-.88)/.12)*(i<2?1:smooth((r-.08)/.35));
      c.save();c.setLineDash([2.5,3]);
      const contact=(index,strength)=>{
        const distance=Math.hypot(tip.x-pts[index].x,tip.y-pts[index].y);
        line(c,tip,pts[index],a.color,1.25,joined*strength*(1-smooth((distance-26)/12)));
      };
      contact(a.old,.65*(1-r));contact(a.target,.8*r);
      c.restore();
    });
    drawGlue(c,pts,p);
    c.restore();
    text(c,t<4.9?'分子对接':t<8.4?'构象重排':'稳定性评估',140,137,p,13);
    c.restore();
  };

  const modifications = [1,3,5,8,11,14,18,21,24,27,30,32];
  function rnaPoints(theta) {
    const result = [];
    for (let strand = 0; strand < 2; strand++) for (let i = 0; i < 17; i++) {
      const a = i / 16 * TAU * 1.4 + strand * Math.PI;
      result.push({x:39+i*12.5, y:145 + Math.sin(a) * 24 + Math.sin(theta + i*.22) * 2.7,
        z:Math.cos(a),strand,i});
    }
    return result;
  }
  function drawRna(c,points,p,opacity=1) {
    c.save(); c.globalAlpha *= opacity;
    for(let i=0;i<17;i++)line(c,points[i],points[17+i],p.muted,1.25,.31);
    for(let strand=0;strand<2;strand++)for(let i=0;i<16;i++)line(c,points[strand*17+i],points[strand*17+i+1],strand?p.violet:p.blue,3.0,.63);
    points.slice().sort((a,b)=>a.z-b.z).forEach(q=>ball(c,q.x,q.y,3.1,q.strand?p.violet:p.blue,.67));
    modifications.forEach((idx,i)=>{
      const q=points[idx],color=[p.teal,p.violet,p.red][i%3];
      ball(c,q.x,q.y,4.4,color);
      c.strokeStyle=rgba(color,.33);c.lineWidth=.9;c.beginPath();c.arc(q.x,q.y,6.5,0,TAU);c.stroke();
    });
    c.restore();
  }
  function nuclease(c,x,y,p,theta) {
    protein(c,x,y,27,18,-.17+.05*Math.sin(theta),p.teal,.95);
    // Two interface residues distinguish contact from simple background motion.
    ball(c,x-10,y+12,2.8,p.teal,.8);ball(c,x+5,y+16,2.8,p.teal,.8);
  }
  scenes.validationRna = function(c,seconds,width,height,p) {
    setup(c,width,height,'RNA 修饰稳定性',p);
    const t=((seconds%12)+12)%12,theta=t/12*TAU;
    const engagement=(1-Math.cos(theta))/2;
    const risk=engagement*engagement;
    c.save();c.beginPath();c.rect(10,25,260,101);c.clip();
    c.translate(140,71);c.scale(.8,.8);c.translate(-140,-126);
    const pts=rnaPoints(theta),prev=rnaPoints(theta-.5);
    drawRna(c,prev,p,.12);drawRna(c,pts,p);
    const enzyme={x:164-15*engagement,y:82+18*engagement};
    nuclease(c,enzyme.x,enzyme.y,p,theta);
    const a=pts[7],b=pts[8],center={x:(a.x+b.x)/2,y:(a.y+b.y)/2};
    c.save();c.setLineDash([2,3]);
    line(c,{x:enzyme.x-3,y:enzyme.y+16},center,p.teal,1.2,.25+.45*engagement);c.restore();
    const halo=c.createRadialGradient(center.x,center.y,2,center.x,center.y,23);
    halo.addColorStop(0,rgba(p.red,risk*.17));halo.addColorStop(1,rgba(p.red,0));
    c.fillStyle=halo;c.beginPath();c.arc(center.x,center.y,23,0,TAU);c.fill();
    line(c,a,b,p.red,3.5,risk*.8);
    c.strokeStyle=rgba(p.red,.15+.55*risk);c.lineWidth=1.1;
    c.beginPath();c.arc(center.x,center.y,10+3*Math.sin(theta*2),0,TAU);c.stroke();
    // A faint split-bond alternative denotes predicted risk, while the primary
    // candidate remains intact. No superiority or degradation rate is asserted.
    if(risk>.05){
      const shift=10*risk;
      const fragment=pts.slice(8,12).map(q=>({x:q.x+shift,y:q.y-5*risk}));
      for(let i=1;i<fragment.length;i++)line(c,fragment[i-1],fragment[i],p.red,1.8,.28*risk);
      fragment.forEach(q=>ball(c,q.x,q.y,2.8,p.red,.25*risk));
    }
    c.restore();
    text(c,['酶接触','骨架检查','降解风险'][Math.floor(t/4)],140,137,p,13);
    c.restore();
  };
})();
