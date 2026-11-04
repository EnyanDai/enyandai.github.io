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
