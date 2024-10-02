import { BiLogOut } from "react-icons/bi";
import userLogout from "../../hooks/useLogout";
const LogoutButton = () => {
  const {loading,logout} = userLogout()
  return (
    <div className="absolute bottom-4 left-4 right-4">
      {!loading ? (
      <BiLogOut onClick={logout} className="w-6 h-6 text-white cursor-pointer  " />
     ) : (
      <span className="loading loading-spinner"></span>
     )}
    </div>
  );
};

export default LogoutButton;
