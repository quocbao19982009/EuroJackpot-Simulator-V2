import { Box, Typography } from "@mui/material";
import SelectableNumberBox from "./SelectableNumberBox";

interface NumberGridProps {
  title: string;
  totalNumbers: number;
  maxNumberSelected: number;
  selectedNumbers: number[];
  onNumberSelected: (number: number) => void;
  disabled?: boolean;
}

const NumberGrid = ({
  disabled,
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

  //TODO: These grid is not center the number... need to fix
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
          gap: {
            xs: "1.25rem",
            sm: "0.75rem",
            md: "0.5rem",
          },

          my: 1,
          gridAutoRows: {
            xs: "2rem",
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
                xs: "3rem",
                sm: "2.5rem",
                md: "2rem",
              },
            }}
            id={`number_${number}_${title}`}
            isDisabled={disabled || isNumberDisabled(number)}
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
