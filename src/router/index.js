import { createRouter, createWebHistory } from "vue-router"

import Home from "../views/Home.vue"
import Dashboard from "../views/Dashboard.vue"

const routes = [
    {
        path: "/install",
        name: "install",
        component: () => import("../views/InstallApp.vue")
        },
{
path: "/",
name: "home",
component: Home
},

{
path: "/dashboard",
name: "dashboard",
component: Dashboard
},

{
path: "/calc/tension",
name: "sling-tension",
component: () => import("@/components/calculators/SlingTension.vue")
},

{
path: "/calc/angle-factor",
name: "angle-factor",
component: () => import("@/components/calculators/SlingAngleFactor.vue")
},

{
path: "/calc/load-weight",
name: "load-weight",
component: () => import("@/components/calculators/LoadWeight.vue")
},

{
path: "/calc/cog",
name: "center-gravity",
component: () => import("@/components/calculators/CenterGravity.vue")
},

{
path: "/calc/crane-moment",
name: "crane-moment",
component: () => import("@/components/calculators/CraneMoment.vue")
},

{
path: "/calc/shackle-safety",
name: "shackle-safety",
component: () => import("@/components/calculators/ShackleSafety.vue")
},

{
path: "/calc/multi-leg",
name: "multi-leg",
component: () => import("@/components/calculators/MultiLegSling.vue")
},

{
path: "/calc/distribution",
name: "load-distribution",
component: () => import("@/components/calculators/LoadDistribution.vue")
},

{
path: "/calc/wind",
name: "wind-load",
component: () => import("@/components/calculators/WindLoad.vue")
},

{
path: "/calc/safety",
name: "safety-factor",
component: () => import("@/components/calculators/SafetyFactor.vue")
},

{
path: "/calc/hook",
name: "hook-load",
component: () => import("@/components/calculators/HookLoad.vue")
},

{
path: "/calc/lift",
name: "lift-planning",
component: () => import("@/components/calculators/LiftPlanning.vue")
}

]

const router = createRouter({
history: createWebHistory(import.meta.env.BASE_URL),
routes
})

export default router