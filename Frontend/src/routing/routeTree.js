import { createRootRoute } from "@tanstack/react-router";
import RootLayout from "../RootLayout"
import { homePageRoute } from "./homepage";
import { dashboardRoute } from "./dashboard";
import {authRoute} from "./auth_routes"

export const rootRoute = createRootRoute({
    component: RootLayout,    
})

export const routeTree = rootRoute.addChildren([homePageRoute, authRoute, dashboardRoute])
