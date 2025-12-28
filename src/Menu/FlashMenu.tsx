import { useState,useEffect } from 'react'
import TrainerCard from '../FlashCards/flashcard'
import trainerJson from '../assets/trainerData.json'
import './FlashMenu.css'
import ExitModal from './../components/ExitModal';
import { Link } from 'react-router';

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

const shuffleArray = (array: any[]) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * (i+1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled;
};

function toOneDArray() {
    const result: any[] = [];
    for (let genIdx = 0; genIdx <= 9; genIdx++) {
        const gen = getGeneration(genIdx);
        if (gen && trainerJson[gen]) {
            result.push(...(trainerJson as any) [gen]);
        }
    }
    return result;
}

function FlashMenu(){
    const [showModalExit, setShowModalExit] = useState(false);
    const [idx, setIdx] = useState(0);
    const [points, setPoints] = useState(0);
    const [finishedCards, setFinishedCards] = useState<number[]>([]);
    const [ShuffledData, setShuffledData] = useState<any[]>([]);

    useEffect(() => {
        const AllTrainers = toOneDArray();
        setShuffledData(shuffleArray(AllTrainers));
    }, []);

    const currentKey = idx;

    if (ShuffledData.length === 0) return;
    
    const onSubmitHandler  = (correct: boolean) => {
        if (!correct)
            return;

        if (!finishedCards.includes(idx)){
            setPoints(prev => prev + 1);
            setFinishedCards(prev => [...prev, idx]);
        }

        onNextHandler();
    }
    
    function markCardFinished() {
        const finished = finishedCards.includes(currentKey);
        if (finished)
            return false;
        setFinishedCards([...finishedCards, currentKey]);
        return true;
    }

    const onNextHandler  = () => {
        if (idx + 1 < ShuffledData.length)
            setIdx(idx + 1);
        else {
            setShowModalExit(true)
        }
    }
        
    const onPrevHandler = () => {
        if (idx - 1 >= 0)
            setIdx(idx-1);
    }

    const restart = () => {
        setIdx(0);
        setPoints(0);
        setFinishedCards([]);
        setShowModalExit(false)
        const AllTrainers = toOneDArray();
        setShuffledData(shuffleArray(AllTrainers));

    }

    const handleCloseModal = () => {
        setShowModalExit(false)
    }
    
    return (
        <div className="flashmenu-container">
            <Link to="/"><button className='backtomenu'>Back</button></Link>
            <button onClick={restart} className='restart'>
                    Restart
                </button>
            <h2>Points: <span className='points'>{points}</span> </h2>
            <TrainerCard key= {currentKey} 
                        data={ShuffledData[idx]} 
                        onSubmit={onSubmitHandler} 
                        onAnswerShown={markCardFinished}
                        isAlreadyFinished={finishedCards.includes(currentKey)}/>
            <div className='buttonnextprev'>
                <button className='nextprev-btn' onClick={onPrevHandler}>Prev</button>
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


export default FlashMenu;
