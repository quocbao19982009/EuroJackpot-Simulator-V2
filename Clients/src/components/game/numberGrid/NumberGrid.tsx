import { Box, Typography } from "@mui/material";
import classes from "./NumberGrid.module.css";

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

  const getNumberClass = (number: number) => {
    if (selectedNumbers.some((n) => n === number)) {
      return classes.selected;
    }
    if (numberToSelected === 0) {
      return classes.disabled;
    }
    return classes.selectable;
  };

  return (
    <>
      <Typography sx={{ my: 1, fontWeight: "bolder" }}>{title}</Typography>
      <Box
        sx={{
          minHeight: "1.5rem",
          my: 1,
        }}
      >
        {numberToSelected !== 0 && (
          <Typography>Choose {numberToSelected} numbers</Typography>
        )}
      </Box>
      <Box
        sx={{
          my: 1,
          gridAutoRows: {
            md: "2rem",
          },
          gridTemplateColumns: {
            md: "repeat(10, 2rem)",
            sm: "repeat(10, 2.75rem)",
          },
        }}
        className={classes.numberGird}
      >
        {numberArray.map((number) => (
          <Box
            key={`number_${number}`}
            onClick={() => onNumberSelected(number)}
            className={`${classes.number} ${getNumberClass(number)}
           `}
          >
            <Typography fontWeight={600}>{number}</Typography>
          </Box>
        ))}
      </Box>
    </>
  );
};

export default NumberGrid;
