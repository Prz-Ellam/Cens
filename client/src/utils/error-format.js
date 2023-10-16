const getErrors = (zodError) => {
  const errors = {};

  zodError.issues.forEach((validationError) => {
    const path = validationError.path.join('.');
    const message = validationError.message;

    if (!errors[path]) {
      errors[path] = [];
    }
    errors[path].push(message);
  });
  return errors;
};

export default getErrors;
