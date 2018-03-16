const keywords = {
  'string-default_type': { r: /(String)/, s: 'String' },
  'int-default_type': { r: /(int)/, s: 'int' },
  'log_and-default_operator': { r: /(&&)/, s: '&&' },
  'if-control_flow': { r: /(if)/, s: 'if' }
};

module.exports = keywords;
