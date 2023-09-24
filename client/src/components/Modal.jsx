// eslint-disable-next-line react/prop-types
export default function Modal({ title, close, setClose, children }) {
  return (
    <div
      className={`fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50 w-screen p-4 overflow-x-hidden overflow-y-auto md:inset-0 ${
        close ? 'hidden' : ''
      }`}
    >
      <div className="relative w-screen max-w-2xl max-h-full">
        <div className="relative rounded-lg shadow bg-dark max-w-screen-lg">
          <div className="flex items-start justify-between p-4 rounded-t dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-300">
              {title}
            </h3>
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
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <div className="p-6 space-y-6">{children}</div>
          <div className="justify-end flex items-center p-6 space-x-2 border-gray-200 rounded-b dark:border-gray-600">
            <button
              data-modal-hide="defaultModal"
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              I accept
            </button>
            <button
              data-modal-hide="defaultModal"
              type="button"
              className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
              onClick={() => setClose(true)}
            >
              Decline
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
