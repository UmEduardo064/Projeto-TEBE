import { createGlobalStyle } from "styled-components";

const MyGlobalStyles = createGlobalStyle`

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box; 
        font-family: "Poppins", sans-serif;

    }
    

    body {
        min-height: 100vh;
        width: 100vw;
        background: linear-gradient(180deg, #363467 0%, rgba(30, 29, 79, 0.8) 100%);
    }
    
    p {
        font-size: 20px;
    }
`

export default MyGlobalStyles