import React, { useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from './../store';
import { createStage } from '../store/stages-reducer';
import { Button, Input, Row } from 'antd';
import type { InputRef } from 'antd';
import type { IStage } from './../types';

function CreateStage() {
  const stages = useSelector((state: RootState) => state.stages.stages);
  const dispatch = useDispatch();

  const [addStageMode, setAddStageMode] = useState(false);
  const [newStageTitle, setNewStageTitle] = useState('');
  const inputRef = useRef<InputRef>(null);

  const onNewTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewStageTitle(e.target.value);
  }

  const handleSetEditMode = () => {
    setAddStageMode(true);

    setTimeout(() => {
      if (inputRef && inputRef.current) {
        inputRef.current.focus();
      }
    }, 0);
  }

  const handleAddStage = () => {
    if (!newStageTitle.length) {
      setAddStageMode(false);
      return;
    }

    const newStage: IStage = {
			// TODO normal id
      id: Math.random().toString(),
      title: newStageTitle,
      index: stages.length + 1,
    }

    dispatch(createStage(newStage));
    handleCancelAddMode();
  }

  const handleCancelAddMode = () => {
    setAddStageMode(false);
    setNewStageTitle('');
  }

  return (
		<Row justify={'end'} className='create-stage-actions'>
			{addStageMode
				? (
					<>
						<Input
              ref={inputRef}
              className='create-stage-input' 
              value={newStageTitle} 
              onChange={onNewTitleChange} 
              onPressEnter={handleAddStage}
            />
						<Button
              className='create-stage-btn'
              disabled={!newStageTitle}
              onClick={handleAddStage}
            >SAVE</Button>
						<Button className='create-stage-btn' onClick={handleCancelAddMode}>CANCEL</Button>
					</>
				)
				: <Button onClick={handleSetEditMode}>
						{stages && stages.length ? '+ Add Stage' : '+ Create first stage'}
					</Button>
			}
		</Row>
  );
}

export default CreateStage;
