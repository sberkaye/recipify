import axios from 'axios';

const search = async (term) => {
  const response = await axios.get(
    `www.themealdb.com/api/json/v1/1/search.php?s=${term}`,
  );
  console.log(`response`, response);
};

export default { search };
