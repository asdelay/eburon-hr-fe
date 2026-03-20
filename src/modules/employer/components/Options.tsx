import { motion } from "motion/react";
import { Dispatch, FC, SetStateAction } from "react";

interface OptionsProps {
  selectedOption: string;
  setSelectedOption: Dispatch<SetStateAction<string>>;
}

const Options: FC<OptionsProps> = ({ selectedOption, setSelectedOption }) => {
  return (
    <motion.div
      className="flex flex-col mt-2 select-none"
      exit={{ opacity: 0, height: 0, margin: 0 }}
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 100, height: "auto" }}
    >
      <label htmlFor="exp-0" className="cursor-pointer">
        <input
          className="accent-black/90"
          type="radio"
          id="exp-0"
          name="experience"
          value="all"
          checked={selectedOption === "all"}
          onChange={(e) => setSelectedOption(e.target.value)}
        ></input>{" "}
        {"All"}
      </label>
      <label htmlFor="exp-1" className="cursor-pointer">
        <input
          className="accent-black/90"
          type="radio"
          id="exp-1"
          name="experience"
          value="lt3months"
          checked={selectedOption === "lt3months"}
          onChange={(e) => setSelectedOption(e.target.value)}
        ></input>{" "}
        {"< 3 months"}
      </label>
      <label htmlFor="exp-2" className="cursor-pointer">
        <input
          className="accent-black/90"
          type="radio"
          id="exp-2"
          name="experience"
          value="3to12months"
          checked={selectedOption === "3to12months"}
          onChange={(e) => setSelectedOption(e.target.value)}
        ></input>{" "}
        3-12 months
      </label>
      <label htmlFor="exp-3" className="cursor-pointer">
        <input
          className="accent-black/90"
          type="radio"
          id="exp-3"
          name="experience"
          value="1to2years"
          checked={selectedOption === "1to2years"}
          onChange={(e) => setSelectedOption(e.target.value)}
        ></input>{" "}
        1-2 years
      </label>
      <label htmlFor="exp-4" className="cursor-pointer">
        <input
          className="accent-black/90"
          type="radio"
          id="exp-4"
          name="experience"
          value="2to5years"
          checked={selectedOption === "2to5years"}
          onChange={(e) => setSelectedOption(e.target.value)}
        ></input>{" "}
        2-5 years
      </label>
      <label htmlFor="exp-5" className="cursor-pointer">
        <input
          className="accent-black/90"
          type="radio"
          id="exp-5"
          name="experience"
          value="gt5years"
          checked={selectedOption === "gt5years"}
          onChange={(e) => setSelectedOption(e.target.value)}
        ></input>{" "}
        5+ years
      </label>
    </motion.div>
  );
};

export default Options;
