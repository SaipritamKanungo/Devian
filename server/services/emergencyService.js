const emergencyNumbers = require("./emergencyData");

const getEmergency = (countryCode) => {
  const code = countryCode.toUpperCase();
  if (emergencyNumbers[code]) {
    return emergencyNumbers[code];
  }
  return { error: "Country not found", available: Object.keys(emergencyNumbers) };
};

module.exports = { getEmergency };