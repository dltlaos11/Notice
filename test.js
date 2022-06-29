import axios from "axios";
import cookies from "next-cookies";

export default function Test({ data }) {
  const OnLogin = () => {
    console.log(data);
  };
  return (
    <>
      <div className="flex mt-4 pt-40">for test</div>
      <button
        className="bg-red-800  hover:font-extrabold hover:bg-red-900 hover:text-base text-white active:bg-red-900 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
        type="button"
        onClick={OnLogin}
      >
        {data}
      </button>
    </>
  );
}

Test.getInitialProps = async (ctx) => {
  const { admin } = cookies(ctx);
  //   console.log(admin);
  const cook = "admin=" + admin;
  console.log(cook);

  var data;

  const test2 = await axios
    .get("https://swnotice.hsu.ac.kr/api/mileage/all", {
      headers: {
        Cookie: cook,
      },
    })
    .then((res) => {
      data = res.data;
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });

  if (!admin || admin === "") {
    if (ctx.req && ctx.res) {
      ctx.res.writeHead(302, { Location: "/" });
      ctx.res.end();
    } else {
      Router.push("/");
    }
  }
  return { admin };
};

// export async function getServerSideProps() {
//   var test =
//     "admin =eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJTVFVERU5UX0lEIjoiMTIzIiwiTk0iOiLthYzsiqTtirgyIiwiTEVWRUwiOjEsIkRFUFRfTk0iOiLthYzsiqTtirgyIiwiU0NIWVIiOiLqtZDsp4Hsm5AiLCJpYXQiOjE2NDU0MjE0NTIsImV4cCI6MTY0NTQyMzI1MiwiaXNzIjoiSE9TRU9OT1RJQ0UifQ.RHNV50YElVcZLw4vLlvVwffaoTRdpoG5sDJ1ChDQqic";
//   var data = { test: "Tse" };

//   const test2 = await axios
//     .get("https://swnotice.hsu.ac.kr/api/mileage/all", {
//       headers: {
//         Cookie: test,
//       },
//     })
//     .then((res) => {
//       //   console.log(res.data);
//       data = res.data;
//       //   data = res.data;
//     })
//     .catch((err) => {
//       console.log(err);
//     });
//   return { props: { data } };
// }