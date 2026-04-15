export function calculateSlingAngle(height, slingLength) {
    return Math.asin(height / slingLength) * (180 / Math.PI)
  }
  
  export function calculateSlingTension(load, legs, angle) {
    const rad = angle * Math.PI / 180
    return load / (legs * Math.sin(rad))
  }
  
  export function calculateSWL(breakingStrength, safetyFactor) {
    return breakingStrength / safetyFactor
  }