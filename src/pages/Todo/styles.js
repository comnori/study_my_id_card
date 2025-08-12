// 귀여운 스타일 정의
export const cuteStyles = {
  container: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    minHeight: '100vh',
    padding: '20px',
    borderRadius: '20px'
  },
  card: {
    borderRadius: '20px',
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
    border: 'none',
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)'
  },
  headerCard: {
    background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    borderRadius: '20px',
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
    border: 'none',
    color: 'white'
  },
  addCard: {
    background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    borderRadius: '20px',
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
    border: 'none'
  },
  listItem: {
    borderRadius: '15px',
    marginBottom: '10px',
    padding: '15px',
    background: 'linear-gradient(135deg, #fff 0%, #f8f9fa 100%)',
    transition: 'all 0.3s ease',
    border: '2px solid transparent'
  },
  listItemHover: {
    transform: 'translateY(-2px)',
    boxShadow: '0 5px 20px rgba(0, 0, 0, 0.1)',
    border: '2px solid #f093fb'
  },
  checkbox: {
    transform: 'scale(1.3)',
    marginRight: '10px'
  },
  completedText: {
    textDecoration: 'line-through',
    color: '#b8b8b8',
    opacity: 0.7
  },
  emoji: {
    fontSize: '1.5em',
    marginRight: '8px'
  },
  tag: {
    borderRadius: '10px',
    padding: '2px 10px',
    fontSize: '12px'
  }
};