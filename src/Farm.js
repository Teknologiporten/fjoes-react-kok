import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from 'axios'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormControlLabel, FormGroup, FormLabel, InputLabel, MenuItem, OutlinedInput, Radio, RadioGroup, Select, TextField, Typography } from '@material-ui/core';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  dialog : {
    minWidth: 650,
  },
  input : {
    marginTop: 10,
  },
  paper : {
    minWidth: 650,
    padding: 16,
  },
  button : {
    marginTop: 10
  }
});


function Farm() {
    const [allAnimals, setAnimalList] = useState([])
    const [allAnimalTypes, setAnimalTypes] = useState([])
  
    //name
    const [name, setName] = useState("")
    const handleName = (e) => {setName(e.target.value)}

    //age
    const [age, setAge] = useState(0)
    const handleAge = (e) => {setAge(e.target.value)}

    //gender
    const [gender, setGender] = useState("Female")
    const handleGender = (e) => {setGender(e.target.value)}

    //type
    const [type, setType] = useState(0)
    const handleType = (e) => {setType(e.target.value)}

    //handles showing modal
    const [show, setShow] = useState(false)
    const handleShow = () => {setShow(!show)}

    async function fetchAnimals ()  { 
        const animals = await axios.get('http://localhost:8000/animals/');
        setAnimalList(animals.data);
    }

    async function fetchAnimalTypes ()  { 
        const types = await axios.get('http://localhost:8000/animal-types/');
        setAnimalTypes(types.data);
    }

    useEffect( () => {
        fetchAnimals();
        fetchAnimalTypes();
    }, []);

    const refresh = () => {
      window.location.reload()
    }

    const  addAnimal = () => {
        //setShow(true)
        axios.post('http://localhost:8000/animals/', {"name":name, "age": age, "gender": gender, "type": type}).then(refresh)
        console.log({"name":name, "age": age, "gender": gender, "type": type})
      }
    
    const deleteAnimal = (e) => {
        axios.delete('http://localhost:8000/animals/' + e + '/').then(fetchAnimals);
    }

  const classes = useStyles();
  return (
    <div>
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Animal</TableCell>
            <TableCell align="right">Age</TableCell>
            <TableCell align="right">Gender</TableCell>
            <TableCell align="right">Handling</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {allAnimals.map(animal => {
                    return <TableRow key={animal.id}>
                        <TableCell align="left">{animal.name}</TableCell>
                        <TableCell align="right">{animal.type}</TableCell>
                        <TableCell align="right">{animal.age}</TableCell>
                        <TableCell align="right">{animal.gender}</TableCell>
                        <TableCell align="right"><Button onClick={() => {deleteAnimal(animal.id)}}>Delete</Button></TableCell>
                    </TableRow>
                })}
        </TableBody>
      </Table>
    </TableContainer>
    <Button variant="contained"  onClick={handleShow} className={classes.button}>legg til</Button>
    {/* Form to register new animal */}
    <Dialog open={show} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We will send updates
            occasionally.
          </DialogContentText>
          <DialogContent>  
            <OutlinedInput autoFocus type="name" fullWidth placeholder="Name" onChange={handleName}/>
            <OutlinedInput autoFocus type="number" fullWidth placeholder="Age" onChange={handleAge} className={classes.input}/>
              <RadioGroup aria-label="gender" name="gender1" value={gender} onChange={handleGender}>
                <FormControlLabel value="Female" control={<Radio />} label="Female" />
                <FormControlLabel value="Male" control={<Radio />} label="Male" />
              </RadioGroup>
                <Select variant="outlined" 
                        value={type} 
                        onChange={handleType} 
                        fullWidth 
                        labelId="demo-simple-select-outlined-label" 
                        id="demo-simple-select-outlined"
                        >
                {allAnimalTypes.map(type => {
                  return <MenuItem value={type.id} placeholder="Type">{type.type}</MenuItem>
                })}
                </Select>
          </DialogContent>
          </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={handleShow}>Cancel</Button>
          <Button color="primary" onClick={addAnimal}>Add animal</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Farm