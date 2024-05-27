import "../App.css";

const Background = () => {
  let amount = 50;
  const html = () => {
    let output = [];
    while (amount--) output.push(<span key={amount}></span>);
    return output;
  };

  return <div class="background">{html()}</div>;
};

export default Background;
