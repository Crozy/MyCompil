const keywords = {
   'variable-declaraction': { r: /(String\s)/, s : 'String'},
   'variable-declaraction': { r: /(int\s)/, s : 'int'},
   'system-object': { r: /(System)/, s: 'System' }
  //  'variable-declaraction': { r: /(var\s)/, s: 'var' },
  //  'console-object': { r: /(console)/, s: 'console' }
};

module.exports = keywords;