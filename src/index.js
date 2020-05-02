const wrapIn = "Object.freeze"
module.exports = function freezeConst({ types: t }) {
    const { callExpression, memberExpression, identifier} = t;
    const wrapExpressionArgs = wrapIn.split('.').map((id) => identifier(id))
    const objFreeze = memberExpression(...wrapExpressionArgs);

    const doFreeze = (path) => {
      if (path.node.hasBeenReplaced) return;
      path.node.hasBeenReplaced = true;
      const newPath = callExpression(objFreeze, [path.node])
      path.replaceWith(
        newPath
      )
    }

    const freezeVisitor = {
      ObjectExpression: doFreeze
    }

    return {
      visitor: {
        ObjectExpression(path) {
          const isConst = path.parentPath.parent.kind === 'const'
          if (!isConst) return;
          doFreeze(path)
          path.traverse(freezeVisitor)
        }
      }
    };
  };