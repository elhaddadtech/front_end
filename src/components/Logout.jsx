import { doLogout } from "../app/actions";

const Logout = () => {
  return (
    <form action={doLogout}>
      <button className="" type="submit">
        Logout
      </button>
    </form>
  );
};

export default Logout;
