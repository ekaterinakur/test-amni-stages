import React from 'react';
import './styles/App.scss';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './store';
import { resetStages } from './store/stages-reducer';
import { Button, Card, ConfigProvider, Row} from 'antd';
import Layout, { Content, Header } from 'antd/es/layout/layout';
import Settings from './components/Settings';
import Carousel from './components/Carousel';
import CreateStage from './components/CreateStage';
import StageList from './components/StageList';
import { antdConfig } from './styles/antd-config';

function App() {
  const stages = useSelector((state: RootState) => state.stages.stages);
  const dispatch = useDispatch();

  const handleResetStages = () => {
    dispatch(resetStages());
  }

  return (
    <ConfigProvider theme={antdConfig}>
      <Layout className='app-layout'>
        <Header className='app-header'>
          <Button className='app-header-logo' type="link">AMNI</Button>
          <Settings />
        </Header>

        <Content className='app-container'>
          {/* Stages carousel */}
          <Carousel carouselItems={stages}/>
          
          <Card className='list-container'>
            {/* Create stage component */}
            <CreateStage />

            {/* Stages table */}
            {stages && stages.length
              ? <StageList stages={stages} />
              : null
            }

            {/* Bottom actions */}
            {stages && stages.length
              ? <Row justify={'center'} className='footer-actions'>
                  <Button className='reset-stages-btn' onClick={handleResetStages}>RESET</Button>
                </Row>
              : null
            }
          </Card>
        </Content>
      </Layout>
    </ConfigProvider>
  );
}

export default App;
