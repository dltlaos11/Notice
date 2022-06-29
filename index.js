import Dashboard from "./dashboard";
import Login from "./login";
import cookie from "js-cookie";

export default function Home({token}) {
  console.log("hi");
  return <Login token={token}/>;
  // return <Dashboard></Dashboard>;
}
export function getServerSideProps({req, res}){
  return { props: {token : req.cookies.token || ""}};
}