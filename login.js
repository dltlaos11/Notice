import Head from "next/head";
import { useState } from "react";
import * as authApi from "../api/auth";
import Router from "next/router";

import Cookies from "universal-cookie";

export default function Login({ token }) {
  const crypto = require('crypto');

  

  const [user_id, setId] = useState("");
  const [password, setPw] = useState("");

  console.log(token);

const enterkey = () => {
  if (window.event.keyCode == 13) {
    OnLogin();
}
}


  const OnLogin = () => {
    authApi
      .login(user_id, crypto.createHash('sha512').update(password).digest('base64'),)
      .then((res) => {
        if (res.data.Message === "성공하였습니다.") {
          Router.push("/dashboard");
        }
        const cookies = new Cookies();
        cookies.set("admin", res.data.jwt_token, {
          path: "/",
        });
        console.log(cookies.get("admin"));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Head>
        <title>소중대 공지사항</title>
      </Head>
      <main>
        <section className="relative w-full h-full py-60 min-h-screen">
          <div className="absolute top-0 w-full h-full bg-slate-50"></div>
          <div className="container mx-auto px-4 h-56">
            <div className="flex content-center items-center justify-center h-full">
              <div className="w-1/2 px-4">
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-white border-0">
                  <div className="rounded-t mb-0 px-6 py-6">
                    <div className="text-center mb-3">
                      <img className="m-auto" src = "../img/v2hoseo-icon.png" alt = "Hoseo Notice"/>
                    </div>
                    <hr className="mt-6 border-b-1 border-red-800" />
                  </div>
                  <div className="flex-auto px-4 lg:px-10 py-10 pt-0 bg">
                    <form>
                      <div className="relative w-full mb-3">
                        <label
                          className="block text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          교번
                        </label>
                        <input
                          type="text"
                          className="focus:border-red-800 focus:placeholder-red-800 hover:border-red-800 hover:placeholder-red-800 border-2 border-slate-300 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none  w-full ease-linear transition-all duration-150"
                          placeholder="교번"
                          onChange={(e) => {
                            setId(e.target.value);
                          }}
                        />
                      </div>
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          비밀번호
                        </label>
                        <input
                          type="password"
                          className="focus:border-red-800 focus:placeholder-red-800 hover:border-red-800 hover:placeholder-red-800 border-2 border-slate-300 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none  w-full ease-linear transition-all duration-150"
                          placeholder="비밀번호" onKeyUp= {enterkey}
                          onChange={(e) => {
                            setPw(e.target.value);
                          }}
                        />
                      </div>
                      <div className="text-center mt-6">
                        <button
                          className="bg-red-800  hover:font-extrabold hover:bg-red-900 hover:text-base text-white active:bg-red-900 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                          type="button"
                          onClick={OnLogin} 
                        >
                          로그인
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="flex flex-wrap mt-6 relative">
                  <div className="w-1/2 ">
                    <a
                      target="_blank"
                      href="https://portal.hoseo.edu/huis/FindIdPage.do"
                      rel="noreferrer"
                      className="text-slate-700"
                    >
                      <small className=" hover:text-red-700 hover:text-base hover:font-extrabold transition-all duration-150">
                        교번 찾기
                      </small>
                    </a>
                  </div>
                  <div className="w-1/2 text-right">
                    <a
                      target="_blank"
                      href="https://portal.hoseo.edu/huis/InitPwdPage.do"
                      rel="noreferrer"
                      className="text-slate-700"
                    >
                      <small className=" hover:text-red-700 hover:text-base hover:font-extrabold transition-all duration-150">
                        비밀번호 초기화
                      </small>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
