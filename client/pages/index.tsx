import React, { FC, useEffect, useRef, useState } from "react";
import { login, meQuery, UserForm } from "./api/user.api";
import { BiTask } from "react-icons/bi";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useMutation, useQuery } from "react-query";

interface indexProps {
  me: Response;
}

export const getStaticProps = async () => {
  const me = JSON.stringify(await meQuery());
  return { props: { me } };
};

const index: FC<indexProps> = ({ me }) => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState<string>("password");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>(" ");
  const [tailwindErrorString, setTailwindErrorString] = useState<string>("");

  let form = useRef(null);
  let usernameInput = useRef<HTMLInputElement>(null);
  let passwordInput = useRef<HTMLInputElement>(null);

  const meQueryRes = useQuery("meQuery", meQuery, { initialData: me });
  const loginMutation = useMutation((payload: UserForm) => login(payload));

  const handleSubmit = async (event) => {
    event.preventDefault();
    const payload = {
      username: username,
      password: password,
    };
    const loginRes = await login(payload);
    if (loginRes.status === 404) {
      setTailwindErrorString("border-8 border-red-600");
      setPassword("");
      setErrorMessage(await loginRes.text());
    }
    // Place your API call here to submit your payload.
  };

  useEffect(() => {
    if (meQueryRes.isFetched && meQueryRes.data?.status !== 404) {
      //User is logged in already and will be redirected to homepage
      router.push("/home");
    }
  }, [meQueryRes]);

  const handleAlerts = (
    string: string,
    ref: React.MutableRefObject<HTMLInputElement>,
    inputName: string
  ) => {
    if (string.length < 3) {
      ref.current.setCustomValidity(
        `${inputName} must be at least 3 characters long`
      );
    } else {
      ref.current.setCustomValidity(``);
    }
  };
  return (
    <section className="bg-blue-400 min-h-screen">
      <div className="mx-auto flex flex-col justify-center items-center h-full">
        <form
          className="w-full sm:w-4/6 md:w-3/6 lg:w-4/12 xl:w-3/12 text-white py-12 px-2 sm:px-0 mt-5"
          ref={form}
          onSubmit={handleSubmit}
        >
          <BiTask className="w-24 h-24 mx-auto" color="white" />
          <div className="flex flex-col mt-5">
            <h1 className="mx-auto text-4xl font-semibold text-white text-center">
              Welcome to TodoList-X
            </h1>
          </div>
          <div className="p-6 mx-auto bg-white rounded-xl shadow-md items-center mt-5 pb-2 mb-5 text-black">
            <div className="flex flex-col">
              <label htmlFor="username" className="text-lg font-medium m-1">
                Username
              </label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => {
                  handleAlerts(e.target.value, usernameInput, "Username");
                  setUsername(e.target.value);
                }}
                ref={usernameInput}
                id="username"
                className={`m-1 bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 h-10  w-full border border-transparent px-2 text-md  font-normal ${tailwindErrorString}`}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="password" className="text-lg font-medium m-1">
                Password
              </label>
              <input
                type={showPassword}
                required
                value={password}
                onChange={(e) => {
                  handleAlerts(e.target.value, passwordInput, "Password");
                  setPassword(e.target.value);
                }}
                ref={passwordInput}
                id="password"
                className={`m-1 bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 h-10  w-full border border-transparent px-2 text-md font-normal ${tailwindErrorString}`}
              />
            </div>
            <div className="flex mt-4">
              <input
                id="rememberme"
                className="form-checkbox w-5 h-5 mx-2 rounded-3xl text-blue-300"
                type="checkbox"
                onClick={() => {
                  if (showPassword === "password") {
                    setShowPassword("text");
                    return;
                  }
                  setShowPassword("password");
                }}
              />
              <h2 className="text-md font-normal">show password</h2>
            </div>
            <div className="flex">
              <button className="focus:outline-none focus:ring-3 focus:ring-blue-400 focus:ring-opacity-50 w-11/12 mx-auto bg-blue-500 transition duration-150 ease-in-out hover:bg-blue-600 rounded-md text-white px-8 py-3 text-sm mt-6">
                Login
              </button>
            </div>
            <div className="flex mt-1">
              <h2 className="text-md font-normal mx-auto text-red-600 mb-2 mt-4">
                {errorMessage}
              </h2>
            </div>
          </div>
        </form>
        <h1 className="mx-auto text-lg font-normal text-white hover:text-gray-300 text-center hover:underline">
          <NextLink href="/sign-up">dont have an account?</NextLink>
        </h1>
      </div>
    </section>
  );
};

export default index;
