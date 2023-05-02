import React from "react";
import styled from "styled-components";
import Header from "../component/header";
const ReserveWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
const RoomTitle = styled.div`
    font-size: 1                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               .5rem;
    font-weight: bold;
    width : 40vw;
`
const RoomImage = styled.div`
    width : 40vw;
    height : 30vw;
    background-color: lightgray;
`
const Tool = styled.div`
    
`;

function ReservingPage() {
    return (
        <div>
            <Header></Header>
            <ReserveWrapper>
                <RoomTitle>센 835</RoomTitle>
                <RoomImage ></RoomImage>
            </ReserveWrapper>

        </div>
    );
}

export default ReservingPage;