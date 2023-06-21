import React, { useEffect, useState } from "react";

import MasonryLayout from "./MasonryLayout";
import { Client } from "../Client";
import { feedQuery, searchQuery } from "../utils/Data";
import Spinner from "./Spinner";

const Search = ({ searchTerm }) => {
  const [pins, setPins] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (searchTerm !== "") {
      setLoading(true);
      const query = searchQuery(searchTerm.toLowerCase());
      Client.fetch(query).then((data) => {
        setPins(data);
        setLoading(false);
      });
    } else {
      Client.fetch(feedQuery).then((data) => {
        setPins(data);
        setLoading(false);
      });
    }
  }, [searchTerm]);

  return (
    <div>
      {loading && <Spinner message="Searching pins" />}
      {pins?.length !== 0 && <MasonryLayout pins={pins} />}
      {pins?.length === 0 && searchTerm !== "" && !loading && (
        <div className="mt-10 text-center text-xl ">No Pins Found!</div>
      )}
    </div>
  );
};

export default Search;
