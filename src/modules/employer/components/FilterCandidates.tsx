import { ChevronDown, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { Dispatch, FC, SetStateAction, useRef, useState } from "react";
import Options from "./Options";
import Button from "@/components/Button";

interface FilterCandidatesProps {
  setShowModal: Dispatch<SetStateAction<boolean>>;
  setSelectedOption: Dispatch<SetStateAction<string>>;
}

const FilterCandidates: FC<FilterCandidatesProps> = ({
  setShowModal,
  setSelectedOption,
}) => {
  const [showOptions, setShowOptions] = useState(true);
  const [localOption, setLocalOption] = useState("all");

  const handleApply = () => {
    setSelectedOption(localOption);
    setShowModal(false);
  };

  return (
    <motion.div
      key="modal"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 100, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed top-0 right-0 left-0 bottom-0 bg-black/50 flex justify-center items-center"
      onClick={() => setShowModal(false)}
    >
      <div
        className="relative p-8 w-60 rounded-2xl border border-white/30 z-100 bg-black/90"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-4 cursor-pointer"
          onClick={() => setShowModal(false)}
        >
          <X />
        </button>
        <h3 className="text-2xl font-bold">Filter</h3>
        <button
          className="flex gap-2 cursor-pointer"
          onClick={() => setShowOptions((isOpen) => !isOpen)}
        >
          <h6 className="font-semibold">By Experience</h6>
          <ChevronDown
            className={`duration-150 ${showOptions && "rotate-180"}`}
          />
        </button>
        <AnimatePresence>
          {showOptions && (
            <Options
              selectedOption={localOption}
              setSelectedOption={setLocalOption}
            />
          )}
        </AnimatePresence>
        <hr className="my-6 text-white/70" />
        <Button variant="outline" className="w-full" onClick={handleApply}>
          Apply
        </Button>
      </div>
    </motion.div>
  );
};

export default FilterCandidates;
