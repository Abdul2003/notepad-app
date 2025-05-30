"use client";
import { FC, useEffect, useState } from "react";
import { createData, updateData, getData } from "../prisma-db";
import { Button, Card, Input, List, Modal } from "antd";
// import { NoteProps } from "../page";

const CreateNote: FC = () => {
  type Note = {
    id: number;
    title: string | null;
    content: string | null;
  };
  const { TextArea } = Input;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [note, setNote] = useState<Note[]>();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [updateId, setUpdateId] = useState<number>();
  const [updateTitle, setUpdateTitle] = useState("");
  const [updateContent, setUpdateContent] = useState("");
  useEffect(() => {
    console.log(`${note} has changed`);

    fetchData();
  }, []);
  const fetchData = async () => {
    const data = await getData();
    setNote(data);
    console.log("function called");
  };
  // CREATE NOTE MODAL
  const showModal = () => {
    setIsModalOpen(true);
  };

  const createNote = async () => {
    createData(title, content);
    // const data = await getData();
    // setNote(data.reverse());
    fetchData();
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // UPDATE NOTE MODAL
  const showUpdateModal = () => {
    setIsUpdateModalOpen(true);
  };
  const updateNote = async () => {
    updateData(updateId!, { title: updateTitle, content: updateContent });
    // const data = await getData();
    // setNote(data.reverse());
    fetchData();
    setIsUpdateModalOpen(false);
  };

  const handleUpdateCancel = () => {
    setIsUpdateModalOpen(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
      {/* CREATE MODAL */}
      <Modal
        title={
          <Input
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
          />
        }
        closable={{ "aria-label": "Custom Close Button" }}
        open={isModalOpen}
        onOk={createNote}
        onCancel={handleCancel}
      >
        <TextArea
          onChange={(e) => setContent(e.target.value)}
          placeholder="Note here"
          rows={6}
        />
      </Modal>
      {/* UPDATE MODAL */}
      <Modal
        mask={false}
        title={
          <Input
            value={updateTitle}
            onChange={(e) => setUpdateTitle(e.target.value)}
            placeholder="Title"
          />
        }
        closable={{ "aria-label": "Custom Close Button" }}
        open={isUpdateModalOpen}
        onOk={updateNote}
        onCancel={handleUpdateCancel}
      >
        <TextArea
          value={updateContent}
          onChange={(e) => setUpdateContent(e.target.value)}
          placeholder="Note here"
          rows={6}
        />
      </Modal>
      <List
        itemLayout="horizontal"
        grid={{ gutter: 16, column: 4 }}
        dataSource={note}
        renderItem={(item) => (
          <>
            <List.Item>
              <Card
                onClick={() => {
                  setUpdateId(item.id);
                  setUpdateTitle(item.title!);
                  setUpdateContent(item.content!);
                  showUpdateModal();
                }}
                title={item.title}
                variant="borderless"
              >
                {item.content}
              </Card>
            </List.Item>
          </>
        )}
      ></List>
    </>
  );
};
export default CreateNote;
