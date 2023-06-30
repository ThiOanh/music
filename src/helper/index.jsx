export const getDuration = (duration) => {
    const minutes = Math.floor(duration / 60); // Số phút
    const seconds = Math.floor(duration % 60); // Số giây
  
    const formattedDuration = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  
    return formattedDuration;
  }