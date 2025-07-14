export function getChoroplethColor(change, isEast = false) {
    if (change == null) return '#ececec';        // 데이터 없음
  
    /* ---------- 상승 구간 ---------- */
    if (change >= 8)             return  '#004000';
    if (change >= 6.5)             return '#002a0e';
    if (change >= 6)             return  '#006400';
    if (change >= 4)             return  '#6cc29a';
    if (change >= 2)             return '#8ad6c0';
    if (change >  0)             return  '#bfe8df';
  
    /* ---------- 하락 구간 ---------- */
    if (change > -1)             return '#fdd49e';               // 약하락
    if (change > -3)             return '#fb6a4a';               // 중하락
    return '#a63603';                                           // 강하락
  }