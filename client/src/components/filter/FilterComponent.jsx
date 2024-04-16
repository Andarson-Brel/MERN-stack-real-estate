import { useSearchParams } from "react-router-dom";
import "./filter.scss";
import { useState } from "react";

function FilterComponent() {
  const [searchParams, setSearchPrams] = useSearchParams();
  const [query, setQuery] = useState({
    type: searchParams.get("type") || "",
    city: searchParams.get("city") || "",
    property: searchParams.get("property") || "",
    minPrice: searchParams.get("minPrice") || 0,
    maxPrice: searchParams.get("maxPrice") || 1000000,
  });
  const handleChange = (e) => {
    setQuery({ ...query, [e.target.name]: e.target.value });
  };
  const handleFilter = () => {
    setSearchPrams(query);
    window.location.reload();
  };

  return (
    <div>
      <section className="filter">
        <h1>
          Search results for <b>{searchParams.get("city")}</b>
        </h1>
        <div className="top">
          <div className="inputItem">
            <label htmlFor="city">Location</label>
            <input
              type="text"
              id="city"
              name="city"
              placeholder="City Location"
              onChange={handleChange}
              defaultValue={query.city}
            />
          </div>
        </div>
        <div className="bottom">
          <div className="inputItem">
            <label htmlFor="type">type</label>
            <select
              name="type"
              id="type"
              onChange={handleChange}
              defaultValue={query.type}
            >
              <option value="buy">Buy</option>
              <option value="">Any</option>
              <option value="rent">Rent</option>
            </select>
          </div>
          <div className="inputItem">
            <label htmlFor="property">Property</label>
            <select
              name="property"
              id="property"
              onChange={handleChange}
              defaultValue={query.property}
            >
              <option value="apartment">Apartment</option>
              <option value="">Any</option>
              <option value="house">House</option>
              <option value="condo">Condo</option>
              <option value="land">Land</option>
            </select>
          </div>
          <div className="inputItem">
            <label htmlFor="minPrice">Min Price</label>
            <input
              type="number"
              id="minPrice"
              name="minPrice"
              placeholder="Any"
              onChange={handleChange}
              defaultValue={query.minPrice}
            />
          </div>
          <div className="inputItem">
            <label htmlFor="maxPrice">Max Price</label>
            <input
              type="number"
              id="maxPrice"
              name="maxPrice"
              placeholder="Any"
              onChange={handleChange}
              defaultValue={query.maxPrice}
            />
          </div>

          <button onClick={handleFilter}>
            <img src="./search.png" alt="" />
          </button>
        </div>
      </section>
    </div>
  );
}

export default FilterComponent;
