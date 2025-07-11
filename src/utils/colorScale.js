export function getChoroplethColor(change) {
    if (change == null) return '#ccc';
    if (change > 20)  return '#006400';
    if (change > 10)  return '#228B22';
    if (change >  0)  return '#7CFC00';
    if (change > -10) return '#FFA07A';
    if (change > -20) return '#FA8072';
                      return '#8B0000';
  }