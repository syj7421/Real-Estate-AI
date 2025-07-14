export function getChoroplethColor(change) {
    if (change == null) return '#dcdcdc';  // 회색 tone for missing
  
    // 강한 상승 (매우 긍정)
    if (change >= 8) return '#00441b';     // 아주 진한 초록
    if (change >= 6) return '#006d2c';
    if (change >= 4) return '#238b45';
    if (change >= 2) return '#41ae76';
    if (change > 0)  return '#66c2a4';
  
    // 약한 하락 (약한 경고)
    if (change > -1) return '#fdd0a2';
    if (change > -3) return '#f16913';
    
    // 강한 하락 (경고)
    return '#a63603';
  }
  