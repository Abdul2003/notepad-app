"use server";
// import Image from "next/image";
import { Col, Flex, Input, Row } from "antd";
import CreateNote from "./components/createNote";
import { getData } from "./prisma-db";
export type Note = {
  id: number;
  title: string | null;
  content: string | null;
};
export type NoteProps = {
  notes: Note[];
};

export async function getDat() {
  return await getData();
}
export default async function Home() {
  return (
    <>
      <div className="p-8 w-full shadow-md ">
        <Row justify={"center"}>
          <Col span={8}>
            <Flex justify="center">
              {" "}
              <h1>Notepad App</h1>
            </Flex>
          </Col>
          <Col span={8}>
            <Flex justify="center">
              {" "}
              <Input />
            </Flex>
          </Col>
          <Col span={8}>
            <Flex justify="center">
              <h1>user icon</h1>
            </Flex>
          </Col>
        </Row>
      </div>

      <CreateNote />
    </>
  );
}
