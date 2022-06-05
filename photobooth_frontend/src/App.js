import React, { Component } from "react";
import "./App.css";
import CameraWindow from "./CameraWindow/CameraWindow";
// import axios from "axios";
// import Card from "./Card/Card";
// import CardList from "./CardList";

class App extends Component {
  constructor() {
    super();
    this.state = {
      width: 500,
      height: 0,
    };
  }

  // buttonClick = () => {
  //   this.updateCard();
  // };

  render() {
    // const { ip, width, height, filter, streaming, date, time, cards } =
    //   this.state;

    return (
      <div className="App tc">
        <CameraWindow />

        {/* <Card
          imageUrl={`https://media.istockphoto.com/photos/slave-hands-broken-chains-with-bird-flying-picture-id1296601764?b=1&k=20&m=1296601764&s=170667a&w=0&h=0hjKKZZYp2Wl1BRxopegdWrJwTwi1Vlbs_aXdmhhr_o=`}
          ip={ip}
          date={date}
          time={time}
        /> */}
        {/* <ImageDisplay /> */}
        {/* <Gallery /> */}
      </div>
    );
  }
}

export default App;
