// Format number to US dollars
const formatToUsDollars = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export default formatToUsDollars;