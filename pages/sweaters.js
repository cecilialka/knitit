import { useState } from "react";
import styles from "../styles/Home.module.css";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import FlareIcon from "@mui/icons-material/Flare";
import SearchItem from "../components/searchItem";
import { collection, getDocs } from "firebase/firestore"; 
import {db} from "../firebase";


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const needles = [1, 2, 3, 3.5, 4, 4.5, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
const difficulty = [1, 2, 3, 4, 5]

export default function Sweaters({ sweaters, yarns }) {
  const [allSweaters, setAllSweaters] = useState(sweaters);
  const [filteredSweaters, setFilteredSweaters] = useState(allSweaters);
  const [allYarnTypes, setAllYarnTypes] = useState(yarns);
  const [selectedYarn, setSelectedYarn] = useState([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState([]);
  const [selectedNeedles, setSelectedNeedles] = useState([]);

  const handleNeedleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedNeedles(typeof value === "string" ? value.split(",") : value);
    let sweaters =
      value.length == 0
        ? allSweaters
        : allSweaters.filter((sw) =>
            sw.needlesize.some((n) => value.includes(n))
          );
    setFilteredSweaters(sweaters);
  };

  const handleYarnChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedYarn(typeof value === "string" ? value.split(",") : value);
    let sweaters =
      value.length == 0
        ? allSweaters
        : allSweaters.filter((sw) => sw.yarn.some((n) => value.includes(n)));
    setFilteredSweaters(sweaters);
  };

  const handleDifficultyChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedDifficulty(typeof value === "string" ? value.split(",") : value);
    let sweaters =
      value.length == 0
        ? allSweaters
        : allSweaters.filter((sw) => value.includes(sw.difficulty));
    setFilteredSweaters(sweaters);
  };

  return (
    <div className={styles.container}>
      <div className={styles.optioncontainer}>
        <FormControl sx={{ m: 1, width: 150 }}>
          <InputLabel>Needle size</InputLabel>
          <Select
            multiple
            value={selectedNeedles}
            onChange={handleNeedleChange}
            input={<OutlinedInput label="Needle size" />}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value, i) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            {needles.map((needle, i) => (
              <MenuItem key={needle} value={needle}>
                {needle}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, width: 150 }}>
          <InputLabel>Yarn</InputLabel>
          <Select
            multiple
            value={selectedYarn}
            onChange={handleYarnChange}
            input={<OutlinedInput label="Yarn" />}
            MenuProps={MenuProps}
          >
          {allYarnTypes.map((yarn, i) => (
              <MenuItem key={yarn.name} value={yarn.name}>
                {yarn.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, width: 150 }}>
        <InputLabel>Difficulty</InputLabel>
        <Select
        multiple
        value={selectedDifficulty}
        onChange={handleDifficultyChange}
        input={<OutlinedInput label="Difficulty" />}
        MenuProps={MenuProps}
        >
        {difficulty.map((d, i) => (
          <MenuItem key={d} value={d}>
          {[...Array(d)].map((el, i) => (<FlareIcon sx={{ fontSize: 20 }}/>))}
          </MenuItem>))}
        </Select>
        </FormControl>
      </div>
      <div className={styles.imagecontainer}>
        {filteredSweaters.map((sw, i) => (
          <SearchItem sweaterItem={sw}/>
        ))}
        <div className={styles.itemcontainerplaceholder}></div>
        <div className={styles.itemcontainerplaceholder}></div>
        <div className={styles.itemcontainerplaceholder}></div>
        <div className={styles.itemcontainerplaceholder}></div>
        <div className={styles.itemcontainerplaceholder}></div>
      </div>
    </div>
  );
}

export async function getStaticProps() {
 
  const dbSweaters = [];
  const sweaters = await getDocs(collection(db, "sweaters"));
    sweaters.forEach((doc) => {
      dbSweaters.push(doc.data())
});

const dbYarnTypes = [];
const yarntypes = await getDocs(collection(db, "yarn-types"));
    yarntypes.forEach((doc) => {
      dbYarnTypes.push(doc.data())
});

  return {
    props: {
      sweaters: JSON.parse(JSON.stringify(dbSweaters)),
      yarns: JSON.parse(JSON.stringify(dbYarnTypes)),
    },
  };
}

 