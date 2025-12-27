import { useState } from 'react'
import './FlashMenu.css'
import TraineeCard from '../FlashCardTrainee/flashcardtrainee'
import traineeJson from '../assets/traineeData.json'

const finishedCards: any = [];
function FlashMenuTrainee(){
    const [idx, setIdx] = useState(0);
    const [points, setPoints] = useState(0);

    const onSubmitHandler  = (correct: boolean) => {
        if (!correct)
            return;

        if (markCardFinished())
            setPoints(points+1);

        onNextHandler();
    }
    function markCardFinished() {
        const finished = finishedCards.includes(idx);
        if (finished)
            return false;
        finishedCards.push(idx);
        return true;
    }
    
    const onNextHandler  = () => {
        if (idx + 1 >= traineeJson.length) return ;
        if (idx + 1 < traineeJson.length)
            setIdx(idx + 1);
        if (idx == traineeJson.length -1 ) {
            alert("Selesai");
        }
    }

    const onPrevHandler = () => {
        if (idx - 1 < 0) return ;
        else if (idx - 1 >= 0 ) 
            setIdx(idx-1) ;
        else if (idx === 0) {
            alert('awal sekali') ;
        }
        else if (idx === traineeJson.length -1) {
            alert('ini akhir') ;
        }
    }

    return (
        <div className="flashmenu-container">
            <h2>Points: {points}</h2>
            <TraineeCard key={`${idx}`} 
                         data={traineeJson[idx]} 
                         onSubmit={onSubmitHandler}
                         onAnswerShown={markCardFinished} />

            <div className='buttonnextprev'>
                <button className="nextprev-btn" onClick={onPrevHandler}>Prev</button>
                <button className="nextprev-btn" onClick={onNextHandler}>Next</button>
            </div>
        </div>
    )
}

export default FlashMenuTrainee;
