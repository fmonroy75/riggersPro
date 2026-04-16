export function analyzeLift(type, data) {
  const alerts = []

  const n = (value) => Number(value ?? 0)

  switch (type) {
    case "tension": {
      const angle = n(data.angle)
      const tension = n(data.tension)
      const wll = n(data.wll)

      if (angle > 0 && angle < 30) {
        alerts.push({
          level: "danger",
          message: "Sling angle below 30°. Extreme tension risk."
        })
      }

      if (wll > 0 && tension > wll) {
        alerts.push({
          level: "danger",
          message: "Sling tension exceeds WLL."
        })
      } else if (wll > 0 && tension > wll * 0.8) {
        alerts.push({
          level: "warning",
          message: "Tension above 80% of WLL."
        })
      }
      break
    }

    case "hook": {
      const total = n(data.total)
      const hookWLL = n(data.hookWLL)
      if (hookWLL > 0 && total > hookWLL) {
        alerts.push({
          level: "danger",
          message: "Hook overloaded."
        })
      } else if (hookWLL > 0 && total > hookWLL * 0.9) {
        alerts.push({
          level: "warning",
          message: "Hook load above 90% capacity."
        })
      }
      break
    }

    case "wind": {
      const wind = n(data.wind)
      if (wind > 20) {
        alerts.push({
          level: "danger",
          message: "Wind speed unsafe for lift."
        })
      } else if (wind > 15) {
        alerts.push({
          level: "warning",
          message: "Wind speed high for lifting operations."
        })
      }
      break
    }

    case "safety-factor":
    case "shackle-safety": {
      const sf = n(data.sf)
      if (sf > 0 && sf < 3) {
        alerts.push({
          level: "danger",
          message: "Safety factor below 3. Lift should be stopped."
        })
      } else if (sf > 0 && sf < 5) {
        alerts.push({
          level: "warning",
          message: "Safety factor is low. Review rigging setup."
        })
      }
      break
    }

    case "multi-leg": {
      const angle = n(data.angle)
      const legs = n(data.legs)
      if (legs > 0 && legs < 2) {
        alerts.push({
          level: "danger",
          message: "At least 2 sling legs are required."
        })
      }
      if (angle > 0 && angle < 45) {
        alerts.push({
          level: "warning",
          message: "Low sling angle increases leg tension."
        })
      }
      break
    }

    case "lift-planning": {
      const margin = n(data.margin)
      if (margin < 10) {
        alerts.push({
          level: "danger",
          message: "Safety margin is too low for planning."
        })
      } else if (margin < 20) {
        alerts.push({
          level: "warning",
          message: "Consider a larger safety margin."
        })
      }
      break
    }
  }

  return alerts
}