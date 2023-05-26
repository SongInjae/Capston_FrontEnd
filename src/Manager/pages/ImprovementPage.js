import styled from 'styled-components';

import Penalty from './Improve/Penalty';
import Notify from './Improve/Notify';

const BoardBlock = styled.div`
  //display: flex;
  margin-left: 1.5rem;
  margin-top: 1.5rem;
`;

const ImprovementPage = () => {
  return (
    <BoardBlock>
      <Notify />
      <Penalty />
    </BoardBlock>
  );
};

export default ImprovementPage;
