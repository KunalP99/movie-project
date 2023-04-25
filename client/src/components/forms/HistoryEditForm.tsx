import { useState, useEffect } from 'react';
import { editHistoryMovie } from '../../api/mongoapi';

// Images
import RatingStar from '../../images/rating-star.svg';
import WhitePlus from '../../images/white-plus.svg';
import CloseIcon from '../../images/x.svg';
import ImageNotFound from '../../images/image-not-found.svg';

interface Props {
  setShowEditForm: React.Dispatch<React.SetStateAction<boolean>>,
  _id: string,
  title: string,
  posterPath: string,
  watch_date: Date,
  user_rating: number,
  user_rewatch: boolean,
  setFormSubmitted: React.Dispatch<React.SetStateAction<boolean>>,
  setError: React.Dispatch<React.SetStateAction<boolean>>,
}

const HistoryForm = ({ setShowEditForm, _id, title, posterPath, watch_date, user_rating, user_rewatch, setFormSubmitted, setError } : Props) => {
  const [userRating, setUserRating] = useState<number>(user_rating);
  const [watchDate, setWatchDate] = useState<Date>(new Date(watch_date));
  const [rewatch, setRewatch] = useState<boolean>(user_rewatch);

  useEffect(() => {
    setFormSubmitted(false);
  }, []);

  // Edit current movie details
  const editMovieInHistory = (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      editHistoryMovie(_id, watchDate, userRating, rewatch);
      setShowEditForm(false);
      setFormSubmitted(true);
    } catch(err) {
      console.log(err);
      setError(true);
    }
  };  

  return (
    <>
      <div className='form-modal-background' onClick={() => setShowEditForm(false)}></div>
      <div className='form-modal'>
        <form id="history-add-form" onSubmit={editMovieInHistory} >
          <button className='close-btn' type='button' onClick={() => setShowEditForm(false)}>
            <img src={CloseIcon} alt="Close form" />
          </button>
          <div>
            <h3>Edit this movie</h3>
            <div className='history-form-top-half'>
              <img src={posterPath ? `https://image.tmdb.org/t/p/w500/${posterPath}` : ImageNotFound} alt={`Poster for ${title}`} />
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
              <label htmlFor="rating-radio">Rating</label>
              <div className='history-add-rating-item-container'>
                <div className='history-add-item'>
                  <input 
                    type="radio" 
                    id='rating-1' 
                    name='rating-radio' 
                    value='1' 
                    defaultChecked={userRating === 1}
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
                    defaultChecked={userRating === 2}
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
                    defaultChecked={userRating === 3}
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
                    defaultChecked={userRating === 4}
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
                    defaultChecked={userRating === 5}
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
                    defaultChecked={userRating === 6}
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
                    defaultChecked={userRating === 7}
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
                    defaultChecked={userRating === 8}
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
                    defaultChecked={userRating === 9}
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
                    defaultChecked={userRating === 10}
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
                checked={rewatch}
                onChange={() => setRewatch(!rewatch)} />
              <label htmlFor="rewatch">I&apos;ve watched this movie before</label>
            </div>
            <button className='history-form-submit-btn'><img src={WhitePlus} alt="Add to history" /> Submit</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default HistoryForm;