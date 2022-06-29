import Admin from "../../components/Admin";
import { useRouter } from "next/router";
import Alert from "../../components/Alert/Alert";
import { useState } from "react";
import Link from "next/link";

export default function NoteDetail({note_id}) {
  const [alertOpen, setAlertOpen] = useState(false);
  const [is_del, setIs_Del] = useState(false);
  const router = useRouter();
  console.log(router.query);
  const type = "1";

  const openAlert = () => {
    setAlertOpen(true);
  };

  const closeAlert = () => {
    setAlertOpen(false);
  };

  const openPopup = () => {
    window.open(
      "winprogram",
      "new",
      "toolbar=no, menubar=no, scrollbars=yes, resizable=no, width=700, height=600, left=0, top=0"
    );
  };
  console.log(note_id)

  return (
    <div className="min-h-screen md:px-10 pt-40">
      <div className="bg-white rounded px-6 py-10 w-full mx-auto mb-10">
        <div className=" w-full h-20 flex">
          <div className="my-auto text-3xl pl-4">{router.query.push_title || "Loading..."}</div>
        </div>
        <hr className="border-gray-400" />
        <div className="flex w-full h-12 justify-end text-center">
          <div className="my-auto px-5">{router.query.writer || "Loading..."}</div>
          <div className="my-auto px-5 border-x border-gray-400">{router.query.push_date || "Loading..."}</div>
          <div className="my-auto px-5">{router.query.push_type || "Loading..."}</div>
        </div>
        <hr className="border-gray-400" />
        <div className="flex h-12 text-xl pl-4">
          <div className="my-auto">본문</div>
        </div>
        <hr className="border-gray-400" />
        <div className="min-h-wow">
          <div className="p-5">
          {router.query.push_content || "Loading..."}
        </div>
        </div>
        <hr className="border-gray-400" />
        <div className="h-24 flex justify-between w-full">
          <button
            className="bg-red-800 shadow-lg my-auto text-center rounded-2xl text-white p-3 w-32"
            onClick={type === "0" ? openAlert : openPopup}
          >
            수신자목록
          </button>
          <button
            className="bg-red-800 shadow-lg my-auto text-center rounded-2xl text-white p-3 w-32"
            onClick={() => {
              setIs_Del(true);
              console.log(is_del);
            }}
          >
            삭제
          </button>
        </div>
        <Alert
          open={alertOpen}
          close={closeAlert}
          header="전체 수신"
          content="전체 수신 알람이기 때문에 수신자 목록 조회가 불가능합니다."
        />
      </div>
    </div>
  );
}
export function getServerSideProps({ params: { note_id } }) {
  return {
    props: {
      note_id
    },
  };
}

NoteDetail.layout = Admin;
