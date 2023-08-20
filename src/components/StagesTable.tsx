import React, { useState } from "react";
import type { IStage } from "../types";
import { useDispatch } from "react-redux";
import { updateStages } from "../store/stages-reducer";
import { DragDropContext, Draggable, Droppable, DropResult } from "react-beautiful-dnd";
import { Table, Input, Row, Button } from "antd";

interface StagesTableProps {
	stages: IStage[];
}

// TODO remove; use list
// Problem: bug with inner input - don`t keep focus because of table rerendering
function StagesTable({
	stages,
}: StagesTableProps) {
  const dispatch = useDispatch();
  const [draggingStageId, setDraggingStageId] = useState<string | null>(null);
  const [editingStageId, setEditingStage] = useState<string | null>(null);
  const [updatedTitle, setUpdatedTitle] = useState<string>('');

	const setEditMode = (stage: IStage) => {
		setUpdatedTitle(stage.title);
		setEditingStage(stage.id);
	}

	const onChangeStage = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		e.stopPropagation();
		 console.log(e.target.value, '-------');
		setUpdatedTitle(e.target.value);
	}

	const updateStage = (stage: IStage) => {
		const copy: IStage[] = JSON.parse(JSON.stringify(stages));

		const updatedStages = copy.map(stage => {
			if (stage.id === editingStageId) {
				stage.title = updatedTitle;
			}

			return stage;
		});

		dispatch(updateStages(updatedStages));
		setEditingStage(null);
		setUpdatedTitle('');
	}

	const removeStage = (idToRemove: string) => {
		const updatedStages = stages
			.filter(stage => stage.id !== idToRemove)
			.map((stage, index) => ({
				...stage,
				index: index + 1
			}));

		dispatch(updateStages(updatedStages));
	}

	const tableColumns = [
		{
			title: "",
			dataIndex: "index"
		},
		{
			title: "Stage",
			dataIndex: "title",
			render: (content: string, stage: IStage) => (
				<>
					{editingStageId && editingStageId === stage.id
						? <Input value={updatedTitle} onChange={onChangeStage} />
						: <span>{content}</span>
					}
				</>
			),
		},
		{
			title: "",
			dataIndex: "id",
			render: (id: string, stage: IStage) => (
				<Row className='table-actions'>
					{editingStageId && editingStageId === stage.id
						? <Button className='table-btn btn-blue' onClick={() => updateStage(stage)}>SAVE</Button>
						: <Button className='table-btn btn-blue' onClick={() => setEditMode(stage)}>EDIT</Button>
					}
					<Button className='table-btn btn-red' onClick={() => removeStage(stage.id)}>DELETE</Button>
				</Row>
			),
		},
	];

	const DroppableTableBody = ({ ...props }) => {
    return (
      <Droppable
        droppableId='stages'
      >
        {(provided) => (
          <tbody
            ref={provided.innerRef}
            {...props}
            {...provided.droppableProps}
            className={props.className}
          ></tbody>
        )}
      </Droppable>
    );
  };

  const DraggableTableRow = ({ index, record, ...props }: any) => {
    const isGhosting = Boolean(draggingStageId) && draggingStageId !== record.id;

    return (
      <Draggable
        key={props["data-row-key"]}
        draggableId={props["data-row-key"]}
        index={index}
      >
        {(provided, snapshot) => {
          return (
            <tr
							id={props["data-row-key"]}
              ref={provided.innerRef}
              {...props}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              className={`row-item ${
                isGhosting ? "row-ghosting" : ""
              } ${snapshot.isDragging ? "row-dragging" : ""}`}
              // onClick={onClick}
              // onKeyDown={event => onKeyDown(event, provided, snapshot)}
            ></tr>
          );
        }}
      </Draggable>
    );
  };


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
      setDraggingStageId(null);
      return;
    }

    const updatedStages = reorderStages(
			stages,
      source.index,
      destination.index,
		);

    console.log("onDragEnd", { destination, source, reason } );

		// TODO dispatch
    dispatch(updateStages(updatedStages));
    setDraggingStageId(null);
  };

  /**
   * On click to row
   * Is preventing if there was a drag
   */
  const onClickRow = (e: React.MouseEvent<any, MouseEvent>, record: IStage) => {

  };

  return (
		<DragDropContext
			onDragEnd={onDragEnd}
		>
			<Table
				dataSource={stages}
				columns={tableColumns}
				rowKey="id"
				components={{
					body: {
						// Dropable - Custom tbody
						wrapper: (props: any) =>
							DroppableTableBody(props),
						// Dragable - Custom td
						row: (props: any) =>
							DraggableTableRow(props),
					}
				}}
				onRow={(record, index) => ({
					index,
					record,
					onClick: (e) => onClickRow(e, record),
				})}
				pagination={false}
			/>
		</DragDropContext>
  );
};

export default StagesTable; 
