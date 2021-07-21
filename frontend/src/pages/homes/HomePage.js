import React from 'react';
import SearchBanner from "../../components/banner/banner3/SearchBanner";

import sectiondata from "../../store/store";
import GeneralHeader from "../../components/common/GeneralHeader";


function HomePage() {
    return (
        <main className="home-3">{/* Banner Three */}
            {/* Header */}
            <GeneralHeader />

            {/* Search Banner */}
            <SearchBanner bgImg={sectiondata.herobanners.banner6.bgimage} herotitle={sectiondata.herobanners.banner3.title} herocontent={sectiondata.herobanners.banner3.content} />
        </main>
    );
}

export default HomePage;