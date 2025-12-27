import { useState } from 'react'
import TrainerCard from '../FlashCards/flashcard'
import trainerJson from '../assets/trainerData.json'
import './FlashMenu.css'

function getGeneration(idx: number) {
    if (idx === 0){
        return "19-2";
    }
    else if (idx === 1){
        return "20-1";
    }
    else if (idx === 2){
        return "22-1";
    }
    else if (idx === 3){
        return "22-2";
    }
    else if (idx === 4){
        return "23-1";
    }
    else if (idx === 5){
        return "23-2";
    }
    else if (idx === 6){
        return "24-1";
    }
    else if (idx === 7){
        return "24-2";
    }  
    else if (idx === 8){
        return "25-1";
    }
    else if (idx === 9){
        return "25-2";
    }
    else {
        return null;
    }
}


const finishedCards: any = [];
function FlashMenu(){
    const [idx, setIdx] = useState(0);
    const [genIdx, setGenIdx] = useState(0);
    const [points, setPoints] = useState(0);

    const onSubmitHandler  = (correct: boolean) => {
        if (!correct)
            return;

        if (markCardFinished())
            setPoints(points + 1)

        onNextHandler();
    }
    function markCardFinished() {
        const finished = finishedCards.includes(`${genIdx},${idx}`);
        if (finished)
            return false;
        finishedCards.push(`${genIdx},${idx}`);
        return true;
    }

    const onNextHandler  = () => {
        if (idx + 1 < trainerJson[getGeneration(genIdx)!].length)
            setIdx(idx + 1);
        else {
            if (getGeneration(genIdx+1)) {
                setGenIdx(genIdx+1);
                setIdx(0);
            } else {
                alert("Selesai!!!");
            }
        }
    }
        
    const onPrevHandler = () => {
        if (idx - 1 >= 0)
            setIdx(idx-1);
        else {  
            if (getGeneration(genIdx-1)) {
                setGenIdx(genIdx-1);
                setIdx(trainerJson[getGeneration(genIdx-1)!].length - 1);
            } else {
                alert("Awal sekali");
            }
        }
    }
    
    return (
        <div className="flashmenu-container">
            <h2>Points: <span className='points'>{points}</span> </h2>
            <TrainerCard key={`${genIdx}-${idx}`} 
                         data={trainerJson[getGeneration(genIdx)!][idx]} 
                         onSubmit={onSubmitHandler} 
                         onAnswerShown={markCardFinished}/>
            <div className='buttonnextprev'>
                <button className='nextprev-btn' onClick={onPrevHandler}>Prev</button>
                <button className="nextprev-btn" onClick={onNextHandler}>Next</button>
            </div>
        </div>
    )
}


export default FlashMenu;
