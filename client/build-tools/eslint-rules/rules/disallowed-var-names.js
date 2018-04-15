const chalk = require('chalk');

function getPreferredName(name, pool) {

  const temp = pool.filter((params) => {
    return name === params[0];
  });

  if (!temp.length) {
    return false;
  }

  return temp[0][1];
}

function formatError(nodeName, type, preferredName) {
  return `${nodeName} is not allowed ${type} name, preferred ${chalk.yellow(`'${preferredName}'`)}`
}

/**
 * Not allowed variable names
 * @config_example
 * "custom-eslint-rules/disallowed-var-names": [2, {
   *   "properties": [],
   *   "methods": [],
   *   "imports": [["classnames", "cx"]], -> classnames is disallowed name, when CX is preferred name
   *   "variables": [["classnames", "cx"]], -> classnames is disallowed name, when CX is preferred name
   * }]
 */
module.exports = (context) => ({
  Identifier: (node) => {

    // retrieve options
    const { methods = [], properties = [], imports = [], variables = [] } = context.options[0];

    // skip when no node.name
    if (!node.name) {
      return;
    }

    // Methods
    if (node.parent.type === 'MemberExpression') {
      const preferredName = getPreferredName(node.name, methods);
      if (methods.length && preferredName) {
        context.report(node, formatError(node.name, 'method', preferredName));
      }
      // Properties
    } else if (node.parent.type === 'Property') {
      const preferredName = getPreferredName(node.name, properties);
      if (properties.length && preferredName) {
        context.report(node, formatError(node.name, 'property', preferredName));
      }
      // Imports
    } else if (['ImportSpecifier', 'ImportNamespaceSpecifier', 'ImportDefaultSpecifier'].indexOf(node.parent.type) >= 0) {
      const preferredName = getPreferredName(node.name, imports);
      if (imports.length && preferredName) {
        context.report(node, formatError(node.name, 'import', preferredName));
      }
      // Variables && anything else?
    } else if (variables.length) {
      const preferredName = getPreferredName(node.name, variables);
      if (variables.length && preferredName) {
        context.report(node, formatError(node.name, 'variable', preferredName));
      }
    }
  },
});
