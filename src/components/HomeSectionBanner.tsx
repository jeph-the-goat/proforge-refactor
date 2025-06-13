import {clsx} from "clsx";

export const HomeSectionBanner = () => {
	return (
		<section className={clsx("c-home-section-banner")}>

			<div className="c-container">

				<p>Backed by</p>

				<div className="c-home-section-banner-grid">
					<span className="c-home-section-banner-grid-item">
						<img
							alt=""
							src="Vector.svg"
						/>
					</span>
				</div>

			</div>

		</section>
	);
};

