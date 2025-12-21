import React from "react";
import Hero from "../Hero/Hero";
import Category from "../Category/Category";
import RecentBills from "../RecentBills/RecentBills";
import ExtraSection from "../ExtraSection/ExtraSection";

const Home = () => {
  return (
    <div>
      <Hero></Hero>
      <Category></Category>
      <RecentBills></RecentBills>
      <ExtraSection ></ExtraSection>
    </div>
  );
};

export default Home;