import { lazy } from 'react';

const Project = lazy(() => import('./Project'));
const ProjectDetail = lazy(() => import('./detail/ProjectDetail'));
const ProjectForm = lazy(() => import('./form/ProjectForm'));


const ProjectConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'projects',
      element: <Project />,
    },
    {
      path: 'projects/:id',
      element: <ProjectDetail />,
    },
    {
      path: 'projects/:id/edit',
      element: <ProjectForm />,
    },
    {
      path: 'projects/create',
      element: <ProjectForm />,
    },
  ],
};

export default ProjectConfig;
