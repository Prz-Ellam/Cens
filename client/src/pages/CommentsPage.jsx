import { useNavigate, useParams } from 'react-router-dom';
import Comment from '@/components/Comment';
import PollCard from '@/components/PollCard';
import { useCallback, useEffect, useRef, useState } from 'react';
import axios from '@/services/api';
import Swal from 'sweetalert2';
import { useAuth } from '@/hooks/useAuth';
import { ToastTopEnd } from '@/utils/toast';
import ErrorList from '@/components/ErrorList';
import getErrors from '@/utils/error-format';
import Pagination from '@/components/Pagination';
import createCommentValidator from '@/validators/create-comment';

/**
 * Pagina con los comentarios de una encuesta.
 *
 * @returns {JSX.Element} Componente de la página de comentarios.
 */
function CommentsPage() {
  const { user } = useAuth();

  const { pollId } = useParams();

  const navigate = useNavigate();

  const [poll, setPoll] = useState(null);
  const textArea = useRef();

  const [formData, setFormData] = useState({
    text: ''
  });
  const [formErrors, setFormErrors] = useState({});

  const [comments, setComments] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);

  const limit = 5;

  /**
   * Recupera la encuesta de la pagina
   */
  const fetchPoll = useCallback(async () => {
    try {
      const response = await axios.get(`/polls/${pollId}`);
      setPoll(response.data);
    } catch (error) {
      console.error('Error fetching survey');
      navigate('/');
    }
  }, [navigate, pollId]);

  /**
   * Recupera todos los comentarios de una encuesta
   * @param {number} page - Pagina de la que se desea extraer los comentarios
   */
  const fetchComments = useCallback(
    async (page) => {
      try {
        const response = await axios.get(
          `/polls/${pollId}/comments?page=${page}&limit=${limit}`
        );
        setComments(response.data.comments);
        setTotalPages(response.data.totalPages);
        setPage(page);
      } catch (error) {
        const errorText = axios.isAxiosError(error)
          ? error.response.data.message
          : 'Error inesperado';
        Swal.fire({
          title: 'Error',
          icon: 'error',
          text: errorText
        });
      }
    },
    [pollId]
  );

  /**
   * Crear un comentario
   */
  const handleSubmit = async (event) => {
    event.preventDefault();

    const result = createCommentValidator.safeParse(formData);
    if (!result.success) {
      const errors = getErrors(result.error);
      setFormErrors(errors);

      ToastTopEnd.fire({
        title: 'Formulario no válido',
        icon: 'error'
      });

      return;
    }

    try {
      const response = await axios.post(`/polls/${pollId}/comments`, formData);

      Swal.fire({
        title: 'Correcto',
        icon: 'success',
        text: response.data.message
      });

      const updatedFormData = {
        ...formData,
        text: ''
      };
      setFormData(updatedFormData);
      textArea.current.value = '';

      await fetchComments(1);
      await fetchPoll();
    } catch (error) {
      const errorText = axios.isAxiosError(error)
        ? error.response.data.message
        : 'Error inesperado';
      Swal.fire({
        title: 'Error',
        icon: 'error',
        text: errorText
      });
    }
  };

  const handleChange = async (event) => {
    const { name, value } = event.target;

    const updatedFormData = {
      ...formData,
      [name]: value
    };
    setFormData(updatedFormData);

    const result = createCommentValidator.safeParse(updatedFormData);
    if (!result.success) {
      const errors = getErrors(result.error);
      setFormErrors({
        ...formErrors,
        [name]: errors[name]
      });
      return;
    }

    const updatedFormErrors = formErrors;
    delete updatedFormErrors[name];
    setFormErrors(updatedFormErrors);
  };

  useEffect(() => {
    fetchPoll();
  }, [fetchPoll]);

  useEffect(() => {
    fetchComments(page);
  }, [fetchComments, page]);

  return (
    <div className="h-full mt-5">
      <div className="w-9/12 flex flex-col gap-4 mx-auto">
        {poll && <PollCard poll={poll} onUpdate={() => fetchPoll()} />}

        <div className="bg-accent mb-4 p-3 rounded-lg">
          <form
            className="mb-6 py-2 px-4 rounded-lg rounded-t-lg"
            noValidate
            onSubmit={handleSubmit}
          >
            <label
              htmlFor="comment"
              className="block text-gray-300 text-sm font-bold mb-2 cursor-pointer"
            >
              Escribe un comentario
            </label>
            <textarea
              id="comment"
              rows="6"
              name="text"
              onChange={handleChange}
              className="bg-dark shadow appearance-none rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Escribe un comentario..."
              defaultValue={formData.text}
              ref={textArea}
            ></textarea>
            {formErrors.text && <ErrorList errors={formErrors.text} />}
            <button
              type="submit"
              className="mt-3 text-gray-300 bg-purple-800 hover:bg-purple-900 focus:outline-none font-bold rounded-lg py-2 px-4 shadow-none cursor-pointer transition duration-150 ease-out hover:ease-in"
            >
              Comentar
            </button>
          </form>

          <section className="mb-4">
            {comments &&
              comments.map((comment) => (
                <Comment
                  key={comment.id}
                  comment={comment}
                  userId={comment.user.id}
                  username={comment.user.username}
                  avatar={`/api/v1/users/${comment.user.id}/avatar`}
                  isAuthUser={comment.user.id === user.id}
                  onChange={() => {
                    fetchComments(page);
                    fetchPoll();
                  }}
                />
              ))}
          </section>

          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={(page) => fetchComments(page)}
          />
        </div>
      </div>
    </div>
  );
}

export default CommentsPage;
