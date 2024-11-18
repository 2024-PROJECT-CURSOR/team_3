import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getlist, postList } from "../api/Home.js"; // getlist 함수 import

// Styled-components
const Background = styled.div`
    background-color: blue;
    color: white;
    padding: 20px;
`;

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
`;

const Th = styled.th`
    background-color: darkblue;
    color: white;
    padding: 10px;
    border: 1px solid white;
`;

const Td = styled.td`
    padding: 10px;
    border: 1px solid white;
    text-align: center;
`;

const InsertData = styled.div`
    height: 1rem;
    display: flex;
    text-align: center;
    color: black;
`

const InsertTitle = styled.input`

`

const InsertButton = styled.button`
    
`

const CheckBox = styled.input`

`

export default function Home() {
    const [toDoList, setToDoList] = useState([]);
    const [title, setTitle] = useState("");

    // Fetch data on mount
    useEffect(() => {
        loadList();
    }, []);

    // 데이터 목록을 불러오는 함수
    const loadList = async () => {
        try {
            const res = await getlist();
            setToDoList(res);
        } catch (err) {
            console.error("Error fetching list:", err);
        }
    };

    // 새로운 데이터를 추가하는 함수
    const handleSubmit = async () => {
        if (!title.trim()) {
            alert("Title cannot be empty!");
            return;
        }

        try {
            const newItem = await postList(title); // 서버에 새로운 아이템 추가
            setToDoList(prev => [...prev, newItem]); // 기존 목록에 추가
            setTitle(""); // 입력 필드 초기화
        } catch (err) {
            console.error("Error adding item:", err);
            alert("Failed to add the item. Please try again.");
        }
    };

    return (
        <Background>
            <h1>Todo List</h1>
            <InsertData>
                <InsertTitle
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <InsertButton onClick={handleSubmit}>
                    Submit
                </InsertButton>
            </InsertData>
            <Table>
                <thead>
                <tr>
                    <Th>ID</Th>
                    <Th>Title</Th>
                    <Th>Description</Th>
                </tr>
                </thead>
                <tbody>
                {toDoList?.map(item => (
                    <tr key={item.id}>
                        <Td>{item.id}</Td>
                        <Td>{item.title}</Td>
                        <Td><CheckBox type="checkbox" checked={false}/></Td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </Background>
    );
}
