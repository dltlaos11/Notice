import Link from "next/link";

// layout for page
import { columns } from "/modules/static/notice";

import Admin from "/components/Admin.js";

import axios from "axios";

import Container from "@material-ui/core/Container";
import MaterialTable, { MTableToolbar } from "material-table";

import { Profiler, useState } from "react";
import { forwardRef, useEffect } from "react";
import { NoSsr } from "@mui/base";

/* eslint-disable react/display-name */
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";

import { useRouter } from "next/router";
import cookies from "next-cookies";

import EventWriteModal from "../../components/Modal/EventWriteModal";
import EventDetailModal from "../../components/Modal/EventDetailModal";

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

export default function Tables({ results }) {
  // const router = useRouter();
  const [state, setState] = useState({
    columns: [
      {
        title: "순번",
        field: "event_id",
        cellStyle: {
          backgroundColor: "#8E0808",
          color: "#FFF",
        },
        headerStyle: {
          color: "5E0608",

          backgroundColor: "#8E0808",
        },
      },
      { title: "제목", field: "title" },
      // { title: "작성자", field: "priority" },
      { title: "인원 제한", field: "limits" },
      { title: "상품 발송 여부", field: "is_checked" },
    ],
    data: [{ results }],
  });
  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [selectedData, setSelectedData] = useState(
    results.slice(pageNumber * pageSize, pageNumber * pageSize + pageSize)
  );

  const changePage = (pageNumber) => {
    setPageNumber(pageNumber);
    console.log(pageNumber);
  };

  const changeRowsPerPage = (rowSize) => {
    setPageSize(rowSize);
    console.log(rowSize);
  };

  useEffect(() => {
    let prevFakeData = createPrevFakeData(pageSize * pageNumber);
    let nextFakeData = createNextFakeData(pageSize);

    if (isFirstPage()) {
      let realData = results.slice(pageNumber * pageSize, pageSize);
      setSelectedData(realData.concat(nextFakeData));
    } else if (isLastPage()) {
      let realData = results.slice(pageNumber * pageSize, results.length);
      setSelectedData(prevFakeData.concat(realData));
    } else {
      let realData = results.slice(
        pageNumber * pageSize,
        pageNumber * pageSize + pageSize
      );
      setSelectedData(prevFakeData.concat(realData).concat(nextFakeData));
    }
  }, [pageSize, pageNumber]);

  const createPrevFakeData = (size) => {
    let fakeData = Array.apply(null, new Array(size)).map(
      Object.prototype.valueOf,
      new Object()
    );
    return fakeData.map((currentValue, index) => setFakeData(index));
  };

  const createNextFakeData = (size) => {
    let fakeData = Array.apply(null, new Array(size)).map(
      Object.prototype.valueOf,
      new Object()
    );
    return fakeData.map((currentValue, index) =>
      setFakeData(index + (pageNumber + 1) * pageSize)
    );
  };

  const setFakeData = (id) => {
    let fakeData = new Object();
    fakeData.tableData = { id: id };
    return fakeData;
  };

  const isFirstPage = () => {
    return pageNumber == 0;
  };

  const isLastPage = () => {
    return results.length <= pageNumber * pageSize + pageSize;
  };

  const router = useRouter();

  const [title, setTitle] = useState("");
  const [url, setUrl] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const onClick = (title, url, startDate, endDate) => {
    setTitle(title);
    setUrl(url);
    setStartDate(startDate);
    setEndDate(endDate);
    //openDetailModal();
  };

  const [showWriteModal, setShowWriteModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [modal_Props, setModal_Props] = useState([]);
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

  // console.log(selectedData);
  // NoSsr: NoSsr purposely removes components from the subject of Server Side Rendering (SSR).
  return (
    <>
      <>
        <div className="flex mt-4 pt-40">
          <Container maxWidth={false} margintop="3rem">
            <MaterialTable
              onRowClick={(_event, rowData) => {
                onClick(rowData.title, rowData.url);
                console.log(rowData);
              }}
              onChangePage={changePage}
              onChangeRowsPerPage={changeRowsPerPage}
              icons={tableIcons}
              columns={state.columns}
              data={selectedData}
              title="이벤트"
              options={{
                paginationType: "stepped",
                headerStyle: {
                  zIndex: 0,
                  color: "#FFF",
                },
              }}
            ></MaterialTable>
            <div className="float-right my-6 px-2">
              <Link href="/programs/test">
                <button className="hover:text-xl hover:bg-red-900 bg-red-800 shadow-lg text-center rounded-3xl text-white my-auto mx-2 transition-all duration-150 height-full w-full py-2 px-2">
                  새 글 등록
                </button>
              </Link>
              <button
                className="hover:text-xl hover:bg-red-900 bg-red-800 shadow-lg text-center rounded-3xl text-white my-auto mx-2 transition-all duration-150 height-full w-full py-2 px-2"
                onClick={console.log(title)}
              >
                확인.
              </button>
            </div>
          </Container>
        </div>
      </>
      <>
        <EventDetailModal
          open={showDetailModal}
          close={closeDetailModal}
          proptitle={title}
          propurl={url}
        ></EventDetailModal>
      </>
    </>
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

  try {
    const res = await axios.get(
      "https://swnotice.hsu.ac.kr/api/event/all_event",
      {
        headers: {
          Cookie: cook,
        },
      }
    );
    const results = await res.data.Data;
    return {
      props: {
        results,
      },
    };
  } catch (error) {
    console.log(error);
  }
};

Tables.layout = Admin;
