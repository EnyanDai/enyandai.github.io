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
  function enzyme(c){
    c.save();outline(c);c.fillStyle=colors.enzyme;c.fill();c.clip();
    c.fillStyle=colors.patch;
    c.beginPath();c.moveTo(145,63);c.bezierCurveTo(161,88,172,82,191,96);c.bezierCurveTo(221,121,240,92,270,108);c.lineTo(270,63);c.closePath();c.fill();
    c.beginPath();c.moveTo(148,196);c.bezierCurveTo(143,167,180,169,191,162);c.bezierCurveTo(216,145,247,147,269,130);c.lineTo(269,196);c.closePath();c.fill();
    c.fillStyle='#c7e4dc';c.beginPath();c.ellipse(245,139,28,13,-.6,0,TAU);c.fill();
    c.restore();outline(c);c.strokeStyle=colors.edge;c.lineWidth=1.1;c.stroke();
    [[206,116],[211,129],[204,142]].forEach(q=>dot(c,q[0],q[1],3.6,colors.site));
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
    c.save();c.scale(width/280,height/140);
    text(c,'酶催化能力',140,17,p,17,p.ink);
    c.save();c.beginPath();c.rect(9,25,262,101);c.clip();
    c.translate(140,75);c.scale(.72,.72);c.translate(-140,-125);
    enzyme(c);
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
    c.restore();
    const caption=t<4.3?'底物结合':t<5.55?'位点识别':t<7.1?'催化裂解':'产物释放';
    text(c,caption,140,137,p,13,p.ink);
    c.restore();
  };
})();
