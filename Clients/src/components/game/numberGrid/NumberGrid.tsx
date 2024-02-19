import { Box, Typography } from "@mui/material";
import SelectableNumberBox from "./SelectableNumberBox";

interface NumberGridProps {
  title: string;
  totalNumbers: number;
  maxNumberSelected: number;
  selectedNumbers: number[];
  onNumberSelected: (number: number) => void;
}

const NumberGrid = ({
  totalNumbers,
  maxNumberSelected,
  title,
  selectedNumbers,
  onNumberSelected,
}: NumberGridProps) => {
  const numberArray = Array.from({ length: totalNumbers }, (_, i) => i + 1);
  const selectedNumbersCount = selectedNumbers.length;
  const numberToSelected = maxNumberSelected - selectedNumbersCount;

  const isNumberSelected = (number: number) => {
    return selectedNumbers.some((n) => n === number);
  };

  const isNumberDisabled = (number: number) => {
    return !isNumberSelected(number) && numberToSelected === 0;
  };

  return (
    <>
      <Typography fontWeight={"bold"}>{title}</Typography>
      <Box
        sx={{
          minHeight: "1.5rem",
          my: 0.5,
        }}
      >
        {numberToSelected !== 0 && (
          <Typography>Choose {numberToSelected} numbers</Typography>
        )}
      </Box>
      <Box
        sx={{
          display: "grid",
          width: {
            xs: "100%",
            sm: "auto",
          },
          gap: "0.25rem",

          my: 1,
          gridAutoRows: {
            md: "2rem",
          },
          gridTemplateColumns: {
            xs: "repeat(auto-fit, minmax(2rem, 1fr))",
            md: "repeat(10, 2rem)",
            sm: "repeat(10, 2rem)",
          },
        }}
      >
        {numberArray.map((number) => (
          <SelectableNumberBox
            sx={{
              width: {
                xs: "2rem",
                sm: "2rem",
                md: "2rem",
              },
            }}
            id={`number_${number}_${title}`}
            isDisabled={isNumberDisabled(number)}
            isSelected={isNumberSelected(number)}
            key={`number_${number}_${title}`}
            onClick={() => onNumberSelected(number)}
          >
            <Typography fontWeight={600}>{number}</Typography>
          </SelectableNumberBox>
        ))}
      </Box>
    </>
  );
};

export default NumberGrid;
