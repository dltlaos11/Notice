import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Link from "next/link";
import Admin from "../../components/Admin";
import axios from "axios";
import cookies from "next-cookies";
import * as noticeApi from "../../api/notice";
import Router from "next/router";

export default function NoticeDetail({ results, notice_id}) {
  const data = results[0].content;

  // const Delete = () => {
  //   axios.delete(
  //   "https://swnotice.hsu.ac.kr/api/notice/delete",
  //   { data: { notice_id:  notice_id } }
  // ).then((res) =>{
  //   console.log(res)
  //   if (res.data.Message === "성공하였습니다.") {
  //     console.log("성공이랍니다");
  //   }
  //   else{
  //     console.log("틀렸답니다.")
  //   }
  // })}
  const Delete = () => {
    noticeApi.deleteNotice(notice_id).then((res) => {
        console.log(res)
        if (res.data.Message === "성공하였습니다.") {
          console.log("성공이랍니다");
          window.alert("삭제되었습니다.");
          Router.push("/notice");
        }
        else{
          console.log("틀렸답니다.")
        }
      })}

  return (
    <div className="min-h-screen md:px-10 pt-40">
      <div className="bg-white rounded px-6 py-10 w-full mx-auto mb-10">
        <div className=" w-full h-20 flex">
          <div className="my-auto text-3xl pl-4">{results[0].title}</div>
        </div>
        <hr className="border-gray-400" />
        {/* {router.query.create_time} */}
        <hr className="border-gray-400" />
        <hr className="border-gray-400" />
        <div className="min-h-wow">
          <div className="p-5">
            <div dangerouslySetInnerHTML={{ __html: data }}></div>
          </div>
        </div>
        <hr className="border-gray-400" />
        <div className="h-24 flex justify-end w-full">
          <button className="bg-red-800 shadow-lg my-auto text-center rounded-2xl text-white p-3 w-32 mr-7">
            수정
          </button>
          <button
            className="bg-red-800 shadow-lg my-auto text-center rounded-2xl text-white p-3 w-32"
            onClick={Delete}
          >
            삭제
          </button>
        </div>
      </div>
    </div>
  );
}
export const getServerSideProps = async (ctx) => {
  const { admin } = cookies(ctx);
  const cook = "admin=" + admin;
  const notice_id = ctx.query.params[0];

  if (!admin || admin === "") {
    if (ctx.req && ctx.res) {
      ctx.res.writeHead(302, { Location: "/" });
      ctx.res.end();
    } else {
      Router.push("/");
    }
  }
  try {
    const res = await axios.get(
      // console.log(noticeApi)
      `${process.env.NEXT_PUBLIC_API_URL}/notice/all/detail?notice_id=${ctx.query.params[0]}`,
      // `${noticeApi}/notice/all/detail?notice_id=${ctx.query.params[0]}`,
      {
        headers: {
          Cookie: cook,
        },
      }
    );

    axios.defaults.headers.Cookie = cook;

    const results = await res.data.Data;
    // console.log(results);
    return {
      props: {
        results,
        notice_id,
 
      },
    };
  } catch (error) {
    console.log(error);
  }
};

NoticeDetail.layout = Admin;
