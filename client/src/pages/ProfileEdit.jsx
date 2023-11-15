import PasswordEdition from '@/components/PasswordEdition';
import ProfileEditInfo from '@/components/ProfileEditInfo';
import ProfilePicture from '@/components/ProfilePicture';
import DeleteUser from '@/components/DeleteUser';

/**
 * Página con varios formularios para modificar información de un usuario.
 *
 * @returns {JSX.Element} Página edición de perfil.
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
        <hr className="my-6" />
        <DeleteUser />
      </div>
    </div>
  );
}

export default ProfileEdit;
