
import { FetchRandomMovie } from "../../components/FetchRandomMovie/FetchRandomMovie";
import { FetchTopTenMovie } from "../../components/FetchTopTenMovie/FetchTopTenMovie";
import "./MainPage.css";

export default function MainPage() {
	return (
		<>
			<section className="random-movie">
				<FetchRandomMovie/>
			</section>
			<section className="top-ten">
				<FetchTopTenMovie/>
			</section>
		</>
	);
}
