module.exports = {
  format_date: (date) => {
    return date.toLocaleDateString(); // Format date as MM/DD/YYYY
  },
  format_comment: (string, amount) => { // Format comment as "comments" if there's more than a single comment
    if (amount > 1) {
      return `${string}s`;
    }
    return string;
  },
};
