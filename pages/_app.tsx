import { AppProps } from "next/app";
import "../styles/index.css";

import { Roboto } from "@next/font/google";

const roboto = Roboto({
	subsets: ["latin"],
	weight: ["300", "400", "500", "700"],
});

export default function MyApp({ Component, pageProps }: AppProps) {
	return <Component {...pageProps} />;
}
