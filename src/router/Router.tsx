import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react";
import { Layout, LoadingScreen } from "@/components";

const Home = lazy(() => import("@/pages/Home/Home"));
const NotFound = lazy(() => import("@/pages/NotFound/NotFound"));

export default function Routes() {
  const routesExceptions = [
    {
      path: "*",
      element: <NotFound className="h-screen" />,
    },
  ];

  const routes = [
    {
      path: "/",
      element: <Home />,
    },
  ];

  const router = createBrowserRouter([
    ...routesExceptions,
    ...routes.map((route) => ({
      ...route,
      element: (
        <Layout>
          <Suspense fallback={<LoadingScreen />}>{route.element}</Suspense>
        </Layout>
      ),
    })),
  ]);

  return <RouterProvider router={router} />;
}
