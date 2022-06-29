import Admin from "../../components/Admin";
import { FaCoins } from "react-icons/fa";
import { ClassSharp } from "@material-ui/icons";
import { TiDelete } from "react-icons/ti";
import { useState } from "react";
import Alert from "../../components/Alert/Alert";
import MileageGiveInputModal from "../../components/Modal/MileageGiveInputModal";
import MileageGiveModal from "../../components/Modal/MileageGiveModal";

export default function MileagesDetail() {
  const [showWriteInputModal, setShowWriteInputModal] = useState(false);
  const [showWriteModal, setShowWriteModal] = useState(false);

  const openWriteInputModal = () => {
    setShowWriteInputModal(true);
  };

  const closeWriteInputModal = () => {
    setShowWriteInputModal(false);
  };

  const openWriteModal = () => {
    setShowWriteModal(true);
  };

  const closeWriteModal = () => {
    setShowWriteModal(false);
  };
  return (
    <>
      <div className="min-h-screen md:px-10 pt-40">
        <button
          onClick={openWriteInputModal}
          className="bg-red-800 shadow-lg text-center rounded-3xl text-white h-10 w-40 my-auto my-5 mr-5"
        >
          새 글 작성 (학번입력)
        </button>
        <MileageGiveInputModal
          Modal
          open={showWriteInputModal}
          close={closeWriteInputModal}
        ></MileageGiveInputModal>
        <button
          onClick={openWriteModal}
          className="bg-red-800 shadow-lg text-center rounded-3xl text-white h-10 w-40 my-auto my-5 mr-5"
        >
          새 글 작성 (개인)
        </button>
        <MileageGiveModal
          Modal
          open={showWriteModal}
          close={closeWriteModal}
        ></MileageGiveModal>
        <div className="bg-white rounded flex justify-between w-80 h-28 my-auto shadow">
          <div className="my-auto p-5">
            <div>총 마일리지 점수</div>
            <div className="text-3xl">25</div>
          </div>
          <div className="my-auto p-5">
            <div className="bg-red-800 p-4 rounded-full">
              <FaCoins size="40" color="white" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
