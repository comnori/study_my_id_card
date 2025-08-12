// 랜덤 이모지 생성 함수
export const getRandomEmoji = () => {
  const emojis = ['🎯', '🚀', '💡', '🌟', '🎨', '📚', '🎪', '🌈', '🦄', '🍀'];
  return emojis[Math.floor(Math.random() * emojis.length)];
};

// 우선순위별 색상
export const getPriorityColor = (id) => {
  const colors = ['magenta', 'purple', 'blue', 'cyan', 'green', 'lime', 'gold', 'orange'];
  return colors[id % colors.length];
};