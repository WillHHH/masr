import React from "react";
import cx from "classnames";
import styles from "./VideoPlayer.module.scss";
import Image from "next/image";

type VideoPlayerProps = {
  className?: string;
  videoId?: string;
  iframeProps?: any;
  isYoutube?: boolean;
  onClose?: () => void;
};

const VideoPlayer = ({
  className,
  videoId,
  iframeProps,
  isYoutube,
  onClose,
}: VideoPlayerProps) => {
  const ifrmProps = {
    allowFullScreen: true,
    ...iframeProps,
  };

  const videoURL = !!isYoutube
    ? `https://www.youtube.com/embed/${videoId}?rel=0`
    : `https://player.vimeo.com/video/${videoId}`;

  return (
    <div className={cx(styles.base, className)}>
      <button className={styles.close} onClick={() => onClose?.()}>
        <Image src={`/images/close.svg`} width={15} height={15} />
      </button>
      <iframe
        className={styles.iframe}
        title="Youtube / Vimeo"
        src={!!videoId ? videoURL : null}
        {...ifrmProps}
      />
    </div>
  );
};

export default VideoPlayer;
