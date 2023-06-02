"use client";

import Image from "next/image";
import logo from "../../public/logo.png";
import { MagnifyingGlassIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import Avatar from "react-avatar";
import { useBoardStore } from "@/store/BoardStore";
import { useEffect, useState } from "react";
import fetchSuggestion from "@/lib/fetchSuggesntion";

export function Header() {
  const { searchString, setSearchString, board } = useBoardStore(
    (state) => state
  );

  const [loading, setLoading] = useState<boolean>(false);
  const [suggestion, setSuggestion] = useState<string>("");

  useEffect(() => {
    // if (board.columns.size === 0) return;

    setLoading(true);

    // const fetchSuggesntionFunction = async () => {
    //   const suggestion = await fetchSuggestion(board);
    //   setSuggestion(suggestion);
    //   setLoading(false);
    // };

    setTimeout(() => {
      setLoading(false);
    }, 1000);

    // fetchSuggesntionFunction();
  }, [board]);

  return (
    <header>
      <div className="flex flex-col md:flex-row items-center p-5 bg-gray-500/10 rounded-b-2xl">
        <div />
        <Image
          src={logo}
          alt=""
          className="w-16 pb-10 md:pb-0 object-contain"
          width={300}
          height={100}
        />
        <span className="font-bold pl-2">CodePeek Kanban</span>

        <div className="flex items-center space-x-5 flex-1 justify-end w-full">
          <form className="flex items-center space-x-5 bg-white rounded-md p-2 shadow-md flex-1 md:flex-initial">
            <MagnifyingGlassIcon className="h-6 w-6 text-gray-400" />
            <input
              type="text"
              placeholder="Pesquisar"
              value={searchString}
              onChange={(e) => setSearchString(e.target.value)}
              className="flex-1 outline-none p-2"
            />
            <button type="submit" hidden></button>
          </form>

          <Avatar name="Code Peek" round color="#EBA417" size="50" />
        </div>
      </div>

      <div className="flex items-center justify-center px-5 py-2 md:py-5">
        <p className="flex items-center text-sm p-5 font-light pr-5 shadow-xl rounded-xl w-fit bg-white italic max-w-3xl text-yellow-400">
          <UserCircleIcon
            className={`inline-block h-10 w-10 text-yellow-400 mr-1 ${
              loading && "animate-spin"
            }`}
          />{" "}
          {suggestion && !loading
            ? suggestion
            : "Seja bem vindo ao Kanban do CodePeek!"}
        </p>
      </div>
    </header>
  );
}
