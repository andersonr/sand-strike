import Head from "next/head";

const HeadTitle = ({ tabTitle }: { tabTitle: string }) => {
	return (
		<Head>
			<title>{tabTitle}</title>
			<meta charSet="utf-8" />
		</Head>
	);
};

export default HeadTitle;
