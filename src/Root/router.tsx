import { createBrowserRouter } from "react-router";
import FlashMenu from "../Menu/FlashMenu";
import FlashMenuTrainee from "../Menu/FlashMenuTrainee";
import MainMenu from "../MainMenu/mainmenu";

export const ro = createBrowserRouter([
    {
        path: "/",
        element: <MainMenu />
    },
    {
        path: "/trainer",
        element: <FlashMenu />
    }, {
        path: "/trainee",
        element: <FlashMenuTrainee /> 
    }
])

export default ro 