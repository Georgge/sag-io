import React from 'react'

export const MiniCoverImage = (props) => {
  const { metadata } = props;
  const imageData = metadata.picture[0];
  const imageBuffer = imageData.data;
  const bufferTo64 = new Buffer(imageBuffer.toString('base64'));
  return (
    <img
      className="mini-cover--image__with"
      src={`data:${imageData.format};base64, ${bufferTo64}`}
      alt={metadata.title}/>
  );
}

export const MiniCoverData = (props) => {
  const { title = '', artist = '' } = props;
  return (
    <div className="mini-cover--tags">
      <p>{title}</p>
      <p>{artist}</p>
    </div>
  );
}

const dataItem = (type, value) => {
  return (
    <div className="cover-data--item">
      <div className="cover-data--icon">
        <img src={`img/${type}-icon.png`} alt={value} />
      </div>
      <div className="cover-data--value">
        <input
          className="cover-data--input"
          type="text"
          value={value} />
      </div>
    </div>
  );
}

export const CoverData = (props) => {
  const { state } = props;
  if (state.currentKey) {
    return (
      <div>
        {dataItem('title', state.title)}
        {dataItem('artist', state.artist)}
        {dataItem('album', state.album)}
        {dataItem('year', state.year)}
        {dataItem('genre', state.genre)}
        {dataItem('comment', state.comment)}
      </div>
    );
  } else {
    return <div className="cover-data__without">No data yet.</div>
  }
}

export const CoverImage = (props) => {
  const { picture } = props;
  if (!picture) {
    return <div className="cover--image__without"></div>
  } else {
    const metadata = picture[0];
    const imageBuffer = metadata.data;
    const { format } = metadata;
    const bufferTo64 = new Buffer(imageBuffer.toString('base64'));
    return (
      <img
        className="cover--image__with"
        src={`data:${format};base64, ${bufferTo64}`}
        alt={metadata.title}/>
    );
  }
}

export const CoverBackground = (props) => {
  const { picture } = props;
  if (!picture) {
    return <img src="img/sagio-bg-cover.jpg" alt="" className="cover-bg" />
  } else {
    const metadata = picture[0];
    const imageBuffer = metadata.data;
    const { format } = metadata;
    const bufferTo64 = new Buffer(imageBuffer.toString('base64'));
    return <img src={`data:${format};base64, ${bufferTo64}`}
            alt=""
            className="cover-bg" />
  }
}
