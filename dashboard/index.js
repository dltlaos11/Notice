// components
import axios from "axios";

// import CardLineChart from "components/Cards/CardLineChart.js";
// import CardBarChart from "components/Cards/CardBarChart.js";
// import CardPageVisits from "components/Cards/CardPageVisits.js";
// import CardSocialTraffic from "components/Cards/CardSocialTraffic.js";
import SmallNoticeTable from "/components/DashBoardComponents/SmallTable/SmallNoticeTable";
import SmallNoteTable from "/components/DashBoardComponents/SmallTable/SmallNoteTable";
import SmallProgramTable from "/components/DashBoardComponents/SmallTable/SmallProgramTable";
import SmallEventTable from "/components/DashBoardComponents/SmallTable/SmallEventTable";

import NoticeScBtn from "/components/DashBoardComponents/ShortcutBtn/NoticeScBtn";
import ProgramScBtn from "/components/DashBoardComponents/ShortcutBtn/ProgramScBtn";
import NoteScBtn from "/components/DashBoardComponents/ShortcutBtn/NoteScBtn";
import MileageScBtn from "/components/DashBoardComponents/ShortcutBtn/MileageScBtn";
// layout for page
import Admin from "../../components/Admin";

import { useRouter } from "next/router";

export default function Dashboard({ results, results_note }) {
  return (
    <main>
      <div className="flex columns-1 h-1/2 row pt-40 gap-4">
        <NoticeScBtn />
        <NoteScBtn />
        <MileageScBtn />
        <ProgramScBtn />
      </div>
      {/*       <div className="flex mt-4 ">      
        <div className="flex ">
          <SmallNoticeTable 
          results= {results}/>
        </div>
      </div> */}
      <div className="grid grid-cols-2 gap-y-4">
        <div>
          <SmallNoteTable results={results_note} />
        </div>
        <div>
          <SmallNoticeTable results={results} />
        </div>
        <div>
          <SmallEventTable results={results_note} />
        </div>
        <div>
          {" "}
          <SmallProgramTable results={results_note} />
        </div>
      </div>
    </main>
  );
}

export const getServerSideProps = async () => {
  const res = await axios.get("http://210.119.104.203:3331/notice");
  const results = await res.data;

  const res_note = await axios.get("http://210.119.104.203:3331/note");
  const results_note = res_note.data;

  return {
    props: {
      results_note,
      results,
    },
  };
};

/* export async function getServerSideProps() {

  // Fetch data from external API
  const res = await axios.get("http://210.119.104.203:3333/notice");
  const results = res.data;

  // Pass data to the page via props

    // Fetch data from external API
    const res2 = await axios.get("http://210.119.104.203:3333/notice/content?notice_id=29");
    const result1 = res2.data;
  
    // Pass data to the page via props
    return { 
      props: {
         result1, results 
        } 
      };
} */

Dashboard.layout = Admin;
