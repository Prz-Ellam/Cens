import PropTypes from 'prop-types';

/**
 * Componente que muestra errores en inputs de formularios.
 *
 * @param {object} props - Las propiedades del componente.
 * @param {string[]} props.errors - Lista de errores.
 * @returns {JSX.Element} Componente de lista de errores.
 */
function ErrorList({ errors = [] }) {
  if (!Array.isArray(errors) || !errors.every((error) => typeof error === 'string')) {
    console.error('La propiedad "errors" debe ser un array de strings.');
    return <></>;
  }

  return (
    <ul className="font-bold text-sm text-red-500">
      {errors.map((error, index) => (
        <li key={index}>{error}</li>
      ))}
    </ul>
  );
}

ErrorList.propTypes = {
  errors: PropTypes.arrayOf(PropTypes.string)
};

export default ErrorList;
