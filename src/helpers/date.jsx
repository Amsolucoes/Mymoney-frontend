export const formatDate = (dateString) => {
  console.log("formatDate input:", dateString);
  
  if (!dateString) return "";
  
  // Permite edição livre enquanto não há 10 caracteres completos
  if (dateString.length < 10) return dateString;
  
  const parts = dateString.split("/");
  if (parts.length !== 3) return dateString;

  let [day, month, year] = parts;

  // Valida se o ano tem exatamente 4 dígitos
  if (year.length !== 4) return dateString;

  const result = `${year}-${month}-${day}`;
  console.log("formatDate output:", result);
  return result;
};

export const formatDateForDisplay = (isoDate) => {
  console.log("formatDateForDisplay input:", isoDate);
  
  if (!isoDate || isoDate.length < 10) return isoDate; // Permite edição livre
  
  const date = new Date(isoDate);
  if (isNaN(date.getTime())) return isoDate; // Evita erro ao formatar
  
  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const year = date.getUTCFullYear();
  
  const formattedDate = `${day}/${month}/${year}`;
  console.log("formatDateForDisplay output:", formattedDate);
  return formattedDate;
};
