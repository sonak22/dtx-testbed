import { atom } from "recoil";

const popupState = atom({
    key: "popupState",
    default: [
        //   {
        //       key: 1,
        //       data: {
        //           type: "basic",
        //           title: "dd",
        //           text: "dddddddd",
        //           src: "",
        //       },
        //   },
        // {
        //     key: 2,
        //     data: {
        //         type: 'twoBtn',
        //         title: '',
        //         text: '',
        //         src:'',
        //         height: 400,
        //         confirm: () => {},
        //     },
        // },
    ],
});
export default popupState;
