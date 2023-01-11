import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLogInMutation } from "../store/authApi";
import { updateField } from "../store/accountSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function AccountForm(props) {
  const dispatch = useDispatch();
  const { username, password } = useSelector((state) => state.account);
  const [
    logIn,
    { error, isloading: logInLoading, isSuccess: loginSuccessful },
  ] = useLogInMutation();
  const field = useCallback(
    (e) =>
      dispatch(updateField({ field: e.target.name, value: e.target.value })),
    [dispatch]
  );
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (loginSuccessful) {
      navigate("/");
    }
  };
  useEffect(() => {
    handleLogin();
  });
}

export default AccountForm;
