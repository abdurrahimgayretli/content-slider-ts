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
import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import { deleteGallery, fetchGallery } from "../../api";
import { useQuery } from "@tanstack/react-query";
import FormNavbar from "../Navbar";

const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
  padding: 10,
  margin: `10px 20px 10px 20px`,
  background: isDragging ? "#4a2975" : "white",
  color: isDragging ? "white" : "black",
  border: `1px solid black`,
  fontSize: `10px`,
  borderRadius: `5px`,
  display: "flex",
  flex: 1,

  ...draggableStyle,
});

export default function Playlist() {
  const { isLoading, isError, data } = useQuery(["gallery"], () =>
    fetchGallery()
  );
  const { gallery, updateGallery } = useGallery() as ContextStateType;

  const [visible, setVisible] = useState(true);
  const [todo, setTodo] = useState(gallery);

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;

    const items = Array.from(todo);
    const [newOrder] = items.splice(source.index, 1);
    items.splice(destination.index, 0, newOrder);

    setTodo(items);

    updateGallery(items);
  };

  const deleteItem = async (index: number) => {
    updateGallery(gallery.filter((item) => item.name !== gallery[index].name));
    setTodo(gallery.filter((item) => item.name !== gallery[index].name));
    if (index >= 2) await deleteGallery(data[index - 2]._id);
  };

  useEffect(() => {
    console.log(gallery);
  }, [updateGallery]);

  useEffect(() => {}, [visible]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error.</div>;
  }
  return (
    <>
      {visible && (
        <div className="list">
          <Flex
            align="center"
            justify="right"
            width={"full"}
            justifyContent="center"
          >
            <Box p={6} rounded="md">
              <Box textAlign="center">
                <FormNavbar />
                <Heading>
                  Add Content <b />
                  <Button
                    onClick={() => {
                      setVisible(false);
                    }}
                    type="button"
                    colorScheme={"red"}
                  >
                    X
                  </Button>
                </Heading>
              </Box>
              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="todo">
                  {(provided) => (
                    <div
                      className="todo"
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    >
                      {todo.map((item: any, index: number) => {
                        return (
                          <Draggable
                            key={index}
                            draggableId={String(index)}
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <Flex>
                                <Button
                                  mt={"10px"}
                                  onClick={() => deleteItem(index)}
                                >
                                  X
                                </Button>
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
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            </Box>
          </Flex>
        </div>
      )}
      {!visible && (
        <div className="form">
          <Button
            onClick={() => {
              setVisible(true);
            }}
            colorScheme={"red"}
          >
            X
          </Button>
        </div>
      )}
    </>
  );
}
