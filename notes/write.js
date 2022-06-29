import { TiDelete } from "react-icons/ti";
import { useState } from "react";
import Admin from "../../components/Admin";
import Alert from "../../components/Alert/Alert";

export default function NotesWrite() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [type, setType] = useState("0");
  const [receiver, setReceiver] = useState("");
  const [receivers, setReceivers] = useState([]);
  const [alertOpen, setAlertOpen] = useState(false);

  const openAlert = () => {
    setAlertOpen(true);
  };

  const closeAlert = () => {
    setAlertOpen(false);
  };

  const onChange = (event) => setReceiver(event.target.value);

  const onSubmit = (event) => {
    event.preventDefault();
    if (receiver === "") return;
    if (receivers.indexOf(receiver) === -1) {
      setReceivers((currentArray) => [...currentArray, receiver]);
    } else {
      openAlert();
    }
    setReceiver("");
  };

  const onSubmitAll = (event) => {
    event.preventDefault();
  };

  const onRemove = (event) => {
    const targetItem = event.target.id;
    setReceivers((currentArray) =>
      currentArray.filter((item) => {
        return item !== targetItem;
      })
    );
  };

  const openPopup = () => {
    setType("2");
    window.open(
      "winprogram",
      "new",
      "toolbar=no, menubar=no, scrollbars=yes, resizable=no, width=700, height=700, left=0, top=0"
    );
  };

  return (
    <div className="min-h-screen md:px-10 pt-40">
      <div className=" bg-white rounded px-6 py-10 w-full mx-auto mb-10">
        <div className=" flex flex-row ">
          <div className=" basis-2/3 border-r-2 border-gray-200">
            <div className="flex flex-row items-center">
              <div className="flex flex-row w-full my-auto border border-gray-600 mx-5 mb-3 ">
                <div className="flex basis-2/12 bg-gray-100 text-center border-r border-gray-600">
                  <div className="m-auto">제목</div>
                </div>
                <form className="basis-10/12" onSubmit={onSubmitAll}>
                  <input
                    type="text"
                    onChange={(e) => {
                      setTitle(e.currentTarget.value);
                    }}
                    className="w-full outline-none h-10"
                  ></input>
                </form>
              </div>
            </div>
            <div className="flex flex-row w-full">
              <div className="my-auto w-full mx-5">
                <div className="border-x border-t border-gray-600 w-full bg-gray-100 p-2">
                  <label>내용</label>
                </div>
                <textarea
                  onChange={(e) => {
                    setContent(e.currentTarget.value);
                  }}
                  className="border border-gray-600 w-full h-wow resize-none outline-none"
                ></textarea>
              </div>
            </div>
          </div>
          <div className=" basis-1/3">
            <div className=" flex flex-row">
              <div className="flex justify-evenly w-full my-auto mx-3">
                <button
                  onClick={() => {
                    setType("0");
                  }}
                  className="bg-red-800 hover:bg-red-900 transition-all duration-150 text-white shadow rounded w-1/3 mx-1 p-3"
                >
                  전체
                </button>
                <button
                  onClick={() => {
                    setType("1");
                  }}
                  className="bg-red-800 hover:bg-red-900 transition-all duration-150 text-white shadow rounded w-1/3 mx-1 p-3"
                >
                  개인
                </button>
                <button
                  onClick={openPopup}
                  className="bg-red-800 hover:bg-red-900 transition-all duration-150 text-white shadow rounded w-1/3 mx-1 p-3"
                >
                  프로그램
                </button>
              </div>
            </div>
            <div className=" h-96">
              <form
                onSubmit={onSubmit}
                className={
                  "flex flex-row w-full h-fit my-4" +
                  (type === "1" ? " " : " hidden")
                }
              >
                <input
                  onChange={onChange}
                  value={receiver}
                  type="text"
                  onKeyPress={(event) => {
                    if (event.key === "Enter") {
                    } else if (!/[0-9]/.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                  placeholder="학번 입력"
                  minLength="8"
                  maxLength="8"
                  className={
                    "border border-gray-600 m-auto outline-none" +
                    (type === "1" ? " " : " hidden")
                  }
                ></input>
              </form>
              <div
                className={
                  "max-h-80 overflow-y-scroll" +
                  (type === "1" ? " " : " hidden")
                }
              >
                {receivers.map((item, index) => (
                  <div
                    key={index}
                    className="flex mx-auto my-1 w-32 bg-gray-200 mb-1 shadow-md items-center justify-between rounded"
                  >
                    <li className="list-none ml-6">{item}</li>
                    <button
                      id={item}
                      onClick={onRemove}
                      className="mr-2 text-red-800"
                    >
                      <TiDelete id={item} onClick={onRemove} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-end">
              <button
                className="bg-red-800 hover:bg-red-900 transition-all duration-150 text-white shadow rounded w-28 p-2 mt-12"
                onClick={() => {
                  console.log("버튼이 클릭됨");
                  console.log(
                    "type, title, content, receviers: ",
                    type,
                    title,
                    content,
                    receivers
                  );
                }}
              >
                전송
              </button>
              <Alert
                open={alertOpen}
                close={closeAlert}
                header="중복 입력"
                content="이미 입력한 학번을 입력했습니다."
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
NotesWrite.layout = Admin;
