import { useRouter } from "next/router";
import Admin from "../components/Admin";
import "../styles/globals.css";
import "react-quill/dist/quill.snow.css";

export default function App({ Component, pageProps }) {
  const router = useRouter();

  return router.pathname === "/" ? (
    <Component {...pageProps} />
  ) : (
    <Admin>
      <Component {...pageProps} />
    </Admin>
  );
}
