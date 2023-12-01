export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
  return date.toLocaleDateString('en-GB', options);
}

export const convert = (data) => {
  let DATA = data.match(/.{1,2}/g);
  let string = DATA.map(pair => String.fromCharCode(parseInt(pair, 16))).join('');
  return string;
}


export const formatTime = (dateString) => {
  const date = new Date(dateString);
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
}

export const initialCategories = {
  signal_app_id: 'd3143295-232c-4bf8-a0e0-2b8621d276e9',
  app_id: 'com.stellarplanner',
  dev_key: 'ek9GnoMKATBs366nphQqCf'
}

export const transformToNotification = (inputString) => {
  const [datePart, timePart] = inputString.split('-');
  const formattedDate = datePart.split('/').reverse().join('-');
  const finalDateTime = `${formattedDate}T${timePart}:00.000Z`;
  return finalDateTime;
}
