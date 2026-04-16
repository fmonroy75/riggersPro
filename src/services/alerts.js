export function checkUtilization(load, wll){

    const utilization = load / wll
    
    if(utilization > 0.9){
    return {level:"critical", message:"Equipment overload"}
    }
    
    if(utilization > 0.7){
    return {level:"warning", message:"High equipment utilization"}
    }
    
    return null
    
    }