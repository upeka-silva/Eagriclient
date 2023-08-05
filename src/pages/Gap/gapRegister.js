import React from 'react'
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload';
import Checkbox from '@mui/material/Checkbox';

const label = { inputProps: { 'aria-label': 'Switch demo' } };

function gapRegister() {
  return (
    <div>
      <ol>
        <li>Have you applied for registration under the SL-GAP previously? <Switch {...label} /></li>
        <TextField id="outlined-basic" label="Outlined" variant="outlined" size="small" />
        <li>Nature of the business : <TextField id="outlined-basic" label="Outlined" variant="outlined" size="small" /></li>
        <li>Have you obtained any other kind of certificate for your farm? <Switch {...label} /></li>
        <p>If yes, state the type of certification (Please attach a photocopy)</p>
         <Button 
            variant="contained" 
            startIcon={<UploadIcon />}
            >
            Upload
          </Button>
        <li>Do you have proper knowledge on SL-GAP standard? <Switch {...label}/></li>
        <li>Do you have brochures or leaflets prepared pertaining to SL-GAP standard? <Switch {...label} /></li>
        <li>Do you have a checklist pertaining to SL-GAP standard? <Switch {...label} /></li>
        <li>Do you have a quality management plan for your farm? <Switch {...label} /></li>
        <li>Select on relevant cages based on the nature of the seed or planting materials used in your farm.</li>
        <p>Seeds obtained from your own farm  <Checkbox {...label} />  Seeds obtained from private institutes  <Checkbox {...label} />  Certified seeds (DOA)  <Checkbox {...label} /> Other  <Checkbox {...label} /></p>
        <li>If seeds / planting materials obtained are certified, mention the name of the institution by which the certification was made.</li>
        <TextField id="outlined-basic" label="Outlined" variant="outlined" size="small" />
        <li>If seeds / planting materials obtained are not certified, mention the place they were obtained, name and the officer / institute recommended </li>
        <TextField id="outlined-basic" label="Outlined" variant="outlined" size="small" />
        <li>Mention whether any soil test has been done for your farm.</li>
        <TextField id="outlined-basic" label="Outlined" variant="outlined" size="small" />
        <li>Mention whether any soil test has been done for your farm.<Switch {...label} /></li>
        <li>Fertilizer management practices in the farm? <Switch {...label} /></li>
        <li>Mention whether you have added compost to the soil. <Switch {...label} /></li>
        <p>If yes, mention the source of compost  </p>
        <p>Prepared within the farm   <Checkbox {...label} /> Prepared outside the farm  <Checkbox {...label} /></p>
        <p>If received from outside, mention the place and address</p>
        <TextField id="outlined-basic" label="Outlined" variant="outlined" size="small" />
        <li>Mention whether human fecal matters were added to the field in direct or indirect way.<Switch {...label} /></li>
        <li>Do you have any measures adopted to minimize soil erosion?<Switch {...label} /></li>
        <li>Do you have water testing report with regard to the water used for irrigation?<Switch {...label} /> </li>
        <p>How often water is tested to ascertain its quality?</p>
        <TextField id="outlined-basic" label="Outlined" variant="outlined" size="small" />
        <li>What are the irrigation methods used in your farm/field?</li>
        <TextField id="outlined-basic" label="Outlined" variant="outlined" size="small" />
        <li>Whether the farm has been used for any other non-agricultural purpose earlier.<Switch {...label} /></li>
        <p>If yes, mention for what purpose? <TextField id="outlined-basic" label="Outlined" variant="outlined" size="small" /></p>
        <p>Crops cultivated within past two years <TextField id="outlined-basic" label="Outlined" variant="outlined" size="small" /></p>
        <li>If the weeds cause problem to your farm, how do you manage weeds in your farm?<Switch {...label} /></li>
        <li>Tabulate the identified pest, disease and their control measures separately for present and next season cultivation for the one year period using following tables</li>
        <li>Do you have SL-GAP and the conventional agricultural practices available in your farm?<Switch {...label} /></li>
        <p>If yes, mention the measures which have been taken to supply such products to the market separately.<TextField id="outlined-basic" label="Outlined" variant="outlined" size="small" /></p>
        <li>Do you have identified any risk due to the activities from the surrounding lands?<Switch {...label} /></li>
        <p>Have you taken the corrective measures to minimize the risk?<Switch {...label} /></p>
        <li>Steps have been taken to prevent contamination at the harvesting and temporary storage.<Switch {...label} /></li>
        <li>Produce / harvest washed at the farm?<Switch {...label} /></li>
        <p>If yes water quality is similar to drinking water?<Switch {...label} /></p>
        <li>
          <ol>
            <li>On farm packaging was carried out?<Switch {...label} /></li>
            <li>Do you have method to maintain traceability of produce?<Switch {...label} /></li>
            <li>Do you use the SL-GAP logo and the QR code on your product package?<Switch {...label} /></li>
          </ol>
        </li>
        <li>Do you store the both SL-GAP and non - GAP products together in same place?<Switch {...label} /></li>
        <li>Do you have protect the temporary stores and processing places from insects and other animals?<Switch {...label} /></li>
        <li>Do you store fertilizer and pesticides in same store?<Switch {...label} /></li>
        <li>Do you have stored fertilizer and pesticide separately to ensure the quality?<Switch {...label} /></li>
        <li>The workers have been trained properly on relevant trainings?<Switch {...label} /> </li>
        <li>Do you have provide first aid and sanitary facilities for workers?<Switch {...label} /> </li>
      </ol>
    </div>
  )
}

export default gapRegister