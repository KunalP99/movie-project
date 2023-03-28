const Search = () => {
  return (
    <section className="search-container" style={{'marginTop': '150px'}}>
      <label htmlFor="search-movie">Search for a movie: 
        <input type="text"  />
      </label>
      <button>Search</button>
    </section>
  );
};

export default Search;