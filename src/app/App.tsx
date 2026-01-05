import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { StoresProvider } from './providers/StoresProvider';

export function App() {
  return (
    <StoresProvider>
      <RouterProvider router={router} />
    </StoresProvider>
  );
}
