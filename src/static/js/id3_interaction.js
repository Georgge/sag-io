import NodeID3 from 'node-id3';

export function readId3Tags(pathFile) {
  const tags = NodeID3.read(pathFile);
  return tags;
}
