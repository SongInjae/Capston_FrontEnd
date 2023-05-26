import React from "react";
import styled from "styled-components";
import Header from "../component/header";

const NoticeBodyWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-top: 20px;
`;


const TitleWrapper = styled.div`
    display : flex;
    flex-direction: row;
    padding-top: 5px;
    padding-bottom: 5px;
    margin-bottom: 10px;
    background-color: #F2F2F2;
    
`;

const Divider = styled.div`
    height : 1px;
    display : flex;
    background-color: #F2F2F2;
    margin-top: 10px;
    margin-bottom: 10px;
`

const NoticeThumbnail = styled.div`
    display: flex;
    flex-direction: row;
    padding-top: 2px;
    padding-bottom: 2px;
    cursor: pointer;
`
const NumberCompo = styled.div`
    width : 4rem;
    text-align: center;
    font-size: 13px;
`
const SubjectCompo = styled.div`
    width : 15rem;
    font-size: 13px;
`
const WriterCompo = styled.div`
    width : 8rem;
    text-align: center;
    font-size: 13px;
`
const DateCompo = styled.div`
    width : 15rem;
    text-align: center;
    color : gray;
    font-size: 13px;
`
const BodyCompo = styled.div`
`


function NoticePage() {

    const dummyData = [
        {
            id: "1",
            subject: "1111111",
            writer: "관리자",
            date: "2023-05-24",
            body: "내용입니다."
        },
        {
            id: "2",
            subject: "2222222",
            writer: "관리자",
            date: "2023-05-24",
            body: "내용입니다."
        },
        {
            id: "3",
            subject: "3333333",
            writer: "관리자",
            date: "2023-05-24",
            body: "내용입니다."
        },
        {
            id: "4",
            subject: "4444444",
            writer: "관리자",
            date: "2023-05-24",
            body: "내용입니다."
        },
        {
            id: "5",
            subject: "55555555",
            writer: "관리자",
            date: "2023-05-24",
            body: "내용입니다."
        },

    ];

    return (
        <div>
            <Header>dd</Header>
            <NoticeBodyWrapper>
                <TitleWrapper>
                    <NumberCompo>번호</NumberCompo>
                    <WriterCompo>   작성자</WriterCompo>
                    <SubjectCompo>제목</SubjectCompo>

                    <DateCompo>작성일</DateCompo>
                </TitleWrapper>
                {
                    dummyData.map((data) => (
                        <div>
                            <NoticeThumbnail>
                                <NumberCompo>{data.id}</NumberCompo>
                                <WriterCompo>   {data.writer}</WriterCompo>
                                <SubjectCompo>{data.subject}</SubjectCompo>

                                <DateCompo>{data.date}</DateCompo>
                            </NoticeThumbnail>

                            <Divider></Divider>

                        </div>
                    )
                    )

                }

            </NoticeBodyWrapper>
        </div>
    )
}

export default NoticePage;