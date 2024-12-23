import { Outlet } from "react-router-dom";

import "./index.css";

function SignInUp() {
  return (
    <div className="sign-background">
      {/*  */}
      <Outlet></Outlet>
    </div>
  );
}

export default SignInUp;
