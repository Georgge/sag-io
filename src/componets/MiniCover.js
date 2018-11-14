import React from 'react';
import Async from 'react-promise';
const mm = window.require('music-metadata');

const saveInDB = (path, file, id, fileList) => {
  const { SagIoDB, total, spinner } = fileList;
  SagIoDB.update(
    { _id: 'sagio-files' },
    { $push:
      { files: {
          _id: id, path,
          file
        }
      }
    },
    { returnUpdatedDocs: true },
    (error, numAffected, affectedDocuments, upsert) => {
      if (total === affectedDocuments.files.length) {
        spinner();
      }
  })
}

const imageRender = (metadata) => {
  const imageData = metadata.picture[0];
  const imageBuffer = imageData.data;
  const bufferTo64 = new Buffer(imageBuffer.toString('base64'));
  return (
    <img
      className="mini-cover--image__with"
      src={`data:${imageData.format};base64, ${bufferTo64}`}
      alt={metadata.title}/>
  );
};

const tagsRender = (metadata, path, file, id, fileList) => {
  const { title = false, artist = false } = metadata.common;
  saveInDB(path, file, id, fileList);
  if (title && artist) {
    return (
      <div className="mini-cover--tags">
        <p>{title}</p>
        <p>{artist}</p>
      </div>
    );
  } else if (title && !artist) {
    return (
      <div className="mini-cover--tags">
        <p>{title}</p>
        <p></p>
      </div>
    );
  } else if (!title && artist) {
    return (
      <div className="mini-cover--tags">
        <p>{file}</p>
        <p>{artist}</p>
      </div>
    );
  } else {
    return (
      <div className="mini-cover--tags">
        <p>{file}</p>
        <p></p>
      </div>
    );
  }
};

export const MiniCover = (props) => {
  const filePath = `${props.directory}/${props.file}`;
  const { directory, id,
    SagIoDB, file,
    total, spinner
  } = props;

  const fileList = {
    SagIoDB,
    total,
    spinner
  }

  return (
    <Async
      promise={mm.parseFile(filePath)}
      then={data => <div>
        <div className="mini-cover--image">
          {data.common.picture
            ? imageRender(data.common)
            : <div className="mini-cover--image__without"></div>
          }
          <div></div>
        </div>
        { tagsRender(data, directory, file, id, fileList) }
      </div>} />
  );
}

