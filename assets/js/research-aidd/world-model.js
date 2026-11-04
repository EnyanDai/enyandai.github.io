/* Three aligned, conceptual virtual-validation cases. */
(function () {
  'use strict';
  const scenes = window.ResearchScenes = window.ResearchScenes || {};
  scenes.worldModel = function(c,t,width,height,p) {
    c.save();c.scale(width/840,height/140);
    ['validationGlue','validationRna','validationEnzyme'].forEach((key,i)=>{
      c.save();c.translate(i*280,0);scenes[key](c,t,280,140,p);c.restore();
    });
    c.restore();
  };
})();
