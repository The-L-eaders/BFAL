import React from "react";
import "./SASS/About-us.scss";

export default function AboutUs() {
  return (
    <article>
      <section className="titleSection">
        <div className="title">
          <label>OUR TEAM</label>
        </div>
      </section>
      <section className="content">
        <section className="subContentSection">
          <div className="teamContent">
            <div className="teamCard">
              <div className="teamName">
                <label>Nihad Zeidan</label>
              </div>

              <a href="https://github.com/NihadZeidan" target="_blank">
                <img
                  className="teamCardImage"
                  src="https://avatars.githubusercontent.com/u/77915170?v=4"
                  alt="nihad"
                />
              </a>
            </div>
            <div className="teamCard">
              <div className="teamName">
                <label>Mohammad Alazzam</label>
              </div>
              <a href="https://github.com/MohdAzzam" target="_blank">
                <img
                  className="teamCardImage"
                  src="https://avatars.githubusercontent.com/u/48564462?v=4"
                  alt="mohammd"
                />
              </a>
            </div>
            <div className="teamCard">
              <div className="teamName">
                <label>Ghofran Dayyat</label>
              </div>
              <a href="https://github.com/GhofranDayyat" target="_blank">
                <img
                  className="teamCardImage"
                  src="https://avatars.githubusercontent.com/u/77917739?v=4"
                  alt="GhofranDayyat"
                />
              </a>
            </div>
            <div className="teamCard">
              <div className="teamName">
                <label>Zakeyah Abu Yasein</label>
              </div>
              <a href="https://github.com/zakeyah" target="_blank">
                <img
                  className="teamCardImage"
                  src="https://avatars.githubusercontent.com/u/77916748?v=4"
                  alt="Zakeyah"
                />
              </a>
            </div>
          </div>
        </section>
        <section className="subContentSection">
          <div className="subTitle">
            <label>OUR PHILOSOPHY</label>
          </div>
          <p className="ourP">
            TO MEET THE REGIONAL MARKET DEMANDS . WAS ESTABLISHED WITH E&M
            CORPORATION PHILOSOPHY OF PROTECTING THE GOLDEN TRIANGLE; BEST
            EFFORTS, INTEGRITY AND FAIRNESS.
          </p>
          <div className="subTitle">
            <label>OUR MISSION</label>
          </div>
          <p className="ourP">
            Make auction process easier and more accessible, by providing
            real-time auction web-application. Allow users not only to buy
            products but to be able also to sell products.
          </p>
        </section>
      </section>
    </article>
  );
}
