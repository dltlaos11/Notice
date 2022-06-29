import { useState } from "react";
import ProgramWriteModal from "../../components/Modal/ProgramWriteModal";
import ProgramDetailModal from "../../components/Modal/ProgramDetailModal";

export default function Test() {
  const [showWriteModal, setShowWriteModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const openWriteModal = () => {
    setShowWriteModal(true);
  };

  const closeWriteModal = () => {
    setShowWriteModal(false);
  };

  const openDetailModal = () => {
    setShowDetailModal(true);
  };

  const closeDetailModal = () => {
    setShowDetailModal(false);
  };

  return (
    <div className="flex mt-4 h-screen pt-48">
      <h1>
        <p className="text-2xl font-bold text-slate-700">프로그램 페이지</p>
      </h1>
      <button
        onClick={openWriteModal}
        className="bg-red-800 shadow-lg text-center rounded-3xl text-white h-10 w-36 my-auto mt-5 mr-5"
      >
        새 글 작성
      </button>
      <button
        onClick={openDetailModal}
        className="bg-red-800 shadow-lg text-center rounded-3xl text-white h-10 w-36 my-auto mt-5 mr-5"
      >
        글 클릭시 세부사항
      </button>
      <ProgramWriteModal
        open={showWriteModal}
        close={closeWriteModal}
      ></ProgramWriteModal>
      <ProgramDetailModal
        open={showDetailModal}
        close={closeDetailModal}
      ></ProgramDetailModal>
    </div>
  );
}
