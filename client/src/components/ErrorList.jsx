import PropTypes from 'prop-types';

/**
 * Componente que muestra errores en inputs
 *
 * @param {object} props - Las propiedades del componente.
 * @param {string[]} props.errors - Lista de errores.
 * @returns {JSX.Element} Componente de lista de errores.
 */
function ErrorList({ errors = [] }) {
  if (!Array.isArray(errors)) {
    return <></>;
  }

  return (
    <ul className="text-sm font-bold text-red-500">
      {errors?.map((error, index) => (
        <li key={index}>{error}</li>
      ))}
    </ul>
  );
}

ErrorList.propTypes = {
  errors: PropTypes.arrayOf(PropTypes.string)
};

export default ErrorList;
