import { createRouter, createWebHistory } from "vue-router"
import store from "../store/index"

import Home from "../views/Home.vue"
import Dashboard from "../views/Dashboard.vue"
import Login from "../views/Login.vue"
import Register from "../views/Register.vue"

const routes = [
    {
        path: "/login",
        name: "login",
        component: Login
    },
    {
        path: "/register",
        name: "register",
        component: Register
    },
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
        component: Dashboard,
        meta: { requiresAuth: true }
    },
    // ---- STANDARD CALCULATORS ----
    {
        path: "/calc/tension",
        name: "sling-tension",
        component: () => import("@/components/calculators/SlingTension.vue")
    },
    {
        path: "/calc/multi-leg",
        name: "multi-leg",
        component: () => import("@/components/calculators/MultiLegSling.vue")
    },
    {
        path: "/calc/hook",
        name: "hook-load",
        component: () => import("@/components/calculators/HookLoad.vue")
    },
    {
        path: "/calc/cog",
        name: "center-gravity",
        component: () => import("@/components/calculators/CenterGravity.vue")
    },
    {
        path: "/calc/distribution",
        name: "load-distribution",
        component: () => import("@/components/calculators/LoadDistribution.vue")
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
        path: "/calc/safety",
        name: "safety-factor",
        component: () => import("@/components/calculators/SafetyFactor.vue")
    },
    {
        path: "/calc/lift",
        name: "lift-planning",
        component: () => import("@/components/calculators/LiftPlanning.vue")
    },
    {
        path: "/calc/capacity",
        name: "sling-capacity",
        component: () => import("@/components/calculators/SlingCapacity.vue")
    },
    {
        path: "/calc/length",
        name: "sling-length",
        component: () => import("@/components/calculators/SlingLength.vue")
    },
    // ---- PRO CALCULATORS ----
    {
        path: "/calc/tension-factor",
        name: "tension-factor",
        component: () => import("@/components/calculators/TensionFactor.vue"),
        meta: { requiresPro: true }
    },
    {
        path: "/calc/lift-angle",
        name: "lift-angle",
        component: () => import("@/components/calculators/LiftAngle.vue"),
        meta: { requiresPro: true }
    },
    {
        path: "/calc/chain-capacity",
        name: "chain-capacity",
        component: () => import("@/components/calculators/ChainCapacity.vue"),
        meta: { requiresPro: true }
    },
    {
        path: "/calc/choker-capacity",
        name: "choker-capacity",
        component: () => import("@/components/calculators/ChokerCapacity.vue"),
        meta: { requiresPro: true }
    },
    {
        path: "/calc/tailing",
        name: "tailing-tension",
        component: () => import("@/components/calculators/TailingTension.vue"),
        meta: { requiresPro: true }
    },
    {
        path: "/calc/wind",
        name: "wind-load",
        component: () => import("@/components/calculators/WindLimit.vue"),
        meta: { requiresPro: true }
    },
    {
        path: "/calc/planner",
        name: "rigging-planner",
        component: () => import("@/components/calculators/RiggingPlanner.vue"),
        meta: { requiresPro: true }
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

// Authentication & PRO Guard
router.beforeEach((to, from) => {
    const user = store.state.user
    const isPro = store.state.userProfile?.role === 'pro'
    
    // Si la ruta requiere autenticación básica (ej: Dashboard)
    if (to.meta.requiresAuth && !user) {
        return '/login'
    }

    // Si la ruta requiere suscripción PRO
    if (to.meta.requiresPro) {
        if (!user) {
            return '/login'
        } else if (!isPro) {
            alert('Esta herramienta es exclusiva para usuarios PRO. Pronto habilitaremos la suscripción.')
            return '/'
        }
    }
    
    return true
})

export default router