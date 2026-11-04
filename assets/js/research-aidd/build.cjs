const fs = require('fs');
const path = require('path');
const files = ['enzyme-structure.js', 'molecular-design.js', 'validation-glue-rna.js',
  'validation-enzyme.js', 'world-model.js', 'agent-framework.js', 'agent-scientific-art.js',
  'agent-collaboration.js', 'scientific-agent.js', 'controller.js'];
const code = files.map(name => `/* Source: research-aidd/${name} */\n` + fs.readFileSync(path.join(__dirname, name), 'utf8')).join('\n\n');
fs.writeFileSync(path.join(__dirname, '..', 'research-aidd.js'), code);
console.log('Built research-aidd.js');
