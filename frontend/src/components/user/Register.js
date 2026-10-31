import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register, clearAuthError } from "../../actions/userActions";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(
    "/images/default_avatar.png",
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.authState,
  );

  const onChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(e.target.files[0]);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUserData({ ...userData, [e.target.name]: e.target.value });
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", userData.name);
    formData.append("email", userData.email);
    formData.append("password", userData.password);
    formData.append("avatar", avatar);
    dispatch(register(formData));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
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
  }, [error, isAuthenticated, dispatch, navigate]);

  return (
    <div className="register-page">
      <div className="register-container">
        <form
          onSubmit={submitHandler}
          className="register-form"
          encType="multipart/form-data"
        >
          <div className="register-heading">
            <h1>Create Account</h1>
            <p>Join us and enjoy a better shopping experience.</p>
          </div>

          <div className="form-group">
            <label htmlFor="name_field">Full Name</label>
            <input
              name="name"
              onChange={onChange}
              type="name"
              id="name_field"
              className="form-control"
              placeholder="Enter your name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email_field">Email Address</label>
            <input
              type="email"
              id="email_field"
              name="email"
              onChange={onChange}
              className="form-control"
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password_field">Password</label>
            <input
              name="password"
              onChange={onChange}
              type="password"
              id="password_field"
              className="form-control"
              placeholder="Create a password"
            />
          </div>

          {/* Avatar Upload */}

          <div className="form-group">
            <label htmlFor="customFile">Profile Picture</label>

            <div className="avatar-upload-container">
              <figure className="register-avatar">
                <img
                  src={avatarPreview}
                  className="rounded-circle"
                  alt="Avatar"
                />
              </figure>

              <div className="custom-file register-file-input">
                <input
                  type="file"
                  name="avatar"
                  onChange={onChange}
                  className="custom-file-input"
                  id="customFile"
                />

                <label className="custom-file-label" htmlFor="customFile">
                  Choose Avatar
                </label>
              </div>
            </div>
          </div>

          <button
            id="register_button"
            type="submit"
            className="btn btn-block"
            disabled={loading}
          >
            CREATE ACCOUNT
          </button>
        </form>
      </div>
    </div>
  );
}
