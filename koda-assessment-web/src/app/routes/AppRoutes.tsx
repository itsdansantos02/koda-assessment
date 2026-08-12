import { lazy, Suspense } from 'react';
import {
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';


// Automatically find every *Config.tsx
const configModules = import.meta.glob(
  '../main/**/*Config.tsx',
  {
    eager: true,
  }
);


// Get the config objects
const configs = Object.values(configModules)
  .map((module: any) => module.default)
  .filter(Boolean);


// Convert all configs into routes
const routes = configs.flatMap(
  (config: any) => config.routes || []
);


export default function AppRoutes() {

  return (
    <Suspense
      fallback={
        <div>
          Loading...
        </div>
      }
    >

      <Routes>

        {/* Default route */}

        <Route
          path="/"
          element={
            <Navigate
              to="/home"
              replace
            />
          }
        />


        {/* Automatically generated routes */}

        {routes.map(
          (route: any) => (
            <Route
              key={route.path}
              path={`/${route.path}`}
              element={route.element}
            />
          )
        )}

      </Routes>

    </Suspense>
  );
}