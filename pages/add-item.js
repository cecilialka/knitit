import styles from "../styles/Home.module.css";
import { useState, useRef } from "react";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import TextField from '@mui/material/TextField';
import { collection, getDocs } from "firebase/firestore"; 
import {db} from "../firebase";
import FlareIcon from "@mui/icons-material/Flare";
import Button from '@mui/material/Button';
import {needles} from '../models/NeedleSizes';

const difficulty = [1, 2, 3, 4, 5] //Beginner, Easy, Intermediate, Experienced - ENUM models
const itemTypes = ["sweater", "slipover", "accesories"]; //Models
const languages = ["da-DK", "en-US", "de-DE"]; //Put in models


export default function AddItem({ yarns }) {
    const [item, setItem] = useState("");
    const [selectedNeedles, setSelectedNeedles] = useState([]);
    const [selectedDifficulty, setSelectedDifficulty] = useState([]);
    const [allYarnTypes, setAllYarnTypes] = useState(yarns);
    const [selectedYarn, setSelectedYarn] = useState([]);
    const [selectedLanguage, setSelectedLanguage] = useState([]);
    const needlesRef = useRef();
    const difficultyRef = useRef();
    const yarnRef = useRef();
    const languageRef = useRef();
    const priceRef = useRef();
    const websiteRef = useRef();
    const nameRef = useRef();
    const itemRef = useRef();

//Put somewhere else for reuse
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 350,
      },
    },
  };

   function handleItemChange(event) {
    console.log(event.target);
    setItem(event.target.value);
   }

   const handleNeedleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedNeedles(typeof value === "string" ? value.split(",") : value);
  };

  const handleYarnChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedYarn(typeof value === "string" ? value.split(",") : value);
  };

  const handleDifficultyChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedDifficulty(typeof value === "string" ? value.split(",") : value);
  };

  const handleLanguageChange = (event) => {
    const {
      target: {value},
    } = event;
    setSelectedLanguage(typeof value === "string" ? value.split(",") : value);
  }


  return (
    <div className={styles.container}>
    <span className={styles.cardheader}>Add new item</span>
    <FormControl sx={{ m: 1, width: 350 }}>
    <InputLabel>Item type</InputLabel>
    <Select
    ref={itemRef}
      value={item}
      onChange={handleItemChange}
      input={<OutlinedInput label="Item" />}
      MenuProps={MenuProps}
    >
    {itemTypes.map((item, i) => (
        <MenuItem key={item} value={item}>
          {item}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
    <Box sx={{
      '& .MuiTextField-root': { m: 1, width: '350px' },
    }}>
    <TextField  required
    ref={nameRef}
    id="outlined-required"
    label="Name"
    type="text">
    </TextField>
    </Box>
    <Box sx={{
      '& .MuiTextField-root': { m: 1, width: '350px' },
    }}>
    <TextField
    ref={priceRef}
    id="outlined-required"
    label="Price"
    type="number"
    defaultValue="Price">
    </TextField>
    </Box>
  <FormControl sx={{ m: 1, width: 350 }}>
  <InputLabel>Yarn</InputLabel>
  <Select
    multiple
    ref={yarnRef}
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
  <FormControl sx={{ m: 1, width: 350 }}>
          <InputLabel>Needle size</InputLabel>
          <Select
            multiple
            ref={needlesRef}
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
        <FormControl sx={{ m: 1, width: 350 }}>
        <InputLabel>Difficulty</InputLabel>
        <Select
        multiple
        ref={difficultyRef}
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
        <Box sx={{
          '& .MuiTextField-root': { m: 1, width: '350px' },
        }}>
        <TextField  required
        ref={websiteRef}
        id="outlined-required"
        label="Website link"
        type="text">
        </TextField>
        </Box>
        <FormControl sx={{ m: 1, width: 350 }}>
        <InputLabel>Language</InputLabel>
        <Select
          multiple
          ref={languageRef}
          value={selectedLanguage}
          onChange={handleLanguageChange}
          input={<OutlinedInput label="Language(s)" />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value, i) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {languages.map((lang, i) => (
            <MenuItem key={lang} value={lang}>
              {lang}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button disabled={true} variant="outlined" size="large">Save</Button>
    </div>
  );
}

export async function getStaticProps() {
  
  const dbYarnTypes = [];
  const yarntypes = await getDocs(collection(db, "yarn-types"));
      yarntypes.forEach((doc) => {
        dbYarnTypes.push(doc.data())
  });
  
    return {
      props: {
        yarns: JSON.parse(JSON.stringify(dbYarnTypes)),
      },
    };
  }