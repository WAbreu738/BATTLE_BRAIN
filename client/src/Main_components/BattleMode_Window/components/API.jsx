// const fetchQuestions = async (setCurrentQuestion) => {
//   const url = "https://the-trivia-api.com/v2/questions?limit=1&categories=film";
//   const headers = {
//     "X-API-Key": "Q6qDHeKAdmG77q5Eg7dSWAQT4",
//   };

//   try {
//     const response = await fetch(url, { headers: headers });
//     const data = await response.json();
//     setCurrentQuestion(data[0]);
//   } catch (error) {
//     console.error("Error fetching trivia questions:", error);
//   }
// };

// export default fetchQuestions;

// import { useLocation } from "react-router-dom";
// import { useStore } from "../../OptionsProvider"; //GlobalState
// const initialState = useStore();
// const { difficulty, region } = initialState.state;

// const location = useLocation();
// const category = location.state.category;
// console.log(category);

// const fetchQuestions = async () => {

//   const url = `https://the-trivia-api.com/v2/questions?categories=${category}&limit=1&{difficulties=${difficulty}`;
//   const headers = {
//     "X-API-Key": "Q6qDHeKAdmG77q5Eg7dSWAQT4",
//   };

//   try {
//     const response = await fetch(url, { headers: headers });
//     const data = await response.json();
//     setCurrentQuestion(data[0]);
//   } catch (error) {
//     console.error("Error fetching trivia questions:", error);
//   }
// };

// export default fetchQuestions;
