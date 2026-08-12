import { lazy } from 'react';

const Project = lazy(() => import('./Project'));


const ProjectConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'projects',
      element: <Project />,
    },
  ],
};

export default ProjectConfig;
