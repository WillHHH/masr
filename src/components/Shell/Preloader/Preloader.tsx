import { Player } from "@lottiefiles/react-lottie-player";
import React, { useRef, useState } from "react";

import styles from "./Preloader.module.scss";

const Preloader = () => {
  const playerRef = useRef<any>();
  const [speed, setSpeed] = useState(1);
  const onEvent = (event) => {
    switch (event) {
      case "complete":
        setSpeed(speed * -1);
        playerRef.current.setPlayerSpeed(speed);
        playerRef.current.play();
        break;
    }
  };
  return (
    <div className={styles.base}>
      <Player
        ref={playerRef}
        autoplay
        onEvent={onEvent}
        speed={speed}
        keepLastFrame
        src="/images/logo-animation-data.json"
        style={{ height: "auto", width: "300px" }}
      />
    </div>
  );
};

export default Preloader;
