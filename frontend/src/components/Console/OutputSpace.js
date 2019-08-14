import styled from 'styled-components';

const OutputSpace = styled('div')`
  border: none;
  border-radius: 4px;
  padding: 0;
  > pre {
    padding: 0 5px 0 5px;
  }
  max-height: 250px;
  overflow-y: auto;
  font-size: 13px;

  background-color: black;
  color: white;
`;

export default OutputSpace;
