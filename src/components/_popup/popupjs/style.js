import styled from "styled-components";

export const PopupStyle = {
   Dimmed: styled.div`
        width: 100%;
        height: 100vh;
        background: rgba(0, 0, 0, 0.5);
        position: fixed;
        top: 0;
        left: 0;
        z-index: 99999;
    `,
   Wrap: styled.div`
        /* width: 100%; */
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    `,
   Box: styled.div`
        width: ${(p) => (p.width ? p.width : "460px")};
        height: ${(p) => (p.height ? p.height : "340px")};
        display: flex;
        flex-direction: column;
        font-family: "Pretendard";
    `,
   Head: styled.div`
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 76px;
        padding: 0 30px;
        background: #5852f4;
        border-radius: 38px 38px 0 0;
    `,
   Title: styled.strong`
        display: flex;
        align-items: center;
        font-weight: 500;
        color: #fff;
        font-size: 2rem;
        &:before {
            content: "";
            width: 24px;
            height: 24px;
            background-repeat: no-repeat;
            background-position: center;
            margin-right: 10px;
            background-image: ${(p) => (p.src ? `url(${p.src})` : "none")};
            display: ${(p) => (p.src ? "block" : "none")};
        }
    `,
   Close: styled.button`
        position: relative;
        width: 24px;
        height: 24px;
        &:before,
        &:after {
            position: absolute;
            left: 50%;
            top: 50%;
            content: "";
            display: block;
            width: 26px;
            height: 1px;
            background: #fff;
        }
        &:before {
            transform: translate(-50%, -50%) rotate(45deg);
        }
        &:after {
            transform: translate(-50%, -50%) rotate(-45deg);
        }
    `,
   Cont: styled.div`
        height: calc(100% - 76px);
        background-color: #fff;
        border-radius: 0 0 38px 38px;
        padding: 32px 38px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        /* align-items: center; */
        > .message {
            flex: 1;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            text-align: center;
            word-break: break-all;
            font-size: 2rem;
            font-weight: 600;
        }
        > .btnWrap {
            /* margin-top: auto; */
            width: 100%;
            display: flex;
            gap: 10px;
            button {
                width: 100%;
                height: 56px;
                font-size: 1.6rem;
                font-weight: 600;
                border-radius: 14px;
                &.confirmBtn {
                    color: #fff;
                    background-color: #5852f4;
                }
                &.cancelBtn {
                    color: #5852f4;
                    border: 1px solid #5852f4;
                }
            }
        }
    `,
   Dashed: styled.div`
        margin-top: auto;
        display: flex;
        justify-content: center;
        width: 100%;
        height: 62px;
        background: #fff;
        > div {
            position: relative;
            flex: 1;
            background: #fff; //
            margin-right: 5px;
            &:before {
                position: absolute;
                top: 50%;
                left: 0;
                content: "";
                display: block;
                width: 100%;
                border-top: 2px dashed #babae8;
            }
        }
    `,
};

// x 버튼 없는 버전
export const SimplePopupStyle = {
   Box: styled.div`
        width: 350px;
        height: fit-content;
        color:#ffffff;
        background-color: #1d243d;
        padding: 0px 20px 20px 20px;
        box-sizing: border-box;
    `,
   Cont: styled.div`
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .message {
            width: 100%;
            min-height: 140px;
            word-break: break-all;
            
            font-size: 1.6rem;
            font-weight: 300;
            text-align: center;

            display: flex;
            flex-wrap: wrap;
            align-items: center;
            justify-content: center;
        }
        .btnWrap {
            width: 100%;
            margin-top: auto;
            display: flex;
            gap: 10px;
            button {
                width: 100%;
                height: 40px;
                border-radius: 6px;
                color: #fff;
                font-size: 1.4rem;
                font-weight: 300;
                background-color: #3c5ffc;
            }
        }
    `,
};
