/* Source: research-aidd/enzyme-structure.js */
/* Lysozyme cartoon reference: PDB 1LYZ, RCSB PDB.
 * The morph is illustrative conditional denoising, not a simulation or a designed enzyme.
 * This module contains the source coordinates needed for offline rendering.
 */
(function () {
  'use strict';
  const scenes = window.ResearchScenes = window.ResearchScenes || {};
  const residues = [[1,[2.44,10.22,9.79],[2.44,12.0,9.16],[2.64,12.66,10.11],2],[2,[2.31,14.17,7.58],[0.86,14.04,6.95],[0.66,13.84,5.88],2],[3,[-1.19,15.29,7.58],[-0.99,16.61,6.32],[-0.33,17.14,6.32],2],[4,[-2.64,17.47,4.86],[-3.63,18.79,5.68],[-3.96,17.93,6.63],0],[5,[-3.82,20.76,5.68],[-4.94,20.3,5.88],[-5.8,20.24,6.63],1],[6,[-7.58,20.11,4.61],[-7.91,18.79,5.88],[-8.24,18.46,6.76],1],[7,[-7.12,16.41,6.19],[-6.86,16.28,7.58],[-7.58,15.69,8.4],1],[8,[-5.74,17.53,9.47],[-6.72,18.0,10.11],[-7.05,17.8,11.37],1],[9,[-8.37,19.91,9.66],[-9.23,19.18,10.11],[-9.89,19.25,11.24],1],[10,[-11.21,17.2,9.47],[-10.88,16.15,10.74],[-11.54,16.15,11.69],1],[11,[-9.43,14.96,11.75],[-9.76,15.56,13.27],[-10.35,14.77,14.09],1],[12,[-9.29,17.53,14.53],[-10.55,18.06,14.91],[-11.07,17.93,16.42],1],[13,[-12.85,18.06,14.21],[-13.84,17.14,14.97],[-14.37,17.27,16.3],1],[14,[-13.64,14.5,14.21],[-13.45,14.37,15.79],[-14.3,14.3,17.06],1],[15,[-11.87,14.9,17.81],[-12.26,15.95,18.95],[-12.0,16.08,19.84],1],[16,[-13.64,18.0,19.77],[-12.79,19.45,19.58],[-13.18,20.11,20.34],0],[17,[-10.88,20.76,18.64],[-11.87,21.89,18.38],[-11.07,23.07,18.51],0],[18,[-13.18,23.07,16.87],[-13.97,23.86,17.88],[-14.3,23.34,18.95],0],[19,[-14.17,25.71,19.33],[-13.58,25.31,20.59],[-14.37,25.97,21.16],0],[20,[-12.66,24.26,21.86],[-11.93,25.05,22.74],[-11.07,26.1,22.49],0],[21,[-12.2,26.7,24.76],[-12.39,27.82,23.94],[-11.73,28.87,24.0],0],[22,[-13.51,29.14,22.11],[-12.2,29.66,21.16],[-12.06,30.59,20.47],0],[23,[-10.09,28.61,19.65],[-11.21,28.02,18.57],[-11.14,26.5,18.51],0],[24,[-11.34,28.15,16.17],[-10.88,27.16,15.16],[-9.49,27.42,15.67],0],[25,[-10.55,25.38,13.9],[-9.29,25.58,13.27],[-8.11,24.85,13.27],1],[26,[-8.17,27.22,12.0],[-7.12,27.49,12.63],[-5.87,27.49,12.63],1],[27,[-6.26,28.28,15.16],[-5.27,27.03,15.22],[-3.96,27.55,15.16],1],[28,[-5.6,24.59,15.54],[-4.75,23.86,14.4],[-3.82,23.2,14.4],1],[29,[-4.61,23.73,11.88],[-3.36,24.59,11.56],[-2.24,24.26,11.24],1],[30,[-2.11,26.7,11.56],[-1.32,26.63,12.57],[0.0,26.37,12.51],1],[31,[-0.79,25.84,14.72],[0.2,24.59,14.65],[1.32,24.85,14.97],1],[32,[-0.2,22.48,14.59],[0.99,22.74,12.63],[2.04,21.82,12.38],1],[33,[1.38,23.47,10.61],[2.83,23.86,10.87],[3.96,23.6,10.61],1],[34,[3.96,25.91,11.75],[4.61,25.25,12.89],[5.8,25.38,12.89],1],[35,[4.68,23.8,14.97],[5.27,22.41,14.53],[6.53,22.15,14.85],1],[36,[4.88,20.43,13.46],[5.14,20.04,11.88],[5.67,18.92,11.37],0],[37,[4.68,20.63,9.66],[3.69,19.38,9.1],[3.69,19.38,7.96],0],[38,[1.78,18.06,9.47],[1.98,16.74,9.6],[1.32,15.95,9.6],2],[39,[4.02,15.75,10.68],[4.15,15.56,12.19],[4.68,16.15,13.08],2],[40,[2.97,13.84,13.77],[4.48,12.99,14.53],[4.29,12.85,15.48],2],[41,[6.72,12.06,14.34],[7.58,12.79,14.78],[8.44,13.05,15.67],0],[42,[8.57,15.29,14.34],[8.77,15.43,15.92],[8.04,15.03,16.74],2],[43,[10.48,15.62,17.75],[11.54,16.94,17.69],[12.06,17.14,16.99],2],[44,[12.2,18.79,19.08],[12.85,18.98,20.53],[12.39,19.12,21.04],2],[45,[14.77,19.25,21.86],[15.29,20.7,22.11],[15.89,21.29,21.35],2],[46,[15.16,22.68,23.5],[16.68,22.74,24.38],[17.14,21.42,24.89],2],[47,[18.59,23.07,26.03],[18.46,22.28,27.54],[19.45,21.89,27.79],0],[48,[17.01,21.82,29.5],[16.55,20.5,29.63],[15.89,20.3,30.64],0],[49,[16.48,17.93,28.8],[15.23,18.13,27.79],[15.29,17.73,26.85],0],[50,[13.18,18.79,27.61],[12.85,18.46,25.9],[14.04,19.12,25.27],2],[51,[11.93,17.8,24.26],[10.55,17.86,24.0],[9.76,17.73,24.64],2],[52,[8.9,18.46,22.11],[8.57,17.47,20.97],[9.43,17.14,20.4],2],[53,[6.99,15.62,20.28],[5.93,15.82,19.52],[4.61,16.22,20.15],2],[54,[4.09,15.16,17.69],[3.76,16.48,17.12],[4.29,17.6,17.18],2],[55,[1.85,17.6,15.41],[1.91,18.39,16.42],[1.78,19.77,15.92],0],[56,[1.19,19.77,18.32],[2.17,20.24,19.46],[1.98,21.09,19.96],0],[57,[4.75,19.91,20.02],[4.55,19.84,21.48],[5.27,20.76,21.92],2],[58,[3.89,18.85,23.37],[5.01,18.66,24.0],[5.8,17.67,23.44],2],[59,[6.72,19.25,25.9],[6.66,18.13,26.97],[5.93,17.93,27.41],2],[60,[8.04,16.61,28.43],[8.57,16.94,29.69],[8.37,16.02,30.51],2],[61,[8.7,18.66,31.33],[7.45,18.66,32.03],[7.58,18.66,33.04],0],[62,[4.81,18.79,32.09],[3.96,17.93,31.46],[3.3,17.47,31.96],0],[63,[2.7,16.88,29.56],[2.97,15.36,29.31],[1.98,14.83,29.44],0],[64,[4.15,13.58,28.8],[5.8,13.12,29.18],[6.39,13.84,29.18],0],[65,[6.92,11.47,30.2],[7.84,10.55,29.06],[6.92,10.02,28.17],0],[66,[9.95,10.15,27.86],[11.07,9.89,28.43],[11.87,9.23,27.79],0],[67,[12.2,8.83,30.32],[13.18,9.23,30.51],[14.24,8.7,31.21],0],[68,[15.03,11.4,30.0],[14.96,12.72,30.32],[15.95,13.38,30.07],0],[69,[13.84,14.7,31.08],[13.51,14.7,32.66],[12.2,14.7,32.72],0],[70,[14.17,14.83,34.87],[13.25,15.75,35.63],[12.52,15.16,36.51],0],[71,[11.87,17.67,35.75],[10.55,17.14,35.75],[9.89,17.8,36.45],0],[72,[9.23,15.62,34.81],[8.04,15.03,36.01],[8.31,14.5,36.89],0],[73,[5.87,15.69,36.26],[4.94,15.29,35.0],[5.27,15.49,33.98],0],[74,[3.76,13.71,33.98],[1.78,13.97,34.11],[0.79,13.05,34.24],0],[75,[0.72,16.02,33.73],[-0.26,15.36,32.72],[-1.52,14.77,32.85],0],[76,[-1.19,14.11,30.7],[-0.79,12.52,30.83],[-1.65,12.0,30.26],0],[77,[-0.07,10.94,32.28],[0.0,9.89,30.83],[-0.66,8.96,30.83],0],[78,[0.79,9.49,28.68],[2.31,9.49,28.43],[3.16,10.41,28.55],0],[79,[4.61,8.57,27.54],[4.75,9.43,26.15],[3.96,8.9,25.27],0],[80,[5.93,11.21,24.76],[5.41,10.68,23.44],[4.75,11.21,22.61],1],[81,[6.0,8.63,22.3],[4.75,8.31,21.73],[4.61,8.31,20.34],1],[82,[2.31,8.11,22.24],[2.04,9.23,21.23],[0.99,8.9,20.21],1],[83,[2.44,11.54,20.85],[2.64,11.47,19.33],[1.98,12.2,18.7],1],[84,[4.02,10.68,17.62],[3.43,9.76,16.68],[3.62,9.56,15.67],1],[85,[1.85,7.91,16.36],[0.33,8.57,15.41],[0.33,9.89,15.29],0],[86,[-0.26,8.5,13.33],[-1.78,8.57,13.64],[-2.44,9.1,13.14],0],[87,[-3.43,8.9,15.41],[-3.36,9.95,16.68],[-2.5,9.69,17.43],0],[88,[-3.82,12.26,17.18],[-4.61,12.06,18.51],[-4.42,13.51,18.95],0],[89,[-5.93,11.01,19.96],[-5.41,11.87,21.23],[-5.93,12.52,21.48],1],[90,[-3.23,11.67,22.43],[-3.16,12.72,22.61],[-3.3,13.18,23.37],1],[91,[-2.17,14.77,21.48],[-3.16,15.62,21.73],[-3.16,16.35,22.43],1],[92,[-5.34,16.35,20.91],[-6.0,16.35,22.36],[-6.13,17.01,22.8],1],[93,[-6.66,14.77,24.26],[-5.74,15.29,25.27],[-6.26,15.89,26.09],1],[94,[-3.36,16.08,25.84],[-3.43,17.6,25.71],[-3.43,18.52,26.53],1],[95,[-3.69,19.45,23.94],[-4.75,19.97,24.7],[-4.75,20.96,24.89],1],[96,[-7.05,19.71,25.65],[-6.59,20.11,27.16],[-7.05,21.36,27.41],1],[97,[-5.27,20.3,29.25],[-4.29,21.42,29.12],[-4.42,21.95,30.51],0],[98,[-2.83,22.74,27.92],[-3.43,24.06,27.54],[-3.16,24.65,27.98],0],[99,[-5.08,24.85,26.28],[-6.26,25.38,27.42],[-6.86,26.43,27.29],0],[100,[-7.58,24.85,29.56],[-6.72,25.05,30.95],[-7.45,25.25,31.65],0],[101,[-4.94,25.31,32.15],[-4.75,26.7,32.41],[-5.14,27.16,33.35],0],[102,[-4.48,29.0,31.77],[-4.22,29.99,30.7],[-4.61,30.98,30.7],0],[103,[-2.77,30.45,28.68],[-3.03,30.52,27.23],[-2.44,30.98,26.41],0],[104,[-4.61,29.33,25.9],[-3.56,28.81,25.02],[-2.64,28.02,25.65],0],[105,[-2.97,28.67,22.74],[-1.65,29.46,22.74],[-0.66,29.33,21.92],0],[106,[-0.2,31.31,24.0],[0.86,30.39,24.51],[1.98,30.72,24.32],0],[107,[1.32,28.21,25.65],[1.98,27.55,24.45],[3.16,26.83,24.57],0],[108,[2.37,27.55,22.11],[3.16,28.81,21.35],[2.37,29.14,20.53],0],[109,[5.27,29.86,21.29],[4.94,30.12,19.71],[4.61,31.51,19.33],0],[110,[4.48,29.47,17.43],[3.16,29.99,17.06],[3.03,30.78,16.17],0],[111,[0.46,30.32,17.18],[0.59,31.71,17.31],[0.0,32.63,16.42],0],[112,[1.32,33.29,19.2],[2.17,34.01,18.13],[1.65,35.07,17.69],0],[113,[4.22,34.67,16.99],[3.49,34.74,15.41],[3.69,35.79,14.91],0],[114,[2.77,33.35,13.46],[1.25,33.16,13.14],[1.05,33.29,12.13],0],[115,[-1.12,32.56,13.77],[-1.98,33.55,14.53],[-2.77,34.08,14.21],0],[116,[-2.37,34.94,16.68],[-2.64,36.39,16.05],[-1.91,36.98,16.05],0],[117,[-4.15,37.64,15.22],[-4.15,37.64,13.64],[-4.09,38.89,13.27],0],[118,[-4.09,36.52,11.37],[-5.54,35.86,11.05],[-6.13,35.46,11.88],0],[119,[-7.18,35.2,9.47],[-6.99,33.42,9.22],[-6.59,33.09,8.21],0],[120,[-6.59,31.31,10.68],[-7.78,30.78,9.85],[-7.38,29.66,9.47],0],[121,[-9.95,30.52,8.59],[-9.56,29.99,7.08],[-9.89,29.2,6.95],0],[122,[-7.84,30.65,5.31],[-6.99,29.14,5.24],[-6.92,28.67,4.55],0],[123,[-6.26,27.29,6.76],[-7.05,26.5,6.32],[-6.72,25.05,5.94],0],[124,[-9.76,25.58,6.57],[-10.41,25.91,5.37],[-11.47,25.18,5.05],0],[125,[-10.88,27.03,3.41],[-10.68,25.97,2.34],[-9.89,25.71,2.08],0],[126,[-11.6,24.59,0.69],[-11.93,23.14,1.33],[-12.2,22.48,0.82],0],[127,[-12.33,21.95,3.41],[-13.64,21.42,3.6],[-14.57,22.28,3.73],0],[128,[-15.36,19.71,3.6],[-15.43,19.51,5.05],[-14.63,18.59,5.31],0],[129,[-15.95,19.91,7.26],[-17.4,19.91,7.71],[-18.06,19.97,7.14],0]]; // DATA_RESIDUES
  const activeAtoms = [[4.81,24.92,18.05],[8.98,21.25,22.47]]; // DATA_ACTIVE
  const TAU = Math.PI * 2;
  const clamp = q => Math.max(0, Math.min(1, q));
  const smooth = q => { q = clamp(q); return q*q*(3-2*q); };
  const mix = (a,b,q) => a+(b-a)*q;
  const add = (a,b) => [a[0]+b[0],a[1]+b[1],a[2]+b[2]];
  const sub = (a,b) => [a[0]-b[0],a[1]-b[1],a[2]-b[2]];
  const mul = (a,q) => [a[0]*q,a[1]*q,a[2]*q];
  const dot = (a,b) => a[0]*b[0]+a[1]*b[1]+a[2]*b[2];
  const cross = (a,b) => [a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];
  const unit = a => mul(a,1/(Math.hypot(...a)||1));
  const lerp = (a,b,q) => a.map((v,i)=>mix(v,b[i],q));
  const rgba = (color,alpha) => color+Math.round(clamp(alpha)*255).toString(16).padStart(2,'0');
  const center = residues.length ? [0,1,2].map(k=>residues.reduce((s,r)=>s+r[1][k],0)/residues.length) : [0,0,0];
  const positions = residues.map(r=>sub(r[1],center));
  const active = activeAtoms.map(p=>sub(p,center));
  const light = unit([-.35,-.45,.82]);
  function rotate(p) {
    // A three-quarter view exposes both the alpha-helical and beta-sheet domains.
    const ya=-.40, xa=.90, za=1.15;
    const x=p[0]*Math.cos(ya)+p[2]*Math.sin(ya), z=-p[0]*Math.sin(ya)+p[2]*Math.cos(ya);
    const y=p[1]*Math.cos(xa)-z*Math.sin(xa), zz=p[1]*Math.sin(xa)+z*Math.cos(xa);
    return [x*Math.cos(za)-y*Math.sin(za), x*Math.sin(za)+y*Math.cos(za), zz];
  }
  function catmull(p0,p1,p2,p3,t) {
    const tt=t*t, ttt=tt*t;
    return p1.map((_,k)=>.5*((2*p1[k])+(-p0[k]+p2[k])*t+(2*p0[k]-5*p1[k]+4*p2[k]-p3[k])*tt+(-p0[k]+3*p1[k]-3*p2[k]+p3[k])*ttt));
  }
  function shade(hex, brightness) {
    return '#'+[1,3,5].map(k=>Math.max(0,Math.min(255,Math.round(parseInt(hex.slice(k,k+2),16)*brightness))).toString(16).padStart(2,'0')).join('');
  }
  const normals=[];
  residues.forEach((r,i)=>{
    const tangent=unit(sub(positions[Math.min(i+1,positions.length-1)],positions[Math.max(0,i-1)]));
    let n=r[2]&&r[3]?sub(r[3],r[2]):cross(tangent,[0,0,1]);
    n=unit(sub(n,mul(tangent,dot(n,tangent))));
    if(i&&dot(n,normals[i-1])<0)n=mul(n,-1);
    normals.push(n);
  });
  const projected=positions.map(rotate);
  const bounds=projected.length?[0,1].map(k=>[Math.min(...projected.map(p=>p[k]))-3.0,Math.max(...projected.map(p=>p[k]))+3.0]):[[0,1],[0,1]];
  const cloud=positions.map((_,i)=>{
    const a=i*2.399963, z=1-2*(i+.5)/positions.length, radius=12+7*(.5+.5*Math.sin(i*4.23));
    return [Math.cos(a)*Math.sqrt(1-z*z)*radius,Math.sin(a)*Math.sqrt(1-z*z)*radius,z*radius];
  });
  function ball(ctx,x,y,r,color,opacity) {
    ctx.save();ctx.globalAlpha*=opacity;
    const g=ctx.createRadialGradient(x-r*.35,y-r*.4,0,x,y,r);
    g.addColorStop(0,'#ffffff');g.addColorStop(.30,color);g.addColorStop(1,shade(color,.72));
    ctx.fillStyle=g;ctx.beginPath();ctx.arc(x,y,r,0,TAU);ctx.fill();ctx.restore();
  }
  function ssWidth(index,t) {
    const r=residues[index], next=residues[Math.min(index+1,residues.length-1)];
    if(r[4]===2){
      if(next[4]!==2)return Math.max(.04,2.35*(1-t));
      if(index+2<residues.length&&residues[index+2][4]!==2)return mix(1.35,2.35,t);
      return 1.35;
    }
    if(r[4]===1)return 1.16;
    return .32;
  }
  scenes.enzymeSites = function(x,y,width,height) {
    const scale=Math.min(width/(bounds[0][1]-bounds[0][0]),height/(bounds[1][1]-bounds[1][0]));
    const cx=x+width/2-(bounds[0][1]+bounds[0][0])/2*scale;
    const cy=y+height/2-(bounds[1][1]+bounds[1][0])/2*scale;
    return active.map(q=>{const v=rotate(q);return {x:cx+v[0]*scale,y:cy+v[1]*scale};});
  };
  scenes.enzymeArtwork = function(ctx,seconds,x,y,width,height,p) {
    if(!residues.length)return;
    const t=((seconds%12)+12)%12;
    const u=t<=10?smooth(t/8.5):t<=11?1:0;
    const alpha=t<=10?1:t<=11?1-smooth(t-10):smooth(t-11);
    const phase=t/12*TAU;
    const scale=Math.min(width/(bounds[0][1]-bounds[0][0]),height/(bounds[1][1]-bounds[1][0]));
    const cx=x+width/2-(bounds[0][1]+bounds[0][0])/2*scale;
    const cy=y+height/2-(bounds[1][1]+bounds[1][0])/2*scale;
    const screen=q=>{const v=rotate(q);return [cx+v[0]*scale,cy+v[1]*scale,v[2]];};
    const deformed=positions.map((v,i)=>{
      const noise=cloud[i].map((a,k)=>a+Math.sin(phase*2+i*.7+k)*1.4);
      return lerp(noise,v,u);
    });
    ctx.save();ctx.beginPath();ctx.rect(x-2,y-2,width+4,height+4);ctx.clip();
    // Sites are displayed as fixed conditioning anchors even when the backbone is uncertain.
    active.forEach(v=>{const q=screen(v);ball(ctx,q[0],q[1],Math.max(2,scale*.7),p.red,.20);});
    const geom=[];
    const ribbonAlpha=alpha*smooth((u-.24)/.55);
    if(ribbonAlpha>.005){
      const steps=6;
      for(let i=0;i<residues.length-1;i++){
        const at=t=>{
          const pos=catmull(deformed[Math.max(0,i-1)],deformed[i],deformed[i+1],deformed[Math.min(i+2,deformed.length-1)],t);
          const norm=unit(lerp(normals[i],normals[i+1],t));
          const tangent=unit(sub(deformed[i+1],deformed[i]));
          const binorm=unit(cross(tangent,norm));
          const w=ssWidth(i,t), thick=residues[i][4]===0?.14:.18;
          return [add(pos,add(mul(norm,w),mul(binorm,thick))),add(pos,add(mul(norm,-w),mul(binorm,thick))),add(pos,add(mul(norm,w),mul(binorm,-thick))),add(pos,add(mul(norm,-w),mul(binorm,-thick)))];
        };
        const col=residues[i][4]===2?p.violet:residues[i][4]===1?(Math.floor(i/16)%2?p.teal:p.blue):'#7ba5ae';
        let prev=at(0);
        for(let j=1;j<=steps;j++){
          const curr=at(j/steps);
          [[0,1],[2,3],[0,2],[1,3]].forEach((ids,side)=>{
            const face=[prev[ids[0]],prev[ids[1]],curr[ids[1]],curr[ids[0]]].map(rotate);
            const normal=unit(cross(sub(face[1],face[0]),sub(face[3],face[0])));
            const lit=.58+.42*Math.abs(dot(normal,light));
            geom.push({points:face.map(v=>[cx+v[0]*scale,cy+v[1]*scale]),z:face.reduce((s,q)=>s+q[2],0)/4,color:shade(col,side>1?lit*.8:lit)});
          });
          prev=curr;
        }
      }
      geom.sort((a,b)=>a.z-b.z);
      ctx.globalAlpha=ribbonAlpha;
      geom.forEach(face=>{
        ctx.beginPath();face.points.forEach((q,j)=>j?ctx.lineTo(q[0],q[1]):ctx.moveTo(q[0],q[1]));ctx.closePath();
        ctx.fillStyle=face.color;ctx.fill();ctx.strokeStyle=face.color;ctx.lineWidth=.32;ctx.stroke();
      });
      ctx.globalAlpha=1;
    }
    const particleAlpha=alpha*(1-smooth((u-.55)/.38));
    if(particleAlpha>.005){
      deformed.map((v,i)=>({q:screen(v),i})).sort((a,b)=>a.q[2]-b.q[2]).forEach(({q,i})=>{
        const col=residues[i][4]===1?p.teal:residues[i][4]===2?p.violet:p.blue;
        ball(ctx,q[0],q[1],1.35+scale*.13,col,particleAlpha*.54);
      });
    }
    active.forEach(v=>{const q=screen(v);ball(ctx,q[0],q[1],Math.max(2.3,scale*.63),p.red,alpha*(.35+.55*u));});
    ctx.restore();
  };
})();


/* Source: research-aidd/molecular-design.js */
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


/* Source: research-aidd/validation-glue-rna.js */
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
  function setup(c, width, height, title, subtitle, p) {
    const scale = Math.min(width / 280, height / 160);
    c.save(); c.translate((width - 280 * scale) / 2, (height - 160 * scale) / 2); c.scale(scale, scale);
    c.lineCap = 'round'; c.lineJoin = 'round';
    text(c, title, 140, 17, p, 17, p.ink);
    text(c, subtitle, 140, 35, p, 14);
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
    setup(c,width,height,'分子胶','分子对接　构象重排',p);
    const cycle=((seconds%12)+12)%12;
    // Fade to a fresh free ligand rather than playing docking backwards.
    const t=cycle>11.35?0:cycle;
    const alpha=cycle<10.8?1:cycle<11.35?1-smooth((cycle-10.8)/.55):smooth((cycle-11.35)/.65);
    const state=glueState(t),r=state.rearrange,d=state.docking;
    c.save(); c.beginPath(); c.rect(10,40,260,99); c.clip();
    c.translate(140,90); c.scale(.68,.68); c.translate(-140,-125);
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
    text(c,t<4.9?'分子对接　位姿搜索':t<8.4?'界面构象重排':'复合物稳定性评估',140,156,p,13);
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
    setup(c,width,height,'RNA 修饰稳定性','链完整性　降解风险',p);
    const t=((seconds%12)+12)%12,theta=t/12*TAU;
    const engagement=(1-Math.cos(theta))/2;
    const risk=engagement*engagement;
    c.save();c.beginPath();c.rect(10,40,260,101);c.clip();
    c.translate(140,86);c.scale(.8,.8);c.translate(-140,-126);
    const pts=rnaPoints(theta),prev=rnaPoints(theta-.5);
    drawRna(c,prev,p,.12);drawRna(c,pts,p);
    const enzyme={x:164-15*engagement,y:82+18*engagement};
    nuclease(c,enzyme.x,enzyme.y,p,theta);
    text(c,'核酸酶',211,80,{...p,typeScale:(p.typeScale||1)/.8},12,p.teal);
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
    text(c,'2′-OMe　2′-F　PS',140,137,p,12.5);
    text(c,['模拟核酸酶接触','评估骨架完整性','定位潜在降解位点'][Math.floor(t/4)],140,156,p,13);
    c.restore();
  };
})();


/* Source: research-aidd/validation-enzyme.js */
/* Catalytic protein-cleavage illustration inspired by UniZyme, Figure 1:
 * https://arxiv.org/abs/2502.06914
 * A schematic protease and substrate are used, not the 1LYZ structure or
 * a calculated trajectory. No catalytic rate or measured result is implied.
 */
(function () {
  'use strict';
  const scenes=window.ResearchScenes=window.ResearchScenes||{};
  const TAU=Math.PI*2, FONT='"PingFang SC", "Microsoft YaHei", Arial, sans-serif';
  const clamp=v=>Math.max(0,Math.min(1,v));
  const smooth=v=>{v=clamp(v);return v*v*(3-2*v);};
  const mix=(a,b,q)=>a+(b-a)*q;
  const colors={enzyme:'#afd7cf',patch:'#93cbbf',edge:'#5b9e92',chain:'#098fbb',site:'#d94f4f',cut:'#e5d824'};
  function text(c,s,x,y,p,size=13,col=p.muted){c.fillStyle=col;c.font=`500 ${size*(p.typeScale||1)}px ${FONT}`;c.textAlign='center';c.fillText(s,x,y);}
  function line(c,x,y,X,Y,col,width=1){c.beginPath();c.moveTo(x,y);c.lineTo(X,Y);c.strokeStyle=col;c.lineWidth=width;c.stroke();}
  function dot(c,x,y,r,col){c.fillStyle=col;c.beginPath();c.arc(x,y,r,0,TAU);c.fill();}
  function outline(c){
    c.beginPath();c.moveTo(267,63);c.lineTo(166,63);
    c.bezierCurveTo(150,63,140,71,146,87);c.bezierCurveTo(153,103,177,97,189,111);
    c.bezierCurveTo(199,121,206,123,204,133);c.bezierCurveTo(201,144,193,148,180,152);
    c.bezierCurveTo(160,157,148,152,143,168);c.bezierCurveTo(140,179,143,187,147,193);
    c.lineTo(267,193);c.closePath();
  }
  function enzyme(c,p){
    c.save();outline(c);c.fillStyle=colors.enzyme;c.fill();c.clip();
    c.fillStyle=colors.patch;
    c.beginPath();c.moveTo(145,63);c.bezierCurveTo(161,88,172,82,191,96);c.bezierCurveTo(221,121,240,92,270,108);c.lineTo(270,63);c.closePath();c.fill();
    c.beginPath();c.moveTo(148,196);c.bezierCurveTo(143,167,180,169,191,162);c.bezierCurveTo(216,145,247,147,269,130);c.lineTo(269,196);c.closePath();c.fill();
    c.fillStyle='#c7e4dc';c.beginPath();c.ellipse(245,139,28,13,-.6,0,TAU);c.fill();
    c.restore();outline(c);c.strokeStyle=colors.edge;c.lineWidth=1.1;c.stroke();
    [[206,116],[211,129],[204,142]].forEach(q=>dot(c,q[0],q[1],3.6,colors.site));
    text(c,'酶',239,84,p,14,p.ink);
    text(c,'活性位点',230,176,p,11.5,p.ink);
    line(c,223,160,209,147,colors.site,1);
  }
  // Two continuous portions of one protein chain meet at the cleavage site.
  function portion(c,part){
    c.beginPath();
    if(part===0){
      c.moveTo(-66,14);c.bezierCurveTo(-68,-8,-38,12,-33,-4);
      c.bezierCurveTo(-29,-18,-49,-31,-27,-34);c.bezierCurveTo(-2,-37,-29,10,-7,8);
      c.bezierCurveTo(8,7,27,-18,37,-7);
    }else{
      c.moveTo(37,-7);c.bezierCurveTo(45,3,24,21,9,10);
      c.bezierCurveTo(-12,-4,11,-10,25,-4);c.bezierCurveTo(42,4,37,24,51,27);
    }
    c.strokeStyle=colors.chain;c.lineWidth=4.8;c.lineCap='round';c.lineJoin='round';c.stroke();
  }
  scenes.validationEnzyme=function(c,seconds,width,height,p){
    c.save();c.scale(width/280,height/160);
    text(c,'酶催化能力',140,17,p,17,p.ink);
    text(c,'活性位点　催化裂解',140,35,p,14);
    c.save();c.beginPath();c.rect(9,40,262,101);c.clip();
    c.translate(140,90);c.scale(.72,.72);c.translate(-140,-125);
    const artPalette={...p,typeScale:(p.typeScale||1)/.72};
    enzyme(c,artPalette);
    const cycle=((seconds%12)+12)%12,t=cycle>11.25?0:cycle;
    const alpha=cycle<10.7?1:cycle<11.25?1-smooth((cycle-10.7)/.55):smooth((cycle-11.25)/.75);
    const bind=smooth((t-.75)/3.6),cleave=smooth((t-5.55)/1.15),release=smooth((t-7)/3.2);
    const cx=mix(78,155,bind),cy=mix(98,132,bind),angle=mix(-.15,0,bind);
    const highlight=smooth((t-3.8)/.7),scale=.8;
    c.save();c.globalAlpha=alpha;
    if(highlight>0&&release<.95){
      const cutX=cx+37*scale,cutY=cy-7*scale;
      c.save();c.globalAlpha*=highlight*(1-release);c.setLineDash([2,3]);
      line(c,210,129,cutX,cutY,colors.site,1.2);c.restore();
    }
    [0,1].forEach(part=>{
      const dx=-release*(part?85:65),dy=release*(part?23:-26);
      c.save();c.translate(cx+dx,cy+dy);c.rotate(angle+(part?1:-1)*cleave*.035);c.scale(scale,scale);
      // The brief separation at cleavage precedes bulk product release.
      c.translate(cleave*(part?2.8:-2.8),cleave*(part?1:-1));
      if(highlight>.001){
        c.save();c.globalAlpha*=highlight;dot(c,37,-7,8.3,colors.cut+'70');dot(c,37,-7,5.5,colors.cut);c.restore();
      }
      portion(c,part);
      if(highlight>.001){c.save();c.globalAlpha*=highlight;dot(c,37,-7,3.4,colors.cut);c.restore();}
      c.restore();
    });
    c.restore();
    // The substrate and product names stay clear of the moving chain.
    if(t<3.2)text(c,'蛋白底物',62,76,artPalette,12,colors.chain);
    else if(t>=8.3)text(c,'裂解产物',67,184,artPalette,12,colors.chain);
    c.restore();
    const caption=t<4.3?'底物进入并结合':t<5.55?'活性位点识别':t<7.1?'催化肽链裂解':'裂解产物释放';
    text(c,caption,140,156,p,13,p.ink);
    c.restore();
  };
})();


/* Source: research-aidd/world-model.js */
/* Three aligned, conceptual virtual-validation cases. */
(function () {
  'use strict';
  const scenes = window.ResearchScenes = window.ResearchScenes || {};
  scenes.worldModel = function(c,t,width,height,p) {
    c.save();c.scale(width/840,height/160);
    ['validationGlue','validationRna','validationEnzyme'].forEach((key,i)=>{
      c.save();c.translate(i*280,0);scenes[key](c,t,280,160,p);c.restore();
    });
    c.restore();
  };
})();


/* Source: research-aidd/agent-framework.js */
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


/* Source: research-aidd/agent-scientific-art.js */
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


/* Source: research-aidd/agent-collaboration.js */
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


/* Source: research-aidd/scientific-agent.js */
/* Left: stable, editable framework. Right: multi-agent RSI collaboration. */
(function () {
  'use strict';
  const scenes=window.ResearchScenes=window.ResearchScenes||{};
  scenes.agent=function(c,seconds,width,height,p){
    if(width/height<1.5){
      c.save();c.scale(width/330,height/705);
      scenes.agentCoreCompact(c,seconds,330,105,p);c.translate(0,105);
      scenes.agentCollaboration(c,seconds,330,600,p);c.restore();return;
    }
    c.save();c.scale(width/840,height/190);
    scenes.agentFramework(c,seconds,180,190,p);
    c.translate(180,0);scenes.agentCollaboration(c,seconds,660,190,p);
    c.restore();
  };
})();


/* Source: research-aidd/controller.js */
/* Draw the scientific illustrations at the display's native pixel density. */
(function () {
  'use strict';

  function start() {
    var scenes = window.ResearchScenes;
    if (!scenes) return;
    var canvases = Array.prototype.slice.call(document.querySelectorAll('canvas[data-research-scene]'));
    var states = canvases.filter(function (canvas) {
      if (canvas.dataset.researchCanvasReady === 'true' || !scenes[canvas.dataset.researchScene]) return false;
      canvas.dataset.researchCanvasReady = 'true';
      return true;
    }).map(function (canvas) {
      return {canvas: canvas, context: canvas.getContext('2d'), scene: canvas.dataset.researchScene,
        panel: canvas.closest('[data-research-panel]'), visible: false, width: 0, height: 0, dpr: 1};
    }).filter(function (state) { return state.context; });
    if (!states.length) return;

    var palette = {ink: '#143047', muted: '#405b6d', blue: '#286fa9', teal: '#168178',
      violet: '#6b50a5', red: '#cf585f', line: '#c7d6df', paper: '#ffffff', typeScale: 1.08};
    var reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    var frame = null;
    var previous = null;
    var lastDraw = null;
    var seconds = 0;
    var dprQuery;
    var reducedFrame = 8.2;

    function isActive(state) {
      return !state.panel || (!state.panel.hidden && state.panel.getAttribute('aria-hidden') !== 'true');
    }

    function measure(state) {
      var rect = state.canvas.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return;
      state.width = rect.width;
      state.height = rect.height;
      state.dpr = Math.min(window.devicePixelRatio || 1, 3);
      var width = Math.round(rect.width * state.dpr);
      var height = Math.round(rect.height * state.dpr);
      if (state.canvas.width !== width || state.canvas.height !== height) {
        state.canvas.width = width;
        state.canvas.height = height;
      }
    }

    function draw(state) {
      if (!state.width || !state.height) return;
      var c = state.context;
      // Use the rounded bitmap's exact scale to avoid subpixel raster resampling.
      c.setTransform(state.canvas.width / state.width, 0, 0, state.canvas.height / state.height, 0, 0);
      c.clearRect(0, 0, state.width, state.height);
      c.fillStyle = palette.paper;
      c.fillRect(0, 0, state.width, state.height);
      scenes[state.scene](c, reduced.matches ? reducedFrame : seconds, state.width, state.height, palette);
    }

    function canRun() {
      return !document.hidden && !reduced.matches && states.some(function (state) {
        return state.visible && isActive(state);
      });
    }

    function refresh() {
      states.forEach(function (state) { measure(state); draw(state); });
      schedule();
    }

    function schedule() {
      if (canRun()) {
        if (frame === null) {
          previous = null;
          lastDraw = null;
          frame = requestAnimationFrame(animate);
        }
      } else {
        if (frame !== null) cancelAnimationFrame(frame);
        frame = null;
        previous = null;
      }
    }

    function animate(now) {
      frame = null;
      if (!canRun()) { schedule(); return; }
      if (previous !== null) seconds = (seconds + Math.min(0.1, Math.max(0, now - previous) / 1000)) % 12;
      previous = now;
      if (lastDraw === null || now - lastDraw >= 1000 / 30) {
        states.forEach(function (state) { if (state.visible && isActive(state)) draw(state); });
        lastDraw = now;
      }
      frame = requestAnimationFrame(animate);
    }

    var resize = new ResizeObserver(function (entries) {
      entries.forEach(function (entry) {
        var state = states.find(function (candidate) { return candidate.canvas === entry.target; });
        if (state) { measure(state); draw(state); }
      });
      schedule();
    });
    states.forEach(function (state) { resize.observe(state.canvas); measure(state); draw(state); });

    if ('IntersectionObserver' in window) {
      var intersection = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          var state = states.find(function (candidate) { return candidate.canvas === entry.target; });
          if (state) {
            state.visible = entry.isIntersecting;
            if (state.visible) { measure(state); draw(state); }
          }
        });
        schedule();
      });
      states.forEach(function (state) { intersection.observe(state.canvas); });
    } else {
      states.forEach(function (state) { state.visible = true; });
    }

    var panelObserver = new MutationObserver(function () {
      states.forEach(function (state) { if (state.visible && isActive(state)) draw(state); });
      schedule();
    });
    Array.from(new Set(states.map(function (state) { return state.panel; }).filter(Boolean))).forEach(function (panel) {
      panelObserver.observe(panel, {attributes: true, attributeFilter: ['aria-hidden', 'hidden']});
    });

    function watchDpr() {
      if (dprQuery) {
        if (dprQuery.removeEventListener) dprQuery.removeEventListener('change', densityChanged);
        else dprQuery.removeListener(densityChanged);
      }
      dprQuery = window.matchMedia('(resolution: ' + (window.devicePixelRatio || 1) + 'dppx)');
      if (dprQuery.addEventListener) dprQuery.addEventListener('change', densityChanged);
      else dprQuery.addListener(densityChanged);
    }
    function densityChanged() { watchDpr(); refresh(); }
    if (reduced.addEventListener) reduced.addEventListener('change', refresh);
    else reduced.addListener(refresh);
    window.addEventListener('resize', refresh);
    document.addEventListener('visibilitychange', schedule);
    watchDpr();
    schedule();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
