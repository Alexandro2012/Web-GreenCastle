// Server status checking functionality
export const initServerStatus = () => {
  const checkStatus = async () => {
    const elements = {
      indicator: document.querySelector('.status-indicator'),
      text: document.querySelector('.status-text'),
      count: document.querySelector('.player-count')
    };

    if (!elements.indicator || !elements.text || !elements.count) {
      console.warn('Status elements not found');
      return;
    }

    try {
      const response = await fetch('https://mcapi.us/server/status?ip=greencastle.es&port=25552');
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      
      const data = await response.json();
      
      if (data.online) {
        elements.indicator.classList.remove('offline');
        elements.indicator.classList.add('online');
        elements.text.textContent = 'Servidor Online';
        elements.count.textContent = `${data.players?.now || 0}/${data.players?.max || 0} jugadores`;
      } else {
        throw new Error('Server offline');
      }
    } catch (error) {
      console.error('Server status check failed:', error);
      elements.indicator.classList.remove('online');
      elements.indicator.classList.add('offline');
      elements.text.textContent = 'Servidor Offline';
      elements.count.textContent = '0/0 jugadores';
    }
  };

  // Initial check
  checkStatus();
  
  // Check every 30 seconds
  const interval = setInterval(checkStatus, 30000);

  // Cleanup function
  return () => clearInterval(interval);
};