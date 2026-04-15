import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'

const routes=[

    { path:'/', component:Home },
    
    { path:'/calc/tension', component:()=>import('@/components/calculators/SlingTension.vue') },
    
    { path:'/calc/angle-factor', component:()=>import('@/components/calculators/SlingAngleFactor.vue') },
    
    { path:'/calc/load-weight', component:()=>import('@/components/calculators/LoadWeight.vue') },
    
    { path:'/calc/cog', component:()=>import('@/components/calculators/CenterGravity.vue') },
    
    { path:'/calc/crane-moment', component:()=>import('@/components/calculators/CraneMoment.vue') },
    
    { path:'/calc/shackle-safety', component:()=>import('@/components/calculators/ShackleSafety.vue') },
    
    { path:'/calc/multi-leg', component:()=>import('@/components/calculators/MultiLegSling.vue') },
    
    { path:'/calc/distribution', component:()=>import('@/components/calculators/LoadDistribution.vue') },
    
    { path:'/calc/wind', component:()=>import('@/components/calculators/WindLoad.vue') },
    
    { path:'/calc/safety', component:()=>import('@/components/calculators/SafetyFactor.vue') },
    
    { path:'/calc/hook', component:()=>import('@/components/calculators/HookLoad.vue') },
    
    { path:'/calc/lift', component:()=>import('@/components/calculators/LiftPlanning.vue') },
    {
        path:'/dashboard',
        component:()=>import('../views/Dashboard.vue')
        }
    ]

const router = createRouter({

history:createWebHistory(),
routes

})

export default router