import PropTypes from 'prop-types';
import classNames from 'classnames';

/**
 * Componente para crear modales.
 * 
 * @param {object} props
 * @returns {JSX.Element} Componente de modal.
 */
function Modal({ title, close, setClose, bodySlot }) {
  return (
    <div
      className={classNames('fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50 w-screen p-4 overflow-x-hidden overflow-y-auto md:inset-0', {
        'hidden': close
      })}
    >
      <div
        className="modal-overlay absolute inset-0 bg-black opacity-50"
        onClick={() => setClose(true)}
      ></div>
      <div className="relative w-screen max-w-2xl max-h-full">
        <div className="relative rounded-lg shadow bg-dark max-w-screen-lg modal-overlay">
          <div className="flex items-center justify-between p-4 rounded-t dark:border-gray-600">
            <h2 className="text-2xl font-semibold text-gray-300">{title}</h2>
            <button
              type="button"
              className="text-gray-400 bg-transparent rounded-full hover:bg-gray-200 hover:text-gray-900 text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="defaultModal"
              onClick={() => setClose(true)}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
            </button>
          </div>

          <div className="p-6 space-y-6">{bodySlot}</div>
        </div>
      </div>
    </div>
  );
}

Modal.propTypes = {
  title: PropTypes.string.isRequired,
  close: PropTypes.bool.isRequired,
  setClose: PropTypes.func.isRequired,
  bodySlot: PropTypes.any.isRequired
};

export default Modal;
