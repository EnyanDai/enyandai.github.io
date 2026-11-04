/* Small scientific scenes for the multi-agent diagram.
 * These are illustrative actions, not model samples or measured trajectories.
 * All drawing is clipped to the requested rectangle; no labels or node frames.
 */
(function () {
  'use strict';
  const scenes=window.ResearchScenes=window.ResearchScenes||{};
  const TAU=Math.PI*2;
  const clamp=v=>Math.max(0,Math.min(1,v));
  const smooth=v=>{v=clamp(v);return v*v*(3-2*v);};
  const mix=(a,b,u)=>a+(b-a)*u;
  const rgba=(hex,a)=>hex+Math.round(clamp(a)*255).toString(16).padStart(2,'0');
  function frame(c,x,y,w,h){
    c.save();c.beginPath();c.rect(x,y,w,h);c.clip();
    const s=Math.min(w/100,h/75);c.translate(x+(w-100*s)/2,y+(h-75*s)/2);c.scale(s,s);
    c.lineCap='round';c.lineJoin='round';
  }
  function line(c,a,b,color,width=1,opacity=1){
    c.save();c.globalAlpha*=opacity;c.strokeStyle=color;c.lineWidth=width;
    c.beginPath();c.moveTo(a.x,a.y);c.lineTo(b.x,b.y);c.stroke();c.restore();
  }
  function ball(c,x,y,r,color,opacity=1){
    c.save();c.globalAlpha*=opacity;
    const g=c.createRadialGradient(x-r*.3,y-r*.35,r*.03,x,y,r);
    g.addColorStop(0,'#ffffff');g.addColorStop(.33,color);g.addColorStop(1,color);
    c.fillStyle=g;c.beginPath();c.arc(x,y,r,0,TAU);c.fill();c.restore();
  }
  const atoms=[[-17,0,'C'],[-8.5,-14.7,'C'],[8.5,-14.7,'C'],[17,0,'C'],[8.5,14.7,'C'],[-8.5,14.7,'C'],[25.5,-14.7,'N'],[37,-25,'O'],[35.5,1,'C'],[48,9,'O']];
  const bonds=[[0,1,1],[1,2,2],[2,3,1],[3,4,2],[4,5,1],[5,0,2],[2,6,1],[6,7,1],[6,8,1],[8,9,2]];
  function ligandPoints(x,y,scale,angle,extension=1){
    return atoms.map((a,i)=>{
      let xx=a[0],yy=a[1];
      if(i>=8){xx=mix(54,xx,extension);yy=mix(29,yy,extension);}
      return {x:x+(xx*Math.cos(angle)-yy*Math.sin(angle))*scale,
        y:y+(xx*Math.sin(angle)+yy*Math.cos(angle))*scale,kind:a[2]};
    });
  }
  function ligand(c,points,p,extension=1,opacity=1){
    c.save();c.globalAlpha*=opacity;
    bonds.forEach(([i,j,order])=>{
      const a=points[i],b=points[j],branch=j>=8;
      const op=branch?extension:1;
      line(c,a,b,p.ink,2.6,op*.87);
      if(order===2){
        const len=Math.hypot(b.x-a.x,b.y-a.y)||1,nx=-(b.y-a.y)/len*3.2,ny=(b.x-a.x)/len*3.2;
        line(c,{x:mix(a.x,b.x,.2)+nx,y:mix(a.y,b.y,.2)+ny},{x:mix(a.x,b.x,.8)+nx,y:mix(a.y,b.y,.8)+ny},p.ink,1.1,op*.75);
      }
    });
    points.forEach((a,i)=>ball(c,a.x,a.y,a.kind==='C'?2.7:3.2,a.kind==='N'?p.blue:a.kind==='O'?p.red:p.ink,i>=8?.35+.65*extension:1));
    c.restore();
  }
  scenes.agentDesignArt=function(c,seconds,x,y,w,h,p){
    frame(c,x,y,w,h);
    const t=((seconds%12)+12)%12,theta=t/12*TAU;
    const build=smooth((1-Math.cos(theta))/2);
    const pts=ligandPoints(32,43,1.04,-.14,build);
    // A branch is physically brought to the candidate and attached.
    // The accepted scaffold remains visible throughout the cycle.
    if(build<.93){
      const a=pts[6],b=pts[8];c.save();c.setLineDash([2,3]);line(c,a,b,p.blue,1,.28*(1-build));c.restore();
    }
    ligand(c,pts,p,build);
    // Faint alternative attachment positions convey local design exploration.
    if(build>.12&&build<.88){
      c.save();c.globalAlpha=.12*Math.sin(build*Math.PI);
      const old=ligandPoints(32,43,1.04,-.14,Math.max(0,build-.26));
      line(c,old[6],old[8],p.blue,1.5);line(c,old[8],old[9],p.blue,1.5);
      ball(c,old[8].x,old[8].y,2.6,p.blue);ball(c,old[9].x,old[9].y,3,p.red);c.restore();
    }
    c.restore();
  };
  function surface(c,cx,cy,rx,ry,angle,color,phase,opacity=1){
    c.save();c.translate(cx,cy);c.rotate(angle);c.globalAlpha*=opacity;
    c.beginPath();
    for(let i=0;i<=60;i++){
      const a=i/60*TAU,rad=1+.065*Math.sin(a*5+phase)+.027*Math.cos(a*9);
      const xx=Math.cos(a)*rx*rad,yy=Math.sin(a)*ry*rad;i?c.lineTo(xx,yy):c.moveTo(xx,yy);
    }
    c.closePath();
    const g=c.createLinearGradient(-rx,-ry,rx,ry);g.addColorStop(0,rgba(color,.075));g.addColorStop(1,rgba(color,.21));
    c.fillStyle=g;c.fill();c.strokeStyle=rgba(color,.35);c.lineWidth=.7;c.stroke();
    c.clip();
    for(let i=-1;i<=1;i++){
      c.beginPath();c.moveTo(-rx,i*8);c.bezierCurveTo(-rx*.3,i*8-11,rx*.4,i*8+9,rx,i*8-6);
      c.strokeStyle=rgba(color,.28);c.lineWidth=2.4;c.stroke();
    }
    c.restore();
  }
  scenes.agentWorldArt=function(c,seconds,x,y,w,h,p){
    frame(c,x,y,w,h);
    const theta=seconds/12*TAU,u=Math.sin(theta);
    surface(c,37+u,20,35,16,-.13+u*.04,p.blue,theta*.6);
    surface(c,69-u,58,29,15,-.26-u*.05,p.violet,theta*.6+.8);
    const angle=-.36+u*.13;
    const pts=ligandPoints(43,40,.68,angle);
    ligand(c,ligandPoints(43,40,.68,angle-.18),p,1,.13);
    const anchors=[{x:42+u*2,y:19},{x:61,y:26+u},{x:60-u,y:57},{x:80,y:49-u}];
    const targets=[1,7,4,9];
    anchors.forEach((a,i)=>{
      ball(c,a.x,a.y,2.1,i<2?p.blue:p.violet,.85);
      c.save();c.setLineDash([1.7,2.2]);
      line(c,a,pts[targets[i]],i<2?p.blue:p.violet,1.1,.35+.4*(.5+.5*Math.sin(theta*2+i)));
      c.restore();
    });
    ligand(c,pts,p);
    c.restore();
  };
  function vial(c,x,y,p){
    c.save();
    const glass=c.createLinearGradient(x-5,y,x+5,y);glass.addColorStop(0,rgba(p.teal,.25));glass.addColorStop(.25,p.paper);glass.addColorStop(.75,rgba(p.teal,.08));glass.addColorStop(1,rgba(p.teal,.28));
    c.beginPath();c.roundRect(x-5,y,10,21,[1,1,3.5,3.5]);c.fillStyle=glass;c.fill();c.strokeStyle=rgba(p.teal,.75);c.lineWidth=1;c.stroke();
    c.beginPath();c.roundRect(x-3.7,y+10,7.4,9.8,[0,0,2.5,2.5]);c.fillStyle=rgba(p.teal,.45);c.fill();
    line(c,{x:x-5.8,y:y+.5},{x:x+5.8,y:y+.5},p.teal,2.7);
    line(c,{x:x-2,y:y+4},{x:x-2,y:y+15},p.paper,1.1,.9);
    c.restore();
  }
  scenes.agentPhysicalArt=function(c,seconds,x,y,w,h,p){
    frame(c,x,y,w,h);
    const theta=seconds/12*TAU,u=(1-Math.cos(theta))/2;
    // A shallow well plate makes this a laboratory manipulation scene.
    c.fillStyle=rgba(p.muted,.14);c.beginPath();c.ellipse(72,70,25,3.5,0,0,TAU);c.fill();
    c.beginPath();c.moveTo(51,57);c.lineTo(91,57);c.lineTo(96,69);c.lineTo(55,69);c.closePath();
    c.fillStyle=rgba(p.blue,.09);c.fill();c.strokeStyle=rgba(p.blue,.42);c.lineWidth=1;c.stroke();
    for(let row=0;row<2;row++)for(let col=0;col<5;col++){
      const xx=57+col*7.3+row*1.5,yy=60.5+row*4.8;
      c.beginPath();c.ellipse(xx,yy,2.45,1.4,0,0,TAU);c.fillStyle=rgba(p.teal,.18);c.fill();c.strokeStyle=rgba(p.teal,.45);c.lineWidth=.6;c.stroke();
    }
    const shoulder={x:18,y:58},wrist={x:54+17*u,y:19-8*u};
    const dx=wrist.x-shoulder.x,dy=wrist.y-shoulder.y,d=Math.hypot(dx,dy),l1=36,l2=38;
    const a=Math.atan2(dy,dx)-Math.acos(Math.max(-1,Math.min(1,(d*d+l1*l1-l2*l2)/(2*d*l1))));
    const elbow={x:shoulder.x+l1*Math.cos(a),y:shoulder.y+l1*Math.sin(a)};
    c.fillStyle=rgba(p.muted,.18);c.beginPath();c.ellipse(18,70,15,3.5,0,0,TAU);c.fill();
    line(c,{x:8,y:67},{x:29,y:67},p.muted,6);
    line(c,{x:18,y:65},shoulder,p.muted,10);
    [[shoulder,elbow],[elbow,wrist]].forEach(([a,b])=>{
      line(c,a,b,p.muted,9.5);
      line(c,{x:a.x-1.3,y:a.y-1.1},{x:b.x-1.3,y:b.y-1.1},'#c8d8df',6.2);
      line(c,{x:a.x-1.9,y:a.y-1.9},{x:b.x-1.9,y:b.y-1.9},p.paper,1.4,.75);
    });
    [shoulder,elbow,wrist].forEach(q=>{ball(c,q.x,q.y,5,p.muted);ball(c,q.x,q.y,2.5,p.teal);});
    const palm={x:wrist.x+4,y:wrist.y+7};
    line(c,wrist,palm,p.muted,6.5);
    const opening=5.6+1.3*(1-smooth(u*4));
    vial(c,palm.x,palm.y+9,p);
    for(const sign of [-1,1]){
      const knuckle={x:palm.x+sign*opening,y:palm.y+4};
      const tip={x:palm.x+sign*(opening-.3),y:palm.y+15};
      line(c,palm,knuckle,p.muted,3.2);line(c,knuckle,tip,p.muted,2.7);
      line(c,tip,{x:tip.x-sign*2.3,y:tip.y+1.2},p.muted,2.3);
    }
    c.restore();
  };
})();
