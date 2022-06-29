import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Link from "next/link";
import Admin from "../../components/Admin";
import Modal from "../../components/NoteComponents/modal";
import axios from "axios";

export default function NoticeDetail({ params }) {
  const [modalOpen, setModalOpen] = useState(false);

  const router = useRouter();
  console.log(router);
  console.log(params);
  const [type, setType] = useState("1");
  const [data, setData] = useState([]);

  const print = () => {
    axios
      .get(`http://210.119.104.203:3333/notice/content?notice_id=${params[0]}`)
      .then((res) => {
        setData(res.data[0].content);
      });
  };

  useEffect(() => {
    if (params > 0) {
      print();
    }
  }, [params]); // 바로 보여주기

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  const openPopup = () => {
    window.open(
      "winprogram",
      "new",
      "toolbar=no, menubar=no, scrollbars=yes, resizable=no, width=700, height=800, left=0, top=0"
    );
  };

  return (
    <>
      <div className="flex mt-4 pt-40 h-screen">
        <div className="bg-white rounded w-full h-auto">
          <div className="flex align-center w-full h-1/6">
            <div className="text-3xl my-auto pl-4">{router.query.title}</div>
          </div>
          <div className="flex-col columns-1 align-center w-full h-1/6">
            <div className="flex align-center w-full justify-end h-1/2 border-y-2 border-gray-200">
              <div className="my-auto px-3">홍길동</div>
              <div className="border-x-2 border-gray-200 my-auto px-3">
                2020-10-07
              </div>
              <div className="my-auto px-3">
                조회수 {router.query.program_id || "0"}{" "}
                <button
                  className="bg-red-800 shadow-lg text-center rounded-3xl text-white h-6 w-20 my-auto mr-10 text-xs"
                  onClick={type === "0" ? openModal : openPopup}
                >
                  조회목록
                </button>
              </div>
            </div>
            <div className="flex align-center w-full h-1/2">
              <div className="text-xl my-auto pl-4">내용</div>
              <hr />
            </div>
          </div>
          <hr />
          <div className="w-full h-3/6">
            <div className="p-3">{data}</div>
          </div>
          <hr />
          <div className="flex flex-row-reverse space-x-4 space-x-reverse mt-6">
            <div className="flex my-auto">
              <button
                className="bg-red-800 shadow-lg text-center rounded-3xl text-white h-9 w-20 my-auto mr-10"
                onClick={type === "0" ? openModal : openPopup}
              >
                수정
              </button>
              <Modal
                className="m-auto h-1/6"
                open={modalOpen}
                close={closeModal}
              />
            </div>
            <Link href="/notes">
              <button className="hover:bg-red-900 bg-red-800 shadow-lg text-center rounded-3xl text-white h-9 w-20 my-auto mr-2 transition-all duration-150">
                삭제
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
export function getServerSideProps({ params: { params } }) {
  return {
    props: {
      params,
    },
  };
}

NoticeDetail.layout = Admin;
