import './ExitModal.css'
import { Link } from 'react-router';


interface exitModalProps {
    points: number;
    onRestart: () => void;
    onClose : () => void;

}

const ExitModal = ({points, onRestart, onClose} : exitModalProps) => {
    return (
        <div className="exit-modal-overlay" onClick={onClose}>
            <div className="exit-modal" onClick={(e) => e.stopPropagation}>
                <div className="modal-content">
                    <h1>Sudah Habis!</h1>
                    <div className="modal-stats">
                        <p>total points: {points}</p>
                    </div>
                    <h2>Mau lanjut lagi?</h2>
                    <div className="option-exit">
                        <Link to="/">
                            <button className='modal-btn back-btn'>back to menu</button>
                        </Link>
                        <button className='modal-btn back-btn' onClick={()=> {onRestart();onClose()}}>start again</button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ExitModal;