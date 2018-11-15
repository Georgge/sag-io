import React from 'react';
import Async from 'react-promise';
import { MiniCoverImage, MiniCoverData } from './Metadata';
import { CONSTANTS } from '../config/Constants';

const mm = window.require('music-metadata');

const saveInDB = (path, file, id, fileList) => {
  const { SagIoDB, total, spinner } = fileList;
  SagIoDB.update(
    { _id: CONSTANTS.FILES_COLLECTION_ID},
    {$set:{
        [id]: {
          _id: id,
          file,
          path,
        }
      }
    },
    { returnUpdatedDocs: true },
    (error, numAffected, affectedDocuments, upsert) => {
      /*if (total === affectedDocuments.files.length) {
        spinner();
      }*/
      const documentSize = Object.keys(affectedDocuments).length;
      if((documentSize - 1) === total)
        spinner();
  })
}

const tagsRender = (metadata, path, file, id, fileList) => {
  const { title = false, artist = false } = metadata.common;
  saveInDB(path, file, id, fileList);
  if (title && artist) {
    return <MiniCoverData title={title} artist={artist} />
  } else if (title && !artist) {
    return <MiniCoverData title={title} />
  } else if (!title && artist) {
    return <MiniCoverData title={file} artist={artist} />
  } else {
    return <MiniCoverData title={file} />
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
            ? <MiniCoverImage metadata={data.common}/>
            : <div className="mini-cover--image__without"></div>
          }
          <div></div>
        </div>
        { tagsRender(data, directory, file, id, fileList) }
      </div>} />
  );
}

