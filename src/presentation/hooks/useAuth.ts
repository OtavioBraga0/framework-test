import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useCallback,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { authSelector, signOut } from "../../domain/ducks/authReducer";
import { authThunk } from "../../domain/thunks/authThunk";

import { AppDispatch } from "../../domain/DomainLayer";
import { useNavigate } from "react-router";
import { ROUTES } from "../Router";
import { IUser } from "../../domain/entities/User";
import { clearCart } from "../../domain/ducks/cartReducer";

type UseAuthProps = {
  email: string;
  password: string;
  setEmail: Dispatch<SetStateAction<string>>;
  setPassword: Dispatch<SetStateAction<string>>;
  loading: boolean;
  user?: IUser;
  actions: {
    handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
    handleSignOut: () => void;
  };
};

export const useAuth = (): UseAuthProps => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { user, isLoading } = useSelector(authSelector);

  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      await dispatch(authThunk({ email, password }));
      navigate(ROUTES.HOME);
    },
    [email, password, dispatch, navigate]
  );

  const handleSignOut = useCallback(() => {
    dispatch(signOut());
    dispatch(clearCart());
  }, [dispatch]);

  return {
    email,
    password,
    setEmail,
    setPassword,
    user,
    loading: isLoading,
    actions: { handleSubmit, handleSignOut },
  };
};
