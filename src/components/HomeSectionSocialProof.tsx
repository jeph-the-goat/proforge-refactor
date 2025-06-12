import {clsx} from "clsx";

export const HomeSectionSocialProof = () => {
	return (
		<section className={clsx("c-home-section-social-proof")}>

			<div className="c-container">

				<p>Backed by</p>

				<div className="c-home-section-social-proof-grid">
					<span className="c-home-section-social-proof-grid-item">
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

