import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateStages } from "../store/stages-reducer";
import type { IStage } from "../types";
import { DragDropContext, Draggable, Droppable, DropResult } from "react-beautiful-dnd";
import { Input, Button, List } from "antd";

interface StagesTableProps {
	stages: IStage[];
}

function StageList({
	stages,
}: StagesTableProps) {
  const dispatch = useDispatch();
  const [editingStageId, setEditingStage] = useState<string | null>(null);
  const [updatedTitle, setUpdatedTitle] = useState<string>('');

	const setEditMode = (stage: IStage) => {
		setUpdatedTitle(stage.title);
		setEditingStage(stage.id);
	}

	const cancelEditMode = () => {
		setEditingStage(null);
		setUpdatedTitle('');
	}

	const onChangeStage = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUpdatedTitle(e.target.value);
	}

	const updateStage = () => {
		const copy: IStage[] = JSON.parse(JSON.stringify(stages));

		const updatedStages = copy.map(stage => {
			if (stage.id === editingStageId) {
				stage.title = updatedTitle;
			}

			return stage;
		});

		dispatch(updateStages(updatedStages));
		cancelEditMode();
	}

	const removeStage = (idToRemove: string) => {
		const updatedStages = stages
			.filter(stage => stage.id !== idToRemove)
			.map((stage, index) => ({
				...stage,
				index: index + 1
			}));

		dispatch(updateStages(updatedStages));

		if (editingStageId) {
			cancelEditMode();
		}
	}

	const getListItemActions  = (stage: IStage) => {
		const editBtn = editingStageId && editingStageId === stage.id
			? <Button className='list-btn btn-blue' onClick={() => updateStage()}>SAVE</Button>
			: <Button className='list-btn btn-blue' onClick={() => setEditMode(stage)}>EDIT</Button>

		return [
			editBtn,
			<Button className='list-btn btn-red' onClick={() => removeStage(stage.id)}>DELETE</Button>,
		]
	}

	const reorderStages = (stages: IStage[], startIndex: number, endIndex: number) => {
		const copy = [...stages];
		const [removed] = copy.splice(startIndex, 1);
		copy.splice(endIndex, 0, removed);

		const updatedStages = copy.map((stage, index) => ({
			...stage,
			index: index + 1
		}));
	
		return updatedStages;
	};

  const onDragEnd = (dropResult: DropResult) => {
    const { destination, source, reason } = dropResult;

    // nothing to do
    if (!destination || reason === "CANCEL") {
      return;
    }

    const updatedStages = reorderStages(
			stages,
      source.index,
      destination.index,
		);

    dispatch(updateStages(updatedStages));
  };

  return (
		<DragDropContext onDragEnd={onDragEnd}>
			<Droppable droppableId='stages'>
        {(provided) => (
					<div ref={provided.innerRef}>
						<List className='stage-list' itemLayout="horizontal">
							{stages.map((stage, index) => (
								<Draggable key={stage.id} draggableId={stage.id} index={index}>
									{(provided) => (
										<List.Item
											key={stage.id}
											ref={provided.innerRef}
											{...provided.draggableProps}
											{...provided.dragHandleProps}
											// style={{ backgroundColor: snapshot.draggingOver ? 'rgba(255, 234, 225, 0.2)' : 'transparent'  }}
											actions={getListItemActions(stage)}
										>
											<div className='stage-list-idx'>{stage.index}</div>
											{editingStageId && editingStageId === stage.id
												? <Input
														value={updatedTitle} 
														onChange={onChangeStage} 
														onPressEnter={updateStage} 
														onBlur={cancelEditMode}
													/>
												: <div className='stage-list-title'>{stage.title}</div>
											}
										</List.Item>
									)}
								</Draggable>
							))}
							{provided.placeholder}
						</List>
					</div>
        )}
      </Droppable>
		</DragDropContext>
  );
};

export default StageList; 
