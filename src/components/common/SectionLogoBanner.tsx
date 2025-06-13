import styles from "@/styles/common/SectionLogoBanner.module.scss";

import {clsx} from "clsx";
import Image from "next/image";

import {SectionLogoBannerList} from "@/utils";

export const SectionLogoBanner = () => {
	return (
		<section className={clsx(styles.cSectionLogoBanner, "c-section-logo-banner")}>

			<div className="c-container">

				<p>Backed by</p>

				<div className="c-section-logo-banner-grid">
					{SectionLogoBannerList.map((logo, logoIdx) => (
						<span key={logoIdx} className="c-section-logo-banner-grid-item">
							<Image
								alt={logo.title}
								src={logo.image}
								width={113}
								height={30}
							/>
						</span>
					))}
				</div>

			</div>

		</section>
	);
};

