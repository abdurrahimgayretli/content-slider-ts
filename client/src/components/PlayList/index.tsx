import React, { useEffect, useState } from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DroppableProvided,
  DropResult,
} from "react-beautiful-dnd";
import { useGallery } from "../../context/GalleryContext";
import { ContextStateType } from "../../@types/gallery";
import { Button, Flex } from "@chakra-ui/react";

const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
  padding: 10,
  margin: `10px 20px 10px 20px`,
  background: isDragging ? "#4a2975" : "white",
  color: isDragging ? "white" : "black",
  border: `1px solid black`,
  fontSize: `10px`,
  borderRadius: `5px`,

  ...draggableStyle,
});

export default function Playlist() {
  const { gallery, saveGallery } = useGallery() as ContextStateType;

  const [todo, setTodo] = useState(gallery);

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;

    const items = Array.from(todo);
    const [newOrder] = items.splice(source.index, 1);
    items.splice(destination.index, 0, newOrder);

    setTodo(items);

    saveGallery(items);
  };

  useEffect(() => {
    console.log(gallery);
  }, [saveGallery]);

  return (
    <div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="todo">
          {(provided: DroppableProvided) => (
            <div
              className="todo"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {provided.placeholder}
              {todo.map((item: any, index: number) => {
                return (
                  <Draggable
                    key={index}
                    draggableId={String(index)}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <Flex>
                        <Button mt={"10px"}>X</Button>
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style
                          )}
                        >
                          {item?.name}
                        </div>
                      </Flex>
                    )}
                  </Draggable>
                );
              })}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
