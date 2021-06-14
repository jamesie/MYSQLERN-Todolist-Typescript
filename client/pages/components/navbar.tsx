import { useRouter } from "next/router";
import React, { FC, useEffect } from "react";
import { useState } from "react";
import { BiTask } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { useQuery } from "react-query";
import { meQuery } from "../api/user.api";

interface NavbarProps {
  me?: Response;
}

export const getServerSideProps = async () => {
  const me = JSON.stringify(await meQuery());
  return { props: { me } };
};

const Navbar: FC<NavbarProps> = ({ me }) => {
  const router = useRouter();
  const [username, setUsername] = useState("");

  const meQueryRes = useQuery("meQuery", meQuery, { initialData: me });

  useEffect(() => {
    if (meQueryRes.isFetched && meQueryRes.data?.status !== 404) {
      const setName = async (): Promise<void> => {
        const username = JSON.parse(await meQueryRes.data.text()).username;
        setUsername(username);
      };
      setName();
    }
  }, [meQueryRes.isFetched]);

  const handleProfileClick = () => {
    router.push(`/user/profile${username}`);
  };

  return (
    <>
      <section className="mx-auto flex flex-row w-full bg-blue-400 h-20 pl-5 sm:pl-20 pr-5 sm:pr-20 shadow-lg">
        <BiTask className="w-14 h-14 my-auto" color="white" />
        <h1 className="md:text-xl sm:text-xl lg:text-3xl xl:text-4xl font-semibold my-auto text-white text-center ml-3">
          todolist-X
        </h1>

        <div
          className="flex flex-row ml-auto bg-blue-500 hover:bg-blue-600 h-18 rounded-lg my-2 px-0 sm:px-5 shadow-sm"
          onClick={() => handleProfileClick()}
        >
          <h1
            className="md:text-lg sm:text-lg lg:text-xl xl:text-2xl font-normal my-auto text-white text-right ml-3 max-w-3 sm:max-w-full"
            onClick={() => handleProfileClick()}
          >
            {username}
          </h1>
          <CgProfile
            className="h-7 w-7 sm:w-14 sm:h-14 my-auto mx-2.5"
            color="white"
            onClick={() => handleProfileClick()}
          />
        </div>
      </section>
    </>
  );
};

export default Navbar;
