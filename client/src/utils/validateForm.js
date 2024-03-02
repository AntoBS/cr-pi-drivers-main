const regexLetters = /^[A-Za-zÀ-ÖØ-öø-ÿ]+$/;

export default function validateForm(inputs) {
  const errors = {};

  const validateField = (fieldName, errorMessage) => {
    if (!inputs[fieldName]) {
      errors[fieldName] = errorMessage;
    } else if (fieldName === "dob" && !isValidDate(inputs[fieldName])) {
      errors[fieldName] = "Invalid date format";
    } else if (!regexLetters.test(inputs[fieldName])) {
      errors[fieldName] = errorMessage;
    }
  };

  validateField("name", "A name must be entered and can only contain letters");
  validateField("surname", "A surname must be entered and can only contain letters");
  validateField("nationality", "A nationality must be entered and cannot contain numbers");

  if (inputs.image.length === 0) errors.image = "An image must be entered";
  if (!inputs.dob) errors.dob = "A date must be entered";
  if (!inputs.description) errors.description = "A description must be entered";
  if (inputs.teams.length === 0) errors.teams = "At least one team must be selected";

  return errors;
}
