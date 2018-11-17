import React from 'react';

export const CurrentCover = (props) => {
  const { soundPicture, soundTitle } = props;
  if (soundPicture) {
    const imageBuffer = soundPicture[0].data;
    const { format } = soundPicture;
    const bufferTo64 = new Buffer(imageBuffer.toString('base64'));
    return (
      <img
        className="cover-player__with"
        src={`data:${format};base64, ${bufferTo64}`}
        alt={soundTitle} />
    );
  } else {
    return <div className="cover-player__without"></div>
  }
  
}

export const CurrentCoverData = (props) => {
  const { soundTitle = 'No playing', soundArtist = '' } = props;
  console.log(props);
  return (
    <div className="cover-player--data">
      <div>{soundTitle}</div>
      <div>{soundArtist}</div>
    </div>
  );
}
