export const formatDate = (date) => {
    const dateObject = new Date(date);
    const options = {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    };
    return dateObject.toLocaleString('es-MX', options).replace(',', ' ');
}