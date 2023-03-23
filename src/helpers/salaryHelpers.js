const changeSalary = (salary) => {
  return salary.toLocaleString('en-US').replaceAll(',', '.');
};

export const salaryHelpers = {
  changeSalary,
};
