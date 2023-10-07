import PropTypes from 'prop-types';

function ErrorList({errors}) {
  return (
    <ul className="text-sm font-bold text-red-500">
      {errors?.map((error, index) => (
        <li key={index}>{error}</li>
      ))}
    </ul>
  );
}

ErrorList.propTypes = {
  errors: PropTypes.array
};

export default ErrorList;
