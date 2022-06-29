import { useState } from "react";
import dynamic from "next/dynamic";
import axios from "axios";
import cookies from "next-cookies";
import Router from "next/router";

const QuillWrapper = dynamic(import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["clean"],
    ["link", "image"],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};

const formats = [
  "header",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "image",
];

export default function Test({ data }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  //const [priority, setPriorty] = useState(false);
  const [containProgram, setContainProgram] = useState(false);
  const openPopup = () => {
    window.open(
      "programpopup",
      "new",
      "toolbar=no, menubar=no, scrollbars=yes, resizable=no, width=700, height=700, left=0, top=0"
    );
  };

  const OnWrite = async () => {
    const test2 = await axios
      .post("https://swnotice.hsu.ac.kr/api/notice/write", {
        title,
        content,
        priority,
      })
      .then((res) => {
        if (res.data.Message === "성공하였습니다.") {
          console.log("성공이랍니다");
          window.alert("등록하였습니다.");
          Router.push("/notice");
        }
        else{
          console.log("틀렸답니다.")
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="min-h-screen md:px-10 pt-40">
      <div className=" bg-white rounded px-6 py-10 w-full mx-auto mb-10">
        <h1 className="text-2xl font-bold">공지사항 작성</h1>
        <div className=" h-16 flex">
          <div className="flex flex-row my-auto w-full text-center border border-gray-400">
            <div className="flex basis-2/12 bg-gray-200">
              <div className="m-auto border-l">제목</div>
            </div>
            <form className="basis-10/12 border-gray-400 border-l">
              <input
                className="w-full outline-none h-10 ml-3"
                onChange={(e) => {
                  setTitle(e.currentTarget.value);
                }}
              />
            </form>
          </div>
        </div>
        <div className="text-xl font-bold mb-2">내용</div>
        <div className=" h-good">
          <QuillWrapper
            modules={modules}
            formats={formats}
            theme="snow"
            value={content}
            onChange={setContent}
            className="h-wow my-auto "
          />
        </div>
        <div className="">
          {" "}
          <form className="my-auto border-y border-gray-400 w-full py-1">
            <input type="file" multiple></input>
          </form>
        </div>
        {/* <div className=" my-3">
          <input
            className=" mr-2"
            type="checkbox"
            onClick={() => {
              setPriorty(!priority);
            }}
          />{" "}
          공지상단노출
        </div> */}
        <div className=" my-3">
          <input
            className=" mr-2"
            type="checkbox"
            onClick={() => {
              setContainProgram(!containProgram);
            }}
          />{" "}
          프로그램{" "}
          <button
            className="bg-red-800 rounded py-1 px-3 mx-5 text-white"
            onClick={openPopup}
          >
            프로그램목록
          </button>
        </div>
        <div className="py-1">선택할 프로그램 이름이 들어갈 자리</div>
        <div className=" my-2 flex justify-end">
          <button
            className="w-28 p-2 text-white bg-red-800 shadow-lg rounded"
            onClick={OnWrite}
            // onClick={() => {
            //   console.log(
            //     "제목, 중요도, 프로그램 유무, 본문: ",
            //     title,
            //     priority,
            //     containProgram,
            //     content
            //   );
            // }}
          >
            등록
          </button>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps = async (ctx) => {
  const { admin } = cookies(ctx);
  const cook = "admin=" + admin;

  if (!admin || admin === "") {
    if (ctx.req && ctx.res) {
      ctx.res.writeHead(302, { Location: "/" });
      ctx.res.end();
    } else {
      Router.push("/");
    }
  }

  return { props: { admin } };
};
