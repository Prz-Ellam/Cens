import PasswordEdition from '@/components/PasswordEdition';
import ProfileEditInfo from '@/components/ProfileEditInfo';
import ProfilePicture from '@/components/ProfilePicture';

/**
 * Formulario para editar datos básicos del usuario.
 *
 * @returns {JSX.Element} Componente de página de edición.
 */
function ProfileEdit() {
  return (
    <div className="min-h-screen flex justify-center">
      <div className="bg-dark p-8 rounded-lg shadow-md my-3">
        <ProfilePicture />
        <hr className="my-6" />
        <ProfileEditInfo />
        <hr className="my-6" />
        <PasswordEdition />
      </div>
    </div>
  );
}

export default ProfileEdit;
