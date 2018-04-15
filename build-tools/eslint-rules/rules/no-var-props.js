/**
 * no-var-props
 * React this.props should not be assigned back to variables,
 * they should be used directly from this.props
 * @valid:
 * render() {
 *  return {
 *    <div>{this.props.name}</div>
 *  }
 * }
 * @invalid:
 * render() {
 *  const name = this.props.name;
 *  return {
 *    <div>{name}</div>
 *  }
 * }
 * @param context
 */
module.exports = (context) => ({
  VariableDeclaration: (node) => {
    node.declarations.forEach((dec) => {
      if (dec.type === 'VariableDeclarator' && dec.init && dec.init.type === 'MemberExpression') {
        if (dec.init.property.type === 'Identifier' && dec.init.property.name === 'props') {
          context.report(node, '[this.props] properties should not be assigned to variable');
        }
      }
    });
  },
});
