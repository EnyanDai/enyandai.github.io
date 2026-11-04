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
    c.save();c.scale(width/840,height/270);
    scenes.agentFramework(c,seconds,180,270,p);
    c.translate(180,0);scenes.agentCollaboration(c,seconds,660,270,p);
    c.restore();
  };
})();
