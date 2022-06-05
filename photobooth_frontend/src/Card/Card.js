import React from "react";

const Card = ({ date, time, imageUrl, ip, filter }) => {
  return !ip || !date || !time ? (
    <div>
      {/* <div className="tc grow bg-light-green br3 pa3 ma2 dib bw2 shadow-5">
        <img src="no-photo.jpg" />
      </div> */}
    </div>
  ) : (
    <div>
      <a href={imageUrl} download="download">
        <div className="tc grow bg-washed-red br3 pa3 ma2 dib bw2 shadow-5 ">
          <div className="">
            <img
              // className={filter}
              style={{ filter: filter }}
              src={imageUrl}
            />
          </div>
          <div className="bg-white">
            <p>IP address:{ip}</p>
            <p>
              Photo captured on {date} at {time}
            </p>
          </div>
        </div>
      </a>
    </div>
  );
};

export default Card;
