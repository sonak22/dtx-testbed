import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export const NotFoundStyle = {
    Wrap: styled.div`
        width: 100%;
        height: 100vh;
        padding: 40px;
        background-color: #252525;
    `,
    Message: styled.div`
        display: inline-block;
        font-size: 2rem;
        color: #d7d7d7;
    `,
    Button: styled.button`
        font-size: 1.4rem;
        font-weight: 400;
        padding: 1rem 2rem;
        color: #e0b93b;
        border: 1px solid #e0b93b;
        border-radius: 0.8rem;
        margin-left: 2rem;
    `,
};

function NotFound() {
    let navigate = useNavigate();
    return (
        <NotFoundStyle.Wrap>
            <NotFoundStyle.Message>페이지가 없습니다.</NotFoundStyle.Message>
            <NotFoundStyle.Button onClick={() => navigate("/")}>
                되돌아가기
            </NotFoundStyle.Button>
        </NotFoundStyle.Wrap>
    );
}

export default NotFound;
