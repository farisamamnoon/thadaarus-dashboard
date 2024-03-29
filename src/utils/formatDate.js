export const formatDate = (inputDate) => {
  const date = new Date(inputDate);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
};

export const formatStringToDate = (dateString) => {
  const date = dateString.slice(0, dateString.indexOf("T"));
  return date;
}

export const htmlDate = () => {
  const today = new Date();
  const formattedDate = today.toISOString().split("T")[0]; // Format: YYYY-MM-DD
  return formattedDate;
};
