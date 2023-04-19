import { useState, useEffect, useContext } from 'react';
import { handleAddMovieToHistory } from '../../helpers/historyHelpers';
import { deleteWatchlistMovie } from '../../api/mongoapi';

// Images
import RatingStar from '../../images/rating-star.svg';
import WhitePlus from '../../images/white-plus.svg';
import PopcornPoints from '../../images/popcorn-points.svg';
import CloseIcon from '../../images/x.svg';

// Models
import IHistory from '../../models/IHistory';
import { IHandleGetWatchlistMovies } from '../../models/IWatchlist';

// Context 
import { UserContext } from '../../components/context/UserContext';

interface Props {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>,
  id: number,
  title: string,
  posterPath: string,
  runtime: number,
  setFormSubmitted: React.Dispatch<React.SetStateAction<boolean>>,
  watchlist: IHandleGetWatchlistMovies[],
  setWatchlist: React.Dispatch<React.SetStateAction<IHandleGetWatchlistMovies[]>>
  history: IHistory[],
  setHistory: React.Dispatch<React.SetStateAction<IHistory[]>>,
  setError: React.Dispatch<React.SetStateAction<boolean>>,
  fromWatchlist: boolean
}

const HistoryForm = ({ setShowModal, id, title, posterPath, runtime, setFormSubmitted, watchlist, setWatchlist, history, setHistory, setError, fromWatchlist } : Props) => {
  const [userRating, setUserRating] = useState<number>(1);
  const [watchDate, setWatchDate] = useState<Date>(new Date());
  const [rewatch, setRewatch] = useState<boolean>(false);
  const { user } = useContext(UserContext);

  useEffect(() => {
    setFormSubmitted(false);
  }, []);

  const addMovieToHistory = (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      handleAddMovieToHistory(
        history,
        setHistory,
        user.sub,
        id,
        title,
        userRating,
        posterPath,
        watchDate,
        rewatch,
        runtime
      );

      // Reset values after submit
      setShowModal(false);
      setUserRating(1);
      setWatchDate(new Date());
      setRewatch(false);
      setFormSubmitted(true);

      // Remove from watchlist if movie is being added to history from watchlist
      if (fromWatchlist) {
        deleteWatchlistMovie(user.sub, id);
        console.log('deleted');
        setWatchlist(watchlist.filter(person => person.user_id === user.sub)
          .filter(watchlistMovie => watchlistMovie.movieId !== id));
      }
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };  

  return (
    <>
      <div className='form-modal-background' onClick={() => setShowModal(false)}></div>
      <div className='form-modal'>
        <form id="history-add-form" onSubmit={addMovieToHistory}>
          <button className='close-btn' type='button' onClick={() => setShowModal(false)}>
            <img src={CloseIcon} alt="Close form" />
          </button>
          <div>
            <h3>Add to History</h3>
            <div className='history-form-top-half'>
              <img src={`https://image.tmdb.org/t/p/w500/${posterPath}`} alt="Poster for movie" />
              <p>{title}</p>
            </div>
          </div>
          <div className='history-form-container'>

            <div className='history-form-date-container'>
              <label htmlFor="date-watched">Date Watched</label>
              <input 
                type="date" 
                id='date-watched' 
                name='date-watched'
                value={watchDate.getFullYear() + '-' + ('0' + (watchDate.getMonth() + 1)).slice(-2) + '-' + ('0' + watchDate.getDate()).slice(-2)}
                onChange={(e) => setWatchDate(new Date(e.target.value))} />
            </div>

            <div className='history-form-rating-container'>
              <label htmlFor="">Rating</label>
              <div className='history-add-rating-item-container'>
                <div className='history-add-item'>
                  <input 
                    type="radio" 
                    id='rating-1' 
                    name='rating-radio' 
                    value='1' 
                    defaultChecked
                    onChange={() => setUserRating(1)} />
                  <label className='history-add-rating-label' htmlFor="rating-1"> 
                    <img src={RatingStar} alt="Rating star 1" />
                    <p>1</p>
                  </label>
                </div>
                <div className='history-add-item'>
                  <input 
                    type="radio" 
                    id='rating-2' 
                    name='rating-radio' 
                    value='2'
                    onChange={() => setUserRating(2)} />
                  <label className='history-add-rating-label' htmlFor="rating-2"> 
                    <img src={RatingStar} alt="Rating star 2" />
                    <p>2</p>
                  </label>
                </div>
                <div className='history-add-item'>
                  <input 
                    type="radio" 
                    id='rating-3' 
                    name='rating-radio' 
                    value='3'
                    onChange={() => setUserRating(3)} />
                  <label className='history-add-rating-label' htmlFor="rating-3"> 
                    <img src={RatingStar} alt="Rating star 3" />
                    <p>3</p>
                  </label>
                </div>
                <div className='history-add-item'>
                  <input 
                    type="radio" 
                    id='rating-4' 
                    name='rating-radio' 
                    value='4' 
                    onChange={() => setUserRating(4)}/>
                  <label className='history-add-rating-label' htmlFor="rating-4"> 
                    <img src={RatingStar} alt="Rating star 4" />
                    <p>4</p>
                  </label>
                </div>
                <div className='history-add-item'>
                  <input 
                    type="radio" 
                    id='rating-5' 
                    name='rating-radio' 
                    value='5'
                    onChange={() => setUserRating(5)} />
                  <label className='history-add-rating-label' htmlFor="rating-5"> 
                    <img src={RatingStar} alt="Rating star 5" />
                    <p>5</p>
                  </label>
                </div>
                <div className='history-add-item'>
                  <input 
                    type="radio"
                    id='rating-6' 
                    name='rating-radio' 
                    value='6'
                    onChange={() => setUserRating(6)} />
                  <label className='history-add-rating-label' htmlFor="rating-6"> 
                    <img src={RatingStar} alt="Rating star 6" />
                    <p>6</p>
                  </label>
                </div>
                <div className='history-add-item'>
                  <input 
                    type="radio" 
                    id='rating-7' 
                    name='rating-radio' 
                    value='7'
                    onChange={() => setUserRating(7)} />
                  <label className='history-add-rating-label' htmlFor="rating-7"> 
                    <img src={RatingStar} alt="Rating star 7" />
                    <p>7</p>
                  </label>
                </div>
                <div className='history-add-item'>
                  <input 
                    type="radio" 
                    id='rating-8' 
                    name='rating-radio' 
                    value='8'
                    onChange={() => setUserRating(8)} />
                  <label className='history-add-rating-label' htmlFor="rating-8"> 
                    <img src={RatingStar} alt="Rating star 8" />
                    <p>8</p>
                  </label>
                </div>
                <div className='history-add-item'>
                  <input 
                    type="radio" 
                    id='rating-9' 
                    name='rating-radio' 
                    value='9'
                    onChange={() => setUserRating(9)} />
                  <label className='history-add-rating-label' htmlFor="rating-9"> 
                    <img src={RatingStar} alt="Rating star 9" />
                    <p>9</p>
                  </label>
                </div>
                <div className='history-add-item'>
                  <input 
                    type="radio" 
                    id='rating-10' 
                    name='rating-radio' 
                    value='10'
                    onChange={() => setUserRating(10)} />
                  <label className='history-add-rating-label' htmlFor="rating-10"> 
                    <img src={RatingStar} alt="Rating star 10" />
                    <p>10</p>
                  </label>
                </div>
              </div>
            </div>

            <div className='history-rewatch-form-container'>
              <input 
                type="checkbox" 
                id='rewatch' 
                name='rewatch' 
                onChange={() => setRewatch(!rewatch)} />
              <label htmlFor="rewatch">I&apos;ve watched this movie before</label>
            </div>

            <div className='history-form-points-container'>
              <p>YOU&apos;LL EARN</p>
              <div>
                <img src={PopcornPoints} alt={`You will earn ${runtime} points`} />
                <p>{runtime}</p>
              </div>
            </div>
            <button className='history-form-submit-btn'><img src={WhitePlus} alt="Add to history" /> Submit</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default HistoryForm;

function handleDeleteWatchlistMovie(sub: string, id: number) {
  throw new Error('Function not implemented.');
}
