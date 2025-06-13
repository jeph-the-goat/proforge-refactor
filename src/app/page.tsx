import {
  HomeSectionHero,
  HomeSectionBanner,
  HomeSectionFeatures,
  HomeSectionBenefits,
  HomeSectionIntegration,
  HomeSectionTestimonial,
  HomeSectionPricing,
  HomeSectionSecurity,
  HomeSectionBlog
} from "@/components";


export default function Home() {
  return (
    <>
     <HomeSectionHero/>
      <HomeSectionBanner/>
      <HomeSectionFeatures/>
      <HomeSectionBenefits/>
      <HomeSectionIntegration/>
      <HomeSectionTestimonial/>
      <HomeSectionPricing/>
      <HomeSectionSecurity/>
      <HomeSectionBlog/>
    </>
  );
}
