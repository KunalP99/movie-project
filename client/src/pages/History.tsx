import { useState, useEffect, useContext } from 'react';
import { getHistoryMovies } from '../api/mongoapi';

// Models
import IHistory from '../models/IHistory';

// Context
import { UserContext } from '../components/context/UserContext';

interface Props {
  history: IHistory[]
  setHistory: React.Dispatch<React.SetStateAction<IHistory[]>>
}

const History = ({ history, setHistory } : Props) => {
  const [loading, setLoading] = useState<boolean>(true);
  const { user } = useContext(UserContext);

  useEffect(() => {
    setLoading(true);
    if (user.sub !== '') {
      getHistoryMovies(user.sub)
        .then(data => setHistory(data))
        .catch(err => console.log(err.message));
      setLoading(false);
    }
  }, [user]);

  return (
    <section className="history-container" style={{ 'marginTop': '200px'}}>
      <h2>History</h2>
      {!loading && history.map((movie) => (
        <div key={movie._id}>{movie.title}</div>
      ))}
    </section>
  );
};

export default History;