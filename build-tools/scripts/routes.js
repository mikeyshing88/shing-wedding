import flattenDeep from 'lodash/flattenDeep';
import uniq from 'lodash/uniq';

import routesConfig from '../src/routes';

function normalizeFolderPath(path) {
  return path.replace('/', '').concat('/');
}

export function getStaticPathsFromRoutes(routes, parentPath = '') {
  const staticRoutes = [];

  routes.forEach(({ props }) => {
    const { path } = props;

    let { children } = props;

    // Do not build routes that are for dev environment only
    if (props.dev) {
      return;
    }

    // Simple route
    // Only add if length > 0 - also add root
    if (path && path.length > 0) {
      // Replace dynamic and static ref params
      const normalizedPath = path.replace(/(\(?\/:\w.+[)/]?)/g, '');
      const finalPath = parentPath + normalizedPath;

      staticRoutes.push(finalPath);
    }

    // Parent route with children
    if (children && path) {
      const routeParentPath = (path.length > 1) ? normalizeFolderPath(path) : null;
      const finalParentPath = (parentPath) ? `${parentPath}${routeParentPath}` : routeParentPath;

      if (!Array.isArray(children)) {
        children = [children];
      }

      staticRoutes.push(getStaticPathsFromRoutes(children, finalParentPath));
    }
  });

  // Return a flattened, unique items array
  return uniq(
    flattenDeep(staticRoutes)
  );
}

export function getAllRoutes() {
  const transitionRoutes = routesConfig().props.children;
  const routes = (transitionRoutes) ? transitionRoutes.props.children : null;

  if (!routes) {
    return;
  }

  return getStaticPathsFromRoutes(routes);
}
