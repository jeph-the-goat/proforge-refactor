import {
  HomeSectionHero,
  SectionLogoBanner,
  HomeSectionFeatures,
  HomeSectionBenefits,
  HomeSectionIntegration,
  SectionTestimonial,
  HomeSectionPricing,
  HomeSectionSecurity,
  HomeSectionBlog,
} from "@/components";


export default function Home() {
  return (
    <>
      <HomeSectionHero/>
      <SectionLogoBanner/>
      <HomeSectionFeatures/>
      <HomeSectionBenefits/>
      <HomeSectionIntegration/>
      <SectionTestimonial/>
      <HomeSectionPricing/>
      <HomeSectionSecurity/>
      <HomeSectionBlog/>
    </>
  );
}
