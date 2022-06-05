import React, { useRef, useState, useEffect } from "react";
import Scroll from "../Scroll";
import CardList from "../CardList";
import "./CameraWindow.css";

import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";

const CameraWindow = (props) => {
  const videoRef = useRef(null);
  const photoRef = useRef(null);
  const canvasRef = useRef(null);
  const photoFilter = useRef(null);
  const width = 280;
  const [height, setHeight] = useState(0);
  const [streaming, setStreaming] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [ip, setIp] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const [cards, setCards] = useState([]);
  const [filter, setFilter] = useState("none");

  const newCards = cards.filter((card, i) => {
    return i < 4;
  });

  const getVideo = () => {
    // console.log("helloJI");
    navigator.mediaDevices
      .getUserMedia({
        video: true,
      })
      .then((stream) => {
        let video = videoRef.current;
        video.crossOrigin = "anonymous";
        video.srcObject = stream;
        video.play();
      })
      .catch((err) => {
        console.error(err, "this is frustrating");
      });
  };

  const takePicture = () => {
    let canvas = canvasRef.current;
    var context = canvas.getContext("2d");
    if (height && width) {
      let video = videoRef.current;
      let photo = photoRef.current;
      canvas.width = width;
      canvas.height = height;
      // video.style.filter = filter;
      context.drawImage(video, 0, 0, width, height);

      let data = canvas.toDataURL("image/png");
      setImageUrl(data);
      photo.setAttribute("src", data);
      canvas.style.display = "none";
      photo.style.display = "none";
      console.log(1);
      onClickedPicture();
    }
  };

  const clearImage = () => {
    setFilter("none");
    photoFilter.current.selectedIndex = 0;
    videoRef.current.filter = "none";
    setCards([]);
  };
  const clicked = (event) => {
    takePicture();
    event.preventDefault();
  };
  const thenPlay = (event) => {
    if (!streaming) {
      let video = videoRef.current;

      setHeight(video.videoHeight / (video.videoWidth / width));

      setStreaming(true);
    }
  };

  const updateCard = () => {
    console.log(4);
    const newImage = {
      date: date,
      time: time,
      ip: ip,
      imageUrl: imageUrl,
      filter: filter,
    };
    console.log("hehe", filter);
    console.log(newImage);

    setCards([newImage, ...cards]);
    console.log(cards);
    console.log(5);
  };
  const getImageData = () => {
    var today = new Date();
    fetch("https://geolocation-db.com/json/")
      .then((response) => response.json())
      .then((data) => {
        setIp(data.IPv4);
        setDate(
          today.getFullYear() +
            "-" +
            (today.getMonth() + 1) +
            "-" +
            today.getDate()
        );
        setTime(
          today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
        );
      })

      .catch((err) => console.log(err));
    console.log(2);

    console.log(ip + time + date);
    console.log(3);
  };
  const onClickedPicture = () => {
    getImageData();
    // updateCard();
    console.log(cards);
  };
  const handleChange = (event) => {
    console.log(event.target.value);
    setFilter(event.target.value);
  };
  useEffect(() => {
    console.log("A");
    videoRef.current.style.filter = filter;
  }, [filter]);

  useEffect(() => {
    console.log("B");
    canvasRef.current.style.display = "none";
    photoRef.current.style.display = "none";

    clearImage();
    getVideo();
  }, [videoRef]);

  useEffect(() => {
    console.log("C");
    updateCard();
  }, [time]);

  return (
    <div className="hello tc">
      {/* <h1 className="f1">PHOTOBOOTH</h1> */}
      <div className=" tc flex items-center top-container ">
        <video
          className="video grow dib bw2 shadow-5"
          ref={videoRef}
          onCanPlay={(event) => thenPlay(event)}
        >
          hello
        </video>

        <PhotoCameraIcon
          onClick={clicked}
          className="btn startbutton link  dim "
        ></PhotoCameraIcon>
        <CancelPresentationIcon
          onClick={clearImage}
          className=" btn clearbutton link  dim"
        ></CancelPresentationIcon>

        <select
          ref={photoFilter}
          value={filter}
          onChange={handleChange}
          className="btn selectbutton link  dim "
        >
          <option value="none">Normal</option>
          <option value="grayscale(100%)">Grayscale</option>
          <option value="sepia(100%)">Sepia</option>
          <option value="invert(100%)">Invert</option>
          <option value="hue-rotate(90deg)">Hue</option>
          <option value="blur(10px)">Blur</option>
          <option value="contrast(200%)">Contrast</option>
        </select>
        {/* <button onClick={clicked} >
          Capture
        </button>

        <button onClick={clearImage} className="clearbutton">
          Clear
        </button> */}
      </div>
      <Scroll>
        <CardList cards={newCards} />
      </Scroll>
      <div>
        <canvas
          // className="canvas"
          ref={canvasRef}
          height={height}
          width={width}
        ></canvas>

        <img
          ref={photoRef}
          // className="photo"
          // alt="The screen capture will appear in this box."
          height={height}
          width={width}
        />
      </div>
    </div>
  );
};

export default CameraWindow;
