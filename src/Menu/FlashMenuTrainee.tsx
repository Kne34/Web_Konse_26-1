import { useState, useEffect } from 'react'
import { Link } from 'react-router';
import './FlashMenu.css'
import TraineeCard from '../FlashCardTrainee/flashcardtrainee'
import traineeJson from '../assets/traineeData.json'
import ExitModal from './../components/ExitModal';

const shuffleArray = (array: any[]) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * (i+1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled;
};



function FlashMenuTrainee(){
    const [showModalExit, setShowModalExit] = useState(false);
    const [idx, setIdx] = useState(0);
    const [points, setPoints] = useState(0);
    const [finishedCards, setFinishedCards] = useState<number[]>([]);
    const [ShuffledData, setShuffledData] = useState<any[]>([]);
    const sudahDiJawab = finishedCards.includes(idx);

    useEffect(() => {
        setShuffledData(shuffleArray(traineeJson));
    }, []);

    const restart = () => {
        setShuffledData(shuffleArray(traineeJson));
        setIdx(0);
        setPoints(0);
        setFinishedCards([]);
        setShowModalExit(false);
    }

    if (ShuffledData.length === 0) return;

    const onSubmitHandler  = (correct: boolean) => {
        if (!correct)
            return;

        if (markCardFinished())
            setPoints(points+1);
            
        onNextHandler();
    }
    function markCardFinished() {
        const finished = finishedCards.includes(idx);
        if (finished) return false;
        setFinishedCards([...finishedCards, idx]);
        return true;
    }
    
    const onNextHandler  = () => {
        if (idx + 1 < traineeJson.length) {
            setIdx(idx + 1);
        } else {
            setShowModalExit(true)
        }
    }

    const onPrevHandler = () => {
        if (idx - 1 < 0) return ;
        else if (idx - 1 >= 0 ) 
            setIdx(idx-1) ;
        else if (idx === 0) {
            alert('awal sekali') ;
        }
       
    }

     const handleCloseModal = () => {
        setShowModalExit(false)
        if(idx === traineeJson.length-1){
            setShowModalExit(true)
        }
    }
    
    return (
        <div className="flashmenu-container">
            <h2>Points: {points}</h2>
            <Link to="/"><button className='backtomenu'>Back</button></Link>
            <button onClick={restart} className='restart'>
                    Restart
            </button>
            <TraineeCard key={`${idx}`} 
                         data={ShuffledData[idx]} 
                         onSubmit={onSubmitHandler}
                         onAnswerShown={markCardFinished}
                         isAlreadyFinished = {sudahDiJawab}/>
            
            <div className='buttonnextprev'>
                <button className="nextprev-btn" onClick={onPrevHandler}>Prev</button>
                <button className="nextprev-btn" onClick={onNextHandler}>Next</button>
            </div>
            {showModalExit && (
                <ExitModal 
                points = {points}
                onRestart = {restart}
                onClose = {handleCloseModal}
                />
            )}
        </div>
    )
}

export default FlashMenuTrainee;
