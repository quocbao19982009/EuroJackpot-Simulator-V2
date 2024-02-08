import NumberGrid from "@/components/game/numberGrid/NumberGrid";

const GamePage = () => {
  return (
    <div>
      GamePage
      <NumberGrid
        title="Choose numbers"
        totalNumbers={50}
        maxNumberSelected={5}
        selectedNumbers={[1, 2, 3]}
        onNumberSelected={(number) => console.log(number)}
      />
      <NumberGrid
        title="Select Star numbers"
        totalNumbers={10}
        maxNumberSelected={2}
        selectedNumbers={[1, 2]}
        onNumberSelected={(number) => console.log(number)}
      />
    </div>
  );
};

export default GamePage;
