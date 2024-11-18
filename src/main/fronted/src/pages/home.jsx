import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getlist, postList } from "../api/Home.js"; // getlist 함수 import
import { FaRegTrashCan } from "react-icons/fa6";
import "./button.css";
import '../App.css';

// Styled-components
const Background = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: #FDFBF1;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
`;

const UserInfoContainer = styled.div`
    width: 30rem;
    text-align: center;
    margin-top: 3rem;
`;

const UserInfoLine = styled.div`
    background-color: #DAE9FE;
    width: 30rem;
    height: 0.3rem;
    margin-top: 0.5rem;
    border-radius: 1rem;
`;

const UserInfo = styled.h1`
    color: black;
    font-size: 2.7rem;
    font-family: MainFont;
`;

const ToDoListContainer = styled.div`
    width: 50rem;
    height: 50rem;
    padding: 2rem;
    margin-top: 3rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-top: 0.3rem solid #DAE9FE;
    border-left: 0.3rem solid #DAE9FE;
    border-right: 0.3rem solid #DAE9FE;
    border-top-left-radius: 2rem;
    border-top-right-radius: 2rem;
    background-color: white;
`;

const InsertContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 2rem;
`;

const InsertText = styled.label`
    color: black;
    font-size: 1.5rem;
    margin-right: 1rem;
    font-family: MainFont;
`;

const InsertTitle = styled.input`
    width: 25rem;
    height: 2rem;
    margin-right: 1rem;
    padding: 0 1rem;
    font-size: 1rem;
    border-radius: 5px;
    border: 1px solid #ccc;
`;

const InsertButton = styled.button`
    width: 5rem;
    height: 2.3rem;
    font-size: 1rem;
    background-color: #DAE9FE;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    &:hover {
        background-color: #A7D1FF;
    }
    font-family: MainFont;
`;

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    margin-top: 2rem;
`;

const Tr = styled.tr`
    display: flex;
    align-items: center;
    justify-content: space-between; /* 내부 요소를 좌, 중, 우로 정렬 */
    border-bottom: 0.1rem solid black;
    padding: 0.5rem 0;
    margin-right: 1rem;
    font-size: 1.3rem;
    font-family: MainFont;
`;

const Td = styled.div`
    flex: 1; 
    display: flex;
    align-items: center;
`;

const CheckBoxWrapper = styled.div`
    margin-left: 1rem;
`;

const CenterTd = styled(Td)`
    justify-content: center; 
    text-align: center;
`;

const ButtonContainer = styled(Td)`
    justify-content: flex-end; 
    gap: 5px; 
`;

const StyledTrashIcon = styled(FaRegTrashCan)`
    color: black; 
    font-size: 1rem; 
`;


const CustomCheckBox = styled.input`
    display: none; /* 기본 체크박스를 숨깁니다 */

    &:checked + label {
        background-color: #A7D1FF;
        border-color: #A7D1FF;
    }
`;

const CheckBoxLabel = styled.label`
    width: 1.5rem;
    height: 1.5rem;
    border: 2px solid #ccc;
    border-radius: 4px;
    display: inline-block;
    cursor: pointer;
    position: relative;
    background-color: white;
    transition: background-color 0.3s ease, border-color 0.3s ease;
    
    &::after {
        content: '';
        position: absolute;
        top: 2px;
        left: 7px;
        width: 0.4rem;
        height: 0.8rem;
        border: solid #fff;
        border-width: 0 0.2rem 0.2rem 0;
        transform: rotate(45deg);
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    input:checked + &::after {
        opacity: 1; 
    }
`;





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
            setToDoList((prev) => [...prev, newItem]); // 기존 목록에 추가
            setTitle(""); // 입력 필드 초기화
        } catch (err) {
            console.error("Error adding item:", err);
            alert("Failed to add the item. Please try again.");
        }
    };

    return (
        <Background>
            <UserInfoContainer>
                <UserInfo>ToDo List</UserInfo>
                <UserInfoLine />
            </UserInfoContainer>

            <ToDoListContainer>
                <InsertContainer>
                    <InsertText>Todo</InsertText>
                    <InsertTitle
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <InsertButton onClick={handleSubmit}>Submit</InsertButton>
                </InsertContainer>
                <Table>
                    <tbody>
                    {toDoList?.map((item) => (
                        <Tr key={item.id}>
                            <Td>
                                <CheckBoxWrapper>
                                    <CustomCheckBox type="checkbox" id={`check-${item.id}`} />
                                    <CheckBoxLabel htmlFor={`check-${item.id}`} />


                                </CheckBoxWrapper>
                            </Td>
                            <CenterTd>{item.title}</CenterTd>
                            <Td>
                                <ButtonContainer>
                                    <div className="button" style={{ width: "60px", height: "30px" }}>
                                        <p className="btnText" style={{ fontSize: "10px" }}>Edit</p>
                                        <div className="btnTwo" style={{ height: "60px", marginTop: "-60px" }}>
                                            <p className="btnText2" style={{ fontSize: "10px" }}></p>
                                        </div>
                                    </div>
                                    <div className="button" style={{ width: "60px", height: "30px" }}>
                                        <p className="btnText" style={{ fontSize: "10px" }}>Delete</p>
                                        <div className="btnTwo" style={{ height: "60px", marginTop: "-60px" }}>
                                            <p className="btnText2" style={{ fontSize: "10px" }}><StyledTrashIcon /></p>
                                        </div>
                                    </div>
                                </ButtonContainer>
                            </Td>
                        </Tr>
                    ))}
                    </tbody>
                </Table>
            </ToDoListContainer>
        </Background>
    );
}
