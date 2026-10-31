import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { forgotPassword, clearAuthError } from "../../actions/userActions";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const { error, message } = useSelector((state) => state.authState);

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", email);
    dispatch(forgotPassword(formData));
  };

  useEffect(() => {
    if (message) {
      toast(message, {
        type: "success",
        position: toast.POSITION.BOTTOM_CENTER,
      });
      setEmail("");
      return;
    }

    if (error) {
      toast(error, {
        position: toast.POSITION.BOTTOM_CENTER,
        type: "error",
        onOpen: () => {
          dispatch(clearAuthError);
        },
      });
      return;
    }
  }, [message, error, dispatch]);

  return (
    <div className="forgot-password-page">
      <div className="forgot-password-container">
        <form onSubmit={submitHandler} className="forgot-password-form">
          <div className="forgot-password-heading">
            <h1>Forgot Password?</h1>
            <p>
              No worries! Enter your registered email address and we'll send you
              a password reset link.
            </p>
          </div>

          <div className="form-group">
            <label htmlFor="email_field">Email Address</label>

            <input
              type="email"
              id="email_field"
              className="form-control"
              placeholder="Enter your registered email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button
            id="forgot_password_button"
            type="submit"
            className="btn btn-block"
          >
            SEND RESET LINK
          </button>
        </form>
      </div>
    </div>
  );
}
