import styled from 'styled-components';

import Penalty from './Improve/Penalty';
import Discomfort from './Improve/Discomfort';

const BoardBlock = styled.div`
  display: flex;
  margin-top: 2rem;
`;

const ImprovementPage = () => {
  return (
    <BoardBlock>
      <Penalty />
      <Discomfort />
    </BoardBlock>
  );
};

export default ImprovementPage;
